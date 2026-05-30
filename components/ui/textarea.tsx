import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ className, label, ...props }: TextareaProps) {
  return (
    <label className="field">
      {label ? <span className="field-label">{label}</span> : null}
      <textarea className={cn("textarea", className)} {...props} />
    </label>
  );
}
