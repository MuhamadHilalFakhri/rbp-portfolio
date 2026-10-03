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
  return <LogoMarquee brands={brands} tone="color" />;
}
