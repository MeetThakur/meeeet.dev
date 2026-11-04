"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { resumeData } from "../data/resumeData";
import { BrandIcon, type Brand } from "./Icons";
import { Magnetic, SectionLabel, SplitReveal, ease, useSpotlight } from "./ui/motion";

const socials: { name: string; href: string; icon: Brand }[] = [
  { name: "GitHub", href: resumeData.github, icon: "github" },
  { name: "LinkedIn", href: resumeData.linkedin, icon: "linkedin" },
  { name: "LeetCode", href: resumeData.leetcode, icon: "leetcode" },
];

const Field = ({
  id,
  label,
  textarea,
  ...props
}: { id: string; label: string; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const base =
    "peer w-full bg-transparent border-0 border-b border-line-strong pt-6 pb-2 text-lg outline-none focus:border-accent transition-colors placeholder-transparent disabled:opacity-50";
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={id} placeholder={label} rows={4} className={`${base} resize-none`} {...props} />
      ) : (
        <input id={id} name={id} placeholder={label} className={base} {...props} />
      )}
      {/* Floating label: rests in the field, lifts when focused or filled */}
      <label
        htmlFor={id}
        className="absolute left-0 top-1 text-xs font-mono uppercase tracking-[0.15em] text-muted transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-xs peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:text-accent"
      >
        {label}
      </label>
    </div>
  );
};

export const ContactSection = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const onMove = useSpotlight();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mlgwqolj", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setFormState("success");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(resumeData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${resumeData.email}`;
    }
  };

  const sending = formState === "sending";

  return (
    <section id="contact" className="relative py-28 md:py-40 px-5 md:px-10 max-w-7xl mx-auto">
      <SectionLabel index="05">Contact</SectionLabel>

      <div className="mt-10 grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20">
        <div>
          <h2 className="text-6xl md:text-8xl font-semibold tracking-[-0.05em] leading-[0.9]">
            <SplitReveal text="Let's build" />
            <br />
            <SplitReveal text="something" delay={0.1} className="font-serif italic font-normal tracking-tight" />
            <br />
            <SplitReveal text="great." delay={0.2} />
          </h2>

          <p className="mt-8 max-w-md text-lg text-fg-soft leading-relaxed">
            Open to internships, full-time roles and interesting side projects. Drop a note — I usually reply within a day.
          </p>

          {/* Email with copy-to-clipboard */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${resumeData.email}`}
              className="text-xl md:text-2xl font-medium tracking-tight link-draw"
            >
              {resumeData.email}
            </a>
            <button
              onClick={copyEmail}
              className="relative w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted hover:text-fg hover:border-line-strong transition-colors"
              aria-label="Copy email address"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "done" : "copy"}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-fg text-bg text-xs px-2.5 py-1"
                    role="status"
                  >
                    Copied
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <ul className="mt-12 flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.name}>
                <Magnetic strength={0.25}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 h-11 pl-4 pr-3 rounded-full border border-line hover:border-fg transition-colors"
                  >
                    <BrandIcon name={s.icon} className="w-4 h-4" />
                    <span className="text-sm font-medium">{s.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-accent group-hover:rotate-45 transition-all duration-300" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          onMouseMove={onMove}
          className="spotlight rounded-[2rem] p-7 md:p-10 self-start"
        >
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                  className="mx-auto w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center"
                >
                  <Check className="w-7 h-7" />
                </motion.div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">Message sent</h3>
                <p className="mt-2 text-fg-soft">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 text-sm font-medium link-draw"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Send a message</div>
                <Field id="name" label="Your name" type="text" autoComplete="name" required disabled={sending} />
                <Field id="email" label="Email address" type="email" autoComplete="email" required disabled={sending} />
                <Field id="message" label="What's on your mind?" textarea required disabled={sending} />

                {formState === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-rose-500"
                    role="alert"
                  >
                    Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="group relative self-start inline-flex items-center gap-3 h-12 pl-6 pr-2 rounded-full bg-fg text-bg font-medium overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  <span className="relative">{sending ? "Sending…" : "Send message"}</span>
                  <span className="relative w-8 h-8 rounded-full bg-bg text-fg flex items-center justify-center">
                    <Send className={`w-3.5 h-3.5 transition-transform duration-500 ${sending ? "translate-x-6 -translate-y-6" : "group-hover:rotate-12"}`} />
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
