import { getProducts } from "@/lib/dataService";
import { getSiteUrl } from "@/lib/env";

export async function getServerSideProps({ res }) {
  const baseUrl = getSiteUrl();

  const staticPages = [
    { url: "/", changefreq: "daily", priority: "1.0" },
    { url: "/about", changefreq: "weekly", priority: "0.8" },
    { url: "/products", changefreq: "daily", priority: "0.9" },
    { url: "/sourcing", changefreq: "weekly", priority: "0.8" },
    { url: "/shipping", changefreq: "weekly", priority: "0.8" },
    { url: "/certifications", changefreq: "weekly", priority: "0.8" },
    { url: "/faq", changefreq: "weekly", priority: "0.7" },
    { url: "/contact", changefreq: "weekly", priority: "0.9" },
    { url: "/privacy-policy", changefreq: "monthly", priority: "0.5" },
    { url: "/terms", changefreq: "monthly", priority: "0.5" },
    { url: "/shipping-policy", changefreq: "monthly", priority: "0.6" },
    { url: "/sitemap", changefreq: "monthly", priority: "0.5" },
  ];

  let products = [];
  try {
    products = await getProducts(true);
  } catch {}

  const productUrls = products.map((p) => ({
    url: `/products#${p.slug}`,
    changefreq: "weekly",
    priority: "0.8",
  }));

  const allUrls = [...staticPages, ...productUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=59");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function SitemapXml() {
  return null;
}
