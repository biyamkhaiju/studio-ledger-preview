// Invitation project categories, guest link rules and invitation wording.
// Invitation projects use the "wedding" division key internally (kept so old
// records and backups stay valid); the category says which kind of event it is.

export const INVITATION_CATEGORIES = ["wedding", "anniversary", "baby_born", "bartabandha"] as const;
export type InvitationCategory = (typeof INVITATION_CATEGORIES)[number];

export const CATEGORY_INFO: Record<InvitationCategory, {
  label: string;
  path: string;
  blurb: string;
  event: string;
  nepali: string;
  greeting: string;
  milestones: string[];
}> = {
  wedding: {
    label: "Wedding", path: "wedding", blurb: "Marriage ceremonies and receptions",
    event: "Wedding Ceremony", nepali: "शुभ विवाह", greeting: "request the pleasure of your company at the wedding celebration",
    milestones: ["Requirements gathered", "Design draft", "Couple review", "Revisions", "Guest list ready", "Invitations sent"],
  },
  anniversary: {
    label: "Anniversary", path: "anniversary", blurb: "Milestone anniversaries and renewals",
    event: "Anniversary Celebration", nepali: "शुभ वार्षिकोत्सव", greeting: "warmly invite you to celebrate their anniversary",
    milestones: ["Requirements gathered", "Design draft", "Family review", "Revisions", "Guest list ready", "Invitations sent"],
  },
  baby_born: {
    label: "Baby Born", path: "baby-born", blurb: "Welcoming a newborn and naming ceremonies",
    event: "Welcoming Our Little One", nepali: "शुभ स्वागतम्", greeting: "joyfully invite you to bless and welcome their little one",
    milestones: ["Requirements gathered", "Design draft", "Family review", "Revisions", "Guest list ready", "Invitations sent"],
  },
  bartabandha: {
    label: "Bartabandha", path: "bartabandha", blurb: "Sacred thread ceremonies",
    event: "Bartabandha Ceremony", nepali: "शुभ व्रतबन्ध", greeting: "cordially invite you to grace the sacred Bartabandha ceremony",
    milestones: ["Requirements gathered", "Design draft", "Family review", "Revisions", "Guest list ready", "Invitations sent"],
  },
};

export const categoryFromPath = (path: string): InvitationCategory | undefined =>
  INVITATION_CATEGORIES.find((c) => CATEGORY_INFO[c].path === path);

/** Turn a guest name into a readable URL part; keeps letters from any script (e.g. Devanagari). */
export function slugifyName(name: string): string {
  const base = name
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return base || "guest";
}

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";
function randomCode(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

/** Unique, hard-to-guess invitation link part built from the guest's name, e.g. "sita-rai-k7q2m9". */
export function guestSlug(name: string): string {
  return `${slugifyName(name)}-${randomCode(6)}`;
}

/** Split pasted guest lists: one guest per line, optional ", relation" after the name. */
export function parseGuestList(text: string): { name: string; relation: string }[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", ...rest] = line.split(",");
      return { name: name.trim().slice(0, 200), relation: rest.join(",").trim().slice(0, 200) };
    })
    .filter((g) => g.name.length > 0);
}

/**
 * Links use the address the dashboard is opened on (e.g. the Vercel site).
 * Set VITE_PUBLIC_SITE_URL to always share links on one public address instead.
 */
export function inviteBaseUrl(origin: string): string {
  const fixed = (import.meta.env["VITE_PUBLIC_SITE_URL"] as string | undefined)?.trim().replace(/\/+$/, "");
  return fixed || origin;
}

/** Readable event date, e.g. "Sunday, 14 February 2027". */
export function formatEventDate(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "";
  const d = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
export const inviteUrl = (origin: string, slug: string) => `${inviteBaseUrl(origin)}/invite/${encodeURIComponent(slug)}`;
