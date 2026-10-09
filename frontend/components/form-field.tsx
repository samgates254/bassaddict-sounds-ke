import type { ReactNode } from "react";

export function FormField({
  label,
  children,
  error,
  className = "",
}: {
  label: string;
  children: ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <label className={className ? `field ${className}` : "field"}>
      <span className="label pl-1">{label}</span>
      {children}
      {error ? (
        <span className="text-sm text-ember" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
