import {
  siAstro,
  siCss,
  siFlutter,
  siGsap,
  siLaravel,
  siMysql,
  siOpenapiinitiative,
  siPhp,
  siReact,
  siSupabase,
  siTailwindcss,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const techIcons: Record<string, SimpleIcon> = {
  'Vanilla PHP': siPhp,
  PHP: siPhp,
  CSS: siCss,
  Flutter: siFlutter,
  Laravel: siLaravel,
  'Tailwind CSS': siTailwindcss,
  React: siReact,
  Astro: siAstro,
  MySQL: siMysql,
  Supabase: siSupabase,
  GSAP: siGsap,
  'REST APIs': siOpenapiinitiative,
};

export function getTechIcon(tool: string) {
  return techIcons[tool];
}
