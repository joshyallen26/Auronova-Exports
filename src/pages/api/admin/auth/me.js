import { authenticateAdmin } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const admin = await authenticateAdmin(req);
  if (!admin) {
    return res.status(401).json({ success: false, authenticated: false, message: "Unauthorized" });
  }

  return res.status(200).json({
    success: true,
    authenticated: true,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
}
