import { verifyAdminCredentials, signToken } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  const admin = await verifyAdminCredentials(email, password);

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password. Please verify your credentials.",
    });
  }

  const token = signToken(admin);

  // Set HTTP-Only Secure Session Cookie
  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions = [
    `auronova_admin_token=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${60 * 60 * 24 * 7}`, // 7 days
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Admin authentication successful.",
    token,
    admin,
  });
}
