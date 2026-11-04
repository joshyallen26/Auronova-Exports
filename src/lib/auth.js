import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB, { isDbConnected } from "./db";
import AdminUser from "./models/AdminUser";

const JWT_SECRET = process.env.JWT_SECRET || "auronova_exports_super_secure_jwt_secret_key_2026_kerala_spices";
const DEFAULT_EMAIL = (process.env.ADMIN_EMAIL || "admin@auronovaexports.com").toLowerCase().trim();
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "Auronova@Admin2026";
const DEFAULT_NAME = process.env.ADMIN_NAME || "Auronova Administrator";

export function signToken(payload) {
  return jwt.sign(
    {
      id: payload.id || payload._id,
      email: payload.email,
      name: payload.name,
      role: payload.role || "superadmin",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
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
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

// In-memory or fallback admin cache for offline / no-db mode
let fallbackAdmin = null;

export async function initDefaultAdmin() {
  const hashedPassword = await hashPassword(DEFAULT_PASSWORD);
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
    console.warn("Notice: Using fallback admin credentials store.");
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
        const matches = await comparePassword(password, user.password);
        if (matches) {
          user.lastLogin = new Date();
          await user.save();
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
      }
    }
  } catch (e) {}

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

  // Direct env check for resilience
  if (cleanEmail === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
    return {
      id: "admin_env_1",
      name: DEFAULT_NAME,
      email: DEFAULT_EMAIL,
      role: "superadmin",
    };
  }

  return null;
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
  // Check Authorization header first
  let token = null;
  const authHeader = req.headers?.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  }

  // Fallback to cookie
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
