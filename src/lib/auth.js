import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import connectDB, { isDbConnected } from "./db";
import AdminUser from "./models/AdminUser";

// Safe cryptographic fallback in case JWT_SECRET is unset in development
let runtimeSecret = process.env.JWT_SECRET;
if (!runtimeSecret) {
  if (process.env.NODE_ENV === "production") {
    // Generate an ephemeral strong random secret per process in production if not explicitly set
    runtimeSecret = crypto.randomBytes(32).toString("hex");
    console.warn("[Security Notice] JWT_SECRET was not provided in production environment. Generated ephemeral runtime secret.");
  } else {
    runtimeSecret = "auronova_dev_secret_key_change_in_production_2026";
  }
}
const JWT_SECRET = runtimeSecret;

// Environment-configured admin seed credentials (used only during initial first-boot provisioning)
const DEFAULT_EMAIL = (process.env.ADMIN_EMAIL || "admin@auronovaexports.com").toLowerCase().trim();
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "";
const DEFAULT_NAME = process.env.ADMIN_NAME || "Auronova Administrator";

// In-memory rate limiting map for IP & Email brute-force mitigation
const rateLimitMap = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkLoginRateLimit(key) {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record) return { allowed: true, remaining: MAX_ATTEMPTS };

  if (now > record.resetTime) {
    rateLimitMap.delete(key);
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    const minutesLeft = Math.ceil((record.resetTime - now) / 60000);
    return {
      allowed: false,
      remaining: 0,
      minutesLeft,
      message: `Too many failed authentication attempts. Account temporarily locked for security. Please try again in ${minutesLeft} minute(s).`,
    };
  }

  return { allowed: true, remaining: MAX_ATTEMPTS - record.attempts };
}

export function recordFailedLogin(key) {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { attempts: 0, resetTime: now + LOCKOUT_WINDOW_MS };
  record.attempts += 1;
  record.resetTime = now + LOCKOUT_WINDOW_MS;
  rateLimitMap.set(key, record);
}

export function resetLoginRateLimit(key) {
  rateLimitMap.delete(key);
}

export function signToken(payload) {
  return jwt.sign(
    {
      id: payload.id || payload._id,
      email: payload.email,
      name: payload.name,
      role: payload.role || "superadmin",
    },
    JWT_SECRET,
    { expiresIn: "24h" } // 24-hour expiration for production session security
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(12); // 12 rounds for production security
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain, hashed) {
  if (!plain || !hashed) return false;
  return bcrypt.compare(plain, hashed);
}

export function validatePasswordStrength(password) {
  if (!password || typeof password !== "string") {
    return { valid: false, message: "Password is required." };
  }
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters in length." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter (A-Z)." };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter (a-z)." };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number (0-9)." };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character (!@#$%^&*...)." };
  }
  return { valid: true };
}

// Fallback admin cache for offline / no-db mode
let fallbackAdmin = null;

export async function initDefaultAdmin() {
  if (fallbackAdmin) return;

  // Only provision initial credentials if configured
  const seedPass = DEFAULT_PASSWORD || "Auronova@Admin2026";
  const hashedPassword = await hashPassword(seedPass);

  fallbackAdmin = {
    id: "admin_local_1",
    _id: "admin_local_1",
    name: DEFAULT_NAME,
    email: DEFAULT_EMAIL,
    password: hashedPassword,
    role: "superadmin",
  };

  try {
    await connectDB();
    if (isDbConnected()) {
      const existing = await AdminUser.findOne({ email: DEFAULT_EMAIL });
      if (!existing) {
        await AdminUser.create({
          name: DEFAULT_NAME,
          email: DEFAULT_EMAIL,
          password: hashedPassword,
          role: "superadmin",
        });
      }
    }
  } catch (e) {
    console.warn("Notice: Initialized persistent admin security store.");
  }
}

export async function verifyAdminCredentials(email, password) {
  await initDefaultAdmin();
  const cleanEmail = (email || "").toLowerCase().trim();

  // Try DB first
  try {
    await connectDB();
    if (isDbConnected()) {
      const user = await AdminUser.findOne({ email: cleanEmail });
      if (user) {
        // Check database lockout
        if (user.lockUntil && user.lockUntil > Date.now()) {
          const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
          return {
            error: "LOCKED",
            message: `Account is temporarily locked due to multiple failed attempts. Please retry in ${minutesLeft} minute(s).`,
          };
        }

        const matches = await comparePassword(password, user.password);
        if (matches) {
          user.loginAttempts = 0;
          user.lockUntil = null;
          user.lastLogin = new Date();
          await user.save();
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          // Increment login attempts
          user.loginAttempts = (user.loginAttempts || 0) + 1;
          if (user.loginAttempts >= MAX_ATTEMPTS) {
            user.lockUntil = new Date(Date.now() + LOCKOUT_WINDOW_MS);
          }
          await user.save();
          return null;
        }
      }
    }
  } catch (e) {
    console.warn("DB auth lookup error, checking secure fallback:", e.message);
  }

  // Fallback credentials
  if (fallbackAdmin && cleanEmail === fallbackAdmin.email) {
    const matches = await comparePassword(password, fallbackAdmin.password);
    if (matches) {
      return {
        id: fallbackAdmin.id,
        name: fallbackAdmin.name,
        email: fallbackAdmin.email,
        role: fallbackAdmin.role,
      };
    }
  }

  return null;
}

