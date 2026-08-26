import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedSection({
  children,
  className = "",
}: AnimatedSectionProps): ReactNode {
  return (
    <div className={className} data-scroll-reveal>
      {children}
    </div>
  );
}
