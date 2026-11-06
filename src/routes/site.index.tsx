import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Link2, MessageCircle, Mountain, PenTool, RefreshCw, Send, Sparkles as Spark, Gift } from "lucide-react";
import logo from "@/assets/sainox-logo.png.asset.json";
import hero from "@/assets/sainox-hero-night.jpg";
import { CtaButtons, Divider, Embers, KnotMandala, Reveal, SectionTitle } from "@/components/site/SiteChrome";
import { SERVICES, WHY, waLink } from "@/components/site/content";
import { DEMOS } from "@/components/site/demos";
import { siteHead } from "@/components/site/meta";

export const Route = createFileRoute("/site/")({
  head: () => siteHead("Premium Digital Invitations in Nepal", "SainoX designs personalised, animated digital invitations for weddings, bratabandha, anniversaries, birthdays and every special occasion in Nepal."),
  component: Home,
});

const WHY_ICONS = [Heart, Spark, Send, Mountain, RefreshCw, Gift];

const STEPS = [
  { icon: MessageCircle, title: "Share your details", text: "Tell us the occasion, date, venue and the feeling you want guests to have." },
  { icon: PenTool, title: "We design & animate", text: "Our studio crafts your invitation with Nepali motifs, music and graceful motion." },
  { icon: Link2, title: "Send to every guest", text: "Receive personal links for each guest — share on WhatsApp, Viber or Messenger." },
];

