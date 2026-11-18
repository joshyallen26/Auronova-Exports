/**
 * Environment configuration validator and helper for Auronova Exports
 */

export function validateServerEnv() {
  const isProd = process.env.NODE_ENV === "production";
  const warnings = [];
  const errors = [];

  // JWT Secret validation
  if (!process.env.JWT_SECRET) {
    if (isProd) {
      errors.push("JWT_SECRET is required in production. Please define a cryptographically strong secret in environment variables.");
    } else {
      warnings.push("JWT_SECRET is unset; using development fallback secret. Set JWT_SECRET in .env.local.");
    }
  } else if (process.env.JWT_SECRET.length < 32 && isProd) {
    warnings.push("JWT_SECRET is shorter than 32 characters; recommend using a 32+ character random secret for production.");
  }

  // MongoDB connection string validation
  if (!process.env.MONGODB_URI) {
    if (isProd) {
      warnings.push("MONGODB_URI is unset in production; system will use local fallback data store if database is unreachable.");
    }
  }

  // SMTP Email service validation
  const hasSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  if (!hasSmtp) {
    // Non-fatal, application functions with graceful logging
    warnings.push("SMTP email service not configured. Password resets and enquiry notifications will be logged to server console.");
  }

  if (warnings.length > 0 && typeof window === "undefined") {
    // Server-side warning output
    warnings.forEach((w) => console.warn(`[Config Notice] ${w}`));
  }

  if (errors.length > 0 && typeof window === "undefined") {
    errors.forEach((e) => console.error(`[Config Critical Error] ${e}`));
    if (isProd) {
      throw new Error(`Critical environment configuration error: ${errors.join("; ")}`);
    }
  }

  return { isValid: errors.length === 0, warnings, errors };
}

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

