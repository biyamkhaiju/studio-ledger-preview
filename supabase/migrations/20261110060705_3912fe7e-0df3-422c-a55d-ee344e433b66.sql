-- New sign-ups always get the ordinary 'user' role; admin is never granted by sign-up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id, role) do nothing;
  return new;
end;
$function$;

-- Every existing account gets the ordinary role.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'user'::public.app_role FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING;

-- The owner's account (Biyam Khaiju) is the administrator.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users WHERE lower(email) = 'khaijub91@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Profiles for any account created before the trigger existed.
INSERT INTO public.profiles (id, display_name)
SELECT id, split_part(email, '@', 1) FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- Role helpers are only for signed-in checks.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;