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
  if (req.method === "POST") {
    const { name, slug, description, detail, price, image_url, stock, is_active } = req.body;

    const { data, error } = await supabaseAdmin.from("products").insert([
      {
        name,
        slug,
        description,
        detail,
        price,
        image_url,
        stock,
        is_active,
      },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data?.[0] ?? null);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
