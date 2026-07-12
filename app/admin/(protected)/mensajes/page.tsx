import { getContactMessages } from "@/lib/messages";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <section className="space-y-8">
      <div className="border border-[#e5ddd2] bg-[#fcf9f8] p-6 sm:p-8">
        <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#735c00]">
          Bandeja privada
        </p>
        <h1 className="max-w-[14ch] font-display text-[clamp(2.4rem,4vw,3.8rem)] font-bold leading-[0.96] tracking-[-0.04em] text-black">
          Mensajes
        </h1>
        <p className="mt-5 max-w-[46ch] text-[15px] leading-8 text-[#44474d]">
          Mensajes enviados desde el formulario de contacto de la tienda.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="border border-[#e5ddd2] bg-[#fcf9f8] p-10 text-center text-[#44474d]">
          <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#735c00]">
            Bandeja vacía
          </p>
          <p className="m-0 text-sm leading-7">
            Todavía no hay mensajes de contacto.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <div key={message.id} className="border border-[#e5ddd2] bg-[#fcf9f8] p-6">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <p className="m-0 font-display text-lg font-semibold text-black">{message.name}</p>
                <p className="m-0 text-xs uppercase tracking-[0.18em] text-[#735c00]">
                  {dateFormatter.format(new Date(message.created_at))}
                </p>
              </div>
              <a
                href={`mailto:${message.email}`}
                className="mb-4 inline-block text-sm font-semibold text-[#735c00] underline"
              >
                {message.email}
              </a>
              <p className="m-0 whitespace-pre-wrap text-sm leading-7 text-[#44474d]">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
