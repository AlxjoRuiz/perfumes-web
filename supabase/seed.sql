insert into public.products (
  name,
  slug,
  description,
  detail,
  price,
  image_url,
  stock,
  is_active
) values
  (
    'Bleu de Chanel',
    'bleu-de-chanel',
    'Perfume masculino fresco con notas amaderadas y citricas.',
    'Una fragancia versatil para uso diario y ocasiones especiales, con salida aromatica fresca y fondo elegante.',
    420000.00,
    null,
    8,
    true
  ),
  (
    'Dior Sauvage',
    'dior-sauvage',
    'Fragancia intensa con bergamota, pimienta y fondo ambarado.',
    'Perfil moderno y potente, recomendado para quienes buscan alta fijacion y presencia.',
    390000.00,
    null,
    10,
    true
  ),
  (
    'Yves Saint Laurent Libre',
    'ysl-libre',
    'Perfume femenino floral con lavanda, azahar y vainilla.',
    'Una mezcla luminosa y elegante con contraste entre frescura aromatica y calidez dulce.',
    450000.00,
    null,
    6,
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  detail = excluded.detail,
  price = excluded.price,
  image_url = excluded.image_url,
  stock = excluded.stock,
  is_active = excluded.is_active;
