import { verifyAdminCredentials, signToken, checkLoginRateLimit, recordFailedLogin, resetLoginRateLimit } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Both email and password are required.",
    });
  }

  // Rate limiting & Brute Force protection
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket?.remoteAddress || "local";
  const rateLimitKey = `${ip}_${email.toLowerCase().trim()}`;

  const rateCheck = checkLoginRateLimit(rateLimitKey);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      success: false,
      message: rateCheck.message,
    });
  }

  const result = await verifyAdminCredentials(email, password);

  if (result && result.error === "LOCKED") {
    return res.status(423).json({
      success: false,
      message: result.message,
    });
  }

  if (!result || !result.id) {
    recordFailedLogin(rateLimitKey);
    // Generic non-enumerating error message
    return res.status(401).json({
      success: false,
      message: "Invalid email or password. Please verify your credentials.",
    });
  }

  // Authentication succeeded - clear rate limit counter
  resetLoginRateLimit(rateLimitKey);

  const token = signToken(result);

  // Set HTTP-Only Secure Session Cookie
  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions = [
    `auronova_admin_token=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${60 * 60 * 24}`, // 24 hours
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Admin authentication successful.",
    token,
    admin: {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
    },
  });
}
