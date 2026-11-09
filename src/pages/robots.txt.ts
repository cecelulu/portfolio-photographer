import type { APIRoute } from 'astro';
import { site } from '../data/site';

// En mode maquette, on demande aux moteurs de recherche de ne rien indexer.
export const GET: APIRoute = () =>
  new Response(site.demo ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
