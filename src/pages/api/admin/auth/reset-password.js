import { verifyAndResetPassword } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token, newPassword, confirmPassword } = req.body || {};

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Reset token is missing or malformed.",
    });
  }

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and password confirmation are required.",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirmation password do not match.",
    });
  }

  const result = await verifyAndResetPassword(token, newPassword);

  if (!result.success) {
    return res.status(400).json(result);
  }

  // Clear existing session cookie to force fresh login with new password
  res.setHeader(
    "Set-Cookie",
    "auronova_admin_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );

  return res.status(200).json({
    success: true,
    message: result.message,
  });
}

