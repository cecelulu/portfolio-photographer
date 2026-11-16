// Animations du site (GSAP + ScrollTrigger, défilement doux avec Lenis).
//
// Identité de mouvement :
//  - une courbe signature : « power3.out » (décélération douce), « expo.out » pour les grands visuels
//  - trois durées : 0,2–0,4 s (survols, en CSS), 0,6 s (apparitions), 1,1–1,8 s (accueil)
//  - une entrée commune : fondu + montée de 24 px, décalage de 0,08 s entre éléments
//  - des éléments « vivants » très discrets : pastilles et carte vidéo qui flottent de quelques pixels
//
// Tout est désactivé si le visiteur a demandé à réduire les animations : le contenu reste
// alors affiché normalement (la classe `motion` n'est jamais posée sur <html>).

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

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
  '[data-stagger] > *',
].join(',');

/** Défilement doux (ordinateur uniquement), synchronisé avec ScrollTrigger. */
function smoothScroll() {
  if (!window.matchMedia('(pointer: fine) and (min-width: 901px)').matches) return () => {};
  const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3.2), wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Liens internes (#prestations…) : on glisse jusqu'à la section, sous l'en-tête flottant.
  const onClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link || link.origin !== location.origin || link.pathname !== location.pathname || !link.hash) return;
    const target = document.querySelector(decodeURIComponent(link.hash));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: -90 });
    history.replaceState(null, '', link.hash);
  };
  document.addEventListener('click', onClick);

  // Menu mobile ouvert : on fige le défilement doux.
  const observer = new MutationObserver(() =>
    document.body.classList.contains('menu-open') ? lenis.stop() : lenis.start()
  );
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  return () => {
    document.removeEventListener('click', onClick);
    observer.disconnect();
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}

/** Accueil : photo qui se recadre, titre ligne par ligne, éléments qui flottent, parallaxe. */
function homeIntro(hero: HTMLElement) {
  const img = hero.querySelector('[data-hero-img]');
  const title = hero.querySelector('[data-hero-title]');
  const lines = hero.querySelectorAll('[data-hero-title] .line > span');
  const fades = hero.querySelectorAll('[data-hero-fade]');
  const giant = hero.querySelectorAll('[data-hero-giant] span');
  const giantWrap = hero.querySelector('[data-hero-giant]');
  const small = window.matchMedia('(max-width: 900px)').matches;

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (img) tl.fromTo(img, { autoAlpha: 0, scale: 1.14 }, { autoAlpha: 1, scale: 1, duration: 2.2 }, 0);
  if (title) tl.set(title, { autoAlpha: 1 }, 0);
  if (lines.length) tl.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.25);
  if (giantWrap) tl.set(giantWrap, { autoAlpha: 1 }, 0);
  if (giant.length) tl.fromTo(giant, { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 1.5, stagger: 0.12 }, 0.45);
  if (fades.length) tl.fromTo(fades, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.7);

  // Flottement très léger de la carte vidéo et du bouton rond, une fois l'entrée terminée.
  hero.querySelectorAll<HTMLElement>('[data-float]').forEach((el, i) => {
    const amp = Number(el.dataset.float) || 6;
    gsap.to(el, { y: -amp, duration: 2.6 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 + i * 0.3 });
  });

  // Parallaxe au défilement : la photo descend moins vite que la page, le grand texte remonte.
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 };
  if (img) gsap.to(img, { yPercent: small ? 6 : 12, scale: 1.05, ease: 'none', scrollTrigger: st });
  if (giantWrap) gsap.to(giantWrap, { yPercent: small ? -10 : -28, ease: 'none', scrollTrigger: st });
  const content = hero.querySelector('.hero__content');
  if (content) gsap.to(content, { y: small ? -20 : -60, autoAlpha: 0.2, ease: 'none', scrollTrigger: st });
}

/** Panneau des stages : le mot géant glisse, les pastilles apparaissent puis flottent. */
function servicesMotion() {
  const giant = document.querySelector('[data-giant]');
  if (giant) {
    gsap.fromTo(
      giant,
      { xPercent: -3 },
      { xPercent: 3, ease: 'none', scrollTrigger: { trigger: giant, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
    );
  }
  const badges = gsap.utils.toArray<HTMLElement>('[data-float-badge]');
  if (!badges.length) return;
  gsap.fromTo(
    badges,
    { autoAlpha: 0, scale: 0.6, y: 20 },
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 0.9,
      ease: 'back.out(1.8)',
      stagger: 0.1,
      scrollTrigger: { trigger: badges[0], start: 'top 85%', once: true },
      onComplete: () =>
        badges.forEach((b, i) =>
          gsap.to(b, { y: i % 2 ? 7 : -7, duration: 2.4 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        ),
    }
  );
}

function heroIntro() {
  const hero = document.querySelector<HTMLElement>('[data-hero], .page-hero');
  if (!hero) return;
  if (hero.hasAttribute('data-hero')) return homeIntro(hero);
  const img = hero.querySelector<HTMLElement>('.hero__img, .page-hero__img');
  const text = hero.querySelectorAll<HTMLElement>(
    '.breadcrumb, .eyebrow, h1, .hero__lead, .page-hero__lead, .hero__ctas, .hero-specs, .hero-ctas, .facts, .ctas'
  );
  const finder = hero.querySelector<HTMLElement>('.finder');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (img) tl.fromTo(img, { autoAlpha: 0, scale: 1.06, x: 30 }, { autoAlpha: 1, scale: 1, x: 0, duration: 1.4 }, 0);
  if (text.length) tl.fromTo(text, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07 }, 0.1);
  if (finder) tl.fromTo(finder, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 1.2 }, 0.35);
  // Légère profondeur : la voiture ou la photo glisse un peu au défilement.
  if (img) gsap.to(img, { y: 40, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 } });
}

function scrollReveals() {
  const hero = document.querySelector('[data-hero], .page-hero');
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
    const stopSmooth = smoothScroll();
    heroIntro();
    scrollReveals();
    servicesMotion();
    const restoreCounters = counters();
    // Les polices et images peuvent décaler la mise en page : on recalcule une fois tout chargé.
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    return () => {
      restoreCounters();
      stopSmooth();
    };
  });
  document.documentElement.classList.add('motion-ready');
}
