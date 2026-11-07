import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { X, MessageCircle, Send, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import logoUrl from "@/assets/sainox-logo.webp";
import { CONTACT, FAQ, NAV, waLink } from "./content";
import { cn } from "@/lib/utils";

export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="h-px w-16 bg-brand-ember/70" />
      <span className="h-2 w-2 rotate-45 border border-brand-ember" />
      <span className="h-px w-16 bg-brand-ember/70" />
    </div>
  );
}

/** Sets data-shown when scrolled into view; children animate via .reveal / .line-mask. */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown] as const;
}

export function Reveal({ children, delay = 0, className, as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "article" | "li" }) {
  const [ref, shown] = useInView<HTMLElement>(0.12);
  return <Tag ref={ref as never} data-shown={shown} className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</Tag>;
}

/** Heading whose lines rise out of a mask, one after another. */
export function Lines({ lines, className, as: Tag = "h2", delay = 0 }: { lines: ReactNode[]; className?: string; as?: "h1" | "h2" | "h3" | "p"; delay?: number }) {
  const [ref, shown] = useInView<HTMLElement>(0.2);
  return (
    <Tag ref={ref as never} data-shown={shown} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask"><span style={{ "--d": `${delay + i * 0.12}s` } as CSSProperties}>{l}</span></span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 font-lux-sans text-[11px] uppercase tracking-[0.35em] text-brand-gold/90", className)}>
      <span className="h-px w-10 bg-brand-ember" aria-hidden />{children}
    </p>
  );
}

