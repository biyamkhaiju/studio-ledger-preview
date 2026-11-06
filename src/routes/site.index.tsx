import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/sainox-logo.png.asset.json";
import bride from "@/assets/site-hero-bride.jpg";
import wedding from "@/assets/site-wedding.jpg";
import ritual from "@/assets/site-ritual.jpg";
import celebration from "@/assets/site-celebration.jpg";
import night from "@/assets/sainox-hero-night.jpg";
import { CircleText, CtaButtons, Embers, Eyebrow, GhostButton, KnotMandala, Lines, ParallaxImg, PrimaryButton, Reveal, SectionTitle } from "@/components/site/SiteChrome";
import { SERVICES, WHY, waLink } from "@/components/site/content";
import { DEMOS } from "@/components/site/demos";
import { siteHead } from "@/components/site/meta";

export const Route = createFileRoute("/site/")({
  head: () => siteHead("Premium Digital Invitations from Nepal", "SainoX crafts animated, personal digital invitations for weddings, bratabandha, anniversaries and every Nepali celebration."),
  component: Home,
});

export const SERVICE_IMG: Record<string, string> = { wedding, engagement: bride, anniversary: celebration, bratabandha: ritual, birthday: celebration, special: ritual };

const OCCASIONS = ["Wedding", "विवाह", "Engagement", "सगाई", "Bratabandha", "व्रतबन्ध", "Anniversary", "वार्षिकोत्सव", "Pasni", "पास्नी", "Birthday", "जन्मदिन"];

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <ServicesIndex />
      <Showcase />
      <WhySplit />
      <Process />
      <FinalCta />
    </>
  );
}

