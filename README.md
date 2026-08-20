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

El proyecto está configurado para deployar en Vercel con los siguientes pasos:

### 1. Conectar el repositorio

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (o inicia sesión).
2. Haz clic en **"New Project"** → **"Import Git Repository"**.
3. Conecta tu repositorio de GitHub (`AlxjoRuiz/perfumes-web`).
4. Selecciona la rama `main` (o la rama que prefieras).

### 2. Variables de entorno en Vercel

Antes de hacer clic en "Deploy", configura estas variables de entorno en **Settings** → **Environment Variables**:

| Variable | Valor | Tipo |
|----------|-------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de proyecto de Supabase | Production + Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu anon key pública | Production + Preview |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Número de WhatsApp con código de país (ej: `573001112233`) | Production + Preview |
| `NEXT_PUBLIC_SITE_URL` | URL de producción (ej: `https://tutienda.vercel.app`) | Production |
| `SUPABASE_PRODUCT_IMAGES_BUCKET` | `product-images` | Production + Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (solo server-side) | Production |

> **Importante:** `SUPABASE_SERVICE_ROLE_KEY` debe estar como **Server Environment Variable** (nunca expuesta al cliente).

### 3. Build Configuration

El `vercel.json` configura:
- `--max-old-space-size=8192` para builds grandes.
- Headers de cache para `sitemap.xml`.
- `cleanOutputs: true` para limpiar builds anteriores.

### 4. Post-deploy checklist

- [ ] La landing carga correctamente en producción.
- [ ] Los productos aparecen desde Supabase.
- [ ] El detalle de producto funciona con slugs.
- [ ] El carrito persiste entre recargas.
- [ ] El WhatsApp checkout abre con el mensaje correcto.
- [ ] El admin se protege correctamente (requiere Google OAuth autorizado).
- [ ] Las imágenes subidas aparecen en landing y detalle.
- [ ] `https://tutienda.vercel.app/robots.txt` y `/sitemap.xml` funcionan.
- [ ] Google Search Console indexa la sitemap.

### 5. Verificación del bucket de imágenes

En Supabase Studio, asegúrate de que:
1. El bucket `product-images` esté **público**.
2. Las políticas RLS permitan lectura pública (`Public can read product images`).
3. La URL pública de las imágenes retorna la imagen correctamente (no 404).

## Admin y Supabase

- El panel de administración está protegido por acceso con Google OAuth.
- La tabla `profiles` define los usuarios con rol `admin`.
- El bucket `product-images` debe estar público para que las imágenes se muestren correctamente.
- Los correos autorizados como admin deben estar en la tabla `profiles` con `role='admin'`.
