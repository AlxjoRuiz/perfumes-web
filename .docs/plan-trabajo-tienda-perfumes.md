# Plan de trabajo: tienda de perfumes

## Objetivo

Construir una tienda web de perfumes con Next.js, TypeScript, Tailwind CSS, Supabase y Vercel.

El sitio debe incluir:

- Landing comercial.
- Lista de productos en el landing.
- Pagina de detalle de producto.
- Carrito de compras.
- Checkout por WhatsApp.
- Admin interno sencillo para gestionar productos.
- Carga de imagenes, preferiblemente con Supabase Storage.

## Stack definido

- Framework: Next.js.
- Lenguaje: TypeScript.
- Estilos: Tailwind CSS.
- Base de datos: Supabase Postgres.
- Autenticacion admin: Supabase Auth.
- Imagenes: Supabase Storage.
- Deploy: Vercel.
- Checkout: WhatsApp.
- Estado del carrito: React Context o Zustand simple con persistencia en localStorage.

## Estructura inicial recomendada

```txt
app/
  page.tsx
  productos/
    [slug]/
      page.tsx
  carrito/
    page.tsx
  admin/
    page.tsx
    productos/
      page.tsx
      nuevo/
        page.tsx
      [id]/
        editar/
          page.tsx
components/
  admin/
  cart/
  layout/
  product/
  ui/
lib/
  supabase/
  cart.ts
  products.ts
  whatsapp.ts
types/
  product.ts
```

---

## Fase 1: Setup del proyecto

**Objetivo:** crear la base tecnica del proyecto.

**Tareas**

- [x] Crear proyecto Next.js con TypeScript, Tailwind, App Router y ESLint.
- [x] Instalar dependencias base:
  - [x] `@supabase/supabase-js`
  - [x] `lucide-react`
  - [x] `clsx`
  - [x] `tailwind-merge`
- [x] Evaluar si se usara `react-hook-form` y `zod` para formularios del admin.
  - Decision: se usaran en la fase de admin, cuando existan formularios concretos.
