"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  {
    tag:    "Version Control Platform",
    status: "In Development",
    statusColor: "#f59e0b",
    title:  "GitHub for Blender",
    body:   "A full version control platform purpose-built for .blend files. Repositories, commits, branches, pull requests — the entire Git workflow adapted for 3D artists with zero learning curve.",
    accent: "#3225b9",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 7.5v7M7.5 5H11a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    highlight: true,
  },
  {
    tag:    "Diff Viewer",
    status: "Live",
    statusColor: "#01c796",
    title:  "Minimal Web Diff for Blender",
    body:   "A lightweight web view that parses .blend files and renders human-readable diffs. See exactly which objects changed, what modifiers were added, and what materials were tweaked — no Blender required.",
    accent: "#01c796",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="8" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="4" width="8" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 8h2M5 11h4M14 8h2M14 11h2M14 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    highlight: false,
  },
  {
    tag:    "Cloud Collaboration",
    status: "In Development",
    statusColor: "#f59e0b",
    title:  "Branch and Merge Like a Dev",
    body:   "Create feature branches for your 3D scenes, work in parallel with teammates, and merge changes back without clobbering anyone's work. Powered by a delta-based storage engine that sends only what changed.",
    accent: "#a52aff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 4v10M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 7a6 6 0 0 0 6 6h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    highlight: false,
  },
  {
    tag:    "CLI Tool",
    status: "Live",
    statusColor: "#01c796",
    title:  "Terminal-first Workflow",
    body:   "A fast, scriptable CLI for power users and pipeline integrators. Commit checkpoints, switch branches, push to remote, and trigger diff views — all from your terminal, without touching a GUI.",
    accent: "#422184",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 9l3 3-3 3M11 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    highlight: false,
  },
];

export default function FeaturesSection() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      }),
      { threshold: 0.1 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" className="relative py-28 px-6">
      {/* Bg glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(50,37,185,0.05) 0%, transparent 65%)",
      }} />

      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-micro" style={{ color: "#a89fff" }}>Solutions</span>
          <h2 className="text-headline mt-2">
            Everything you need.{" "}
            <span style={{ color: "var(--text-muted)", fontWeight: 300 }}>Nothing you don't.</span>
          </h2>
          <p className="text-body mt-4 mx-auto" style={{ maxWidth: 440 }}>
            Four focused tools that solve the core problems — built to slot into your existing Blender workflow.
          </p>
        </div>

        {/* 2-col feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              ref={el => { refs.current[i] = el; }}
              className="relative p-7 rounded-2xl group cursor-default overflow-hidden"
              style={{
                background: f.highlight
                  ? "linear-gradient(135deg, rgba(50,37,185,0.15) 0%, rgba(66,33,132,0.08) 100%)"
                  : "var(--surface)",
                border: `1px solid ${f.highlight ? "rgba(50,37,185,0.35)" : "var(--border)"}`,
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.8s ${i * 0.1}s ease, transform 0.8s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1)`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${f.accent}45`;
                el.style.background = f.highlight
                  ? "linear-gradient(135deg, rgba(50,37,185,0.22) 0%, rgba(66,33,132,0.12) 100%)"
                  : `${f.accent}08`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = f.highlight ? "rgba(50,37,185,0.35)" : "var(--border)";
                el.style.background = f.highlight
                  ? "linear-gradient(135deg, rgba(50,37,185,0.15) 0%, rgba(66,33,132,0.08) 100%)"
                  : "var(--surface)";
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 25% 25%, ${f.accent}0a 0%, transparent 55%)` }} />

              {/* Top row: icon + status */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${f.accent}18`, color: f.accent, border: `1px solid ${f.accent}28`, flexShrink: 0 }}>
                  {f.icon}
                </div>

                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{
                    background: `${f.statusColor}14`,
                    border: `1px solid ${f.statusColor}30`,
                    fontSize: 11,
                    fontWeight: 500,
                    color: f.statusColor,
                    fontFamily: "JetBrains Mono, monospace",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: f.statusColor }} />
                  {f.status}
                </span>
              </div>

              {/* Tag */}
              <span className="text-micro mb-2 block" style={{ color: f.accent }}>{f.tag}</span>

              <h3 className="text-title mb-3">{f.title}</h3>
              <p className="text-small">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
