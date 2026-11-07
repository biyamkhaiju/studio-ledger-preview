import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { CtaButtons, Eyebrow, GhostButton, KnotMandala, Lines, PageHero, Reveal } from "@/components/site/SiteChrome";
import { CONTACT, waLink } from "@/components/site/content";
import { IMG } from "@/components/site/images";
import { siteHead } from "@/components/site/meta";

export const Route = createFileRoute("/site/our-team")({
  head: () => siteHead("Our Team", "Meet Biyam Khaiju, co-founder of SainoX digital invitation studio in Bhaktapur, Nepal."),
  component: Team,
});

const CRAFT = [
  { n: "01", t: "Design", d: "Every invitation is drawn for one family — motifs, colours and lettering chosen with care." },
  { n: "02", t: "Motion", d: "Gentle reveals and animation that make opening the invitation feel like a moment." },
  { n: "03", t: "Care", d: "We stay with you until the last guest has their link — and update it whenever plans change." },
];

function Team() {
  return (
    <>
      <PageHero index="05" eyebrow="Our team" title={["The hands", <em key="e" className="text-ember-gold">behind the craft.</em>]} sub="A small Bhaktapur studio that treats every invitation as if it were for our own family." image={IMG.ritual} />

      <section className="relative overflow-hidden pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-[1fr_1.2fr] md:px-10">
          <Reveal>
            <div className="relative mx-auto w-full max-w-sm">
              <KnotMandala className="pointer-events-none absolute -inset-16 h-[calc(100%+8rem)] w-[calc(100%+8rem)] opacity-40" />
              <div className="arch relative flex aspect-[3/4] w-full items-end justify-center overflow-hidden border border-brand-line bg-brand-ink-raised">
                <img src={IMG.night} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />
                <div className="relative pb-10 text-center">
                  <p className="font-lux text-8xl font-light text-ember-gold">BK</p>
                  <p className="mt-2 font-lux-sans text-[10px] uppercase tracking-[0.4em] text-brand-cream/50">Photo coming soon</p>
                </div>
              </div>
              <span className="arch pointer-events-none absolute -inset-3 border border-brand-gold/30" aria-hidden />
            </div>
          </Reveal>
          <div>
            <Reveal><Eyebrow>Co-founder</Eyebrow></Reveal>
            <Lines lines={[CONTACT.name]} className="mt-6 font-lux text-5xl font-light leading-[1] md:text-7xl" />
            <Reveal delay={150}>
              <p className="mt-8 max-w-lg font-lux-sans text-lg font-light leading-relaxed text-brand-cream/65">
                Biyam leads design and client experience at SainoX — making sure every invitation feels personal, every tradition is honoured, and every family feels looked after from the first message to the big day.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-brand-line bg-brand-line font-lux-sans text-sm sm:grid-cols-3">
                <a href={`tel:+977${CONTACT.phone}`} className="flex items-center gap-3 bg-brand-ink p-5 transition-colors hover:text-brand-gold"><Phone className="h-4 w-4 text-brand-ember" />{CONTACT.phoneIntl}</a>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 break-all bg-brand-ink p-5 transition-colors hover:text-brand-gold"><Mail className="h-4 w-4 shrink-0 text-brand-ember" />{CONTACT.email}</a>
                <p className="flex items-center gap-3 bg-brand-ink p-5"><MapPin className="h-4 w-4 shrink-0 text-brand-ember" />{CONTACT.location}</p>
              </div>
            </Reveal>
            <Reveal delay={350} className="mt-10"><GhostButton href={waLink("Namaste Biyam! I'd like to talk about an invitation.")}>WhatsApp Biyam</GhostButton></Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-line">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {CRAFT.map((c, i) => (
            <Reveal key={c.n} delay={i * 150} className="group border-b border-brand-line px-8 py-16 md:border-b-0 md:border-r md:last:border-r-0">
              <p className="font-lux text-6xl font-light text-outline transition-colors duration-700 group-hover:text-brand-ember">{c.n}</p>
              <p className="mt-6 font-lux text-3xl font-light">{c.t}</p>
              <p className="mt-4 max-w-xs font-lux-sans text-sm font-light leading-relaxed text-brand-cream/60">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <Lines lines={["Let's make yours", <em key="e" className="text-ember-gold">unforgettable.</em>]} className="font-lux text-4xl font-light leading-[1.05] md:text-7xl" />
          <Reveal delay={300} className="mt-12"><CtaButtons center /></Reveal>
        </div>
      </section>
    </>
  );
}
