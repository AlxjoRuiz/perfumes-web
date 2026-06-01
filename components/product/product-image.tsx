import Image from "next/image";

type ProductImageProps = {
  src?: string | null;
  alt: string;
};

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="aspect-[4/5] w-full overflow-hidden bg-[#ece1ce]">
      {src ? (
        <div className="relative h-full w-full">
          <Image src={src} alt={alt} fill className="object-contain p-5 transition-transform duration-700" />
        </div>
      ) : (
        <div className="grid h-full min-h-[320px] place-items-center" aria-hidden="true">
          <span className="h-[88px] w-[88px] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_70%)] shadow-[0_0_0_24px_rgba(212,175,55,0.1)]" />
        </div>
      )}
    </div>
  );
}
