"use client";

import { resumeData } from "../data/resumeData";

const items = Array.from(new Set(resumeData.skills.flatMap((g) => g.items))).filter((s) => s.length < 18);

// Two endless rows drifting in opposite directions; pauses while hovered
export const Marquee = () => (
  <div className="relative py-10 md:py-14 border-y border-line overflow-hidden mask-fade-x" aria-hidden="true">
    {[false, true].map((reverse) => (
      <div key={String(reverse)} className="group flex w-max py-2">
        <div
          className={`flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused] ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          }`}
        >
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-3xl md:text-5xl font-semibold tracking-tight whitespace-nowrap">
              <span className={i % 3 === 1 ? "font-serif italic font-normal text-muted" : ""}>{item}</span>
              <span className="w-2 h-2 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);
