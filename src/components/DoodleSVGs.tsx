import React from "react";

export const UnderlineDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute w-full h-auto z-[-1] text-highlighter-yellow/60 dark:text-neon-pink/40 ${className}`}
    viewBox="0 0 200 20"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 15C50 5 150 5 195 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      className="stroke-draw animate-draw"
      style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
    />
  </svg>
);

export const CircleDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute w-full h-full z-[-1] text-red-500/50 ${className}`}
    viewBox="0 0 200 200"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 10C160 10 190 60 190 100C190 160 140 190 100 190C60 190 10 150 10 100C10 50 40 15 100 10Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      className="stroke-draw animate-draw drop-shadow-sm"
      style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
    />
  </svg>
);

export const ArrowDoodle = ({ className = "", style }: { className?: string, style?: React.CSSProperties }) => (
  <svg
    className={`w-12 h-12 text-ink-blue dark:text-neon-blue drop-shadow-sm ${className}`}
    style={style}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 50 Q 50 10 90 50 M 70 30 L 90 50 L 70 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-draw animate-draw"
      style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
    />
  </svg>
);

export const StarDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-8 h-8 text-yellow-400 drop-shadow-sm ${className}`}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
      className="stroke-draw animate-draw"
      style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
    />
  </svg>
);

export const AsteriskDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-12 h-12 text-highlighter-orange drop-shadow-sm ${className}`}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 10 L50 90 M20 30 L80 70 M20 70 L80 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      className="stroke-draw animate-draw"
      style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
    />
  </svg>
);
