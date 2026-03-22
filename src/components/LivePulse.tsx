"use client";

export function LivePulse({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  return (
    <span className="relative inline-flex">
      <span
        className={`${sizes[size]} rounded-full bg-red`}
      />
      <span
        className={`absolute ${sizes[size]} rounded-full bg-red animate-pulse-live`}
      />
    </span>
  );
}
