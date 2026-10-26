import profile from "./data/profile.json";

// Turns a path from the JSON files ("images/photos/p001.webp") into a URL
// that works on GitHub Pages sub-paths and on Vercel alike.
export function asset(path) {
  if (!path) return null;
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}

// Soft placeholder colours, used until a real image is added.
const TINTS = ["#cfd8ea", "#ddd2e8", "#d2e4da", "#ebd9cc", "#d7dcea", "#e6dfd0", "#cfe0e6", "#e4d3d9"];
export function tint(i) {
  return TINTS[i % TINTS.length];
}

// Resolves the "link" keys used in home.json.
export function resolveLink(key) {
  if (key === "email") return `mailto:${profile.email}`;
  if (key === "phone") return `tel:${profile.phone.replace(/\s+/g, "")}`;
  return asset(profile.links[key]);
}
