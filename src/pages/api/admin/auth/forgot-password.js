import nodemailer from "nodemailer";
import { createPasswordResetToken, checkLoginRateLimit, recordFailedLogin } from "@/lib/auth";
import { getSiteUrl } from "@/lib/env";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid administrator email address.",
    });
  }

  // Rate limiting on password resets (max 3 per 15 minutes per IP)
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket?.remoteAddress || "local";
  const rateLimitKey = `reset_${ip}`;

  const rateCheck = checkLoginRateLimit(rateLimitKey);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      success: false,
      message: "Too many password reset requests. Please try again later.",
    });
  }

  recordFailedLogin(rateLimitKey);

  // Generate single-use time-limited reset token
  const resetData = await createPasswordResetToken(email);

  // Always return identical generic message to prevent email enumeration
  const genericSuccessMessage = "If the account is eligible, password reset instructions will be sent.";

  if (resetData) {
    const siteUrl = getSiteUrl();
    const resetUrl = `${siteUrl}/admin/reset-password?token=${resetData.rawToken}`;

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"Auronova Exports Security" <${process.env.SMTP_FROM || smtpUser}>`,
          to: resetData.email,
          subject: "Auronova Exports Admin — Password Reset Request",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #24251F; max-width: 580px; margin: 0 auto; border: 1px solid #E8E0D2; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #24251F; padding: 24px; text-align: center; color: #FAF7F0;">
                <h2 style="margin: 0; color: #D6A441;">Auronova Exports Admin Portal</h2>
                <p style="margin: 4px 0 0; font-size: 13px; color: #FAF7F0;">Commercial Management Security Service</p>
              </div>
              <div style="padding: 24px; background-color: #FAF7F0;">
                <p>Hello ${resetData.name || "Administrator"},</p>
                <p>A request was received to reset the password for your Auronova Exports administrative account.</p>
                <p>Click the secure button below to choose a new password. This link is valid for <strong>1 hour</strong> and can be used only once:</p>
                <div style="text-align: center; margin: 28px 0;">
                  <a href="${resetUrl}" style="background-color: #D6A441; color: #24251F; font-weight: bold; padding: 12px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-size: 14px;">
                    Reset Admin Password
                  </a>
                </div>
                <p style="font-size: 12px; color: #666;">Or copy and paste this link in your browser:<br /><a href="${resetUrl}" style="color: #4A2C20; word-break: break-all;">${resetUrl}</a></p>
                <hr style="border: none; border-top: 1px solid #E8E0D2; margin: 20px 0;" />
                <p style="font-size: 11px; color: #888; margin-bottom: 0;">If you did not initiate this request, you can safely ignore this email. Your current password remains unchanged.</p>
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.warn("[Admin Auth] SMTP dispatch failed for password reset:", err.message);
      }
    } else {
      // SMTP not configured - report clearly in server logs without exposing to public
      console.warn(`[Admin Auth Alert] Password reset requested for ${resetData.email}, but SMTP email is unconfigured.`);
      console.warn(`[Admin Auth Recovery Link] (Server-side only): ${resetUrl}`);
    }
  }

  return res.status(200).json({
    success: true,
    message: genericSuccessMessage,
  });
}
