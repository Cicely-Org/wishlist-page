"use client";

import { useEffect, useRef } from "react";

const PROBLEMS = [
  {
    n: "01",
    title: "File Sharing Chaos",
    body: "Sharing .blend files over Dropbox, Drive, or email gives collaborators zero context. There's no diff, no history, and no way to know what changed between the version you sent and the one they sent back.",
    accent: "#3225b9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 13V15a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V13M10 3v9M7 9l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    n: "02",
    title: "No Cloud Collaboration",
    body: "Blender is a single-player tool. Multiple artists can't work on the same project simultaneously. There's no real-time sync, no branching strategy, and no merge workflow — collaboration means manual file juggling.",
    accent: "#a52aff",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 14H5a4 4 0 0 1 0-8h.5M13 14h2a4 4 0 0 0 0-8h-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    n: "03",
    title: "Invisible File Differences",
    body: "Comparing two .blend files is impossible natively. You can't see what object was added, which material changed, or what modifier was tweaked without manually opening both files and hunting visually.",
    accent: "#422184",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="7" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="4" width="7" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 8h1M5 10h3M14 8h1M14 10h1M14 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    n: "04",
    title: "Limited Undo / Redo",
    body: "Blender's undo stack is session-only and easily exhausted. Once you close the file, it's gone. There's no way to roll back to 'three sessions ago, before I remeshed everything' — that work is permanently lost.",
    accent: "#01c796",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 8V4L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 8a7 7 0 1 0 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 7v4l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    n: "05",
    title: "Bloated Upload Sizes",
    body: ".blend files balloon in size as assets accumulate. Every save is a full file copy. Cloud sync re-uploads the entire multi-GB project for a two-vertex tweak — wasting bandwidth, time, and storage.",
    accent: "#3225b9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3v10M6 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
      </svg>
    ),
  },
];

export default function ProblemsSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      }),
      { threshold: 0.12 }
    );
    cardRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="problems" className="relative py-28 px-6">
      {/* Top sep */}
      <div className="section-container mb-20">
        <div className="sep" />
      </div>

      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-micro" style={{ color: "#ff7070" }}>The Problem Space</span>
            <h2 className="text-headline mt-2" style={{ maxWidth: 520 }}>
              Blender has no memory.{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 300 }}>Yours shouldn't suffer for it.</span>
            </h2>
          </div>
          <p className="text-small" style={{ maxWidth: 360 }}>
            These aren't edge cases. They're the daily friction that costs artists hours of irreplaceable creative work.
          </p>
        </div>

        {/* 5-card grid — 3 top, 2 bottom centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              className="card group relative p-6 cursor-default"
              style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: `opacity 0.8s ${i * 0.09}s ease, transform 0.8s ${i * 0.09}s cubic-bezier(0.16,1,0.3,1)`,
                /* Last 2 items: center in the grid on large screens */
                ...(i >= 3 ? { gridColumn: i === 3 ? "1 / span 1" : undefined } : {}),
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.03)";
                el.style.borderColor = `${p.accent}40`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--surface)";
                el.style.borderColor = "var(--border)";
              }}
            >
              {/* Number */}
              <span className="absolute top-5 right-5"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--text-micro)", letterSpacing: "0.05em" }}>
                {p.n}
              </span>

              {/* Icon */}
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}28` }}>
                {p.icon}
              </div>

              <h3 className="text-title mb-2">{p.title}</h3>
              <p className="text-small">{p.body}</p>
            </div>
          ))}

          {/* Invisible spacer for last row centering on lg */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
