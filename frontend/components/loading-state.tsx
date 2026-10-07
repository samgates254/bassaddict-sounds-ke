export function LoadingState({
  title = "Getting the workshop catalog.",
}: {
  title?: string;
}) {
  return (
    <div className="max-w-xl border-l border-white/15 py-2 pl-6" role="status">
      <p className="label">Loading</p>
      <p className="mt-3 font-display text-3xl tracking-wide">{title}</p>
    </div>
  );
}
