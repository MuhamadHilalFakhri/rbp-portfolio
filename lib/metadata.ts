import type { Metadata } from "next";

export const siteConfig = {
  name: "Muhamad Hilal Fakhri",
  description:
    "Portfolio of Muhamad Hilal Fakhri, a Web Developer & AI enthusiast focused on building structured, efficient, responsive, and user-centered applications.",
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

// Use the supplied hero render as the canonical social preview image.
const socialImagePath = "/image.png";
const socialImageAlt = `${siteConfig.name} portfolio homepage preview`;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Web Developer`,
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
    canonical: new URL("/", siteConfig.url).href,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | Web Developer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: socialImagePath,
        width: 1897,
        height: 822,
        alt: socialImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Web Developer`,
    description: siteConfig.description,
    images: [
      {
        url: socialImagePath,
        width: 1897,
        height: 822,
        alt: socialImageAlt,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/icon-192.png",
    apple: { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
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
  const url = new URL(path, siteConfig.url).href;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: socialImagePath,
          width: 1897,
          height: 822,
          alt: socialImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      images: [
        {
          url: socialImagePath,
          width: 1897,
          height: 822,
          alt: socialImageAlt,
        },
      ],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
