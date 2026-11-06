import { createFileRoute } from "@tanstack/react-router";
import card from "@/assets/sainox-card.png.asset.json";
import { CtaButtons, Eyebrow, KnotMandala, Lines, PageHero, Reveal } from "@/components/site/SiteChrome";
import { IMG } from "@/components/site/images";
import { siteHead } from "@/components/site/meta";

export const Route = createFileRoute("/site/about")({
  head: () => siteHead("About Us", "SainoX is a digital invitation studio from Katunje, Bhaktapur, blending Nepali heritage with modern design."),
  component: About,
});

const VALUES = [
  { np: "साथ", en: "Together", d: "We work beside your family, listening first, so the invitation feels like yours." },
  { np: "सम्भावना", en: "Possibility", d: "Modern motion and craft open new ways to share old traditions." },
  { np: "सफलता", en: "Success", d: "A celebration that begins beautifully — and guests who arrive delighted." },
];

function About() {
  return (
    <>
      <PageHero index="04" eyebrow="About us" title={["Born among", <em key="e" className="text-ember-gold">temples & peaks.</em>]} sub="SainoX was born in Katunje, Bhaktapur — surrounded by centuries of celebration." image={IMG.night} />
      <section className="relative overflow-hidden pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-[1.1fr_1fr] md:px-10">
          <Reveal>
            <div className="relative [perspective:1400px]">
              <KnotMandala className="pointer-events-none absolute -left-20 -top-20 h-[28rem] w-[28rem] opacity-40" />
              <img src={card.url} alt="SainoX business card" loading="lazy" className="relative w-full rounded-sm shadow-[0_50px_120px_-40px_var(--brand-ember)] transition-transform duration-1000 hover:[transform:rotateY(-8deg)_rotateX(4deg)]" />
            </div>
          </Reveal>
          <div className="space-y-6 font-lux-sans text-lg font-light leading-relaxed text-brand-cream/65">
            <Reveal><Eyebrow>Our story</Eyebrow></Reveal>
            <Lines lines={["The way you invite", <em key="e" className="text-ember-gold">is the first gift.</em>]} className="font-lux text-4xl font-light leading-[1.05] text-brand-cream md:text-6xl" />
            <Reveal delay={150}><p>We believe the way you invite someone says as much as the event itself. Our studio turns invitations into experiences — personal, animated and easy to share.</p></Reveal>
            <Reveal delay={250}><p>Every design stays true to the culture and traditions of the family we work with, from Newari weddings to sacred bratabandha ceremonies.</p></Reveal>
          </div>
        </div>
      </section>
      <section className="border-y border-brand-line">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.en} delay={i * 150} className="border-b border-brand-line px-8 py-16 text-center md:border-b-0 md:border-r md:last:border-r-0">
              <p className="font-lux text-6xl text-ember-gold">{v.np}</p>
              <p className="mt-4 font-lux-sans text-[11px] uppercase tracking-[0.4em] text-brand-cream/50">{v.en}</p>
              <p className="mx-auto mt-6 max-w-xs font-lux-sans text-sm font-light leading-relaxed text-brand-cream/60">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="py-28 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal><Eyebrow className="justify-center">Our vision</Eyebrow></Reveal>
          <Lines lines={["To be Nepal's most trusted", <em key="e" className="text-ember-gold">name in invitations.</em>]} className="mt-8 font-lux text-4xl font-light leading-[1.05] md:text-7xl" />
          <Reveal delay={300} className="mt-12"><CtaButtons center /></Reveal>
        </div>
      </section>
    </>
  );
}
