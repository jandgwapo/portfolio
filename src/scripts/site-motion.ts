import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

let booted = false;
let cleanupMotion: (() => void) | undefined;
let cleanupInteractiveDot: (() => void) | undefined;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function mountInteractiveDot() {
  cleanupInteractiveDot?.();

  const dot = document.querySelector<HTMLElement>('.home-hero__cursor-dot');
  const hero = dot?.closest<HTMLElement>('.home-hero');

  if (!dot || !hero || prefersReducedMotion()) return;

  let lastNudge = 0;
  const nudge = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const now = Date.now();
    if (now - lastNudge < 240) return;

    lastNudge = now;
    const bounds = hero.getBoundingClientRect();
    const horizontalRange = Math.min(150, bounds.width * 0.18);
    const verticalRange = Math.min(110, bounds.height * 0.1);
    const x = (Math.random() - 0.5) * horizontalRange;
    const y = (Math.random() - 0.5) * verticalRange;

    dot.style.setProperty('--dot-x', x + 'px');
    dot.style.setProperty('--dot-y', y + 'px');
  };

  dot.addEventListener('pointerenter', nudge);
  dot.addEventListener('pointermove', nudge);
  cleanupInteractiveDot = () => {
    dot.removeEventListener('pointerenter', nudge);
    dot.removeEventListener('pointermove', nudge);
    dot.style.removeProperty('--dot-x');
    dot.style.removeProperty('--dot-y');
  };
}

function handleAnchorClick(event: MouseEvent) {
  if (prefersReducedMotion()) return;

  const origin = event.target instanceof Element ? event.target : null;
  const link = origin?.closest<HTMLAnchorElement>('a[href*="#"]');
  const url = link ? new URL(link.href, window.location.href) : null;
  const hash = url?.hash;
  const target =
    url?.origin === window.location.origin && url.pathname === window.location.pathname && hash
      ? document.querySelector<HTMLElement>(hash)
      : null;

  if (!link || !target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  window.history.pushState({}, '', hash);
  gsap.to(window, {
    duration: 1.05,
    ease: 'power3.inOut',
    overwrite: 'auto',
    scrollTo: { offsetY: 24, y: target },
  });
}

function mountMotion() {
  cleanupMotion?.();

  const root = document.querySelector<HTMLElement>('#main-content');
  if (!root) return;

  if (prefersReducedMotion()) {
    gsap.set(root, { clearProps: 'all' });
    return;
  }

  mountInteractiveDot();

  const context = gsap.context(() => {
    const sections = gsap.utils.toArray<HTMLElement>('#main-content section.container-shell');
    const cards = gsap.utils.toArray<HTMLElement>('#main-content .surface-card');
    const labels = gsap.utils.toArray<HTMLElement>('#main-content .section-label');
    const links = gsap.utils.toArray<HTMLElement>('#main-content .project-link');
    const buttons = gsap.utils.toArray<HTMLElement>('#main-content .button-primary, #main-content .button-secondary');

    gsap.fromTo(root, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, duration: 0.65, ease: 'power3.out', y: 0 });

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            once: true,
            start: index === 0 ? 'top 96%' : 'top 84%',
            trigger: section,
          },
          y: 0,
        },
      );
    });

    labels.forEach((label) => {
      gsap.fromTo(
        label,
        { autoAlpha: 0, x: -10 },
        {
          autoAlpha: 1,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            once: true,
            start: 'top 88%',
            trigger: label,
          },
          x: 0,
        },
      );
    });

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            once: true,
            start: 'top 88%',
            trigger: card,
          },
          y: 0,
        },
      );
    });

    const heroHeading = root.querySelector<HTMLElement>('h1, .display');
    if (heroHeading) {
      gsap.to(heroHeading, {
        ease: 'none',
        scrollTrigger: {
          end: '+=260',
          scrub: 1,
          start: 'top top',
          trigger: heroHeading,
        },
        y: -34,
      });
    }

    links.forEach((link) => {
      const visual = link.querySelector<HTMLElement>('.project-image');
      const arrow = link.querySelector<HTMLElement>('[aria-hidden="true"]');
      if (!visual) return;

      const onEnter = () => {
        gsap.to(visual, { duration: 0.45, ease: 'power2.out', y: -5 });
        if (arrow) gsap.to(arrow, { duration: 0.35, ease: 'power2.out', rotation: 6, x: 3, y: -3 });
      };
      const onLeave = () => {
        gsap.to(visual, { duration: 0.45, ease: 'power2.out', y: 0 });
        if (arrow) gsap.to(arrow, { duration: 0.35, ease: 'power2.out', rotation: 0, x: 0, y: 0 });
      };

      link.addEventListener('mouseenter', onEnter);
      link.addEventListener('mouseleave', onLeave);
    });

    buttons.forEach((button) => {
      const onEnter = () => gsap.to(button, { duration: 0.25, ease: 'power2.out', y: -3 });
      const onLeave = () => gsap.to(button, { duration: 0.25, ease: 'power2.out', y: 0 });

      button.addEventListener('mouseenter', onEnter);
      button.addEventListener('mouseleave', onLeave);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, root);

  cleanupMotion = () => {
    context.revert();
    cleanupInteractiveDot?.();
  };
}

export function initSiteMotion() {
  if (booted) return;
  booted = true;

  document.addEventListener('click', handleAnchorClick);
  document.addEventListener('astro:before-swap', () => cleanupMotion?.());
  document.addEventListener('astro:page-load', mountMotion);
  mountMotion();
}
