import { requireAdminAuth, updateAdminAccount, signToken } from "@/lib/auth";

async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { currentPassword, newName, newPassword, confirmPassword } = req.body || {};

  if (!currentPassword) {
    return res.status(400).json({
      success: false,
      message: "Current password is required to verify identity before modifying account settings.",
    });
  }

  if (newPassword) {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirmation password do not match.",
      });
    }
  }

  const result = await updateAdminAccount(req.admin.id, {
    currentPassword,
    newName,
    newPassword,
  });

  if (!result.success) {
    return res.status(400).json(result);
  }

  // Issue refreshed token with updated identity
  const refreshedToken = signToken(result.admin);

  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions = [
    `auronova_admin_token=${refreshedToken}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${60 * 60 * 24}`,
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookieOptions);

  return res.status(200).json({
    success: true,
    message: result.message,
    admin: result.admin,
    token: refreshedToken,
  });
}

export default requireAdminAuth(handler);

