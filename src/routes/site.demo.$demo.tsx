import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Embers, KnotMandala, PrimaryButton } from "@/components/site/SiteChrome";
import { DEMOS } from "@/components/site/demos";
import { IMG, SERVICE_IMG } from "@/components/site/images";

export const Route = createFileRoute("/site/demo/$demo")({
  loader: ({ params }) => {
    const demo = DEMOS.find((d) => d.slug === params.demo);
    if (!demo) throw notFound();
    return demo;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} demo — SainoX` : "Demo unavailable — SainoX" },
      { name: "description", content: loaderData ? `Live demo of a SainoX ${loaderData.category} digital invitation.` : "This demo is not available." },
      { property: "og:title", content: loaderData ? `${loaderData.title} demo — SainoX` : "Demo unavailable — SainoX" },
      { property: "og:description", content: "A live SainoX digital invitation demo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  notFoundComponent: () => <p className="py-40 text-center font-lux text-2xl">Demo not found. <Link to="/site/portfolio" className="text-brand-ember">Back to portfolio</Link></p>,
  component: DemoPage,
});

function DemoPage() {
  const d = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const img = SERVICE_IMG[d.slug] ?? IMG.wedding;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-20 pt-32">
      <img src={img} alt="" className="animate-ken-burns absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-ink via-brand-ink/70 to-brand-ink" aria-hidden />
      <Embers count={24} />

      <div className="relative w-full max-w-md [perspective:1600px]">
        <KnotMandala className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 opacity-30" />

        {!open ? (
          <button onClick={() => setOpen(true)} className="group relative block w-full animate-brand-rise text-center">
            <div className="arch relative mx-auto flex aspect-[3/4] w-full flex-col items-center justify-center border border-brand-gold/40 bg-brand-ink-raised shadow-brand">
              <span className="arch pointer-events-none absolute inset-3 border border-brand-ember/30" aria-hidden />
              <p className="font-lux-sans text-[10px] uppercase tracking-[0.4em] text-brand-cream/50">An invitation for</p>
              <p className="mt-4 font-lux text-4xl font-light">Guest Name</p>
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
              <p className="font-lux-sans text-[10px] uppercase tracking-[0.4em] text-brand-cream/50">Dear Guest Name,</p>
              <p className="mt-8 font-lux text-4xl text-ember-gold">{d.nepali}</p>
              <h1 className="mt-4 font-lux text-5xl font-light leading-tight">{d.hosts}</h1>
              <span className="mx-auto my-8 block h-px w-20 bg-brand-ember" aria-hidden />
              <p className="font-lux text-xl font-light italic leading-relaxed text-brand-cream/80">{d.message}</p>
              <div className="mt-10 space-y-2">
                <p className="font-lux-sans text-xs uppercase tracking-[0.3em] text-brand-gold">{d.date}</p>
                <p className="font-lux-sans text-sm font-light text-brand-cream/60">{d.venue}</p>
              </div>
              <p className="mt-12 font-lux-sans text-[10px] uppercase tracking-[0.4em] text-brand-cream/35">Demo by SainoX</p>
            </div>
            <div className="mt-10 flex flex-col items-center gap-6">
              <PrimaryButton>Order one like this</PrimaryButton>
              <div className="flex gap-6 font-lux-sans text-[11px] uppercase tracking-[0.3em] text-brand-cream/60">
                <button onClick={() => setOpen(false)} className="hover:text-brand-gold">Replay</button>
                <Link to="/site/portfolio" className="hover:text-brand-gold">← Portfolio</Link>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
