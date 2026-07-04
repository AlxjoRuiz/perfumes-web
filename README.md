# Perfumes Web

Tienda online de perfumes con catálogo, carrito, checkout por WhatsApp y panel de administración.

## Requisitos

- Node.js 24
- npm o pnpm
- Cuenta de Supabase con proyecto creado
- Variables de entorno configuradas

## Variables de entorno

Copia [.env.example](.env.example) a `.env.local` y completa:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
NEXT_PUBLIC_WHATSAPP_PHONE=573001112233
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_PRODUCT_IMAGES_BUCKET=product-images
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

## Desarrollo

```bash
nvm use
npm install
npm run dev
```

Abre http://localhost:3000.

## Scripts

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la build de producción.
- `npm run start`: ejecuta la app compilada.
- `npm run lint`: valida el proyecto con ESLint.

## Admin y Supabase

- El panel de administración está protegido por acceso con correo autorizado.
- La tabla `profiles` define los usuarios con rol `admin`.
- El bucket `product-images` debe estar público para que las imágenes se muestren correctamente.
- Si quieres mayor seguridad, añade más correos a la lista de autorización en [components/admin/admin-allowlist.ts](components/admin/admin-allowlist.ts).

## Despliegue en Vercel

1. Conecta el repositorio a Vercel.
2. Define las mismas variables de entorno en Vercel.
3. Asegúrate de que el bucket de Supabase y las políticas RLS estén configuradas.
4. Despliega la app.
