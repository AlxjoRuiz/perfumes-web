import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, label, ...props }: InputProps) {
  return (
    <label className="field">
      {label ? <span className="field-label">{label}</span> : null}
      <input className={cn("input", className)} {...props} />
    </label>
  );
}
