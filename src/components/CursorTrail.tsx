"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDarkRef = useRef(false);

  // Keep the theme in a ref so changing it doesn't tear down the animation loop
  useEffect(() => {
    isDarkRef.current = resolvedTheme === "dark";
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Size the canvas for the device pixel ratio so the stroke stays crisp
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    type Point = { x: number; y: number; age: number };
    const points: Point[] = [];
    let animationFrameId = 0;
    let running = false;
    let lastX = -1;
    let lastY = -1;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          const prevP = points[i - 1];
          const midX = (prevP.x + p.x) / 2;
          const midY = (prevP.y + p.y) / 2;
          ctx.quadraticCurveTo(prevP.x, prevP.y, midX, midY);
        }
        p.age += 1;
      }

      if (points.length > 1) {
        ctx.strokeStyle = isDarkRef.current ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Fade out: drop points older than 15 frames
      let i = points.length;
      while (i--) {
        if (points[i].age > 15) points.splice(i, 1);
      }

      // Stop the loop entirely once the trail has faded; mouse move restarts it
      if (points.length === 0) {
        running = false;
        return;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    // Throttle: only push a new point if cursor moved at least 4px
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy > 16) {
        // Cap at 30 points max to prevent unbounded growth
        if (points.length > 30) points.shift();
        points.push({ x: e.clientX, y: e.clientY, age: 0 });
        lastX = e.clientX;
        lastY = e.clientY;
        if (!running) {
          running = true;
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[130] hidden md:block"
    />
  );
};
