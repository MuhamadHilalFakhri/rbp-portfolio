import type { ComponentType } from "react";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectVideo = {
  src: string;
  poster: ProjectImage;
};

export type ProjectTech = {
  label: string;
  slug: string;
  invertInDark?: boolean;
};

export type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  githubUrl?: string;
  websiteUrl?: string;
  githubPrivate?: boolean;
  overview: string;
  highlights: string[];
  images: ProjectImage[];
  video?: ProjectVideo;
  imageRatio: number;
  techStack: ProjectTech[];
};
