"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Point = { x: number; y: number; age: number };
    let points: Point[] = [];
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = resolvedTheme === "dark" || document.documentElement.classList.contains("dark");
      
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          // Quadratic bezier curve for smooth drawing
          const prevP = points[i - 1];
          const midX = (prevP.x + p.x) / 2;
          const midY = (prevP.y + p.y) / 2;
          ctx.quadraticCurveTo(prevP.x, prevP.y, midX, midY);
        }
        
        p.age += 1;
      }
      
      // Draw the stroke
      if (points.length > 1) {
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Filter out old points (fade out very quickly)
      points = points.filter(p => p.age < 20);

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
    />
  );
};
