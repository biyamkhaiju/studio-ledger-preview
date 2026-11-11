import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Embers, KnotMandala } from "@/components/site/SiteChrome";
import { IMG } from "@/components/site/images";
import { CATEGORY_INFO, formatEventDate, type InvitationCategory } from "@/lib/invitations";
import { getGuestInvitation } from "@/lib/invitation.functions";
import logo from "@/assets/sainox-logo.webp";

const PHOTO: Record<InvitationCategory, string> = { wedding: IMG.wedding, anniversary: IMG.celebration, baby_born: IMG.celebration, bartabandha: IMG.ritual };

export const Route = createFileRoute("/invite/$slug")({
  loader: async ({ params }) => {
    const invitation = await getGuestInvitation({ data: { slug: params.slug } });
    if (!invitation) throw notFound();
    return invitation;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.guestName}, you're invited — ${CATEGORY_INFO[loaderData.category].event}` : "Invitation not found — SainoX";
    const description = loaderData ? `A personal invitation for ${loaderData.guestName}${loaderData.hosts ? ` from ${loaderData.hosts}` : ""}.` : "This invitation link is not valid.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => (
    <Shell><p className="max-w-sm text-center font-lux text-2xl font-light">{(error instanceof Error && error.message) || "This invitation couldn't be opened. Please try again."}</p></Shell>
  ),
  component: InvitePage,
});

function Shell({ children, photo = IMG.wedding }: { children: React.ReactNode; photo?: string }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-ink px-5 py-16 text-brand-cream">
      <img src={photo} alt="" className="animate-ken-burns absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-ink via-brand-ink/70 to-brand-ink" aria-hidden />
      <Embers count={24} />
      <div className="relative flex w-full flex-col items-center">{children}</div>
    </main>
  );
}

function NotFound() {
  return (
    <Shell>
      <p className="font-lux-sans text-[10px] uppercase tracking-[0.4em] text-brand-gold">Invitation</p>
      <h1 className="mt-4 max-w-md text-center font-lux text-4xl font-light">This invitation link isn't valid</h1>
      <p className="mt-4 max-w-sm text-center font-lux-sans text-sm font-light text-brand-cream/60">Please check the link you received, or ask the family to send it again.</p>
      <Link to="/site" className="mt-10 font-lux-sans text-[11px] uppercase tracking-[0.3em] text-brand-cream/60 hover:text-brand-gold">Visit SainoX</Link>
    </Shell>
  );
}

function InvitePage() {
  const inv = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const info = CATEGORY_INFO[inv.category];
  const date = formatEventDate(inv.eventDate);
  const hosts = inv.hosts || "The family";

  return (
    <Shell photo={PHOTO[inv.category]}>
      <div className="relative w-full max-w-md [perspective:1600px]">
        <KnotMandala className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 opacity-30" />
        {!open ? (
          <button onClick={() => setOpen(true)} className="group relative block w-full animate-brand-rise text-center" aria-label={`Open invitation for ${inv.guestName}`}>
            <div className="arch relative mx-auto flex aspect-[3/4] w-full flex-col items-center justify-center border border-brand-gold/40 bg-brand-ink-raised px-6 shadow-brand">
              <span className="arch pointer-events-none absolute inset-3 border border-brand-ember/30" aria-hidden />
              <p className="font-lux-sans text-[10px] uppercase tracking-[0.4em] text-brand-cream/50">An invitation for</p>
              <p className="mt-4 break-words font-lux text-4xl font-light leading-tight">{inv.guestName}</p>
              <span className="relative my-8 flex h-20 w-20 items-center justify-center">
                <span className="animate-glow absolute -inset-4 rounded-full bg-brand-ember/40 blur-xl" aria-hidden />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-ember font-lux text-3xl text-brand-cream shadow-brand transition-transform duration-700 group-hover:scale-110">X</span>
              </span>
              <p className="font-lux-sans text-[11px] uppercase tracking-[0.35em] text-brand-gold">Tap to open</p>
            </div>
          </button>
        ) : (
          <article className="relative animate-brand-rise">
            <div className="arch relative overflow-hidden border border-brand-gold/40 bg-brand-ink-raised px-8 pb-12 pt-16 text-center shadow-brand">
              <span className="arch pointer-events-none absolute inset-3 border border-brand-ember/30" aria-hidden />
              <p className="font-lux-sans text-[10px] uppercase tracking-[0.4em] text-brand-cream/60">Dear</p>
              <p className="mt-1 font-lux text-xl text-brand-gold">{inv.guestName},</p>
              <p className="mt-8 font-lux text-4xl text-ember-gold">{info.nepali}</p>
              <h1 className="mt-4 break-words font-lux text-4xl font-light leading-tight sm:text-5xl">{hosts}</h1>
              <p className="mt-3 font-lux-sans text-xs font-light text-brand-cream/60">{info.greeting}</p>
              <span className="mx-auto my-8 block h-px w-20 bg-brand-ember" aria-hidden />
              {inv.message && <p className="whitespace-pre-line font-lux text-xl font-light italic leading-relaxed text-brand-cream/80">{inv.message}</p>}
              <div className="mt-10 space-y-3 font-lux-sans text-sm font-light text-brand-cream/75">
                {date && <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-gold"><CalendarDays className="h-4 w-4" />{date}</p>}
                {inv.eventTime && <p className="flex items-center justify-center gap-2"><Clock className="h-4 w-4 text-brand-gold" />{inv.eventTime}</p>}
                {inv.eventVenue && (
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(inv.eventVenue)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 hover:text-brand-gold">
                    <MapPin className="h-4 w-4 text-brand-gold" />{inv.eventVenue}
                  </a>
                )}
              </div>
              <p className="mt-10 font-lux text-lg font-light text-brand-cream/70">We look forward to welcoming you.</p>
            </div>
            <div className="mt-10 flex flex-col items-center gap-4">
              <button onClick={() => setOpen(false)} className="font-lux-sans text-[11px] uppercase tracking-[0.3em] text-brand-cream/60 hover:text-brand-gold">Replay</button>
              <Link to="/site" className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100">
                <span className="font-lux-sans text-[10px] uppercase tracking-[0.3em] text-brand-cream/60">Invitation by</span>
                <img src={logo} alt="SainoX" className="h-6 w-auto" />
              </Link>
            </div>
          </article>
        )}
      </div>
    </Shell>
  );
}
