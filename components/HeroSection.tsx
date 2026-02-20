"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["Blender Artists.", "3D Studios.", "Animators.", "Technical Artists.", "Creators."];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fadeWord, setFadeWord] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Word rotation */
  useEffect(() => {
    const t = setInterval(() => {
      setFadeWord(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length);
        setFadeWord(true);
      }, 350);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  /* Particle network */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; a: number; r: number };
    const pts: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.35 + 0.05,
      r: Math.random() * 1.2 + 0.4,
    }));

    const COLORS = ["50,37,185", "1,199,150", "165,42,255", "66,33,132"];

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p, i) => {
        p.x = (p.x + p.vx + canvas.width)  % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        const c = COLORS[i % COLORS.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},${p.a})`;
        ctx.fill();
      });
      /* Connections */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 110) {
            const c = COLORS[(i + j) % COLORS.length];
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${c},${0.07 * (1 - d / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }} />

      {/* Hero glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 100% 60% at 50% -5%, rgba(50,37,185,0.22) 0%, rgba(165,42,255,0.08) 45%, transparent 70%)",
      }} />
      {/* Bottom tint */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }} />

      {/* ── Nav ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--violet), var(--deep))", boxShadow: "0 2px 12px var(--violet-glow)" }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 600, color: "#fff" }}>C</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>cicely</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7">
          {["Features", "Problems", "Docs"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="transition-colors duration-200"
              style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >{l}</a>
          ))}
        </div>

        <a href="#waitlist" className="btn-primary" style={{ padding: "0.5rem 1.1rem", fontSize: 13 }}>
          Join Waitlist
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </nav>

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-8 pb-24">
        {/* Badge */}
        <div className="brand-badge mb-8"
          style={{
            background: "rgba(50,37,185,0.12)",
            borderColor: "rgba(50,37,185,0.3)",
            color: "#a89fff",
            animation: "revealUp 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) forwards",
            opacity: 0,
          }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--violet)", boxShadow: "0 0 6px var(--violet)" }} />
          Early Access — Now Open
        </div>

        {/* Display headline */}
        <h1 className="text-display mb-4 max-w-4xl" style={{
          animation: "revealUp 0.8s 0.22s cubic-bezier(0.16,1,0.3,1) forwards",
          opacity: 0,
        }}>
          Version control
          <br />
          <span className="gradient-text-violet">for{" "}</span>
          <span style={{
            display: "inline-block",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: fadeWord ? 1 : 0,
            transform: fadeWord ? "translateY(0)" : "translateY(6px)",
            color: "var(--emerald)",
          }}>
            {WORDS[wordIdx]}
          </span>
        </h1>

        {/* Sub */}
        <p className="text-body mb-10 max-w-lg" style={{
          animation: "revealUp 0.8s 0.36s cubic-bezier(0.16,1,0.3,1) forwards",
          opacity: 0,
          fontSize: "1.0625rem",
        }}>
          Cicely brings GitHub-style versioning natively to Blender.
          Checkpoint your work, branch timelines, and collaborate — without losing creative momentum.
        </p>

        {/* CTA row */}
        <div className="flex items-center gap-3" style={{
          animation: "revealUp 0.8s 0.48s cubic-bezier(0.16,1,0.3,1) forwards",
          opacity: 0,
        }}>
          <a href="#waitlist" className="btn-primary">
            Get Early Access
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#product" className="btn-ghost">
            See the product
          </a>
        </div>

        {/* Stat bar */}
        <div className="flex items-center gap-6 mt-14"
          style={{
            animation: "revealUp 0.8s 0.62s cubic-bezier(0.16,1,0.3,1) forwards",
            opacity: 0,
          }}>
          {[
            { value: "Git-native", label: "Version Control" },
            { value: "Zero setup", label: "Blender Add-on" },
            { value: "Open", label: "CLI Tool" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>{s.value}</p>
              <p className="text-micro" style={{ marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
