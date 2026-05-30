# Supabase

## Fase 2

Esta carpeta contiene la migracion y los datos de prueba para el modelo inicial.

Para aplicar la fase en un proyecto Supabase enlazado:

```bash
supabase link --project-ref <project-ref>
supabase db push --include-seed
```

Para probarlo localmente:

```bash
supabase start
supabase db reset
```

La migracion crea:

- Tabla `public.products`.
- Indices `products_slug_idx` y `products_active_idx`.
- Funcion y trigger para mantener `updated_at`.
- Bucket publico `product-images`.

El seed inserta productos de prueba sin imagen. Para validar la URL publica de una imagen, sube un archivo al bucket `product-images` desde el panel de Supabase y usa la URL publica generada por Storage.
