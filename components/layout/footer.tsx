const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "573000000000";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="site-footer-title">Perfumes</p>
        <p className="site-footer-text">
          Tienda web de perfumes pensada para una experiencia elegante, rapida
          y clara.
        </p>
      </div>

      <div className="site-footer-links">
        <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="mailto:hola@perfumes.com">hola@perfumes.com</a>
      </div>
    </footer>
  );
}
