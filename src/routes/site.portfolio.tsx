import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { CtaButtons, PageHero, Reveal } from "@/components/site/SiteChrome";
import { DEMOS, type Demo } from "@/components/site/demos";
import { IMG, SERVICE_IMG } from "@/components/site/images";
import { siteHead } from "@/components/site/meta";

export const Route = createFileRoute("/site/portfolio")({
  head: () => siteHead("Portfolio", "Preview SainoX digital invitation designs and open live demos for weddings, bratabandha, anniversaries and birthdays."),
  component: Portfolio,
});

function TiltCard({ d }: { d: Demo }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Link to="/site/demo/$demo" params={{ demo: d.slug }} data-cursor className="group block [perspective:1200px]">
      <div
        ref={ref}
        className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        onMouseMove={(e) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`; }}
        onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}
      >
        <div className="img-zoom arch relative aspect-[3/4.3] border border-brand-line">
          <img src={SERVICE_IMG[d.slug] ?? IMG.wedding} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/55 to-brand-ink/10" />
          <span className="arch pointer-events-none absolute inset-3 border border-brand-gold/30" aria-hidden />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center [transform:translateZ(40px)]">
            <p className="font-lux text-sm text-brand-cream/60">Dear Guest,</p>
            <p className="mt-6 font-lux text-3xl text-brand-flame md:text-4xl">{d.nepali}</p>
            <p className="mt-4 font-lux text-4xl font-light md:text-5xl">{d.hosts}</p>
            <span className="my-6 h-px w-16 bg-brand-ember" />
            <p className="font-lux-sans text-xs uppercase tracking-[0.25em] text-brand-cream/70">{d.date}</p>
            <p className="mt-2 font-lux-sans text-xs text-brand-cream/50">{d.venue}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between border-b border-brand-line pb-4">
        <div>
          <p className="font-lux-sans text-[10px] uppercase tracking-[0.35em] text-brand-ember">{d.category}</p>
          <p className="mt-1 font-lux text-3xl font-light">{d.title}</p>
        </div>
        <span className="link-line font-lux-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold">Live demo</span>
      </div>
    </Link>
  );
}

function Portfolio() {
  return (
    <>
      <PageHero index="02" eyebrow="Portfolio" title={["Invitations,", <em key="e" className="text-ember-gold">experienced.</em>]} sub="Open a demo to see an invitation exactly as your guests would — greeting, story, date and venue." image={IMG.bride} />
      <section className="pb-32">
        <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-20 px-6 sm:grid-cols-2 md:px-10">
          {DEMOS.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 2) * 150} className={i % 2 ? "sm:mt-32" : ""}><TiltCard d={d} /></Reveal>
          ))}
        </div>
        <div className="mt-32"><CtaButtons center /></div>
      </section>
    </>
  );
}
