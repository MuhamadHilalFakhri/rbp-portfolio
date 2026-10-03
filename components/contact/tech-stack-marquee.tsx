import { CHIPS } from "@/components/about/stack-data";
import { LogoMarquee } from "@/components/arc/blocks/logo-marquee/logo-marquee";
import type { LogoMarqueeBrand } from "@/components/arc/blocks/logo-marquee/logo-marquee";

const monochromeBrands = new Set(["nextdotjs", "shadcnui", "github", "vercel", "resend"]);

const brands: LogoMarqueeBrand[] = CHIPS.map((chip) => ({
  name: chip.label,
  icon: `/icons/${chip.slug}.svg`,
  ...(monochromeBrands.has(chip.slug) ? {} : { color: chip.bg }),
}));

export function TechStackMarquee() {
  return (
    <div
      className="mx-auto w-full max-w-275 px-4 min-[360px]:px-6 sm:px-10"
      data-scroll-reveal
    >
      <LogoMarquee brands={brands} tone="color" />
    </div>
  );
}
