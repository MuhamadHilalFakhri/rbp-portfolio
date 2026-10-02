import { ChevronLeft, ChevronRight } from "meya-icons/react/outline";
import type { Project } from "./project-types";

export function CarouselControls({
  items,
  activeIndex,
  canPrev,
  canNext,
  hasInteracted,
  onPrevious,
  onNext,
  onSelect,
}: {
  items: Project[];
  activeIndex: number;
  canPrev: boolean;
  canNext: boolean;
  hasInteracted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-3 sm:gap-5">
        <span
          className="text-foreground/55 shrink-0 text-xs font-medium tabular-nums"
          aria-live="polite"
        >
          <span className="text-foreground">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>{" "}
          / {String(items.length).padStart(2, "0")}
        </span>
        <div
          className="flex min-w-0 flex-1 items-center gap-1.5"
          role="group"
          aria-label="Pilih proyek"
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Tampilkan ${item.iconLabel}`}
              aria-pressed={index === activeIndex}
              className="focus-ring group flex h-11 min-w-0 flex-1 cursor-pointer items-center"
            >
              <span
                className={`h-1 w-full rounded-full transition-all duration-300 ${index === activeIndex ? "bg-foreground" : "bg-foreground/20 group-hover:bg-foreground/45"}`}
              />
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onPrevious}
            disabled={!canPrev}
            aria-label="Proyek sebelumnya"
            className="focus-ring border-foreground/20 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            aria-label="Proyek berikutnya"
            className="focus-ring border-foreground/20 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p
        className={`text-foreground/45 mt-1 text-xs transition-opacity duration-300 ${hasInteracted || items.length < 2 ? "opacity-0" : "opacity-100"}`}
        aria-hidden={hasInteracted || items.length < 2}
      >
        Geser untuk menjelajah
      </p>
    </div>
  );
}
