# Plan de trabajo: tienda de perfumes (estado actual)

## Resumen
El proyecto ya implementa la mayoría de las fases principales: landing, listado de productos, detalle, carrito, checkout por WhatsApp, admin con CRUD, subida de imágenes y seguridad básica de Supabase. Lo que falta es básicamente cerrar algunas tareas de validación, pulir la integración del admin y documentar permisos/entornos.

---

## Fase 1: Setup del proyecto
Estado: completada ✅

- Proyecto Next.js con TypeScript, Tailwind, App Router y ESLint: completado.
- Dependencias base instaladas: completado.
- `.env.example` y variables de entorno definidas: aprobado.
- Cliente público de Supabase en `lib/supabase/client.ts`: existe.
- Tipos en `types/product.ts`: existen.
- `npm run dev` funciona y `npx next build` también pasó.
- Tailwind funciona.

---

## Fase 2: Modelo de datos en Supabase
Estado: completada ✅

- Tabla `products` creada en migración `supabase/migrations/20260530000000_create_products.sql`.
- Índices `products_slug_idx`, `products_active_idx` creados.
- Trigger `update_products_updated_at` creado.
- Bucket `product-images` creado en migración.
- Bucket público configurado.
- Existe seed inicial en `supabase/seed.sql` con productos de prueba.

**Falta**
- Verificar manualmente en Supabase que el bucket `product-images` tiene URL pública funcional.

---

## Fase 3: Políticas de seguridad en Supabase
Estado: completada ✅

- RLS activado en `public.products`.
- Política pública de lectura para productos activos creada.
- Política de gestión de productos para usuarios autenticados creada.
- RLS y políticas de storage para `storage.objects` creadas.

**Falta**
- Definir si se requiere tabla `profiles` con rol admin para separar roles.
- Si se quiere, agregar verificación de rol admin en políticas.

---

## Fase 4: Diseño visual base
Estado: completada ✅

- Layout base con `Header`, `Footer` y `CartProvider` creado.
- Componentes UI reutilizables existentes: `Button`, `Input`, `Textarea`, `Price`, `EmptyState`, `LoadingState`.
- Componentes de producto existentes: `ProductCard`, `ProductGrid`, `ProductImage`.
- Landing visual claramente lista y responsive.

**Falta**
- Revisión final de responsive móvil/desktop si se requiere ajuste de textos o espaciados.

---

## Fase 5: Listado de productos en landing
Estado: completada ✅

- `lib/products.ts` implementado.
- `getActiveProducts()` existe y usa Supabase con fallback.
- Productos se muestran en `app/page.tsx`.
- Si no hay productos, muestra estado vacío con `EmptyState`.
- Cada card enlaza a `/productos/[slug]`.
- Precio formateado con `Price`.

**Falta**
- Validar que `getActiveProducts()` no muestre fallback si Supabase está conectado correctamente.
- Ajustar si se desea botón “Agregar al carrito” desde el landing.

---

## Fase 6: Detalle de producto
Estado: completada ✅

- `getProductBySlug(slug)` está implementado.
- `app/productos/[slug]/page.tsx` creado.
- Foto, nombre, descripción, detalle, precio y stock se muestran.
- Botón `Agregar al carrito` existe.
- Botón de WhatsApp existe.
- `generateMetadata()` existe para metadata SEO.
- `notFound()` se usa si no hay producto.

**Falta**
- Validar que productos inactivos realmente devuelvan 404 cuando `is_active=false`.
- Si se desea, mejorar mensaje de “stock 0” y deshabilitar agregar al carrito.

---

## Fase 7: Carrito de compras
Estado: completada ✅

- `CartProvider`, `AddToCartButton`, `CartItemRow`, `CartSummary`, `CartPage` implementados.
- Carrito persistente en `localStorage` con `lib/cart.ts`.
- Items se agregan desde detalle.
- Se puede editar cantidad y eliminar.
- Total se calcula.
- Contador aparece en el header.

**Falta**
- Verificar visual exacta en mobile para carrito y botones.
- Evaluar posible control de stock cuando `stock = 0`.

---

## Fase 8: Checkout por WhatsApp
Estado: completada ✅

