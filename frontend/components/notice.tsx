import type { ReactNode } from "react";

export function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="glass-panel px-7 py-8 sm:px-9">
      <h2 className="font-display text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 max-w-xl leading-7 text-mute">{children}</div>
    </div>
  );
}
