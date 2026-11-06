import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtaButtons, Lines, PageHero, ParallaxImg, Reveal } from "@/components/site/SiteChrome";
import { SERVICES, waLink } from "@/components/site/content";
import { IMG, SERVICE_IMG } from "@/components/site/images";
import { siteHead } from "@/components/site/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/site/services")({
  head: () => siteHead("Services", "Digital invitations for weddings, engagements, anniversaries, bratabandha, birthdays and special occasions by SainoX."),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero index="01" eyebrow="Services" title={["Made to order,", <em key="e" className="text-ember-gold">for every rite.</em>]} sub="Every design is crafted around your family, your traditions and your guests — in Nepali, English or both." image={IMG.wedding} />
      <section className="pb-28">
        <div className="mx-auto max-w-7xl space-y-28 px-6 md:space-y-40 md:px-10">
          {SERVICES.map((s, i) => (
            <article key={s.slug} className={cn("grid items-center gap-10 md:grid-cols-2 md:gap-20", i % 2 && "md:[&>*:first-child]:order-2")}>
              <Reveal>
                <div className="relative">
                  <ParallaxImg src={SERVICE_IMG[s.slug]} alt={`${s.title} invitation mood`} className="arch aspect-[4/5] w-full" />
                  <span className="arch pointer-events-none absolute -inset-3 border border-brand-gold/25" aria-hidden />
                  <span className="absolute -bottom-6 left-6 font-lux text-8xl font-light leading-none text-outline md:text-9xl">0{i + 1}</span>
                </div>
              </Reveal>
              <div>
                <Reveal><p className="font-lux text-2xl italic text-brand-gold/80">{s.nepali}</p></Reveal>
                <Lines lines={[s.title]} className="mt-2 font-lux text-5xl font-light md:text-7xl" />
                <Reveal delay={150}><p className="mt-6 max-w-md font-lux-sans text-lg font-light leading-relaxed text-brand-cream/65">{s.blurb}</p></Reveal>
                <ul className="mt-8 border-t border-brand-line">
                  {s.features.map((f, j) => (
                    <Reveal as="li" key={f} delay={200 + j * 80} className="flex items-center gap-4 border-b border-brand-line py-4 font-lux-sans text-sm text-brand-cream/80">
                      <span className="h-1.5 w-1.5 rotate-45 bg-brand-ember" />{f}
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={400}>
                  <a href={waLink(`Namaste SainoX! I'm interested in a ${s.title} invitation.`)} target="_blank" rel="noreferrer" className="group mt-8 inline-flex items-center gap-3 font-lux-sans text-xs uppercase tracking-[0.3em] text-brand-gold">
                    <span className="link-line">Ask about {s.title}</span><ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-32"><CtaButtons center /></div>
      </section>
    </>
  );
}
