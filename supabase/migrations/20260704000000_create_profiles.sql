create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create policy "Users can read own profile"
  on public.profiles
  for select
  using (email = auth.email());

insert into public.profiles (email, role)
values
  ('admin@perfumes.com', 'admin')
on conflict (email) do nothing;
