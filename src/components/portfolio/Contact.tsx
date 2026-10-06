import { Github, Instagram, Linkedin, Mail, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { LINKS } from "@/lib/portfolio-data";
import { SectionHeading } from "./Reveal";
import contactHandshakeImg from "@/assets/contact-handshake.png";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: LINKS.linkedin },
  { icon: Github, label: "GitHub", href: LINKS.github },
  { icon: Instagram, label: "Instagram", href: LINKS.instagram },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 py-20 bg-[#FFF9EC] text-[#24221D]">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          title="CONTACT"
          subtitle="Let's connect"
        />

        <div className="grid gap-6 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr]">
          {/* Left: profile & collaboration card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col p-7 rounded-2xl border border-[#EDE5CF] bg-[#FFFFFF] text-[#24221D] shadow-[0_8px_30px_rgba(80,60,20,0.06)]"
          >
            {/* Contact Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#FFF9EC] border border-[#EDE5CF]">
              <img
                src={contactHandshakeImg}
                alt="Let's Connect & Collaborate"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-bold tracking-tight text-[#24221D]">Devanshi Chauhan</h3>
              <p className="mt-1 text-xs font-semibold text-[#D9A91A] uppercase tracking-wider">
                Data Analyst · Data Science
              </p>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#6F6A5F]">
                Available for full-time opportunities, research collaborations, and freelance projects. Get in touch directly via email or phone.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <a
                href={`tel:${LINKS.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 text-xs sm:text-sm text-[#24221D]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#FFF9EC] border border-[#EDE5CF] text-[#D9A91A] group-hover:border-[#F4C542] transition-colors">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="transition-colors group-hover:text-[#D9A91A]">{LINKS.phone}</span>
              </a>
              <a
                href={`mailto:${LINKS.email}`}
                className="group flex items-center gap-3 text-xs sm:text-sm text-[#24221D]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#FFF9EC] border border-[#EDE5CF] text-[#D9A91A] group-hover:border-[#F4C542] transition-colors">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="transition-colors group-hover:text-[#D9A91A]">{LINKS.email}</span>
              </a>
            </div>

            <div className="mt-8">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#9A9488]">
                Find me in
              </p>
              <div className="mt-3 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-[#EDE5CF] bg-[#FFF9EC] text-[#24221D] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F4C542] hover:bg-[#FFF3C4] hover:text-[#D9A91A]"
                  >
                    <s.icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 sm:p-9 rounded-2xl border border-[#EDE5CF] bg-[#FFFFFF] text-[#24221D] shadow-[0_8px_30px_rgba(80,60,20,0.06)]"
          >
            <form
              action={`mailto:${LINKS.email}`}
              method="post"
              encType="text/plain"
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6F6A5F]">
                    Your Name
                  </span>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Devanshi Chauhan"
                    className="mt-2 w-full rounded-xl border border-[#EDE5CF] bg-[#FFFDF7] px-4 py-3 text-sm text-[#24221D] outline-none transition-all placeholder:text-[#9A9488]/60 focus:border-[#F4C542] focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6F6A5F]">
                    Phone Number
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="e.g. +91 81406 60894"
                    className="mt-2 w-full rounded-xl border border-[#EDE5CF] bg-[#FFFDF7] px-4 py-3 text-sm text-[#24221D] outline-none transition-all placeholder:text-[#9A9488]/60 focus:border-[#F4C542] focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6F6A5F]">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. devanshiis20051211@gmail.com"
                    className="mt-2 w-full rounded-xl border border-[#EDE5CF] bg-[#FFFDF7] px-4 py-3 text-sm text-[#24221D] outline-none transition-all placeholder:text-[#9A9488]/60 focus:border-[#F4C542] focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6F6A5F]">
                    Subject
                  </span>
                  <input
                    name="subject"
                    required
                    placeholder="e.g. AI / ML Project Inquiry"
                    className="mt-2 w-full rounded-xl border border-[#EDE5CF] bg-[#FFFDF7] px-4 py-3 text-sm text-[#24221D] outline-none transition-all placeholder:text-[#9A9488]/60 focus:border-[#F4C542] focus:bg-white"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6F6A5F]">
                  Your Message
                </span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell me about your project, opportunity, or collaboration ideas..."
                  className="mt-2 w-full resize-none rounded-xl border border-[#EDE5CF] bg-[#FFFDF7] px-4 py-3 text-sm text-[#24221D] outline-none transition-all placeholder:text-[#9A9488]/60 focus:border-[#F4C542] focus:bg-white"
                />
              </label>

              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4C542] px-6 py-3.5 text-sm font-bold text-[#24221D] transition-all duration-300 hover:bg-[#E8B82E] hover:shadow-[0_8px_24px_rgba(244,197,66,0.35)] sm:w-auto cursor-pointer"
              >
                Send Message
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


