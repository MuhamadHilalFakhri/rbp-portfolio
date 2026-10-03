"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./logo-marquee.module.css";

export interface LogoMarqueeBrand {
  name: string;
  /** Monochrome SVG, drawn as a mask in the text color. */
  icon: string;
  /** Single brand color for the mark in color tone. Leave out for brands whose mark is black or white. */
  color?: string;
  /** Full color SVG for multicolor marks, used in color tone instead of `icon`. */
  colorIcon?: string;
}

export type LogoMarqueeTone = "color" | "mono";

export interface LogoMarqueeProps {
  title?: string;
  description?: string;
  brands?: LogoMarqueeBrand[];
  /** `color` shows each mark in its official colors; `mono` draws every mark in the text color. */
  tone?: LogoMarqueeTone;
}

function BrandMark({ brand, tone }: { brand: LogoMarqueeBrand; tone: LogoMarqueeTone }) {
  if (tone === "color" && brand.colorIcon) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={styles.brandMark} src={brand.colorIcon} alt="" width={22} height={22} draggable={false} />;
  }
  return (
    <span
      className={styles.brandMark}
      style={{ maskImage: `url("${brand.icon}")`, WebkitMaskImage: `url("${brand.icon}")`, color: tone === "color" ? brand.color : undefined }}
      aria-hidden="true"
    />
  );
}

function BrandList({ brands, tone, duplicate = false }: { brands: LogoMarqueeBrand[]; tone: LogoMarqueeTone; duplicate?: boolean }) {
  return (
    <ul className={styles.brandList} aria-label={duplicate ? undefined : "Technology stack logos"} aria-hidden={duplicate || undefined}>
      {brands.map((brand, index) => (
        <li className={styles.brand} key={`${brand.name}-${index}`}>
          <BrandMark brand={brand} tone={tone} />
          <span className={styles.brandName}>{brand.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee({
  title,
  description,
  brands = [],
  tone = "color",
}: LogoMarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <section className={styles.section} data-tone={tone} aria-label={title || "Technology stack"}>
      {title || description ? (
        <div className={styles.intro}>
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      ) : null}

      <div className={styles.marquee} role="region" aria-label="Technology stack logos">
        <div className={`${styles.track}${paused ? ` ${styles.paused}` : ""}`}>
          <BrandList brands={brands} tone={tone} />
          <BrandList brands={brands} tone={tone} duplicate />
        </div>
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.motionButton}
          aria-label={paused ? "Resume technology logos" : "Pause technology logos"}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <><Play size={14} strokeWidth={1.75} aria-hidden="true" />Play</> : <><Pause size={14} strokeWidth={1.75} aria-hidden="true" />Pause</>}
        </button>
        <span className={styles.motionStatus} aria-live="polite">
          {paused ? "Motion paused" : ""}
        </span>
      </div>
    </section>
  );
}

export default LogoMarquee;
