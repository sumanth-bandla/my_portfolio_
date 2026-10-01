import type { Plugin } from 'vite';
import { SITE, isPlaceholderUrl, personJsonLd } from '../site.config';

/**
 * Injects the canonical URL, Open Graph / Twitter metadata and JSON-LD into
 * index.html at build time from `site.config.ts`, and emits `sitemap.xml` plus
 * `robots.txt` for the same domain. Keeps "one domain" enforceable from a
 * single value and stops metadata from drifting between tags.
 */
export function siteMeta(): Plugin {
  const canonical = `${SITE.url.replace(/\/+$/, '')}/`;

  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_URL__', canonical)
        .replaceAll('__SITE_TITLE__', SITE.title)
        .replaceAll('__SITE_DESCRIPTION__', SITE.description)
        .replaceAll('__SITE_NAME__', SITE.name)
        .replaceAll('__SITE_ROLE__', SITE.role)
        .replaceAll('__SITE_IMAGE__', SITE.image)
        .replaceAll('__THEME_COLOR__', SITE.themeColor)
        .replaceAll('__SITE_LOCALE__', SITE.locale)
        .replace('__PERSON_JSON_LD__', personJsonLd());
    },

    generateBundle() {
      // Only advertise a sitemap once a real domain exists — never emit a URL
      // that points at the placeholder.
      const sitemap = isPlaceholderUrl
        ? null
        : `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${canonical}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

      if (sitemap) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      }

      const robots = isPlaceholderUrl
        ? 'User-agent: *\nAllow: /\n'
        : `User-agent: *\nAllow: /\n\nSitemap: ${canonical}sitemap.xml\n`;

      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
    },
  };
}
