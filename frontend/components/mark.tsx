import Image from "next/image";

export function Mark({
  className = "h-12 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/brand/bassaddict-logo.png"
      alt="Bassaddict"
      width={599}
      height={235}
      priority={priority}
      className={className}
    />
  );
}
