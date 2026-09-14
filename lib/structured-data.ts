import { siteConfig } from "./metadata";

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

type StructuredDataEntry = {
  "@type": string;
  [key: string]: unknown;
};

export function getStructuredData({
  includeProfilePage = false,
}: {
  includeProfilePage?: boolean;
} = {}): { "@context": string; "@graph": StructuredDataEntry[] } {
  const graph: StructuredDataEntry[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": personId },
      inLanguage: "id-ID",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "Web Developer & AI Enthusiast",
      description: siteConfig.description,
      image: `${siteConfig.url}/hilal-navy.webp`,
      email: "mailto:muhamadhilal04@gmail.com",
      sameAs: [
        "https://github.com/MuhamadHilalFakhri",
        "https://linkedin.com/in/muhamad-hilal-fakhri",
        "https://www.instagram.com/muhamadhilalf/",
      ],
    },
  ];

  if (includeProfilePage) {
    graph.push({
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#profilepage`,
      url: siteConfig.url,
      name: `${siteConfig.name} | Web Developer & AI Enthusiast`,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      inLanguage: "id-ID",
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
