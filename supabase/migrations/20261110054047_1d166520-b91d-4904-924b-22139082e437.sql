ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS invitation_category text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS event_date date;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS event_time text NOT NULL DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS event_venue text NOT NULL DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS hosts text NOT NULL DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS invitation_message text NOT NULL DEFAULT '';
UPDATE public.projects SET invitation_category = 'wedding' WHERE division = 'wedding' AND invitation_category IS NULL;
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_invitation_category_check;
ALTER TABLE public.projects ADD CONSTRAINT projects_invitation_category_check CHECK (invitation_category IS NULL OR invitation_category IN ('wedding','anniversary','baby_born','bartabandha'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TABLE IF NOT EXISTS public.invitation_guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  relation text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT invitation_guests_name_check CHECK (length(btrim(name)) BETWEEN 1 AND 200),
  CONSTRAINT invitation_guests_relation_check CHECK (length(relation) <= 200),
  CONSTRAINT invitation_guests_phone_check CHECK (length(phone) <= 50),
  CONSTRAINT invitation_guests_slug_check CHECK (slug ~ '^[^/?#[:space:]]{3,160}$')
);
CREATE INDEX IF NOT EXISTS invitation_guests_project ON public.invitation_guests(project_id);
CREATE INDEX IF NOT EXISTS invitation_guests_owner ON public.invitation_guests(user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invitation_guests TO authenticated;
GRANT ALL ON public.invitation_guests TO service_role;
ALTER TABLE public.invitation_guests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS guest_owner ON public.invitation_guests;
CREATE POLICY guest_owner ON public.invitation_guests FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid()));
DROP TRIGGER IF EXISTS invitation_guests_updated_at ON public.invitation_guests;
CREATE TRIGGER invitation_guests_updated_at BEFORE UPDATE ON public.invitation_guests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.get_invitation(_slug text)
RETURNS TABLE(guest_name text, relation text, category text, hosts text, event_date date, event_time text, event_venue text, message text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT g.name, g.relation, coalesce(p.invitation_category, 'wedding'),
         coalesce(nullif(btrim(p.hosts), ''), c.name, ''), p.event_date, p.event_time, p.event_venue, p.invitation_message
  FROM public.invitation_guests g
  JOIN public.projects p ON p.id = g.project_id
  LEFT JOIN public.clients c ON c.id = p.client_id
  WHERE g.slug = _slug AND p.division = 'wedding' AND p.status <> 'cancelled'
  LIMIT 1
$$;
REVOKE ALL ON FUNCTION public.get_invitation(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_invitation(text) TO anon, authenticated;

CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  occasion text NOT NULL DEFAULT '',
  event_date date,
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can send an inquiry" ON public.inquiries;
DROP POLICY IF EXISTS "Admins read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins delete inquiries" ON public.inquiries;
CREATE POLICY "Anyone can send an inquiry" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (status = 'new' AND notes = '');
CREATE POLICY "Admins read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE OR REPLACE FUNCTION public.validate_inquiry() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF length(trim(NEW.name)) = 0 OR length(NEW.name) > 100 THEN RAISE EXCEPTION 'Name is required (max 100 chars)'; END IF;
  IF length(NEW.phone) > 30 OR length(NEW.email) > 255 OR length(NEW.occasion) > 50 OR length(NEW.message) > 2000 OR length(NEW.notes) > 2000 THEN RAISE EXCEPTION 'Text too long'; END IF;
  IF length(trim(NEW.phone)) = 0 AND length(trim(NEW.email)) = 0 THEN RAISE EXCEPTION 'Phone or email is required'; END IF;
  IF NEW.status NOT IN ('new','contacted','converted','closed') THEN RAISE EXCEPTION 'Invalid status'; END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS validate_inquiry ON public.inquiries;
CREATE TRIGGER validate_inquiry BEFORE INSERT OR UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.validate_inquiry();
DROP TRIGGER IF EXISTS update_inquiries ON public.inquiries;
CREATE TRIGGER update_inquiries BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();