/** Element that leans gently toward the pointer. */
export function Magnetic({ children, className, strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className={cn("inline-block transition-transform duration-500 ease-out", className)}
      onMouseMove={(e) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`; }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}
    >{children}</span>
  );
}

/** Image that drifts slower than the page as you scroll. */
export function ParallaxImg({ src, alt, className, speed = 0.12, eager }: { src: string; alt: string; className?: string; speed?: number; eager?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const w = wrap.current, i = img.current;
      if (w && i) { const r = w.getBoundingClientRect(); const off = (r.top + r.height / 2 - window.innerHeight / 2) * -speed; i.style.transform = `translate3d(0, ${off}px, 0) scale(1.18)`; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  return (
    <div ref={wrap} className={cn("relative overflow-hidden", className)}>
      <img ref={img} src={src} alt={alt} loading={eager ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover will-change-transform" style={{ transform: "scale(1.18)" }} />
    </div>
  );
}

/** Text set on a slowly rotating circle. */
export function CircleText({ text, className }: { text: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("animate-spin-slow", className)} aria-hidden>
      <defs><path id="sx-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
      <text fill="var(--brand-cream)" fillOpacity=".75" fontSize="15" letterSpacing="5" fontFamily="Jost, sans-serif"><textPath href="#sx-circle">{text}</textPath></text>
    </svg>
  );
}

export function Embers({ count = 22 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const size = 2 + ((i * 7) % 5);
        const style = { left: `${(i * 37) % 100}%`, bottom: `-${10 + ((i * 13) % 20)}px`, width: size, height: size, "--dur": `${10 + ((i * 5) % 9)}s`, "--delay": `${-((i * 1.7) % 12)}s`, "--drift": `${((i % 5) - 2) * 30}px` } as CSSProperties;
        return <span key={i} className="ember-dot animate-ember absolute" style={style} />;
      })}
    </div>
  );
}

export function KnotMandala({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none">
      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
        <circle cx="200" cy="200" r="190" stroke="var(--brand-ember)" strokeOpacity=".35" strokeDasharray="2 10" />
        <circle cx="200" cy="200" r="160" stroke="var(--brand-gold)" strokeOpacity=".2" />
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={i} x="194" y="22" width="12" height="12" transform={`rotate(${i * 22.5} 200 200) rotate(45 200 28)`} stroke="var(--brand-ember)" strokeOpacity=".5" />
        ))}
      </g>
      <g className="origin-center animate-spin-slower" style={{ transformBox: "fill-box" }}>
        <circle cx="200" cy="200" r="130" stroke="var(--brand-cream)" strokeOpacity=".1" strokeDasharray="30 8" />
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d="M200 75 L210 90 L200 105 L190 90 Z" transform={`rotate(${i * 45} 200 200)`} stroke="var(--brand-gold)" strokeOpacity=".45" />
        ))}
      </g>
    </svg>
  );
}

export function SectionTitle({ eyebrow, title, sub, align = "left" }: { eyebrow: string; title: ReactNode; sub?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center [&_p:first-child]:justify-center")}>
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <Lines lines={[title]} className="mt-6 font-lux text-4xl font-light leading-[1.05] text-brand-cream md:text-6xl" />
      {sub && <Reveal delay={200}><p className="mt-6 max-w-xl font-lux-sans text-base font-light leading-relaxed text-brand-cream/60">{sub}</p></Reveal>}
    </div>
  );
}

export function PrimaryButton({ to = "/site/contact", children = "Begin your invitation" }: { to?: "/site/contact"; children?: ReactNode }) {
  return (
    <Magnetic>
      <Link to={to} className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand-ember px-8 py-4 font-lux-sans text-xs font-medium uppercase tracking-[0.25em] text-brand-cream shadow-brand">
        <span className="absolute inset-0 -translate-x-full bg-brand-flame transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-x-0" aria-hidden />
        <span className="relative">{children}</span>
        <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
      </Link>
    </Magnetic>
  );
}

export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Magnetic>
      <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-brand-cream/25 px-8 py-4 font-lux-sans text-xs font-medium uppercase tracking-[0.25em] text-brand-cream transition-colors duration-500 hover:border-brand-gold hover:text-brand-gold">
        <MessageCircle className="h-4 w-4" />{children}
      </a>
    </Magnetic>
  );
}

export function CtaButtons({ center }: { center?: boolean }) {
  return (
    <div className={cn("flex flex-wrap gap-4", center && "justify-center")}>
      <PrimaryButton />
      <GhostButton href={waLink()}>WhatsApp us</GhostButton>
    </div>
  );
}

/** Editorial opening for inner pages. */
export function PageHero({ index, eyebrow, title, sub, image }: { index: string; eyebrow: string; title: ReactNode[]; sub?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="lux-glow pointer-events-none absolute inset-0" aria-hidden />
      <span className="pointer-events-none absolute -right-6 top-20 select-none font-lux text-[34vw] font-light leading-none text-outline md:-right-10 md:text-[22vw]" aria-hidden>{index}</span>
      <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-6 md:grid-cols-[1.4fr_1fr] md:px-10">
        <div>
          <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Lines as="h1" lines={title} className="mt-8 font-lux text-[13vw] font-light leading-[0.95] tracking-tight text-brand-cream md:text-[6.5rem]" />
          {sub && <Reveal delay={400}><p className="mt-8 max-w-lg font-lux-sans text-lg font-light leading-relaxed text-brand-cream/60">{sub}</p></Reveal>}
        </div>
        {image && (
          <Reveal delay={300} className="hidden md:block">
            <div className="relative ml-auto w-full max-w-sm">
              <ParallaxImg src={image} alt="" eager className="arch aspect-[3/4] w-full" />
              <span className="arch pointer-events-none absolute -inset-3 border border-brand-gold/30" aria-hidden />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Preloader() {
  const [gone, setGone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGone(true), 2500); return () => clearTimeout(t); }, []);
  if (gone) return null;
  return (
    <div className="animate-curtain fixed inset-0 z-[80] flex flex-col items-center justify-center bg-brand-ink" aria-hidden>
      <img src={logoUrl} alt="" className="animate-preload-logo h-24 w-auto md:h-32" />
      <span className="animate-preload-line mt-8 h-px w-48 bg-brand-ember" />
    </div>
  );
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, big = false, raf = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; big = !!(e.target as HTMLElement)?.closest?.("a,button,[data-cursor]"); };
    const tick = () => {
      cx += (x - cx) * 0.16; cy += (y - cy) * 0.16;
      if (dot.current) { dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${big ? 2.4 : 1})`; dot.current.style.opacity = "1"; }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={dot} className="lux-cursor pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-brand-gold/60 opacity-0 mix-blend-difference transition-[width,height,opacity] duration-300" style={{ transition: "transform .25s cubic-bezier(.2,.8,.2,1), opacity .3s" }} aria-hidden />;
}

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => { const h = document.documentElement; const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight); if (bar.current) bar.current.style.transform = `scaleX(${p})`; };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div ref={bar} className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-brand-ember via-brand-flame to-brand-gold" style={{ transform: "scaleX(0)" }} aria-hidden />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { const on = () => setScrolled(window.scrollY > 40); on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on); }, []);
  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-[55] transition-all duration-700", scrolled && !open ? "bg-brand-ink/70 py-2 backdrop-blur-xl" : "bg-transparent py-4")}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <Link to="/site" className="relative z-10" aria-label="SainoX home">
            <img src={logoUrl} alt="SainoX" className={cn("w-auto transition-all duration-700", scrolled ? "h-10" : "h-12")} />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.slice(1).map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="link-line font-lux-sans text-[11px] uppercase tracking-[0.28em] text-brand-cream/70 transition-colors hover:text-brand-cream data-[status=active]:text-brand-gold">{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/site/contact" className="hidden rounded-full border border-brand-gold/40 px-5 py-2.5 font-lux-sans text-[11px] uppercase tracking-[0.25em] text-brand-gold transition-colors duration-500 hover:bg-brand-gold hover:text-brand-ink md:inline-block">Enquire</Link>
            <button className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
              <span className={cn("h-px w-6 bg-brand-cream transition-transform duration-500", open && "translate-y-[3.5px] rotate-45")} />
              <span className={cn("h-px w-6 bg-brand-cream transition-transform duration-500", open && "-translate-y-[3.5px] -rotate-45")} />
            </button>
          </div>
        </div>
      </header>
      <div className={cn("fixed inset-0 z-50 flex flex-col justify-between bg-brand-ink px-6 pb-10 pt-28 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] lg:hidden", open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]")}>
        <div className="lux-glow pointer-events-none absolute inset-0" aria-hidden />
        <nav className="relative flex flex-col">
          {NAV.map((n, i) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="flex items-baseline gap-4 border-b border-brand-line/60 py-3 font-lux text-4xl font-light text-brand-cream data-[status=active]:text-brand-gold" style={{ transition: `opacity .6s ${0.2 + i * 0.05}s, transform .6s ${0.2 + i * 0.05}s`, opacity: open ? 1 : 0, transform: open ? "none" : "translateY(20px)" }}>
              <span className="font-lux-sans text-xs text-brand-ember">0{i + 1}</span>{n.label}
            </Link>
          ))}
        </nav>
        <div className="relative space-y-1 font-lux-sans text-sm text-brand-cream/60">
          <p>{CONTACT.phoneIntl}</p><p>{CONTACT.email}</p>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-line bg-brand-ink">
      <div className="lux-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Eyebrow>Begin together</Eyebrow>
            <Lines lines={["Let's craft an invitation", <em key="e" className="text-ember-gold">they'll never forget.</em>]} className="mt-6 font-lux text-4xl font-light leading-[1.05] md:text-6xl" />
            <div className="mt-10"><CtaButtons /></div>
          </div>
          <div className="space-y-3 font-lux-sans text-sm">
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-brand-cream/40">Explore</p>
            {NAV.map((n) => <Link key={n.to} to={n.to} className="link-line block w-fit text-brand-cream/70 hover:text-brand-cream">{n.label}</Link>)}
          </div>
          <div className="space-y-4 font-lux-sans text-sm text-brand-cream/70">
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-brand-cream/40">Studio</p>
            <a href={`tel:+977${CONTACT.phone}`} className="flex items-center gap-3 hover:text-brand-gold"><Phone className="h-4 w-4 text-brand-ember" />{CONTACT.phoneIntl}</a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 break-all hover:text-brand-gold"><Mail className="h-4 w-4 shrink-0 text-brand-ember" />{CONTACT.email}</a>
            <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brand-ember" />{CONTACT.location}</p>
            <p className="pt-4 font-lux text-xl italic text-brand-gold/80">साथ, सम्भावना, सफलता ।</p>
          </div>
        </div>
        <p className="mt-20 select-none text-center font-lux text-[24vw] font-light leading-[0.8] tracking-tight text-outline md:text-[17rem]" aria-hidden>sainoX</p>
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-brand-line px-6 py-6 font-lux-sans text-[11px] uppercase tracking-[0.2em] text-brand-cream/40 md:px-10">
        <span>© {new Date().getFullYear()} SainoX — Digital Invitation Studio</span>
        <Link to="/projects" className="hover:text-brand-gold">Studio login</Link>
      </div>
    </footer>
  );
}

type Msg = { from: "bot" | "you"; text: string };
const QUICK = ["Services", "Pricing", "Delivery time", "Personal guest links", "Contact"];

function answer(input: string) {
  const t = input.toLowerCase();
  const hit = FAQ.find((f) => f.q.some((k) => t.includes(k)));
  return hit?.a ?? "Good question! For anything specific, message us on WhatsApp and we'll reply personally.";
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Namaste! 🙏 I'm the SainoX helper. Ask about services, pricing or FAQs." }]);
  const ask = (q: string) => { if (!q.trim()) return; setMsgs((m) => [...m, { from: "you", text: q }, { from: "bot", text: answer(q) }]); setText(""); };
  return (
    <div className="fixed bottom-5 right-5 z-[56] flex flex-col items-end gap-3">
      {open && (
        <div className="animate-brand-rise flex h-[26rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-brand-line bg-brand-ink-raised/95 shadow-brand backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
            <p className="font-lux text-xl text-brand-cream">SainoX Concierge</p>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-brand-cream/60"><X className="h-4 w-4" /></button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-4 font-lux-sans text-sm">
            {msgs.map((m, i) => (
              <p key={i} className={cn("max-w-[85%] rounded-xl px-3 py-2", m.from === "bot" ? "bg-brand-line text-brand-cream" : "ml-auto bg-brand-ember text-brand-cream")}>{m.text}</p>
            ))}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {QUICK.map((q) => <button key={q} onClick={() => ask(q)} className="rounded-full border border-brand-line px-2.5 py-1 text-xs text-brand-cream/70 hover:border-brand-gold">{q}</button>)}
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); ask(text); }} className="flex gap-2 border-t border-brand-line p-3">
            <input value={text} onChange={(e) => setText(e.target.value)} maxLength={200} placeholder="Type a question…" className="flex-1 rounded-full bg-brand-ink px-3 py-2 text-sm text-brand-cream outline-none placeholder:text-brand-cream/40" />
            <button aria-label="Send" className="rounded-full bg-brand-ember p-2 text-brand-cream"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <div className="flex gap-3">
        <a href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-line bg-brand-ink-raised/80 text-success backdrop-blur-md transition hover:border-success"><Phone className="h-5 w-5" /></a>
        <button onClick={() => setOpen(!open)} aria-label="Open chat helper" className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-ember text-brand-cream shadow-brand transition hover:bg-brand-flame"><MessageCircle className="h-5 w-5" /></button>
      </div>
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="grain min-h-screen overflow-x-clip bg-brand-ink font-lux-sans text-brand-cream selection:bg-brand-ember selection:text-brand-cream">
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <Header />
      <main key={pathname} className="animate-fade-in">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
}
