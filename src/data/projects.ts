import type { Project } from '../types';

const imageBase = 'https://images.unsplash.com/';

export const projects: Project[] = [
  {
    slug: 'e-valuation',
    number: '01',
    title: 'E-Valuation',
    shortTitle: 'E-Valuation',
    description: 'A cross-platform web and mobile Latin honor evaluation system created for our capstone project.',
    category: 'Cross-Platform',
    year: 'Capstone',
    role: 'Cross-Platform App Development',
    tools: ['Flutter', 'Supabase'],
    featured: true,
    image: `${imageBase}photo-1552664730-d307ca884978`,
    imageAlt: 'Team collaborating around a laptop during a project review',
    accent: '#0c9549',
    liveUrl: 'https://e-valuation.netlify.app/',
  },
  {
    slug: 'prms-matalom',
    number: '02',
    title: 'PRMS Matalom',
    shortTitle: 'PRMS Matalom',
    description: 'A parish records management and information website for St. Joseph Parish in Matalom, Leyte.',
    category: 'Web',
    year: 'Live',
    role: 'Full-Stack Web Development',
    tools: ['Vanilla PHP', 'CSS', 'MySQL'],
    featured: true,
    image: `${imageBase}photo-1600607687920-4e2a09cf159d`,
    imageAlt: 'Quiet church interior with warm light and wooden details',
    accent: '#17db66',
    liveUrl: 'https://prmsmatalom.com',
  },
  {
    slug: 'aura-home',
    number: '03',
    title: 'Aura Home + Lifestyle',
    shortTitle: 'Aura Home + Lifestyle',
    description:
      'A responsive home and lifestyle web experience designed to make browsing feel simple on every screen.',
    category: 'Web',
    year: 'Live',
    role: 'Web Development, Responsive UI',
    tools: ['PHP', 'Laravel', 'Tailwind CSS', 'GSAP', 'MySQL'],
    featured: true,
    image: `${imageBase}photo-1558655146-d09347e92766`,
    imageAlt: 'Modern home interior with a clean table and warm neutral details',
    accent: '#04481c',
    liveUrl: 'https://aurahome.com.ph',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const categories = ['All', ...new Set(projects.map((project) => project.category))];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
