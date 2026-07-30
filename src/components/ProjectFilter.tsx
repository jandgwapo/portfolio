import { useMemo, useState, type MouseEvent } from 'react';
import type { Project } from '../types';
import { getTechIcon } from '../data/tech-icons';

type Props = {
  projects: Project[];
  categories: string[];
  initialCategory?: string;
};

const imageParams = 'auto=format&fit=crop&w=1000&q=82';

function ProjectImage({ project }: { project: Project }) {
  if (project.liveUrl) {
    return (
      <div className="project-image live-site-preview relative block w-full aspect-[16/10]">
        <iframe
          src={project.liveUrl}
          title={`${project.title} live homepage preview`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="pointer-events-none absolute inset-0 block h-full w-full border-0 bg-[var(--background-raised)]"
        />
        <span className="pointer-events-none absolute bottom-3 left-3 bg-[var(--accent)] px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#020202]">
          Live homepage
        </span>
      </div>
    );
  }

  return (
    <picture className="project-image block aspect-[1.15/1] md:aspect-[1.45/1]">
      <source srcSet={`${project.image}?${imageParams}&fm=avif`} type="image/avif" />
      <source srcSet={`${project.image}?${imageParams}&fm=webp`} type="image/webp" />
      <img
        src={`${project.image}?${imageParams}`}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
        width="1000"
        height="690"
      />
    </picture>
  );
}

function ProjectTools({ tools }: { tools: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
      {tools.map((tool) => {
        const icon = getTechIcon(tool);

        return (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-2.5 py-1 text-[0.65rem] text-[var(--muted)]"
            key={tool}
          >
            {icon && (
              <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill={`#${icon.hex}`} aria-hidden="true">
                <path d={icon.path} />
              </svg>
            )}
            <span>{tool}</span>
          </span>
        );
      })}
    </div>
  );
}

export default function ProjectFilter({ projects, categories, initialCategory = 'All' }: Props) {
  const resolvedInitialCategory =
    categories.find((category) => category.trim().toLowerCase() === initialCategory.trim().toLowerCase()) ??
    categories[0] ??
    'All';
  const [activeCategory, setActiveCategory] = useState(resolvedInitialCategory);
  const filteredProjects = useMemo(() => {
    const normalizedActiveCategory = activeCategory.trim().toLowerCase();

    return normalizedActiveCategory === 'all'
      ? projects
      : projects.filter((project) => project.category.trim().toLowerCase() === normalizedActiveCategory);
  }, [activeCategory, projects]);
  const handleCategoryClick = (event: MouseEvent<HTMLAnchorElement>, category: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    setActiveCategory(category);

    const url = new URL(window.location.href);
    if (category.trim().toLowerCase() === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    window.history.replaceState({}, '', url);
  };

  return (
    <div data-project-filter-root>
      <div className="project-filter__controls mb-10" role="group" aria-label="Filter projects by category">
        <span className="project-filter__label" data-project-filter-label>
          Filter / {activeCategory}
        </span>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <a
                key={category}
                data-project-category={category}
                href={category.trim().toLowerCase() === 'all' ? '/projects' : '/projects?category=' + encodeURIComponent(category)}
                onClick={(event) => handleCategoryClick(event, category)}
                aria-current={isActive ? 'page' : undefined}
                className={`project-filter__button min-h-11 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${isActive ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]' : 'border-[var(--line-strong)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]'}`}
              >
                {category}
              </a>
            );
          })}
        </div>
      </div>
      {filteredProjects.length > 0 ? (
        <div className="project-filter__grid grid gap-x-7 gap-y-14 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <a className="project-link group block" href={`/projects/${project.slug}`} key={project.slug}>
              <ProjectImage project={project} />
              <div className="mt-4 flex items-start justify-between gap-5 border-b border-[var(--line)] pb-5">
                <div>
                  <div
                    data-project-card-category={project.category}
                    className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--muted)]"
                  >
                    <span>{project.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--accent-deep)]" />
                    <span>{project.year}</span>
                  </div>
                  <h2 className="text-[clamp(1.4rem,2.4vw,2.3rem)] font-medium tracking-[-0.065em]">{project.title}</h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
                  <ProjectTools tools={project.tools} />
                </div>
                <span
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-lg transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[#020202]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="surface-card px-6 py-16 text-center">
          <p className="text-lg font-medium">No projects in this category yet.</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Try another filter or come back soon.</p>
        </div>
      )}
      <p className="project-filter__result mt-8 text-xs text-[var(--muted)]" aria-live="polite" data-project-filter-result>
        Showing {filteredProjects.length} of {projects.length} projects
      </p>
    </div>
  );
}
