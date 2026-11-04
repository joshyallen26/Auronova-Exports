import { requireAdminAuth } from "@/lib/auth";
import { getProductByIdOrSlug, saveProduct, deleteProduct } from "@/lib/dataService";

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const product = await getProductByIdOrSlug(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, product });
  }

  if (req.method === "PUT") {
    try {
      const saved = await saveProduct({ ...req.body, _id: id });
      return res.status(200).json({ success: true, message: "Product updated successfully", product: saved });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await deleteProduct(id);
      return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default requireAdminAuth(handler);
