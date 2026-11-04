import { getProducts, getPorts, getAllContent, getSeoSettings, getIntegrationSettings } from "@/lib/dataService";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const [products, ports, content, seo, integrations] = await Promise.all([
      getProducts(true),
      getPorts(true),
      getAllContent(),
      getSeoSettings(),
      getIntegrationSettings(),
    ]);

    // Cache header for high speed delivery while allowing fresh data
    res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

    return res.status(200).json({
      success: true,
      data: {
        products,
        ports,
        content,
        seo,
        integrations,
      },
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}
