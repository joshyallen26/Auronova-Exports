export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Clear cookie
  res.setHeader(
    "Set-Cookie",
    "auronova_admin_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );

  return res.status(200).json({
    success: true,
    message: "Admin logged out successfully.",
  });
}
