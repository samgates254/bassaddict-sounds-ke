export function LoadingState({
  title = "Getting the workshop catalog.",
}: {
  title?: string;
}) {
  return (
    <div className="glass-panel flex max-w-xl items-center gap-5 px-7 py-8" role="status">
      <span className="size-10 shrink-0 animate-spin rounded-full border-2 border-[#A8FF00]/15 border-t-[#A8FF00]" aria-hidden="true" />
      <div>
        <p className="label">Loading</p>
        <p className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">{title}</p>
      </div>
    </div>
  );
}
