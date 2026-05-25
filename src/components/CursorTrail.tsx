"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    type Point = { x: number; y: number; age: number };
    const points: Point[] = [];
    let animationFrameId: number;
    let lastX = -1;
    let lastY = -1;
    let isIdle = true;

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
        isIdle = false;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const isDarkCheck = () =>
      resolvedTheme === "dark" || document.documentElement.classList.contains("dark");

    const render = () => {
      // Skip rendering when no visible points (idle optimization)
      if (points.length === 0) {
        isIdle = true;
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        const isDark = isDarkCheck();
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Faster fade — 15 frames instead of 20
      let i = points.length;
      while (i--) {
        if (points[i].age > 15) points.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
      style={{ willChange: "contents" }}
    />
  );
};
