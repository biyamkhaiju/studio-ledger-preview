import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Eyebrow, KnotMandala, PageHero, Reveal } from "@/components/site/SiteChrome";
import { CONTACT, SERVICES, waLink } from "@/components/site/content";
import { IMG } from "@/components/site/images";
import { siteHead } from "@/components/site/meta";

export const Route = createFileRoute("/site/contact")({
  head: () => siteHead("Contact", "Contact SainoX in Katunje, Bhaktapur — call or WhatsApp 9860105891 or send an inquiry for your digital invitation."),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().max(30).regex(/^[0-9+\-\s]*$/, "Use digits only"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(255)]),
  occasion: z.string().max(50),
  event_date: z.string().max(10),
  message: z.string().trim().max(2000),
}).refine((v) => v.phone || v.email, { message: "Add a phone number or email so we can reply", path: ["phone"] });

const field = "peer w-full border-0 border-b border-brand-line bg-transparent px-0 pb-3 pt-6 font-lux-sans text-base font-light text-brand-cream outline-none transition-colors placeholder:text-transparent focus:border-brand-ember [color-scheme:dark]";
const label = "pointer-events-none absolute left-0 top-6 font-lux-sans text-sm font-light text-brand-cream/45 transition-all duration-300 peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.3em]";
const fixedLabel = "block font-lux-sans text-[10px] uppercase tracking-[0.3em] text-brand-cream/45";

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", occasion: "", event_date: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [err, setErr] = useState("");
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { setErr(parsed.error.issues[0]?.message ?? "Please check the form"); return; }
    setErr(""); setState("sending");
    const v = parsed.data;
    const { error } = await supabase.from("inquiries").insert({ ...v, event_date: v.event_date || null });
    if (error) { setErr("Sorry, we couldn't send that. Please try again or WhatsApp us."); setState("idle"); return; }
    setState("sent");
  }

  return (
    <>
      <PageHero index="06" eyebrow="Contact" title={["Let's begin", <em key="e" className="text-ember-gold">your invitation.</em>]} sub="Tell us about your celebration. We usually reply the same day." image={IMG.celebration} />
      <section className="pb-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-[1fr_1.5fr] md:px-10">
          <div className="space-y-10">
            <Reveal>
              <a href={waLink()} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-sm border border-brand-line p-8 transition-colors duration-500 hover:border-brand-ember">
                <KnotMandala className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 opacity-40" />
                <MessageCircle className="h-6 w-6 text-brand-ember" />
                <p className="mt-6 font-lux text-3xl font-light">Fastest on WhatsApp</p>
                <p className="mt-2 font-lux-sans text-sm font-light text-brand-cream/55">Message us and we'll reply with ideas and a quote.</p>
                <span className="mt-6 inline-flex items-center gap-2 font-lux-sans text-[11px] uppercase tracking-[0.3em] text-brand-gold">Start chat <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" /></span>
              </a>
            </Reveal>
            <Reveal delay={150} className="space-y-6 font-lux-sans text-sm font-light">
              <Eyebrow>{CONTACT.name} · Co-founder</Eyebrow>
              <a href={`tel:+977${CONTACT.phone}`} className="flex items-center gap-4 text-lg transition-colors hover:text-brand-gold"><Phone className="h-4 w-4 text-brand-ember" />{CONTACT.phoneIntl}</a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 text-lg transition-colors hover:text-brand-gold"><Mail className="h-4 w-4 text-brand-ember" />{CONTACT.email}</a>
              <p className="flex items-center gap-4 text-lg"><MapPin className="h-4 w-4 text-brand-ember" />{CONTACT.location}</p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            {state === "sent" ? (
              <div role="status" className="relative flex min-h-[28rem] flex-col items-center justify-center overflow-hidden rounded-sm border border-brand-ember/50 p-10 text-center">
                <KnotMandala className="pointer-events-none absolute h-[32rem] w-[32rem] opacity-30" />
                <p className="relative font-lux text-6xl text-ember-gold">धन्यवाद</p>
                <p className="relative mt-4 font-lux text-3xl font-light">Thank you</p>
                <p className="relative mt-4 max-w-sm font-lux-sans text-sm font-light text-brand-cream/60">Your inquiry has reached SainoX. We'll contact you very soon.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <label className="relative sm:col-span-2"><input className={field} placeholder="Your name" value={form.name} onChange={set("name")} maxLength={100} /><span className={label}>Your name *</span></label>
                <label className="relative"><input className={field} placeholder="Phone" value={form.phone} onChange={set("phone")} maxLength={30} /><span className={label}>Phone / WhatsApp</span></label>
                <label className="relative"><input type="email" className={field} placeholder="Email" value={form.email} onChange={set("email")} maxLength={255} /><span className={label}>Email</span></label>
                <label><span className={fixedLabel}>Occasion</span>
                  <select className={`${field} pt-3`} value={form.occasion} onChange={set("occasion")}>
                    <option value="" className="bg-brand-ink">Choose one</option>
                    {SERVICES.map((s) => <option key={s.slug} value={s.title} className="bg-brand-ink">{s.title}</option>)}
                  </select>
                </label>
                <label><span className={fixedLabel}>Event date</span><input type="date" className={`${field} pt-3`} value={form.event_date} onChange={set("event_date")} /></label>
                <label className="relative sm:col-span-2"><textarea className={`${field} min-h-32 resize-none`} placeholder="Message" value={form.message} onChange={set("message")} maxLength={2000} /><span className={label}>Tell us about your event</span></label>
                {err && <p role="alert" className="font-lux-sans text-sm text-danger sm:col-span-2">{err}</p>}
                <div className="sm:col-span-2">
                  <button disabled={state === "sending"} className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand-ember px-10 py-4 font-lux-sans text-xs font-medium uppercase tracking-[0.25em] text-brand-cream shadow-brand disabled:opacity-60">
                    <span className="absolute inset-0 -translate-x-full bg-brand-flame transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-x-0" aria-hidden />
                    <span className="relative">{state === "sending" ? "Sending…" : "Send inquiry"}</span>
                    <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