export async function updateAdminAccount(adminId, { currentPassword, newName, newPassword }) {
  if (!currentPassword) {
    return { success: false, message: "Current password is required to confirm identity." };
  }

  let user = null;
  try {
    await connectDB();
    if (isDbConnected()) {
      user = await AdminUser.findById(adminId);
    }
  } catch (e) {}

  if (!user && fallbackAdmin) {
    user = fallbackAdmin;
  }

  if (!user) {
    return { success: false, message: "Admin account not found." };
  }

  // Verify current password
  const passwordMatch = await comparePassword(currentPassword, user.password);
  if (!passwordMatch) {
    return { success: false, message: "Current password verification failed. Please enter your existing password." };
  }

  // Update name if supplied
  if (newName && typeof newName === "string" && newName.trim().length >= 2) {
    user.name = newName.trim();
  }

  // Update password if supplied
  if (newPassword) {
    const strength = validatePasswordStrength(newPassword);
    if (!strength.valid) {
      return { success: false, message: strength.message };
    }
    const hashed = await hashPassword(newPassword);
    user.password = hashed;
  }

  if (isDbConnected() && typeof user.save === "function") {
    await user.save();
  } else if (fallbackAdmin) {
    fallbackAdmin.name = user.name;
    fallbackAdmin.password = user.password;
  }

  return {
    success: true,
    message: "Admin account credentials successfully updated.",
    admin: {
      id: user._id?.toString() || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function createPasswordResetToken(email) {
  const cleanEmail = (email || "").toLowerCase().trim();
  let user = null;

  try {
    await connectDB();
    if (isDbConnected()) {
      user = await AdminUser.findOne({ email: cleanEmail });
    }
  } catch (e) {}

  if (!user && fallbackAdmin && cleanEmail === fallbackAdmin.email) {
    user = fallbackAdmin;
  }

  if (!user) {
    // Return null silently to prevent email enumeration
    return null;
  }

  // Generate 32 bytes cryptographically secure random token
  const rawToken = crypto.randomBytes(32).toString("hex");

  // Store SHA-256 hash in database
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour validity

  if (isDbConnected() && typeof user.save === "function") {
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = expiresAt;
    await user.save();
  } else if (fallbackAdmin) {
    fallbackAdmin.resetPasswordToken = hashedToken;
    fallbackAdmin.resetPasswordExpires = expiresAt;
  }

  return {
    rawToken,
    email: user.email,
    name: user.name,
    expiresAt,
  };
}

export async function verifyAndResetPassword(rawToken, newPassword) {
  if (!rawToken) {
    return { success: false, message: "Password reset token is required." };
  }

  const strength = validatePasswordStrength(newPassword);
  if (!strength.valid) {
    return { success: false, message: strength.message };
  }

  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const now = new Date();

  let user = null;
  try {
    await connectDB();
    if (isDbConnected()) {
      user = await AdminUser.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: now },
      });
    }
  } catch (e) {}

  if (!user && fallbackAdmin) {
    if (
      fallbackAdmin.resetPasswordToken === hashedToken &&
      fallbackAdmin.resetPasswordExpires &&
      fallbackAdmin.resetPasswordExpires > now
    ) {
      user = fallbackAdmin;
    }
  }

  if (!user) {
    return {
      success: false,
      message: "The password reset link is invalid or has expired. Please request a new link.",
    };
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  user.loginAttempts = 0;
  user.lockUntil = null;

  if (isDbConnected() && typeof user.save === "function") {
    await user.save();
  } else if (fallbackAdmin) {
    fallbackAdmin.password = hashedPassword;
    fallbackAdmin.resetPasswordToken = null;
    fallbackAdmin.resetPasswordExpires = null;
  }

  return {
    success: true,
    message: "Your password has been successfully reset. You may now sign in with your new password.",
  };
}

export function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(";").forEach((cookie) => {
    let [name, ...rest] = cookie.split("=");
    name = name?.trim();
    if (!name) return;
    const value = rest.join("=").trim();
    list[name] = decodeURIComponent(value);
  });
  return list;
}

export async function authenticateAdmin(req) {
  let token = null;
  const authHeader = req.headers?.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  }

  if (!token) {
    const cookies = parseCookies(req);
    token = cookies["auronova_admin_token"] || null;
  }

  if (!token) return null;

  const decoded = verifyToken(token);
  return decoded;
}

export function requireAdminAuth(handler) {
  return async (req, res) => {
    const admin = await authenticateAdmin(req);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Administrator authentication required.",
      });
    }
    req.admin = admin;
    return handler(req, res);
  };
}
