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

function posterIntro(hero: HTMLElement) {
  const title = hero.querySelector('.poster__title');
  const car = hero.querySelector('.poster__car');
  const shadow = hero.querySelector('.poster__reflection');
  const rest = hero.querySelectorAll('.poster__eyebrow, .poster__pitch > *, .poster__card');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (title) tl.fromTo(title, { autoAlpha: 0, yPercent: 35 }, { autoAlpha: 1, yPercent: 0, duration: 1.2 }, 0);
  if (car) tl.fromTo(car, { autoAlpha: 0, xPercent: 28 }, { autoAlpha: 1, xPercent: 0, duration: 1.4, ease: 'power4.out' }, 0.25);
  if (shadow) tl.fromTo(shadow, { autoAlpha: 0, xPercent: 28 }, { autoAlpha: 0.14, xPercent: 0, duration: 1.4, ease: 'power4.out' }, 0.25);
  if (rest.length) tl.fromTo(rest, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.7);

  // Au défilement (grands écrans) : la voiture « avance » vers la gauche, le titre glisse en sens inverse.
  if (window.matchMedia('(min-width: 701px)').matches) {
    const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    if (car) gsap.to([car, shadow], { x: -90, ease: 'none', scrollTrigger: { ...st } });
    if (title) gsap.to(title, { x: 40, ease: 'none', scrollTrigger: { ...st } });
  }
}

function heroIntro() {
  const hero = document.querySelector<HTMLElement>('.hero, .page-hero');
  if (!hero) return;
  if (hero.classList.contains('poster')) return posterIntro(hero);
  const img = hero.querySelector<HTMLElement>('.hero__img, .page-hero__img');
  const text = hero.querySelectorAll<HTMLElement>(
    '.breadcrumb, .eyebrow, h1, .hero__lead, .page-hero .container > p:not(.eyebrow), .hero__ctas, .hero-specs, .hero-ctas, .facts, .ctas'
  );
  const finder = hero.querySelector<HTMLElement>('.finder');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6 }, 0);
  if (text.length) tl.fromTo(text, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.1);
  if (finder) tl.fromTo(finder, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 1.2 }, 0.35);

  // Couche d'ambiance : légère profondeur de la photo au défilement (grands écrans seulement :
  // sur téléphone la photo est une bande au-dessus du texte).
  if (img && window.matchMedia('(min-width: 701px)').matches) {
    gsap.to(img, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
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