- [x] Crear archivo `.env.example`.
- [x] Definir variables:
  - [x] `NEXT_PUBLIC_SUPABASE_URL`
  - [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [x] `NEXT_PUBLIC_WHATSAPP_PHONE`
  - [x] `SUPABASE_SERVICE_ROLE_KEY`, solo si se necesita para operaciones server-side protegidas.
- [x] Crear cliente publico de Supabase en `lib/supabase/client.ts`.
- [x] Crear tipos iniciales en `types/product.ts`.
- [x] Verificar que `npm run dev` funciona.
- [x] Verificar que Tailwind aplica estilos correctamente.

**Criterios de aceptacion**

- [x] El proyecto corre localmente.
- [x] TypeScript esta activo.
- [x] Tailwind funciona.
- [x] Supabase client existe.
- [x] `.env.example` documenta todas las variables requeridas.

---

## Fase 2: Modelo de datos en Supabase

**Objetivo:** crear la tabla principal de productos y preparar almacenamiento de imagenes.

**Tareas**

- [ ] Crear tabla `products` en Supabase.

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  detail text,
  price numeric(10, 2) not null,
  image_url text,
  stock integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

- [ ] Crear indices.

```sql
create index products_slug_idx on products(slug);
create index products_active_idx on products(is_active);
```

- [ ] Crear funcion para actualizar `updated_at`.

```sql
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;
```

- [ ] Crear trigger.

```sql
create trigger update_products_updated_at
before update on products
for each row
execute function update_updated_at_column();
```

- [ ] Crear bucket `product-images` en Supabase Storage.
- [ ] Definir si el bucket sera publico. Recomendacion para MVP: publico.
- [ ] Insertar productos de prueba manualmente.

**Criterios de aceptacion**

- [ ] Existen productos de prueba en Supabase.
- [ ] Cada producto tiene `name`, `slug`, `description`, `price`, `stock` e `is_active`.
- [ ] El bucket `product-images` existe.
- [ ] Se puede obtener una URL publica para una imagen.

---

## Fase 3: Politicas de seguridad en Supabase

**Objetivo:** proteger escritura y permitir lectura publica solo de lo necesario.

**Tareas**

- [ ] Activar RLS en `products`.

```sql
alter table products enable row level security;
```

- [ ] Crear politica de lectura publica para productos activos.

```sql
create policy "Public can read active products"
on products for select
using (is_active = true);
```

- [ ] Crear politica inicial para que usuarios autenticados gestionen productos.

```sql
create policy "Authenticated users can manage products"
on products for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
```

- [ ] Evaluar si se necesita tabla `profiles` con rol `admin`.
- [ ] Si se requiere mayor seguridad, crear tabla `profiles`.

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);
```

- [ ] Si se usa `profiles`, reemplazar politica de admin por validacion de rol.
- [ ] Crear politica de lectura publica para imagenes.
- [ ] Crear politica de subida de imagenes solo para usuarios autenticados.

**Criterios de aceptacion**

- [ ] Usuarios anonimos solo pueden leer productos activos.
- [ ] Usuarios anonimos no pueden crear, editar ni borrar productos.
- [ ] El admin autenticado puede gestionar productos.
- [ ] Las imagenes publicas se pueden ver desde el sitio.

---

## Fase 4: Diseño visual base

**Objetivo:** crear una interfaz elegante, clara y usable para ecommerce de perfumes.

**Tareas**

- [ ] Definir nombre temporal o real de la tienda.
- [ ] Definir paleta visual.
- [ ] Crear layout base.
- [ ] Crear `Header`.
- [ ] Crear `Footer`.
- [ ] Crear componentes UI reutilizables:
  - [ ] `Button`
  - [ ] `Input`
  - [ ] `Textarea`
  - [ ] `Price`
  - [ ] `EmptyState`
  - [ ] `LoadingState`
- [ ] Crear componentes de producto:
  - [ ] `ProductCard`
  - [ ] `ProductGrid`
  - [ ] `ProductImage`
- [ ] Crear landing estatica inicial.
- [ ] Verificar responsive en mobile y desktop.

**Landing debe incluir**

- [ ] Header con logo o nombre de tienda.
- [ ] Navegacion simple.
- [ ] Acceso al carrito.
- [ ] Acceso discreto al admin.
- [ ] Hero con imagen relacionada con perfumes.
- [ ] Titulo principal.
- [ ] Texto comercial corto.
- [ ] CTA a productos.
- [ ] Seccion de productos destacados.
- [ ] Seccion de confianza: envios, pedidos por WhatsApp, calidad/originalidad.
- [ ] Footer con WhatsApp, redes y datos basicos.

**Criterios de aceptacion**

- [ ] La primera pantalla comunica claramente que es una tienda de perfumes.
- [ ] El sitio se ve profesional en mobile.
- [ ] No hay textos solapados.
- [ ] Los componentes base son reutilizables.

---

## Fase 5: Listado de productos en landing

**Objetivo:** conectar el landing con productos reales de Supabase.

**Tareas**

- [ ] Crear `lib/products.ts`.
- [ ] Crear funcion `getActiveProducts`.
- [ ] Consultar productos activos.

```ts
.select("*")
.eq("is_active", true)
.order("created_at", { ascending: false })
```

- [ ] Renderizar productos en `app/page.tsx`.
- [ ] Mostrar placeholder si falta imagen.
- [ ] Mostrar estado vacio si no hay productos.
- [ ] Manejar errores de carga.
- [ ] Cada card debe enlazar a `/productos/[slug]`.
- [ ] Agregar boton `Agregar al carrito` si el carrito ya esta disponible, o dejar hook listo para integracion.

**Criterios de aceptacion**

- [ ] El landing muestra productos desde Supabase.
- [ ] Solo aparecen productos activos.
- [ ] Las cards no se rompen si falta imagen.
- [ ] El precio se muestra con formato de moneda.
- [ ] Cada producto enlaza correctamente al detalle.

---

## Fase 6: Detalle de producto

**Objetivo:** crear una pagina individual por producto.

**Ruta**

```txt
/productos/[slug]
```

**Tareas**

- [ ] Crear funcion `getProductBySlug(slug: string)`.
- [ ] Crear pagina `app/productos/[slug]/page.tsx`.
- [ ] Mostrar foto.
- [ ] Mostrar nombre.
- [ ] Mostrar descripcion corta.
- [ ] Mostrar detalle completo.
- [ ] Mostrar precio.
- [ ] Mostrar stock si aplica.
- [ ] Agregar boton `Agregar al carrito`.
- [ ] Agregar boton `Comprar por WhatsApp`.
- [ ] Implementar `notFound()` si el producto no existe.
- [ ] Implementar `notFound()` si el producto esta inactivo.
- [ ] Crear metadata SEO con `generateMetadata`.

**Mensaje WhatsApp directo sugerido**

```txt
Hola, quiero comprar este perfume:

