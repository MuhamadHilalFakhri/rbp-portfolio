import Image from "next/image";
import type { ReactNode } from "react";
import { CHIP_RADIUS, ICON_RADIUS, type Chip } from "./stack-data";

export function ChipPill({ chip }: { chip: Chip }): ReactNode {
  return (
    <div
      className="inline-flex items-center gap-1.5 p-1 pr-2 text-[13px] font-medium tracking-tight sm:gap-2 sm:text-[16px] dark:ring-1 dark:ring-white/15"
      style={{
        backgroundColor: chip.bg,
        color: chip.fg,
        borderRadius: `${CHIP_RADIUS}px`,
      }}
    >
      <span
        className="inline-flex h-7 w-7 items-center justify-center bg-white/95 sm:h-8 sm:w-8"
        style={{ borderRadius: `${ICON_RADIUS}px` }}
        aria-hidden="true"
      >
        <Image
          src={`/icons/${chip.slug}.svg`}
          alt=""
          width={18}
          height={18}
          unoptimized
          loading="lazy"
          className="h-4 w-4 sm:h-5 sm:w-5"
          draggable={false}
        />
      </span>
      <span>{chip.label}</span>
    </div>
  );
}
