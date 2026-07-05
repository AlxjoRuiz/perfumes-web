"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/types/product";

type ProductFormProps = {
  product?: Product;
};

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const generateSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const uploadProductImage = async (file: File): Promise<string> => {
  const reader = new FileReader();

  const base64 = await new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("No se pudo leer el archivo."));
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });

  const [, encoded] = base64.split(",");
  const fileExtension = file.name.split(".").pop() ?? "jpg";
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}.${fileExtension}`;

  const response = await fetch("/api/products/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: safeName,
      base64: encoded,
      contentType: file.type,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "No se pudo subir la imagen.");
  }

  const data = await response.json();
  return data.url;
};

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    detail: product?.detail ?? "",
    image_url: product?.image_url ?? "",
    price: product?.price.toString() ?? "0",
    stock: product?.stock.toString() ?? "0",
    is_active: product?.is_active ? "true" : "false",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(product?.image_url ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((current) => {
      const nextState = { ...current, [field]: value };

      if (field === "name" && !current.slug.trim()) {
        nextState.slug = generateSlug(value);
      }

      return nextState;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setError(null);

    if (file && !ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("El tipo de archivo no es válido. Usa JPG, PNG o WEBP.");
      setImageFile(null);
      setPreviewUrl(product?.image_url ?? null);
      return;
    }

    if (file && file.size > MAX_IMAGE_SIZE) {
      setError("El archivo es muy grande. El límite es 2 MB.");
      setImageFile(null);
      setPreviewUrl(product?.image_url ?? null);
      return;
    }

    setImageFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setFormState((current) => ({ ...current, image_url: "" }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      let imageUrl = formState.image_url.trim() || null;

      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }

      const payload = {
        name: formState.name.trim(),
        slug: formState.slug.trim(),
        description: formState.description.trim(),
        detail: formState.detail.trim(),
        image_url: imageUrl,
        price: Number(formState.price),
        stock: Number(formState.stock),
        is_active: formState.is_active === "true",
      };

      if (!payload.name || !payload.slug || !payload.description || Number.isNaN(payload.price)) {
        setError("Por favor completa todos los campos obligatorios correctamente.");
        setIsSubmitting(false);
        return;
      }

      const method = product ? "PATCH" : "POST";
      const url = product ? `/api/products/${product.id}` : "/api/products";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || "Error al guardar el producto.");
      }

      router.push("/admin/productos");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nombre"
          value={formState.name}
          onChange={(event) => handleChange("name", event.target.value)}
          required
        />
        <Input
          label="Slug"
          value={formState.slug}
          onChange={(event) => handleChange("slug", event.target.value)}
          required
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="field">
          <span className="field-label">Imagen (URL o archivo)</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="input"
          />
        </label>
        <Input
          label="Imagen URL pública"
          value={formState.image_url}
          onChange={(event) => handleChange("image_url", event.target.value)}
        />
      </div>
      {previewUrl ? (
        <div className="border border-[#e5ddd2] bg-[#f6f3f2] p-4">
          <p className="mb-3 text-sm text-[#44474d]">Vista previa de imagen seleccionada</p>
          <div className="relative h-48 w-full overflow-hidden">
            <Image src={previewUrl} alt="Previsualización de producto" fill className="object-contain" />
          </div>
        </div>
      ) : null}
      <Input
        label="Precio"
        type="number"
        min="0"
        value={formState.price}
        onChange={(event) => handleChange("price", event.target.value)}
        required
      />
      <Input
        label="Stock"
        type="number"
        min="0"
        value={formState.stock}
        onChange={(event) => handleChange("stock", event.target.value)}
        required
      />
      <Textarea
        label="Descripcion corta"
        value={formState.description}
        onChange={(event) => handleChange("description", event.target.value)}
        required
      />
      <Textarea
        label="Detalle completo"
        value={formState.detail ?? ""}
        onChange={(event) => handleChange("detail", event.target.value)}
      />
      <div className="flex flex-wrap items-center gap-6">
        <label className="field flex-1">
          <span className="field-label">Estado</span>
          <select
            className="input"
            value={formState.is_active}
            onChange={(event) => handleChange("is_active", event.target.value)}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </label>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex flex-wrap gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {product ? "Guardar cambios" : "Crear producto"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/productos")}>Cancelar</Button>
      </div>
    </form>
  );
}