Producto: Dior Sauvage
Precio: $350.000
Cantidad: 1
```

**Criterios de aceptacion**

- [ ] La ruta por slug funciona.
- [ ] El detalle muestra foto, descripcion, detalle y precio.
- [ ] Producto inexistente devuelve 404.
- [ ] Producto inactivo no se puede ver publicamente.
- [ ] CTA de WhatsApp abre con mensaje prellenado.

---

## Fase 7: Carrito de compras

**Objetivo:** permitir agregar productos, editar cantidades y preparar checkout.

**Decision tecnica**

Para MVP usar React Context con `localStorage`. Si el proyecto crece, evaluar Zustand.

**Tipo de item**

```ts
export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  quantity: number;
};
```

**Tareas**

- [ ] Crear `components/cart/CartProvider.tsx`.
- [ ] Crear `components/cart/AddToCartButton.tsx`.
- [ ] Crear `components/cart/CartItemRow.tsx`.
- [ ] Crear `components/cart/CartSummary.tsx`.
- [ ] Crear pagina `app/carrito/page.tsx`.
- [ ] Implementar `addItem(product)`.
- [ ] Implementar `removeItem(productId)`.
- [ ] Implementar `updateQuantity(productId, quantity)`.
- [ ] Implementar `clearCart()`.
- [ ] Implementar `getTotal()`.
- [ ] Implementar `getItemCount()`.
- [ ] Persistir carrito en `localStorage`.
- [ ] Restaurar carrito al recargar la pagina.
- [ ] Mostrar cantidad de items en el header.
- [ ] Bloquear cantidades menores a 1.
- [ ] Manejar carrito vacio.

**Criterios de aceptacion**

- [ ] Se agregan productos desde landing.
- [ ] Se agregan productos desde detalle.
- [ ] El carrito persiste tras recargar.
- [ ] Se pueden editar cantidades.
- [ ] Se pueden eliminar productos.
- [ ] El total es correcto.
- [ ] El header muestra la cantidad correcta.

---

## Fase 8: Checkout por WhatsApp

**Objetivo:** generar una URL de WhatsApp con el resumen del pedido.

**Tareas**

- [ ] Crear `lib/whatsapp.ts`.
- [ ] Crear funcion `buildWhatsAppCheckoutUrl(items: CartItem[])`.
- [ ] Leer numero desde `NEXT_PUBLIC_WHATSAPP_PHONE`.
- [ ] Validar carrito vacio.
- [ ] Generar mensaje legible.
- [ ] Codificar mensaje con `encodeURIComponent`.
- [ ] Abrir link en nueva pestana.
- [ ] Agregar boton de checkout en pagina de carrito.
- [ ] Agregar opcion de limpiar carrito luego del checkout.

**Formato de mensaje**

```txt
Hola, quiero hacer este pedido:

1. Dior Sauvage
Cantidad: 2
Precio unitario: $350.000
Subtotal: $700.000

2. Bleu de Chanel
Cantidad: 1
Precio unitario: $420.000
Subtotal: $420.000

