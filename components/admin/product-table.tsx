"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import type { Product } from "@/types/product";

type AdminProductTableProps = {
  products: Product[];
};

export function AdminProductTable({ products }: AdminProductTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("¿Estás seguro que quieres eliminar este producto?");
    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setErrorMessage(null);

    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setErrorMessage("No se pudo eliminar el producto. Intenta de nuevo.");
      setDeletingId(null);
      return;
    }

    router.refresh();
  };

  if (products.length === 0) {
    return (
      <div className="rounded-[24px] border border-[#e5ddd2] bg-[#fcf9f8] p-10 text-center text-[#44474d]">
        No hay productos registrados. Crea un producto nuevo para comenzar.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#e5ddd2] bg-[#fcf9f8] shadow-[0_18px_35px_rgba(81,95,120,0.06)]">
      {errorMessage ? (
        <div className="border-b border-[#d8c39a] bg-[#fff1e1] px-4 py-3 text-sm text-[#b84a2a]">
          {errorMessage}
        </div>
      ) : null}
      <table className="w-full border-collapse text-left">
        <thead className="bg-[#f6f3f2]">
          <tr>
            <th className="border-b border-[#d8c39a] px-4 py-4 text-sm uppercase tracking-[0.18em] text-[#735c00]">Nombre</th>
            <th className="border-b border-[#d8c39a] px-4 py-4 text-sm uppercase tracking-[0.18em] text-[#735c00]">Precio</th>
            <th className="border-b border-[#d8c39a] px-4 py-4 text-sm uppercase tracking-[0.18em] text-[#735c00]">Stock</th>
            <th className="border-b border-[#d8c39a] px-4 py-4 text-sm uppercase tracking-[0.18em] text-[#735c00]">Estado</th>
            <th className="border-b border-[#d8c39a] px-4 py-4 text-sm uppercase tracking-[0.18em] text-[#735c00]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-[#e5ddd2] last:border-none">
              <td className="px-4 py-4 text-sm text-[#1b1c1c]">{product.name}</td>
              <td className="px-4 py-4 text-sm text-[#44474d]">
                <Price value={product.price} />
              </td>
              <td className="px-4 py-4 text-sm text-[#44474d]">{product.stock}</td>
              <td className="px-4 py-4 text-sm text-[#44474d]">{product.is_active ? "Activo" : "Inactivo"}</td>
              <td className="flex flex-wrap gap-2 px-4 py-4 text-sm text-[#735c00]">
                <Link href={`/admin/productos/${product.id}/editar`} className="font-semibold underline">
                  Editar
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-sm"
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                >
                  {deletingId === product.id ? "Eliminando..." : "Eliminar"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
