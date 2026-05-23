import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://finca.rideko.nl/sitemap.xml',
  }
}
