type ProductImageProps = {
  src?: string | null;
  alt: string;
};

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="product-image">
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="product-image-fallback" aria-hidden="true">
          <span />
        </div>
      )}
    </div>
  );
}