Total: $1.120.000
```

**Criterios de aceptacion**

- [ ] WhatsApp abre correctamente.
- [ ] El mensaje incluye todos los productos.
- [ ] El mensaje incluye cantidades.
- [ ] El mensaje incluye subtotales.
- [ ] El mensaje incluye total.
- [ ] El numero es configurable por variable de entorno.

---

## Fase 9: Admin interno

**Objetivo:** permitir manejo sencillo de productos desde una zona protegida.

**Rutas**

```txt
/admin
/admin/productos
/admin/productos/nuevo
/admin/productos/[id]/editar
```

**Tareas de autenticacion**

- [ ] Configurar Supabase Auth.
- [ ] Crear login admin con email y password.
- [ ] Proteger rutas `/admin`.
- [ ] Redirigir usuarios no autenticados al login.
- [ ] Agregar logout.
- [ ] Decidir si cualquier usuario autenticado es admin o si se usara tabla `profiles`.

**Tareas de productos**

- [ ] Crear listado de productos admin.
- [ ] Mostrar nombre, precio, stock, estado y acciones.
- [ ] Crear formulario de nuevo producto.
- [ ] Crear formulario de edicion.
- [ ] Permitir editar:
  - [ ] Nombre.
  - [ ] Slug.
  - [ ] Descripcion corta.
  - [ ] Detalle.
  - [ ] Precio.
  - [ ] Stock.
  - [ ] Imagen.
  - [ ] Estado activo/inactivo.
- [ ] Generar slug automaticamente desde el nombre.
- [ ] Permitir editar manualmente el slug.
- [ ] Validar campos requeridos.
- [ ] Agregar confirmacion antes de borrar, si se implementa borrado.
- [ ] Preferir desactivar productos sobre borrarlos.

**Criterios de aceptacion**

- [ ] El admin no es accesible sin login.
- [ ] El admin puede listar productos.
- [ ] El admin puede crear productos.
- [ ] El admin puede editar productos.
- [ ] El admin puede activar/desactivar productos.
- [ ] Los cambios se reflejan en la tienda publica.

---

## Fase 10: Carga de imagenes

**Objetivo:** permitir subir imagenes de producto desde el admin.

**Opcion recomendada**

Usar Supabase Storage porque el proyecto ya depende de Supabase.

**Tareas**

- [ ] Crear input de archivo en formulario de producto.
- [ ] Validar tipo de archivo:
  - [ ] `.jpg`
  - [ ] `.jpeg`
  - [ ] `.png`
  - [ ] `.webp`
- [ ] Validar tamano maximo. Recomendacion inicial: 2 MB.
- [ ] Subir archivo a bucket `product-images`.
- [ ] Definir convencion de path. Ejemplo: `products/{product-id}/{timestamp}-{filename}`.
- [ ] Obtener URL publica.
- [ ] Guardar URL en `products.image_url`.
- [ ] Mostrar preview de imagen en admin.
- [ ] Mostrar placeholder si no hay imagen.
- [ ] Configurar `next/image` para permitir imagenes de Supabase.

**Alternativas gratuitas si Supabase Storage no sirve**

- [ ] Cloudinary free tier: buena opcion si se necesita optimizacion avanzada.
- [ ] UploadThing: buena integracion con Next.js y plan gratuito limitado.
- [ ] Vercel Blob: simple en Vercel, pero revisar limites actuales del plan.

**Criterios de aceptacion**

- [ ] El admin puede subir imagen.
- [ ] La imagen aparece en landing.
- [ ] La imagen aparece en detalle.
- [ ] Archivos invalidos son rechazados.
- [ ] El sitio no se rompe si no hay imagen.

---

## Fase 11: SEO, accesibilidad y performance

**Objetivo:** mejorar calidad del sitio para buscadores, velocidad y experiencia de usuario.

**Tareas SEO**

- [ ] Agregar metadata global.
- [ ] Agregar metadata del home.
- [ ] Agregar metadata por producto.
- [ ] Usar imagen del producto como Open Graph cuando exista.
- [ ] Evitar indexar admin.
- [ ] Agregar `robots.txt` si aplica.
- [ ] Agregar `sitemap.xml` si aplica.

**Tareas performance**

- [ ] Usar `next/image`.
- [ ] Configurar dominios remotos de imagenes en `next.config.ts`.
- [ ] Mantener lectura publica de productos en Server Components cuando sea posible.
- [ ] Evitar cargar JS innecesario en paginas publicas.
- [ ] Revisar tamanos de imagen.

**Tareas UX y accesibilidad**

- [ ] Asegurar contraste suficiente.
- [ ] Agregar textos alternativos a imagenes.
- [ ] Usar labels en formularios.
- [ ] Hacer botones claramente interactivos.
- [ ] Deshabilitar compra si no hay stock, si se decide respetar stock.
- [ ] Mostrar confirmacion visual al agregar al carrito.
- [ ] Probar navegacion con teclado en admin y tienda.

**Criterios de aceptacion**

- [ ] Home tiene metadata.
- [ ] Productos tienen metadata.
- [ ] Admin no se indexa.
- [ ] Imagenes estan optimizadas.
- [ ] El sitio es usable en mobile.
- [ ] Formularios tienen labels.

---

## Fase 12: Deploy en Vercel

**Objetivo:** publicar la tienda.

**Tareas**

- [ ] Crear proyecto en Vercel.
- [ ] Conectar repositorio.
- [ ] Configurar variables de entorno en Vercel:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `NEXT_PUBLIC_WHATSAPP_PHONE`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`, solo si aplica.
- [ ] Ejecutar build local.

