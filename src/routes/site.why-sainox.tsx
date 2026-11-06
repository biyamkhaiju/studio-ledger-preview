import { createFileRoute } from "@tanstack/react-router";
import { CtaButtons, Lines, PageHero, ParallaxImg, Reveal } from "@/components/site/SiteChrome";
import { WHY } from "@/components/site/content";
import { IMG } from "@/components/site/images";
import { siteHead } from "@/components/site/meta";

export const Route = createFileRoute("/site/why-sainox")({
  head: () => siteHead("Why SainoX", "Personalised guest links, graceful animations, easy sharing and memorable experiences — why families choose SainoX."),
  component: Why,
});

function Why() {
  return (
    <>
      <PageHero index="03" eyebrow="Why SainoX" title={["More than", <em key="e" className="text-ember-gold">an invitation.</em>]} sub="We blend Nepali tradition with modern craft so every guest feels personally welcomed." image={IMG.ritual} />
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid border-t border-brand-line md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 120} className="group relative border-b border-brand-line p-8 md:border-r md:p-12 [&:nth-child(3n)]:lg:border-r-0">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-brand-ember/15 to-transparent transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-y-100" aria-hidden />
                <p className="relative font-lux text-7xl font-light leading-none text-outline transition-colors duration-700 group-hover:text-brand-ember">0{i + 1}</p>
                <h3 className="relative mt-10 font-lux text-3xl font-light">{w.title}</h3>
                <p className="relative mt-4 font-lux-sans text-sm font-light leading-relaxed text-brand-cream/60">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2 md:px-10">
          <ParallaxImg src={IMG.celebration} alt="Candle-lit celebration" className="arch aspect-[4/5] w-full max-w-md" />
          <div>
            <Lines lines={["A keepsake your", "family will", <em key="e" className="text-ember-gold">return to.</em>]} className="font-lux text-5xl font-light leading-[1.02] md:text-7xl" />
            <Reveal delay={300}><p className="mt-8 max-w-md font-lux-sans text-lg font-light text-brand-cream/60">Long after the last guest leaves, your invitation stays — a beautiful memory of the day, ready to revisit.</p></Reveal>
            <Reveal delay={400} className="mt-10"><CtaButtons /></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
