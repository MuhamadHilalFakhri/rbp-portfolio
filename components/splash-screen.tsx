import type { ReactNode } from "react";

export function SplashScreen(): ReactNode {
  return (
    <div className="splash-screen" aria-hidden="true">
      <div className="splash-screen__content">
        <div className="splash-screen__loader">
          <span />
          <span />
          <span />
        </div>
        <p>Muhamad Hilal Fakhri</p>
      </div>
    </div>
  );
}
