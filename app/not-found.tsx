import Link from "next/link";
import type { ReactNode } from "react";

export default function NotFound(): ReactNode {
  return (
    <main
      id="main-content"
      className="flex min-h-dvh items-center justify-center px-6 py-28"
    >
      <div className="flex max-w-md flex-col items-center text-center">
        <p className="text-foreground/55 text-sm font-medium">404</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="text-foreground/65 mt-4 leading-relaxed">
          The page you requested does not exist or may have moved.
        </p>
        <Link
          href="/"
          className="focus-ring bg-foreground text-background mt-7 inline-flex rounded-xl px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
