export type ProjectCategory = 'Web' | 'Mobile' | 'Full-stack' | 'Cross-Platform';

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  category: ProjectCategory;
  year: string;
  role: string;
  tools: string[];
  featured: boolean;
  image: string;
  imageAlt: string;
  accent: string;
  liveUrl?: string;
};
