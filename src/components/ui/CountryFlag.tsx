import { cn } from "@/utils/tailwind";
import Image from "next/image";

interface CountryFlagProps {
  countryCode: string;
  countryName?: string;
  className?: string;
  size?: "w20" | "w40" | "w80" | "w160";
}

const FLAG_DIMENSIONS: Record<string, { width: number; height: number }> = {
  w20: { width: 20, height: 15 },
  w40: { width: 40, height: 30 },
  w80: { width: 80, height: 60 },
  w160: { width: 160, height: 120 },
};

/**
 * Renders a country flag using flagcdn.com CDN images.
 * Zero bundle impact — flags are loaded as external images with lazy loading.
 */
export function CountryFlag({
  countryCode,
  countryName,
  className,
  size = "w20",
}: CountryFlagProps) {
  const code = countryCode.toLowerCase();

  if (code === "unknown" || !code) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center bg-muted text-muted-foreground rounded-sm font-power-ultra text-[10px]",
          className,
        )}
      >
        ??
      </span>
    );
  }

  const { width, height } = FLAG_DIMENSIONS[size];

  return (
    <Image
      src={`https://flagcdn.com/${size}/${code}.png`}
      alt={countryName ?? code.toUpperCase()}
      width={width}
      height={height}
      loading="lazy"
      className={cn(
        "inline-block rounded-[2px] shrink-0 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] object-cover",
        className,
      )}
    />
  );
}
