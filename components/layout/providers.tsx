"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, type ReactNode } from "react";

const THEME_COLORS = {
  dark: "#0a0a0a",
  light: "#ffffff",
} as const;

function ThemeColorSync(): null {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );

    if (!themeColor) return;

    themeColor.content =
      resolvedTheme === "light" ? THEME_COLORS.light : THEME_COLORS.dark;
  }, [resolvedTheme]);

  return null;
}

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeColorSync />
      {children}
    </ThemeProvider>
  );
}
