export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 24 L16 6 L28 24" fill="none" stroke="#E23D2B" strokeWidth="2" />
      <circle cx="16" cy="19" r="3.2" fill="none" stroke="#F4F1EA" strokeWidth="1.4" />
    </svg>
  );
}
