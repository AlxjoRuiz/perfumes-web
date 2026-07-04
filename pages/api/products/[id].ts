import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({ error: "Faltan variables de entorno de Supabase para gestionar productos." });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid product id" });
  }

  if (req.method === "PATCH") {
    const { name, slug, description, detail, price, image_url, stock, is_active } = req.body;

    const { data, error } = await supabaseAdmin
      .from("products")
      .update({
        name,
        slug,
        description,
        detail,
        price,
        image_url,
        stock,
        is_active,
      })
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data?.[0] ?? null);
  }

  if (req.method === "DELETE") {
    const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(204).end();
  }

  return res.status(405).json({ error: "Method not allowed" });
}
