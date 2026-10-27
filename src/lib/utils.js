// Aurnova Exports – Utility Helpers

/** Merge class names, filtering out falsy values */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Format numbers compactly: 12000 → "12K" */
export function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/** Slugify plain text */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
