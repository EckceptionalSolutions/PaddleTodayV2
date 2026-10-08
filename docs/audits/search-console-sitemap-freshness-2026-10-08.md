# Sitemap freshness review — October 8, 2026

## Finding

The sitemap is valid and fetchable, but Google's sitemap report is behind the live URL catalog. Search Console showed the sitemap index was last read October 7, while its child `sitemap-0.xml` was last read October 5 and still reported 3,249 discovered URLs. The live child sitemap returned successfully and contained 2,534 canonical URLs. The sitemap index had no `<lastmod>` value for the child sitemap, so the index did not explicitly describe when that child file changed.

Individual URL Inspection can display “Temporary processing error” in its Sitemaps field, but the Sitemaps report showed Success for both the index and child. That message did not indicate a sitewide sitemap fetch or parse failure in the report reviewed here.

## Change

The build now writes a W3C-format `<lastmod>` value for each child sitemap in `sitemap-index.xml`, using the generated child file's actual modification timestamp. This gives Google a current, verifiable sitemap-change signal after deployments update the URL catalog. It is a crawl scheduling hint, not a guarantee that Google will crawl or index every listed URL.

## Verification

- Live `sitemap-index.xml` and `sitemap-0.xml` returned HTTP 200.
- The index contained one child sitemap; the live child contained 2,534 URLs after the latest route consolidations.
- Search Console reported Success and a last-read date of October 5 for the child sitemap, with 3,249 discovered URLs from that earlier read.
- No sitemap submission, validation, or URL indexing request was made in Search Console.

## References

- Google Search Central, [Manage your sitemaps with sitemap index files](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps/): sitemap-index `<lastmod>` identifies when each referenced sitemap file was modified and may help Google schedule sitemap crawling.
- Google Search Central, [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): URL `<lastmod>` should be accurate and reflect a significant page update; Google uses it when it is consistently verifiable.
