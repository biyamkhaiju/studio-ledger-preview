import bride from "@/assets/site-hero-bride.jpg";
import wedding from "@/assets/site-wedding.jpg";
import ritual from "@/assets/site-ritual.jpg";
import celebration from "@/assets/site-celebration.jpg";
import night from "@/assets/sainox-hero-night.jpg";

export const IMG = { bride, wedding, ritual, celebration, night };

/** Mood photo used for each service / demo category. */
export const SERVICE_IMG: Record<string, string> = { wedding, engagement: bride, anniversary: celebration, bratabandha: ritual, birthday: celebration, special: ritual };
