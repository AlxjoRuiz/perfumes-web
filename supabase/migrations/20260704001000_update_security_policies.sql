alter table public.products disable row level security;

drop policy if exists "Authenticated users can manage products" on public.products;
create policy "Admin users can manage products"
  on public.products
  for all
  using (
    auth.role() = 'authenticated' and exists (
      select 1 from public.profiles p where p.email = auth.email() and p.role = 'admin'
    )
  )
  with check (
    auth.role() = 'authenticated' and exists (
      select 1 from public.profiles p where p.email = auth.email() and p.role = 'admin'
    )
  );

alter table public.products enable row level security;

drop policy if exists "Authenticated users can upload product images" on storage.objects;
create policy "Admin users can upload product images"
  on storage.objects
  for insert
  with check (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
    and exists (
      select 1 from public.profiles p where p.email = auth.email() and p.role = 'admin'
    )
  );

drop policy if exists "Authenticated users can update product images" on storage.objects;
create policy "Admin users can update product images"
  on storage.objects
  for update
  using (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
    and exists (
      select 1 from public.profiles p where p.email = auth.email() and p.role = 'admin'
    )
  )
  with check (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
    and exists (
      select 1 from public.profiles p where p.email = auth.email() and p.role = 'admin'
    )
  );

drop policy if exists "Authenticated users can delete product images" on storage.objects;
create policy "Admin users can delete product images"
  on storage.objects
  for delete
  using (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
    and exists (
      select 1 from public.profiles p where p.email = auth.email() and p.role = 'admin'
    )
  );
