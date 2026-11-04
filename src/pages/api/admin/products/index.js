import { requireAdminAuth } from "@/lib/auth";
import { getProducts, saveProduct } from "@/lib/dataService";

async function handler(req, res) {
  if (req.method === "GET") {
    const list = await getProducts(false);
    return res.status(200).json({ success: true, products: list });
  }

  if (req.method === "POST") {
    const { name, origin, description, image } = req.body || {};
    if (!name || !origin || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "Product name, origin, description, and image URL are required.",
      });
    }

    try {
      const saved = await saveProduct(req.body);
      return res.status(201).json({
        success: true,
        message: "Product created successfully.",
        product: saved,
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default requireAdminAuth(handler);
