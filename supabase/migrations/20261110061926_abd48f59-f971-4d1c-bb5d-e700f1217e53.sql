DROP FUNCTION IF EXISTS public.get_invitation(text);
CREATE FUNCTION public.get_invitation(_slug text)
 RETURNS TABLE(guest_name text, category text, hosts text, event_date date, event_time text, event_venue text, message text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT g.name, coalesce(p.invitation_category, 'wedding'),
         coalesce(nullif(btrim(p.hosts), ''), c.name, ''), p.event_date, p.event_time, p.event_venue, p.invitation_message
  FROM public.invitation_guests g
  JOIN public.projects p ON p.id = g.project_id
  LEFT JOIN public.clients c ON c.id = p.client_id
  WHERE g.slug = _slug AND p.division = 'wedding' AND p.status <> 'cancelled'
  LIMIT 1
$function$;
REVOKE ALL ON FUNCTION public.get_invitation(text) FROM public;
GRANT EXECUTE ON FUNCTION public.get_invitation(text) TO anon, authenticated, service_role;