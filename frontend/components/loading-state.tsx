export function LoadingState({
  title = "Getting the workshop catalog.",
}: {
  title?: string;
}) {
  return (
    <div className="border border-line bg-panel px-5 py-8" role="status">
      <p className="label">Loading</p>
      <p className="mt-3 font-display text-3xl tracking-wide">{title}</p>
    </div>
  );
}