function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = stage.current; if (!el) return;
    const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
    el.style.setProperty("--mx", String(x)); el.style.setProperty("--my", String(y));
  };
  return (
    <section ref={stage} onMouseMove={onMove} className="relative min-h-[100svh] overflow-hidden" style={{ "--mx": 0, "--my": 0 } as CSSProperties}>
      <div className="lux-glow pointer-events-none absolute inset-0" aria-hidden />
      <Embers count={18} />
      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-6 pb-24 pt-32 md:px-10 lg:grid-cols-[1.25fr_1fr] lg:pt-28">
        <div className="relative z-10">
          <div className="animate-fade-in" style={{ "--d": "2.2s" } as CSSProperties}>
            <Eyebrow>Digital invitation studio · Bhaktapur, Nepal</Eyebrow>
          </div>
          <Lines
            as="h1"
            delay={2.3}
            lines={["Invitations", <em key="w" className="font-light text-ember-gold">worthy of</em>, "the moment."]}
            className="mt-8 font-lux text-[17vw] font-light leading-[0.88] tracking-tight text-brand-cream sm:text-[13vw] lg:text-[8.5rem]"
          />
          <div className="animate-fade-in mt-10 max-w-md" style={{ "--d": "2.9s" } as CSSProperties}>
            <p className="font-lux-sans text-base font-light leading-relaxed text-brand-cream/65 md:text-lg">
              Animated, deeply personal digital invitations — rooted in the temples, mountains and rituals of Nepal, and delivered to every guest in a single tap.
            </p>
            <div className="mt-10"><CtaButtons /></div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
          <div className="animate-fade-in relative" style={{ "--d": "2.4s", transform: "translate3d(calc(var(--mx) * -18px), calc(var(--my) * -18px), 0)", transition: "transform .8s cubic-bezier(.2,.8,.2,1)" } as CSSProperties}>
            <svg viewBox="0 0 400 560" className="pointer-events-none absolute -inset-4 z-10 h-[calc(100%+2rem)] w-[calc(100%+2rem)]" fill="none" aria-hidden>
              <path className="animate-arch-draw" d="M2 558 V200 A198 198 0 0 1 398 200 V558 Z" stroke="var(--brand-gold)" strokeOpacity=".5" vectorEffect="non-scaling-stroke" />
            </svg>
            <ParallaxImg src={bride} alt="A bride holding a phone showing a SainoX wedding invitation" eager speed={0.08} className="arch aspect-[5/7] w-full shadow-[0_40px_120px_-30px_var(--brand-ember)]" />
            <div className="arch pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent" aria-hidden />
          </div>
          <div className="absolute -left-6 bottom-10 z-20 h-32 w-32 md:-left-14 md:h-40 md:w-40" style={{ transform: "translate3d(calc(var(--mx) * 26px), calc(var(--my) * 26px), 0)", transition: "transform .8s cubic-bezier(.2,.8,.2,1)" } as CSSProperties}>
            <div className="absolute inset-0 rounded-full bg-brand-ink/80 backdrop-blur-md" />
            <CircleText text="साथ • सम्भावना • सफलता • SAINOX • " className="absolute inset-0" />
            <span className="absolute inset-0 m-auto h-3 w-3 rotate-45 bg-brand-ember" />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-between px-10 font-lux-sans text-[10px] uppercase tracking-[0.35em] text-brand-cream/40 md:flex">
        <span>Personal link for every guest</span><span className="flex items-center gap-3">Scroll <span className="h-px w-12 bg-brand-cream/30" /></span><span>Nepali & English</span>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...OCCASIONS, ...OCCASIONS];
  return (
    <section className="relative border-y border-brand-line py-8" aria-label="Occasions we design for">
      {[false, true].map((rev) => (
        <div key={String(rev)} className="flex overflow-hidden">
          <div className={`${rev ? "animate-marquee-rev" : "animate-marquee"} flex shrink-0 items-center gap-10 whitespace-nowrap pr-10`}>
            {row.map((o, i) => (
              <span key={i} className={`flex items-center gap-10 font-lux text-5xl font-light md:text-7xl ${rev ? "text-outline" : i % 2 ? "italic text-brand-gold/80" : "text-brand-cream/85"}`}>
                {o}<span className="h-2 w-2 rotate-45 bg-brand-ember" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [p, setP] = useState(0);
  const words = "We believe the way you invite someone says as much as the celebration itself. So we craft invitations like heirlooms — personal, graceful, and alive with the spirit of Nepal.".split(" ");
  useEffect(() => {
    const on = () => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); setP(Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.35)))); };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <KnotMandala className="pointer-events-none absolute -right-40 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <Reveal><Eyebrow>Our philosophy</Eyebrow></Reveal>
        <p ref={ref} className="mt-10 font-lux text-4xl font-light leading-[1.15] md:text-[4.2rem]">
          {words.map((w, i) => (
            <span key={i} className="transition-colors duration-300" style={{ color: i / words.length < p ? (w.includes("heirlooms") || w.includes("Nepal") ? "var(--brand-flame)" : "var(--brand-cream)") : "color-mix(in oklab, var(--brand-cream) 14%, transparent)" }}>{w} </span>
          ))}
        </p>
      </div>
    </section>
  );
}

function ServicesIndex() {
  const [hover, setHover] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <section className="relative py-28 md:py-36" onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle eyebrow="What we create" title={<>For every <em className="text-ember-gold">sacred</em> occasion</>} />
          <Reveal><Link to="/site/services" className="link-line font-lux-sans text-xs uppercase tracking-[0.3em] text-brand-gold">All services</Link></Reveal>
        </div>
        <ul className="mt-16 border-t border-brand-line">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 60}>
              <a
                href={waLink(`Namaste SainoX! I'm interested in a ${s.title} invitation.`)} target="_blank" rel="noreferrer"
                onMouseEnter={() => setHover(s.slug)} onMouseLeave={() => setHover(null)}
                className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-brand-line py-8 md:grid-cols-[5rem_1.3fr_1fr_auto] md:py-10"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-brand-ember/15 via-brand-ember/5 to-transparent transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-y-100" aria-hidden />
                <span className="relative font-lux-sans text-xs text-brand-ember">0{i + 1}</span>
                <span className="relative">
                  <span className="block font-lux text-4xl font-light transition-transform duration-700 group-hover:translate-x-4 md:text-6xl">{s.title}</span>
                  <span className="mt-1 block font-lux text-lg italic text-brand-gold/70">{s.nepali}</span>
                </span>
                <span className="relative hidden max-w-sm font-lux-sans text-sm font-light text-brand-cream/55 md:block">{s.blurb}</span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-brand-line transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-ember group-hover:bg-brand-ember"><ArrowUpRight className="h-5 w-5" /></span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
      <div className="pointer-events-none fixed left-0 top-0 z-30 hidden h-72 w-56 overflow-hidden rounded-[10rem_10rem_0_0] shadow-brand transition-[opacity,scale] duration-500 lg:block"
        style={{ transform: `translate3d(${pos.x + 40}px, ${pos.y - 150}px, 0)`, opacity: hover ? 1 : 0, scale: hover ? "1" : "0.8" }} aria-hidden>
        {SERVICES.map((s) => <img key={s.slug} src={SERVICE_IMG[s.slug]} alt="" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500" style={{ opacity: hover === s.slug ? 1 : 0 }} />)}
      </div>
    </section>
  );
}

function Showcase() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setPinned(mq.matches); sync(); mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!pinned) { if (track.current) track.current.style.transform = ""; return; }
    let raf = 0;
    const tick = () => {
      const o = outer.current, t = track.current;
      if (o && t) { const r = o.getBoundingClientRect(); const prog = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight))); t.style.transform = `translate3d(${-prog * (t.scrollWidth - window.innerWidth)}px,0,0)`; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pinned]);
  const imgs = [wedding, ritual, celebration, celebration];
  return (
    <section ref={outer} className="relative lg:h-[320vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <SectionTitle eyebrow="Portfolio" title={<>Open one, <em className="text-ember-gold">as a guest would</em></>} />
        </div>
        <div ref={track} className="mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-6 will-change-transform md:px-10 lg:overflow-visible lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          {DEMOS.map((d, i) => (
            <Link key={d.slug} to="/site/demo/$demo" params={{ demo: d.slug }} data-cursor className="group relative w-[78vw] shrink-0 snap-center sm:w-[22rem]">
              <div className="img-zoom arch relative aspect-[3/4.4] border border-brand-line">
                <img src={imgs[i]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/60 to-brand-ink/20" />
                <span className="arch pointer-events-none absolute inset-3 border border-brand-gold/30" aria-hidden />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="font-lux text-3xl text-brand-flame">{d.nepali}</p>
                  <p className="mt-6 font-lux-sans text-[10px] uppercase tracking-[0.4em] text-brand-cream/60">{d.category}</p>
                  <p className="mt-3 font-lux text-4xl font-light">{d.hosts}</p>
                  <span className="my-5 h-px w-16 bg-brand-ember" />
                  <p className="font-lux-sans text-xs text-brand-cream/70">{d.date}</p>
                  <p className="mt-1 font-lux-sans text-xs text-brand-cream/50">{d.venue}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-lux text-2xl font-light">{d.title}</p>
                <span className="font-lux-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold opacity-60 transition-opacity group-hover:opacity-100">Open →</span>
              </div>
            </Link>
          ))}
          <div className="flex w-[78vw] shrink-0 snap-center flex-col items-center justify-center gap-6 text-center sm:w-[22rem]">
            <p className="font-lux text-4xl font-light">Yours could be next.</p>
            <PrimaryButton>Start yours</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySplit() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionTitle eyebrow="Why SainoX" title={<>More than an <em className="text-ember-gold">invitation</em></>} sub="Every guest is greeted by name. Every detail carries your family's traditions." />
          <Reveal delay={200} className="mt-12 hidden lg:block">
            <ParallaxImg src={ritual} alt="Brass diyo lamp and puja items" className="arch aspect-[4/5] w-4/5" />
          </Reveal>
        </div>
        <ol>
          {WHY.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 60} className="group border-t border-brand-line py-10 last:border-b">
              <div className="flex gap-8">
                <span className="font-lux text-6xl font-light leading-none text-outline transition-colors duration-700 group-hover:text-brand-ember md:text-7xl">0{i + 1}</span>
                <div>
                  <h3 className="font-lux text-3xl font-light md:text-4xl">{w.title}</h3>
                  <p className="mt-3 max-w-md font-lux-sans text-sm font-light leading-relaxed text-brand-cream/60">{w.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const STEPS = [
  { t: "Share your story", d: "Tell us about the occasion, your family and the feeling you want guests to have." },
  { t: "We design & animate", d: "Our studio crafts a bespoke invitation with motifs, music-like motion and your details." },
  { t: "Personal for every guest", d: "Each guest receives their own link that greets them by name." },
  { t: "Send in one tap", d: "Share on WhatsApp, Viber or Messenger — and update details any time." },
];

function Process() {
  return (
    <section className="relative overflow-hidden border-t border-brand-line bg-brand-ink-raised/40 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionTitle eyebrow="How it works" title={<>From your story to <em className="text-ember-gold">every guest</em></>} align="center" />
        <div className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-8">
          <span className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand-ember/60 to-transparent md:block" aria-hidden />
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 150} className="relative text-center">
              <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brand-ember bg-brand-ink font-lux text-lg text-brand-gold">{i + 1}</span>
              <h3 className="mt-8 font-lux text-2xl font-light">{s.t}</h3>
              <p className="mx-auto mt-3 max-w-[16rem] font-lux-sans text-sm font-light leading-relaxed text-brand-cream/55">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <ParallaxImg src={night} alt="" speed={0.2} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-ink via-brand-ink/50 to-brand-ink" aria-hidden />
      <Embers count={14} />
      <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
        <Reveal><img src={logo.url} alt="SainoX" className="mx-auto h-20 w-auto animate-float md:h-28" loading="lazy" /></Reveal>
        <Lines lines={["Your celebration deserves", <em key="e" className="text-ember-gold">a beautiful beginning.</em>]} className="mt-10 font-lux text-5xl font-light leading-[1.02] md:text-8xl" />
        <Reveal delay={300}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <PrimaryButton />
            <GhostButton href={waLink()}>WhatsApp us</GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