function Home() {
  const marquee = [...SERVICES, ...SERVICES];
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <img src={hero} alt="" width={1920} height={1088} className="animate-ken-burns absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="hero-vignette absolute inset-0" aria-hidden />
        <Embers count={28} />
        <div className="brand-weave absolute inset-y-0 left-0 hidden w-10 border-r border-brand-ember/70 md:block" aria-hidden />
        <span className="animate-line-grow absolute inset-y-0 left-14 hidden w-px bg-brand-ember/70 md:block" aria-hidden />

        <div className="relative z-10 flex flex-col items-center px-5 pb-16 pt-28 text-center">
          <div className="relative flex items-center justify-center">
            <KnotMandala className="absolute h-[26rem] w-[26rem] opacity-70 md:h-[40rem] md:w-[40rem]" />
            <span className="ember-dot animate-glow absolute h-56 w-56 opacity-40 blur-3xl md:h-80 md:w-80" aria-hidden />
            <img src={logo.url} alt="SainoX logo" className="animate-logo-reveal relative w-72 md:w-[30rem]" />
          </div>
          <p className="animate-brand-rise mt-6 text-lg tracking-wide text-brand-cream/85 [animation-delay:600ms] md:text-2xl">साथ, सम्भावना, सफलता ।</p>
          <h1 className="animate-brand-rise mt-6 max-w-4xl font-brand text-4xl leading-tight [animation-delay:900ms] md:text-7xl">
            Invitations as <span className="text-brand-shimmer">mesmerising</span> as the moment itself
          </h1>
          <p className="animate-brand-rise mt-6 max-w-2xl text-brand-cream/75 [animation-delay:1200ms] md:text-lg">
            Premium animated digital invitations from Bhaktapur — personal for every guest, rooted in Nepali tradition, shared in a single tap.
          </p>
          <div className="animate-brand-rise mt-9 [animation-delay:1500ms]"><CtaButtons center /></div>
        </div>

        <a href="#occasions" aria-label="Scroll down" className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-cream/50 hover:text-brand-ember">
          <span className="flex h-9 w-5 justify-center rounded-full border border-brand-cream/40 pt-1.5"><span className="animate-scroll-dot h-1.5 w-1 rounded-full bg-brand-ember" /></span>
          <ChevronDown className="h-4 w-4" />
        </a>
      </section>

      {/* MARQUEE */}
      <div className="relative overflow-hidden border-y border-brand-line bg-brand-ink-raised py-5" aria-hidden>
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {marquee.map((s, i) => (
            <span key={i} className="flex items-center gap-12 font-brand text-2xl text-brand-cream/70 md:text-3xl">
              <span><span className="text-brand-ember">{s.nepali}</span> · {s.title}</span>
              <span className="h-2 w-2 rotate-45 border border-brand-ember" />
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="occasions" className="relative py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="What we create" title="For every celebration" sub="From sacred rituals to joyful milestones — each invitation is made to order." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <Link to="/site/services" className="card-glow sheen group block h-full rounded-2xl border border-brand-line bg-brand-ink-raised p-7">
                  <span className="absolute right-5 top-5 h-2 w-2 rotate-45 border border-brand-ember transition-transform duration-500 group-hover:rotate-[225deg] group-hover:bg-brand-ember" aria-hidden />
                  <p className="font-brand text-3xl text-brand-ember">{s.nepali}</p>
                  <h3 className="mt-2 font-brand text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm text-brand-cream/65">{s.blurb}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.25em] text-brand-cream/40 transition-colors group-hover:text-brand-ember">Explore →</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden border-y border-brand-line bg-brand-ink-raised py-24">
        <div className="brand-weave absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="How it works" title="Three steps to a memorable invite" />
          <div className="relative mt-14 grid gap-10 md:grid-cols-3">
            <span className="brand-divider absolute left-[16%] right-[16%] top-8 hidden md:block" aria-hidden />
            {STEPS.map((st, i) => (
              <Reveal key={st.title} delay={i * 150} className="relative text-center">
                <div className="animate-float mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand-ember/60 bg-brand-ink shadow-brand" style={{ animationDelay: `${i * 0.8}s` }}>
                  <st.icon className="h-6 w-6 text-brand-flame" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-brand-ember">Step {i + 1}</p>
                <h3 className="mt-2 font-brand text-2xl">{st.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-brand-cream/65">{st.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="Portfolio" title="Open an invitation" sub="Experience our live demos just as your guests would." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEMOS.map((d, i) => (
              <Reveal key={d.slug} delay={i * 110}>
                <Link to="/site/demo/$demo" params={{ demo: d.slug }} className="card-glow group block overflow-hidden rounded-2xl border border-brand-line bg-brand-ink-raised">
                  <div className="relative flex aspect-[3/4] flex-col items-center justify-center gap-2 overflow-hidden p-5 text-center">
                    <KnotMandala className="absolute -bottom-24 -right-24 h-64 w-64 opacity-30 transition-opacity duration-700 group-hover:opacity-80" />
                    <span className="pointer-events-none absolute inset-3 rounded-xl border border-brand-ember/30 transition-all duration-500 group-hover:inset-2 group-hover:border-brand-ember/70" aria-hidden />
                    <p className="font-brand text-3xl text-brand-ember">{d.nepali}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-brand-cream/60">{d.category}</p>
                    <p className="mt-2 font-brand text-2xl">{d.hosts}</p>
                    <span className="brand-divider w-20" />
                    <p className="text-xs text-brand-cream/60">{d.date}</p>
                  </div>
                  <p className="border-t border-brand-line px-4 py-3 text-sm font-semibold text-brand-ember">View live demo →</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Link to="/site/portfolio" className="text-sm text-brand-ember hover:underline">See full portfolio →</Link></div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-brand-line bg-brand-ink-raised py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="Why SainoX" title="Made with care, shared with ease" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => {
              const Icon = WHY_ICONS[i % WHY_ICONS.length]!;
              return (
                <Reveal key={w.title} delay={i * 80}>
                  <div className="card-glow h-full rounded-2xl border border-brand-line bg-brand-ink p-7">
                    <Icon className="h-6 w-6 text-brand-flame" />
                    <h3 className="mt-4 font-brand text-xl">{w.title}</h3>
                    <p className="mt-2 text-sm text-brand-cream/65">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28 text-center">
        <img src={hero} alt="" loading="lazy" width={1920} height={1088} className="animate-ken-burns absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="hero-vignette absolute inset-0" aria-hidden />
        <Embers count={14} />
        <Reveal className="relative mx-auto max-w-2xl px-5">
          <h2 className="font-brand text-4xl md:text-6xl">Planning a <span className="text-brand-shimmer">celebration?</span></h2>
          <Divider className="my-6" />
          <p className="mb-9 text-brand-cream/75">Tell us your occasion and date — we'll design an invitation your guests will never forget.</p>
          <CtaButtons center />
          <p className="mt-6 text-sm text-brand-cream/50">Prefer to talk? <a href={waLink()} target="_blank" rel="noreferrer" className="text-brand-ember hover:underline">Message us on WhatsApp</a></p>
        </Reveal>
      </section>
    </>
  );
}
