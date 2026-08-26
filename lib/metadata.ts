import type { Metadata } from "next";

export const siteConfig = {
  name: "Muhamad Hilal Fakhri",
  description:
    "Portfolio of Muhamad Hilal Fakhri, a Software Developer & AI enthusiast focused on building structured, efficient, responsive, and user-centered applications.",
  url: "https://www.muhamadhilalf.my.id",
  creator: "Muhamad Hilal Fakhri",
  authors: [
    {
      name: "Muhamad Hilal Fakhri",
      url: "https://www.muhamadhilalf.my.id",
    },
  ],
  keywords: [
    "portfolio",
    "personal site",
    "Muhamad Hilal Fakhri",
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Software Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | Software Developer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Software Developer`,
    description: siteConfig.description,
    creator: siteConfig.creator,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
    },
    twitter: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
