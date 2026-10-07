import type { ReactNode } from "react";

export function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-line bg-panel px-5 py-8">
      <h2 className="font-display text-3xl tracking-wide">{title}</h2>
      <div className="mt-3 max-w-xl text-mute">{children}</div>
    </div>
  );
}
