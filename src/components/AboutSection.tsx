"use client";

import { ScrollText, SectionLabel, SplitReveal } from "./ui/motion";

// Words prefixed with * render in the accent serif
const statement =
  "I'm a CS undergrad who likes turning messy problems into *calm, *reliable software. At Eightfold AI I build LLM-powered systems — ticket routing across 42 engineering teams, a secure Slack HR assistant — and the data pipelines underneath them. Off the clock I ship my own products, and I train on *algorithms because sharp problem solving makes everything else easier.";

export const AboutSection = () => (
  <section id="about" className="relative py-28 md:py-40 px-5 md:px-10 max-w-7xl mx-auto">
    <SectionLabel index="01">About</SectionLabel>

    <div className="mt-10 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
        <SplitReveal text="A little" />
        <br />
        <SplitReveal text="about me" delay={0.12} className="font-serif italic font-normal" />
      </h2>
      <ScrollText
        text={statement}
        className="text-2xl md:text-[2.1rem] leading-[1.3] tracking-tight font-medium"
      />
    </div>
  </section>
);
