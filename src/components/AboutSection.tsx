"use client";

import { resumeData } from "../data/resumeData";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-4 md:px-20 max-w-6xl mx-auto relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">
        
        {/* Left: Polaroid Photo */}
        <motion.div 
          initial={{ opacity: 0, x: -50, rotate: -10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full md:w-1/3 flex justify-center relative"
        >
          <div className="polaroid w-full max-w-xs rotate-[-3deg] hover:rotate-[0deg] transition-transform duration-500 group">
            <div className="masking-tape"></div>
            
            {/* Photo Placeholder */}
            <div className="aspect-[4/5] w-full bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center border border-black/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"></div>
              {/* Fallback pattern if image doesn't load */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
            </div>
            
            <div className="mt-6 text-center font-sketch text-2xl text-slate-600 dark:text-slate-400">
              Me in my element
            </div>
          </div>
        </motion.div>

        {/* Right: Bio Text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-2/3 relative"
        >
          <h2 className="font-serif font-medium italic text-5xl md:text-7xl mb-8 tracking-tight text-ink-dark dark:text-ink-light">
            About Me.
          </h2>
          
          <div className="relative">
            {/* Hand-drawn quote marker */}
            <span className="absolute -left-8 -top-4 font-sketch text-6xl text-highlighter-pink/50">"</span>
            
            <div className="font-sans text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-light space-y-6">
              <p>
                I'm Meet — a developer who loves turning ideas into real, working products. Whether it's a full-stack web app or a mobile experience, I care about getting the details right.
              </p>
              <p>
                I spend my time building with the <span className="highlight-text font-medium text-black dark:text-white" style={{ '--highlight-color': 'var(--color-highlighter-blue)' } as React.CSSProperties}>MERN stack and React Native</span>, diving into algorithms, and occasionally taking projects from zero to deployed. I've also had the chance to present research and compete in national hackathons.
              </p>
              <p>
                Outside of code, I'm usually grinding <span className="font-sketch text-3xl mx-1 text-ink-dark dark:text-ink-light">competitive programming</span> or exploring something new that caught my curiosity.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-6 items-center sm:items-start opacity-90 hover:opacity-100 transition-opacity">
            {/* LeetCode Stats */}
            <div className="bg-white/60 dark:bg-black/20 backdrop-blur-sm p-1.5 rounded-xl shadow-sm border border-black/5 dark:border-white/5 hover:scale-105 hover:rotate-1 transition-transform duration-300">
              <a href={resumeData.leetcode} target="_blank" rel="noreferrer">
                <img 
                  src="https://leetcard.jacoblin.cool/MeetThakur?theme=light&font=Inter&ext=heatmap" 
                  alt="LeetCode Stats" 
                  className="h-32 md:h-36 object-contain dark:hidden"
                />
                <img 
                  src="https://leetcard.jacoblin.cool/MeetThakur?theme=dark&font=Inter&ext=heatmap" 
                  alt="LeetCode Stats" 
                  className="h-32 md:h-36 object-contain hidden dark:block"
                />
              </a>
            </div>
            
            {/* GitHub Stats */}
            <div className="bg-white/60 dark:bg-black/20 backdrop-blur-sm p-1.5 rounded-xl shadow-sm border border-black/5 dark:border-white/5 hover:scale-105 hover:-rotate-1 transition-transform duration-300">
              <a href={resumeData.github} target="_blank" rel="noreferrer">
                <img 
                  src="https://github-readme-stats.vercel.app/api?username=MeetThakur&show_icons=true&theme=transparent&hide_border=true&title_color=1b263b&text_color=1b263b&icon_color=2563eb" 
                  alt="GitHub Stats" 
                  className="h-32 md:h-36 object-contain dark:hidden"
                />
                <img 
                  src="https://github-readme-stats.vercel.app/api?username=MeetThakur&show_icons=true&theme=transparent&hide_border=true&title_color=f5f4f0&text_color=f5f4f0&icon_color=f43f5e" 
                  alt="GitHub Stats" 
                  className="h-32 md:h-36 object-contain hidden dark:block"
                />
              </a>
            </div>
          </div>

        </motion.div>

      </div>

    </section>
  );
};
