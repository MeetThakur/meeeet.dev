"use client";

import { useState } from "react";
import { resumeData } from "../data/resumeData";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

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

  return (
    <section id="contact" className="py-32 px-4 pb-40 max-w-3xl mx-auto relative flex justify-center overflow-hidden">
      
      {/* Premium Letter Graphic */}
      <motion.div 
        initial={{ opacity: 0, y: 30, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-white dark:bg-[#252528] p-10 md:p-14 shadow-xl border border-black/10 dark:border-white/10 mt-10 hover:rotate-0 transition-transform duration-500"
      >
        
        {/* Subtle top tape */}
        <div className="masking-tape"></div>

        {/* Realistic Stamp */}
        <div className="absolute top-6 right-6 w-16 h-20 border-2 border-dotted border-red-500/60 dark:border-neon-pink/40 opacity-80 flex flex-col items-center justify-center p-1 rotate-[4deg]">
          <span className="font-sketch text-xs uppercase tracking-[0.2em] text-red-500/80 dark:text-neon-pink/60">POST</span>
          <span className="text-2xl mt-1 opacity-70">✉</span>
          <div className="absolute inset-0 bg-red-500/5 mix-blend-multiply dark:mix-blend-screen"></div>
        </div>

        <h2 className="font-serif font-medium italic text-5xl md:text-7xl mb-8 leading-none tracking-tight text-ink-dark dark:text-ink-light">
          Let's talk.
        </h2>
        
        <p className="font-sans text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-sm">
          If you are looking for a developer who builds things with care, or just want to say hi, my inbox is open.
        </p>

        {formState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="font-sketch text-2xl text-ink-dark dark:text-ink-light mb-2">Message sent!</h3>
            <p className="font-sans text-slate-500 dark:text-slate-400 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
            <button
              onClick={() => setFormState("idle")}
              className="font-sketch text-lg text-ink-blue dark:text-neon-pink hover:underline decoration-wavy"
            >
              Send another message →
            </button>
          </motion.div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6 font-sketch text-xl w-full relative z-10"
          >
            <div className="flex flex-col relative">
              <label htmlFor="name" className="text-slate-500 mb-1 text-lg">Dear Meet,</label>
              <input 
                type="text" 
                name="name"
                id="name" 
                placeholder="My name is..." 
                required
                disabled={formState === "sending"}
                className="bg-transparent border-none outline-none border-b-2 border-black/10 dark:border-white/10 focus:border-ink-blue dark:focus:border-neon-pink focus:ring-0 text-ink-dark dark:text-ink-light placeholder:text-black/20 dark:placeholder:text-white/20 px-1 py-1 transition-colors w-full disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col relative">
              <input 
                type="email" 
                name="email"
                id="email" 
                placeholder="My email is..." 
                required
                disabled={formState === "sending"}
                className="bg-transparent border-none outline-none border-b-2 border-black/10 dark:border-white/10 focus:border-ink-blue dark:focus:border-neon-pink focus:ring-0 text-ink-dark dark:text-ink-light placeholder:text-black/20 dark:placeholder:text-white/20 px-1 py-1 transition-colors w-full disabled:opacity-50"
              />
            </div>
            
            <div className="flex flex-col relative mt-2">
              <textarea 
                name="message"
                id="message" 
                placeholder="I wanted to reach out because..." 
                required
                rows={4}
                disabled={formState === "sending"}
                className="bg-transparent border-none outline-none border-b-2 border-black/10 dark:border-white/10 focus:border-ink-blue dark:focus:border-neon-pink focus:ring-0 text-ink-dark dark:text-ink-light placeholder:text-black/20 dark:placeholder:text-white/20 px-1 py-1 resize-none transition-colors custom-scrollbar w-full disabled:opacity-50"
                style={{
                  lineHeight: '32px',
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.05) 31px, rgba(0,0,0,0.05) 32px)'
                }}
              />
            </div>

            {formState === "error" && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="font-sans text-sm text-red-500 dark:text-red-400"
              >
                Something went wrong. Please try again or email me directly.
              </motion.p>
            )}
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-4 font-sans text-sm font-bold uppercase tracking-wider text-slate-400 flex-wrap">
                <a href={resumeData.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-ink-blue dark:hover:text-neon-blue transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href={resumeData.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ink-blue dark:hover:text-neon-blue transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href={resumeData.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode" className="hover:text-ink-blue dark:hover:text-neon-blue transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.75 9.75a1.375 1.375 0 0 0 0 1.943l1.156 1.157a1.375 1.375 0 0 0 1.943 0L14.75 4.382a1.375 1.375 0 0 0 0-1.943L13.628.562A1.36 1.36 0 0 0 12.83 0zm4.188 5.625a1.37 1.37 0 0 0-.973.402L8.532 14.195a1.375 1.375 0 0 0 0 1.943l1.156 1.156a1.375 1.375 0 0 0 1.943 0l8.167-8.168a1.375 1.375 0 0 0 0-1.943l-1.156-1.156a1.375 1.375 0 0 0-.973-.402zm-6.188 6a1.37 1.37 0 0 0-.973.402L2.35 20.195a1.375 1.375 0 0 0 0 1.943l1.156 1.156a1.375 1.375 0 0 0 1.943 0l8.167-8.168a1.375 1.375 0 0 0 0-1.943l-1.156-1.156a1.375 1.375 0 0 0-.973-.402z"/></svg>
                </a>
                <a href={resumeData.chesscom} target="_blank" rel="noreferrer" aria-label="Chess.com" className="hover:text-ink-blue dark:hover:text-neon-blue transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C10.34 2 9 3.34 9 5c0 1.25.77 2.32 1.85 2.78C10.31 8.8 10 9.87 10 11c0 1.76 1.15 3.26 2.75 3.82C11.53 15.65 10 17.65 10 20v2h4v-2c0-2.35-1.53-4.35-2.75-5.18C12.85 14.26 14 12.76 14 11c0-1.13-.31-2.2-.85-3.22C14.23 7.32 15 6.25 15 5c0-1.66-1.34-3-3-3zM12 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 6c1.1 0 2 1.34 2 3s-.9 3-2 3-2-1.34-2-3 .9-3 2-3z"/></svg>
                </a>
                <a href={resumeData.duolingo} target="_blank" rel="noreferrer" aria-label="Duolingo" className="hover:text-ink-blue dark:hover:text-neon-blue transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M14.484 18.213c1.142 1.033 2.657 1.662 4.316 1.662l.294-.001c1.985-.038 3.749-.976 4.905-2.422v1.98c0 2.522-2.043 4.568-4.567 4.568H4.569C2.045 23.998.002 21.954.002 19.43v-1.92c1.181 1.443 2.976 2.365 4.985 2.365l.35-.001c1.61-.027 3.076-.646 4.191-1.648.555.764 1.456 1.26 2.473 1.26 1.023 0 1.928-.502 2.483-1.273zm-5.349-.996c-.989 1.022-2.375 1.658-3.909 1.658h-.239c-2.229 0-4.146-1.343-4.987-3.262v-7.16c.281-.64.68-1.216 1.169-1.699-.035-.731.132-1.469.511-2.128.256-.44.867-.504 1.21-.124l.766.851c.007-.003.014-.003.021-.005-.098-.78.037-1.587.419-2.308.24-.45.757-.53 1.114-.164 0 0 3.939 3.979 4.035 4.084 1.542 1.348 4.066 1.287 5.686-.18.002-.003.007-.005.009-.007.042-.042 3.855-3.9 3.855-3.9.3361-.3451.8619-.3101 1.113.164.385.724.518 1.535.417 2.32.002.001.003.001.004.002l.007.002c.001 0 .002 0 .003.001l.776-.86c.342-.38.954-.316 1.207.124.387.673.553 1.427.509 2.173.496.501.897 1.099 1.169 1.762v6.941c-.816 1.978-2.761 3.373-5.032 3.373H18.8c-1.547 0-2.945-.648-3.936-1.686a.8386.8386 0 0 0-.009-.067c.313-.017.528-.162.688-.33.152-.16.299-.397.299-.776 0 0-.022-.312-.024-.324.693.767 1.696 1.249 2.811 1.249 2.092 0 3.787-1.696 3.787-3.787v-2.243c0-2.092-1.697-3.787-3.787-3.787-2.093 0-3.787 1.695-3.787 3.787v2.243c0 .266.027.526.079.776-.712-.784-1.744-1.278-2.842-1.278-1.239 0-2.339.523-3.064 1.355.063-.274.097-.56.097-.853v-2.243c0-2.092-1.697-3.787-3.788-3.787-2.09 0-3.787 1.695-3.787 3.787v2.243c0 2.093 1.697 3.787 3.787 3.787 1.151 0 2.182-.513 2.876-1.322-.008.035-.039.395-.039.395 0 .378.147.616.298.775.16.168.374.312.688.331a.7783.7783 0 0 0-.012.097zm.997.073c.729.131 1.733.305 1.792.305h.157c.059 0 1.789-.303 1.789-.303-.327.705-1.041 1.194-1.869 1.194-.829 0-1.543-.49-1.869-1.196zm-.971-1.379c.246-1.313 1.462-2.259 2.918-2.259 1.324 0 2.521.97 2.763 2.259v.105c0 .082-.029.115-.103.106l-2.658.473h-.157l-2.66-.476c-.075.01-.103-.023-.103-.105Zm8.023-6.392c.255-.14.549-.22.861-.22.992 0 1.798.804 1.798 1.798v1.919c0 .991-.804 1.797-1.798 1.797-.991 0-1.797-.803-1.797-1.797v-1.542c.034.003.068.005.103.005.64 0 1.16-.518 1.16-1.156 0-.312-.125-.596-.327-.804zM5.162 9.461c.227-.104.48-.162.746-.162.991 0 1.798.804 1.798 1.798v1.919c0 .991-.804 1.797-1.798 1.797-.991 0-1.797-.803-1.797-1.797v-1.571c.089.022.182.034.278.034.641 0 1.16-.518 1.16-1.156 0-.342-.149-.65-.387-.862ZM.002 6.554V4.568C.002 2.044 2.045 0 4.569 0h14.865c2.522 0 4.565 2.044 4.565 4.568v2.041a5.1847 5.1847 0 0 0-.164-.197 4.8592 4.8592 0 0 0-.646-2.284c-.433-.754-1.315-1.037-2.07-.786a4.785 4.785 0 0 0-.327-.774h-.001c-.287-.54-.758-.835-1.248-.908-.493-.073-1.033.072-1.464.515l-3.82 3.864c-1.226 1.11-3.127 1.199-4.313.205-.103-.109-4.025-4.071-4.025-4.071-.427-.438-.966-.584-1.46-.51-.489.073-.961.367-1.248.907v.002c-.133.25-.241.508-.327.771-.753-.252-1.635.029-2.071.782 0 0-.001.001-.001.002-.4.694-.613 1.459-.645 2.23-.057.065-.113.13-.167.197z"/></svg>
                </a>
                <a href={`mailto:${resumeData.email}`} aria-label="Email" className="hover:text-ink-blue dark:hover:text-neon-blue transition-colors">
                  <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
              
              <button 
                type="submit"
                disabled={formState === "sending"}
                className="group px-6 py-2 border-2 border-ink-dark dark:border-ink-light text-ink-dark dark:text-ink-light rounded-full font-sans font-bold text-base hover:bg-ink-dark hover:text-white dark:hover:bg-ink-light dark:hover:text-black transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === "sending" ? (
                  <>Sending<span className="animate-pulse">...</span></>
                ) : (
                  <>Send <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">✈️</span></>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-16 pt-8 border-t border-dashed border-slate-200 dark:border-slate-800 text-right">
          <span className="font-handwritten text-4xl text-ink-dark dark:text-ink-light opacity-90 transform -rotate-2 inline-block">
            {resumeData.name}
          </span>
        </div>
      </motion.div>
    </section>
  );
};
