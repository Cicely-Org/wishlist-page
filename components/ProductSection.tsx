"use client";

import { useEffect, useRef } from "react";

export default function ProductSection() {
  const mockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mockRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="product" className="relative py-28 px-6 overflow-hidden">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(1,199,150,0.5), transparent)" }} />

      <div className="section-container">
        {/* Label + Heading */}
        <div className="text-center mb-16">
          <span className="text-micro" style={{ color: "var(--emerald)" }}>Product Preview</span>
          <h2 className="text-headline mt-3">
            Built for how you <span style={{ color: "var(--text-muted)", fontWeight: 300 }}>actually work.</span>
          </h2>
          <p className="text-body mt-4 mx-auto" style={{ maxWidth: 480 }}>
            A native Blender add-on and web platform that speaks your language — not Git's.
          </p>
        </div>

        {/* Mock window */}
        <div
          ref={mockRef}
          style={{
            opacity: 0,
            transform: "translateY(48px) scale(0.97)",
            transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="rounded-2xl overflow-hidden relative" style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(50,37,185,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3" style={{
              background: "var(--overlay)",
              borderBottom: "1px solid var(--border)",
            }}>
              <div className="flex items-center gap-1.5">
                {["#ff5f57", "#ffbd2e", "#28ca41"].map(c => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md" style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
              }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "var(--emerald)", boxShadow: "0 0 5px var(--emerald)" }} />
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--text-muted)" }}>
                  cicely / robot_rig_v7.blend
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--text-muted)" }}>
                  main ⎇
                </span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#a89fff" }}>
                  3 changes
                </span>
              </div>
            </div>

            {/* App body */}
            <div className="flex" style={{ height: 480 }}>

              {/* Sidebar icons */}
              <div className="flex flex-col items-center gap-2 py-4 px-2" style={{
                width: 48,
                borderRight: "1px solid var(--border)",
                flexShrink: 0,
              }}>
                {[
                  { icon: "⟠", active: false },
                  { icon: "⎇", active: true },
                  { icon: "⊞", active: false },
                  { icon: "◷", active: false },
                  { icon: "⚙", active: false },
                ].map((item, i) => (
                  <button key={i} className="w-8 h-8 rounded-md flex items-center justify-center text-sm transition-all duration-200"
                    style={{
                      background: item.active ? "rgba(50,37,185,0.18)" : "transparent",
                      color: item.active ? "#a89fff" : "var(--text-muted)",
                      border: item.active ? "1px solid rgba(50,37,185,0.3)" : "1px solid transparent",
                    }}>
                    {item.icon}
                  </button>
                ))}
              </div>

              {/* Timeline panel */}
              <div className="flex flex-col py-4" style={{ width: 240, borderRight: "1px solid var(--border)", flexShrink: 0 }}>
                <div className="flex items-center justify-between px-4 mb-4">
                  <span className="text-micro">Timeline</span>
                  <button className="text-xs px-2 py-1 rounded-md transition-all"
                    style={{ background: "rgba(1,199,150,0.1)", border: "1px solid rgba(1,199,150,0.2)", color: "var(--emerald)", fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>
                    + checkpoint
                  </button>
                </div>

                {/* Branch + commits */}
                <div className="flex-1 overflow-y-auto px-3 space-y-0.5">
                  {[
                    { msg: "Add IK constraints", time: "2m ago", active: true, branch: "main" },
                    { msg: "Rig arm joints", time: "1h ago", active: false, branch: "main" },
                    { msg: "Sculpt torso detail", time: "4h ago", active: false, branch: "main" },
                    { msg: "Retopo base mesh", time: "Yesterday", active: false, branch: "main" },
                    { msg: "Initial geometry block", time: "2d ago", active: false, branch: "main" },
                  ].map((c, i) => (
                    <div key={i} className="group flex items-start gap-2.5 py-2.5 px-2.5 rounded-lg cursor-pointer transition-all duration-200"
                      style={{
                        background: c.active ? "rgba(50,37,185,0.1)" : "transparent",
                        border: c.active ? "1px solid rgba(50,37,185,0.25)" : "1px solid transparent",
                      }}
                      onMouseEnter={e => { if (!c.active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                      onMouseLeave={e => { if (!c.active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <div className="flex flex-col items-center mt-1 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full" style={{
                          background: c.active ? "var(--violet)" : "rgba(255,255,255,0.15)",
                          boxShadow: c.active ? "0 0 6px var(--violet-glow)" : "none",
                          flexShrink: 0,
                        }} />
                        {i < 4 && <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.07)", marginTop: 3 }} />}
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: c.active ? 500 : 400, color: c.active ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.4 }}>
                          {c.msg}
                        </p>
                        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>
                          {c.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diff panel */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Tabs */}
                <div className="flex items-center gap-1 px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Diff View", "Timeline", "Branches", "Snapshots"].map((t, i) => (
                    <button key={t} className="text-xs px-3 py-1.5 rounded-md transition-all duration-200"
                      style={{
                        background: i === 0 ? "rgba(50,37,185,0.15)" : "transparent",
                        color: i === 0 ? "#a89fff" : "var(--text-muted)",
                        fontWeight: i === 0 ? 500 : 400,
                        border: i === 0 ? "1px solid rgba(50,37,185,0.25)" : "1px solid transparent",
                      }}>
                      {t}
                    </button>
                  ))}
                </div>

                {/* Diff meta */}
                <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.015)" }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--text-muted)" }}>
                    checkpoint_04 → checkpoint_05
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(1,199,150,0.1)", color: "var(--emerald)", fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>+2 added</span>
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,100,100,0.08)", color: "#ff8080", fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>-1 removed</span>
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(165,42,255,0.1)", color: "#c97fff", fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>~3 changed</span>
                  </div>
                </div>

                {/* Diff lines */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  {[
                    { type: "added",   path: "Armature.IK_Target.001",         detail: "new IK constraint added" },
                    { type: "added",   path: "Mesh.Torso.Subdivision",          detail: "level 2 → 3" },
                    { type: "removed", path: "Material.Metal_Diffuse_Old",      detail: "replaced by PBR variant" },
                    { type: "changed", path: "Light.Sun.energy",                detail: "5.0 → 8.5" },
                    { type: "changed", path: "Camera.focal_length",             detail: "35mm → 50mm" },
                    { type: "changed", path: "Object.Armature.pose_position",   detail: "REST → POSE" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-md" style={{
                      background:
                        row.type === "added"   ? "rgba(1,199,150,0.05)" :
                        row.type === "removed" ? "rgba(255,100,100,0.05)" :
                                                 "rgba(165,42,255,0.04)",
                      borderLeft: `2px solid ${
                        row.type === "added"   ? "rgba(1,199,150,0.4)" :
                        row.type === "removed" ? "rgba(255,100,100,0.4)" :
                                                 "rgba(165,42,255,0.35)"}`,
                    }}>
                      <span className="rounded px-1.5 py-0.5 flex-shrink-0" style={{
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        background:
                          row.type === "added"   ? "rgba(1,199,150,0.15)" :
                          row.type === "removed" ? "rgba(255,100,100,0.12)" :
                                                   "rgba(165,42,255,0.15)",
                        color:
                          row.type === "added"   ? "var(--emerald)" :
                          row.type === "removed" ? "#ff8080" :
                                                   "#c97fff",
                      }}>
                        {row.type}
                      </span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", flex: 1 }}>{row.path}</span>
                      <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{row.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating call-out badges */}
          {[
            { text: "Human-readable diffs",    side: "right", top: "22%" },
            { text: "Branch without fear",     side: "right", top: "52%" },
            { text: "Auto-checkpoint every 30 min", side: "left", top: "38%" },
          ].map((b, i) => (
            <div key={i}
              className={`absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg pointer-events-none`}
              style={{
                [b.side === "right" ? "left" : "right"]: b.side === "right" ? "calc(100% + 16px)" : "calc(100% + 16px)",
                top: b.top,
                background: "rgba(17,17,24,0.95)",
                border: "1px solid rgba(50,37,185,0.3)",
                backdropFilter: "blur(12px)",
                fontSize: 11,
                fontWeight: 500,
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                animation: `revealUp 0.6s ${0.4 + i * 0.15}s cubic-bezier(0.16,1,0.3,1) forwards`,
                opacity: 0,
              }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--violet)", display: "inline-block", boxShadow: "0 0 5px var(--violet)" }} />
              {b.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
