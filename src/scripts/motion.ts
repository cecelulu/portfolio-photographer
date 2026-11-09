// Animations du site (GSAP + ScrollTrigger).
//
// Identité de mouvement :
//  - une courbe signature : « power3.out » (décélération douce), « expo.out » pour l'accueil
//  - trois durées : 0,18 s (survol, en CSS), 0,6 s (apparitions), 1,2 s (accueil)
//  - une seule entrée : fondu + montée de 24 px, décalage de 0,08 s entre éléments (< 0,4 s au total)
//
// Tout est désactivé si le visiteur a demandé à réduire les animations : le contenu reste
// alors affiché normalement (la classe `motion` n'est jamais posée sur <html>).

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';
const STANDARD = 0.6;
const RISE = 24;

/** Éléments révélés au défilement — doit correspondre à la liste CSS de global.css. */
export const REVEAL_SELECTOR = [
  '.section-head',
  '.grid > *',
  '.steps__item',
  '.stat',
  '.review',
  '.reviews__summary',
  '.faq__item',
  '.timeline > li',
  '[data-reveal]',
].join(',');

function studioIntro(hero: HTMLElement) {
  const title = hero.querySelector('.hero__title');
  const car = hero.querySelector('.hero__car');
  const panel = hero.querySelector('.hero__panel');
  const rest = hero.querySelectorAll('.hero__intro > *, .hero__scroll');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (title) tl.fromTo(title, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0);
  if (car) tl.fromTo(car, { autoAlpha: 0, x: 80 }, { autoAlpha: 1, x: 0, duration: 1.5, ease: 'power3.out' }, 0.15);
  if (panel) tl.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9 }, 0.6); // fondu seul : le panneau est centré en CSS (translateY)
  if (rest.length) tl.fromTo(rest, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.75);
}

function heroIntro() {
  const hero = document.querySelector<HTMLElement>('.hero, .page-hero');
  if (!hero) return;
  if (hero.classList.contains('hero--studio')) return studioIntro(hero);
  const img = hero.querySelector<HTMLElement>('.hero__img, .page-hero__img');
  const text = hero.querySelectorAll<HTMLElement>(
    '.breadcrumb, .eyebrow, h1, .hero__lead, .page-hero__lead, .hero__ctas, .hero-specs, .hero-ctas, .facts, .ctas'
  );
  const finder = hero.querySelector<HTMLElement>('.finder');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (img) tl.fromTo(img, { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1.4 }, 0);
  if (text.length) tl.fromTo(text, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07 }, 0.1);
  if (finder) tl.fromTo(finder, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 1.2 }, 0.35);

}

function scrollReveals() {
  const hero = document.querySelector('.hero, .page-hero');
  const targets = gsap.utils
    .toArray<HTMLElement>(REVEAL_SELECTOR)
    .filter((el) => !hero?.contains(el) && !el.parentElement?.closest(REVEAL_SELECTOR));

  gsap.set(targets, { autoAlpha: 0, y: RISE });

  ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    interval: 0.08,
    batchMax: 6,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: STANDARD,
        ease: EASE,
        stagger: 0.08,
        overwrite: true,
        clearProps: 'transform',
      }),
  });

  // Les éléments filtrés (page « Nos stages ») doivent rester visibles quand on les réaffiche.
  document.querySelectorAll('[data-filter]').forEach((btn) =>
    btn.addEventListener('click', () => {
      requestAnimationFrame(() => {
        const shown = targets.filter((el) => !el.hidden && el.offsetParent !== null);
        gsap.fromTo(shown, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: EASE, stagger: 0.03, overwrite: true });
        ScrollTrigger.refresh();
      });
    })
  );
}

/** Compteurs des chiffres clés : « 450 », « 8,6/10 », « 70 000 »… */
function counters() {
  const restore: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>('.stat__value, .reasons__value, .reviews__score').forEach((el) => {
    const original = el.textContent?.trim() ?? '';
    const match = original.match(/^(\D*?)(\d+(?:[\s ]\d{3})*(?:,\d+)?)(.*)$/);
    if (!match) return;
    const [, prefix, raw, suffix] = match;
    const target = Number(raw.replace(/[\s ]/g, '').replace(',', '.'));
    if (!Number.isFinite(target) || target < 2) return;
    const decimals = raw.includes(',') ? raw.split(',')[1].length : 0;
    const grouped = /[\s ]/.test(raw);

    const format = (n: number) => {
      const s = n.toLocaleString('fr-FR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      });
      return `${prefix}${s}${suffix}`;
    };

    restore.push(() => (el.textContent = original));
    const state = { v: 0 };
    el.textContent = format(0);
    gsap.to(state, {
      v: target,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = format(decimals ? state.v : Math.round(state.v))),
      onComplete: () => (el.textContent = original),
    });
  });
  return () => restore.forEach((fn) => fn());
}

export function initMotion() {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    heroIntro();
    scrollReveals();
    const restoreCounters = counters();
    // Les polices et images peuvent décaler la mise en page : on recalcule une fois tout chargé.
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    return () => restoreCounters();
  });
  document.documentElement.classList.add('motion-ready');
}
