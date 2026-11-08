import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { INVITATION_CATEGORIES, type InvitationCategory } from "./invitations";

export type GuestInvitation = {
  guestName: string;
  relation: string;
  category: InvitationCategory;
  hosts: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  message: string;
};

/**
 * Public lookup of one personal invitation by its link. The backend function
 * returns only what that guest's card shows (never phone numbers or other guests).
 */
export const getGuestInvitation = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => {
    const slug = String(input?.slug ?? "").trim();
    return { slug: /^[^/?#\s]{3,160}$/u.test(slug) ? slug : "" };
  })
  .handler(async ({ data }): Promise<GuestInvitation | null> => {
    if (!data.slug) return null;
    const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Invitations are temporarily unavailable.");
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { data: rows, error } = await client.rpc("get_invitation", { _slug: data.slug });
    if (error) {
      console.error("get_invitation failed", error.message);
      throw new Error("Invitations are temporarily unavailable. Please try again shortly.");
    }
    const row = rows?.[0];
    if (!row) return null;
    const category = (INVITATION_CATEGORIES as readonly string[]).includes(row.category) ? (row.category as InvitationCategory) : "wedding";
    return {
      guestName: row.guest_name,
      relation: row.relation ?? "",
      category,
      hosts: row.hosts ?? "",
      eventDate: row.event_date ?? "",
      eventTime: row.event_time ?? "",
      eventVenue: row.event_venue ?? "",
      message: row.message ?? "",
    };
  });
