/**
 * Adapted from Kokonut UI Dynamic Text.
 * The animation is CSS-driven so it does not require per-frame React updates.
 */

import type { CSSProperties, ReactNode } from "react";

const GREETINGS = [
  "Hello",
  "こんにちは",
  "Bonjour",
  "Hola",
  "안녕하세요",
  "Ciao",
  "Hallo",
  "こんにちは",
];

export default function DynamicText(): ReactNode {
  return (
    <section
      className="dynamic-text"
      aria-label="Greetings in different languages"
    >
      <div className="dynamic-text__viewport">
        {GREETINGS.map((greeting, index) => (
          <span
            key={`${greeting}-${index}`}
            className="dynamic-text__item"
            style={
              {
                animationDelay: `${900 + index * 260}ms`,
              } as CSSProperties
            }
          >
            <span className="dynamic-text__dot" aria-hidden="true" />
            {greeting}
          </span>
        ))}
      </div>
    </section>
  );
}