- `lib/whatsapp.ts` implementado.
- `buildWhatsAppCheckoutUrl(items)` existe.
- Usa `NEXT_PUBLIC_WHATSAPP_PHONE`.
- Mensaje está codificado con `encodeURIComponent`.
- Checkout aparece en `CartSummary`.
- Opción de limpiar carrito está disponible.

**Falta**
- Validar que el número en env `NEXT_PUBLIC_WHATSAPP_PHONE` funcione con WhatsApp Business / WhatsApp normal.

---

## Fase 9: Admin interno
Estado: completada en gran parte ✅

- Login admin con correo está implementado en `components/admin/admin-auth.tsx`.
- Ruta `/admin` existe y redirige a `/admin/productos` si ya hay sesión.
- Segmento protegido `app/admin/(protected)` con layout servidor y redirección si no hay sesión.
- Logout agregado con `AdminSession`.
- Listado, creación y edición de productos existen.
- Formulario admin permite crear y editar producto.

**Falta**
- Validar si el login con OTP de Supabase ya funciona en producción.
- Asegurar que el usuario autenticado tenga el rol correcto para las políticas RLS.
- Si se quiere seguridad más estricta, agregar `profiles` / rol admin.

---

## Fase 10: Carga de imágenes
Estado: completada ✅

- Formulario de producto tiene input de archivo.
- La imagen se sube a `/api/products/upload`.
- Guarda `image_url` en el producto.
- Se muestra preview en admin.
- `next/image` se usa en landing y detalle.

**Falta**
- Añadir validación explícita de tipo de archivo (`jpg|jpeg|png|webp`) y tamaño máximo (2 MB) en el upload.
- Ajustar `next.config.mjs` para permitir dominios remotos si las imágenes vienen de Supabase Storage externa.

---

## Fase 11: SEO, accesibilidad y performance
Estado: parcialmente completada ✅

- Metadata global existe en `app/layout.tsx`.
- Metadata de producto existe en `app/productos/[slug]/page.tsx`.
- `next/image` se usa para imágenes.
- El admin no debería indexarse por no estar enlazado directamente.

**Falta**
- Añadir `robots.txt` / `sitemap.xml` si se desea.
- Verificar contraste y accesibilidad completa.
- Revisar si la ruta admin debe `noindex` explícito.

---

## Fase 12: Deploy en Vercel
Estado: pendiente ⚠️

- `npm run build` pasa localmente.
- Faltan tareas de configuración de Vercel y verificación de variables de entorno en producción.

---

## Fases completadas
- Fase 1: ✅
- Fase 2: ✅
- Fase 3: ✅
- Fase 4: ✅
- Fase 5: ✅
- Fase 6: ✅
- Fase 7: ✅
- Fase 8: ✅
- Fase 9: ✅
- Fase 10: ✅
- Fase 11: parcialmente ✅
- Fase 12: pendiente ⚠️

---

## Qué falta exactamente
1. Validar permisos y rol admin en Supabase si deseas mayor seguridad.
2. Validar el login OTP de Supabase en el flujo real y la persistencia de sesión admin.
3. Agregar validación de archivos en upload de imagenes (tipo y tamaño).
4. Configurar dominio remoto de imágenes en `next.config.mjs` si usas URLs externas.
5. Revisar `robots.txt` / `sitemap.xml` y `noindex` en admin.
6. Deploy en Vercel con variables de entorno.

---

## Sobre tu segunda pregunta: cómo dar acceso sin preguntar permisos

No puedo tomar decisiones fuera del código ni acceder directamente a tu cuenta. Para que no tenga que pedir permiso cada cambio, lo que puedes hacer es:

- darme acceso directo al repositorio mediante la plataforma que uses (GitHub, GitLab, etc.).
- compartir un enlace al repositorio con permisos de escritura.
- mantenerme trabajando aquí mismo en la carpeta del proyecto, donde ya puedo editar archivos.

> En este entorno de VS Code remoto, ya puedo editar los archivos directamente si me pides cambios. No necesito "permisos" adicionales dentro del proyecto; solo dime qué quieres cambiar y yo lo hago.

Si quieres, actualizo el plan original marcando los ítems completados y los pendientes en el documento `.docs/plan-trabajo-tienda-perfumes.md`. ¿Quieres que lo haga?