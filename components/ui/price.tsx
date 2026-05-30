type PriceProps = {
  value: number;
  className?: string;
};

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function Price({ value, className }: PriceProps) {
  return <span className={className}>{currencyFormatter.format(value)}</span>;
}
