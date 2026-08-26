import type { ReactNode } from "react";

import DynamicText from "@/components/kokonutui/dynamic-text";

export function SplashScreen(): ReactNode {
  return (
    <div className="splash-screen" aria-hidden="true">
      <div className="splash-screen__content">
        <div className="splash-screen__loader-stage">
          <div className="splash-screen__loader">
            <span />
            <span />
            <span />
          </div>
          <p>Muhamad Hilal Fakhri</p>
        </div>
        <DynamicText />
      </div>
    </div>
  );
}