```bash
npm run build
```

- [ ] Revisar logs de build en Vercel.
- [ ] Validar URL publica.
- [ ] Configurar dominio personalizado si aplica.

**Criterios de aceptacion**

- [ ] Deploy exitoso.
- [ ] Landing carga en produccion.
- [ ] Productos aparecen en produccion.
- [ ] Detalle funciona en produccion.
- [ ] Carrito funciona en produccion.
- [ ] WhatsApp abre desde produccion.
- [ ] Admin funciona en produccion.
- [ ] Imagenes cargan en produccion.

---

## Orden recomendado de ejecucion

- [ ] 1. Crear proyecto Next.js.
- [ ] 2. Configurar Tailwind, TypeScript y estructura base.
- [ ] 3. Crear proyecto Supabase.
- [ ] 4. Crear tabla `products`.
- [ ] 5. Crear bucket `product-images`.
- [ ] 6. Configurar Supabase client.
- [ ] 7. Crear layout base.
- [ ] 8. Crear landing estatica.
- [ ] 9. Conectar landing con productos reales.
- [ ] 10. Crear detalle de producto.
- [ ] 11. Crear carrito.
- [ ] 12. Crear checkout por WhatsApp.
- [ ] 13. Crear login admin.
- [ ] 14. Crear CRUD admin.
- [ ] 15. Agregar subida de imagenes.
- [ ] 16. Configurar RLS.
- [ ] 17. Pulir responsive.
- [ ] 18. Agregar SEO.
- [ ] 19. Ejecutar QA completo.
- [ ] 20. Deploy en Vercel.
- [ ] 21. Validacion final en produccion.

---

## Backlog MVP

- [ ] Landing.
- [ ] Listado de productos.
- [ ] Detalle de producto.
- [ ] Carrito.
- [ ] Checkout por WhatsApp.
- [ ] Login admin.
- [ ] CRUD productos.
- [ ] Carga de imagenes.
- [ ] Deploy en Vercel.

## Backlog posterior

- [ ] Categorias de perfumes.
- [ ] Filtros por marca.
- [ ] Filtros por precio.
- [ ] Filtros por genero.
- [ ] Filtros por concentracion.
- [ ] Productos destacados.
- [ ] Variantes por tamano: 30 ml, 50 ml, 100 ml.
- [ ] Control avanzado de stock.
- [ ] Cupones.
- [ ] Historial de pedidos.
- [ ] Analytics.
- [ ] Pixel de Meta.
- [ ] Integracion con Instagram.
- [ ] Blog SEO sobre fragancias.

---

## Checklist final de QA

- [ ] `npm run lint` pasa.
- [ ] `npm run build` pasa.
- [ ] Home responsive en mobile.
- [ ] Home responsive en desktop.
- [ ] Producto sin imagen no rompe UI.
- [ ] Producto inactivo no aparece en tienda.
- [ ] Detalle de producto inexistente devuelve 404.
- [ ] Detalle de producto inactivo devuelve 404.
- [ ] Agregar al carrito funciona.
- [ ] Editar cantidades funciona.
- [ ] Eliminar producto del carrito funciona.
- [ ] Total del carrito es correcto.
- [ ] WhatsApp recibe mensaje bien formateado.
- [ ] Admin no es accesible sin login.
- [ ] Admin puede crear producto.
- [ ] Admin puede editar producto.
- [ ] Admin puede activar/desactivar producto.
- [ ] Admin puede subir imagen.
- [ ] Cambios del admin aparecen en tienda.
- [ ] Deploy en Vercel funciona.
- [ ] Variables de entorno estan configuradas en produccion.

---

## Notas para agentes

- Mantener cambios pequenos y verificables por fase.
- No avanzar a la siguiente fase si los criterios de aceptacion de la fase actual fallan.
- Preferir componentes simples y reutilizables.
- Evitar sobreingenieria en el MVP.
- Usar Supabase Storage para imagenes salvo que exista una razon concreta para cambiar.
- Preferir desactivar productos antes que borrarlos definitivamente.
- Documentar cualquier decision tecnica que cambie este plan.
