import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function AnimatedSection({
  children,
  className = "",
  id,
}: AnimatedSectionProps): ReactNode {
  return (
    <div id={id} className={className} data-scroll-reveal>
      {children}
    </div>
  );
}
