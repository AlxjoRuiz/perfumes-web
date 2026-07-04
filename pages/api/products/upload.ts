import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const storageBucket = process.env.SUPABASE_PRODUCT_IMAGES_BUCKET ?? "product-images";
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({ error: "Faltan variables de entorno de Supabase para subir imágenes." });
  }

  const { name, base64, contentType } = req.body;

  if (!name || !base64 || !contentType) {
    return res.status(400).json({ error: "Missing upload parameters" });
  }

  if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
    return res.status(400).json({ error: "Tipo de archivo no permitido." });
  }

  const extension = name.split(".").pop()?.toLowerCase();
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return res.status(400).json({ error: "Extensión de archivo no permitida." });
  }

  const buffer = Buffer.from(base64, "base64");
  if (buffer.byteLength > MAX_IMAGE_SIZE_BYTES) {
    return res.status(413).json({ error: "El archivo es muy grande. El límite es 2 MB." });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
  const { data, error } = await supabaseAdmin.storage
    .from(storageBucket)
    .upload(name, buffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const publicUrlData = supabaseAdmin.storage.from(storageBucket).getPublicUrl(data.path);

  if (!publicUrlData || !publicUrlData.data?.publicUrl) {
    return res.status(500).json({ error: "No se pudo obtener la URL pública de la imagen." });
  }

  return res.status(201).json({ url: publicUrlData.data.publicUrl });
}
