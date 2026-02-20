"use client";

import { useState } from "react";

const ROLES = ["Freelance Artist", "Studio Professional", "Hobbyist", "Student", "Technical Artist", "Other"];
const EXPERIENCE = ["Beginner (< 1 year)", "Intermediate (1–3 years)", "Advanced (3–7 years)", "Expert (7+ years)"];

type State = "idle" | "loading" | "success" | "error";

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10l5 5 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function WaitlistSection() {
  const [form, setForm] = useState({ name: "", email: "", role: "", blender_experience: "" });
  const [fb, setFb] = useState({ problem: "", notify_updates: true });
  const [wState, setWState] = useState<State>("idle");
  const [wMsg, setWMsg] = useState("");
  const [fState, setFState] = useState<State>("idle");
  const [fMsg, setFMsg] = useState("");

  const submitWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setWState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setWState("success"); setWMsg(data.message); setForm({ name: "", email: "", role: "", blender_experience: "" }); }
      else         { setWState("error");   setWMsg(data.error); }
    } catch { setWState("error"); setWMsg("Network error. Please try again."); }
  };

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email && wState !== "success") {
      setFState("error"); setFMsg("Please join the waitlist first so we know who to notify."); return;
    }
    setFState("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, problem: fb.problem, notify_updates: fb.notify_updates }),
      });
      const data = await res.json();
      if (res.ok) { setFState("success"); setFMsg(data.message); setFb({ problem: "", notify_updates: true }); }
      else         { setFState("error");   setFMsg(data.error); }
    } catch { setFState("error"); setFMsg("Network error. Please try again."); }
  };

  return (
    <section id="waitlist" className="relative py-28 px-6">
      {/* Decorative top line */}
      <div className="section-container mb-24">
        <div className="sep" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, rgba(50,37,185,0.1) 0%, rgba(165,42,255,0.05) 40%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-micro" style={{ color: "#a89fff" }}>Early Access</span>
          <h2 className="text-headline mt-2">
            Be first to ship with Cicely.
          </h2>
          <p className="text-body mt-4 mx-auto" style={{ maxWidth: 440 }}>
            Join a growing community of Blender artists who want better tools.
            We read every submission and build based on real feedback.
          </p>
        </div>

        {/* Two cards side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl mx-auto">

          {/* ── Card 1: Waitlist ── */}
          <div className="relative rounded-2xl overflow-hidden" style={{
            background: "var(--surface)",
            border: "1px solid rgba(50,37,185,0.3)",
            boxShadow: "0 0 0 1px rgba(50,37,185,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}>
            {/* Card top accent bar */}
            <div className="h-0.5 w-full" style={{
              background: "linear-gradient(to right, var(--violet), var(--purple), var(--deep))",
            }} />

            <div className="p-7">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(50,37,185,0.18)", border: "1px solid rgba(50,37,185,0.3)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 12V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7" stroke="#a89fff" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M1 12h14" stroke="#a89fff" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M6 8h4M8 6v4" stroke="#a89fff" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.025em" }}>Join the Waitlist</h3>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>Get early access when we launch</p>
                </div>
              </div>

              <div className="sep my-5" />

              {/* Success state */}
              {wState === "success" ? (
                <div className="text-center py-8" style={{ animation: "revealUp 0.5s ease forwards" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(1,199,150,0.15)", border: "1px solid rgba(1,199,150,0.3)", color: "var(--emerald)" }}>
                    <CheckIcon />
                  </div>
                  <p style={{ fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{wMsg}</p>
                  <p className="text-small mt-2">We'll reach out before we ship.</p>
                </div>
              ) : (
                <form onSubmit={submitWaitlist} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="field-label">Name *</label>
                      <input type="text" required placeholder="Alex Morgan" value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="field-input" />
                    </div>
                    <div>
                      <label className="field-label">Email *</label>
                      <input type="email" required placeholder="alex@studio.io" value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="field-input" />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Role</label>
                    <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                      className="field-input" style={{ cursor: "pointer" }}>
                      <option value="" style={{ background: "#111" }}>Select a role</option>
                      {ROLES.map(r => <option key={r} value={r} style={{ background: "#111" }}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Blender Experience</label>
                    <select value={form.blender_experience} onChange={e => setForm(p => ({ ...p, blender_experience: e.target.value }))}
                      className="field-input" style={{ cursor: "pointer" }}>
                      <option value="" style={{ background: "#111" }}>Select level</option>
                      {EXPERIENCE.map(l => <option key={l} value={l} style={{ background: "#111" }}>{l}</option>)}
                    </select>
                  </div>

                  {wState === "error" && (
                    <p style={{ fontSize: 13, color: "#ff8080", padding: "8px 12px", background: "rgba(255,100,100,0.07)", borderRadius: 8, border: "1px solid rgba(255,100,100,0.15)" }}>
                      {wMsg}
                    </p>
                  )}

                  <button type="submit" disabled={wState === "loading"}
                    className="btn-primary w-full justify-center"
                    style={{ padding: "0.8rem", fontSize: 14 }}>
                    {wState === "loading" ? <><Spinner /> Joining...</> : <>Get Early Access →</>}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Card 2: Feedback ── */}
          <div className="relative rounded-2xl overflow-hidden" style={{
            background: "var(--surface)",
            border: "1px solid rgba(165,42,255,0.25)",
            boxShadow: "0 0 0 1px rgba(165,42,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}>
            {/* Card top accent bar */}
            <div className="h-0.5 w-full" style={{
              background: "linear-gradient(to right, var(--purple), var(--violet))",
            }} />

            <div className="p-7">
              {/* Card header */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(165,42,255,0.15)", border: "1px solid rgba(165,42,255,0.25)" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 2V3Z" stroke="#c97fff" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M5 6h6M5 9h4" stroke="#c97fff" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.025em" }}>Share Your Pain Point</h3>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>Help us build what you actually need</p>
                  </div>
                </div>
                <span style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: 100,
                  background: "rgba(165,42,255,0.1)",
                  border: "1px solid rgba(165,42,255,0.2)",
                  color: "#c97fff",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}>
                  Optional
                </span>
              </div>

              <div className="sep my-5" />

              <p className="text-small mb-5">
                What frustrates you most about Blender's file management that Cicely hasn't addressed?
                We prioritize our roadmap around real problems.
              </p>

              {fState === "success" ? (
                <div className="text-center py-8" style={{ animation: "revealUp 0.5s ease forwards" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(165,42,255,0.12)", border: "1px solid rgba(165,42,255,0.3)", color: "#c97fff" }}>
                    <CheckIcon />
                  </div>
                  <p style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>{fMsg}</p>
                  <p className="text-small mt-2">Your input shapes what we build next.</p>
                </div>
              ) : (
                <form onSubmit={submitFeedback} className="space-y-4">
                  <div>
                    <label className="field-label">Describe the problem</label>
                    <textarea required rows={4} value={fb.problem}
                      placeholder="e.g. I lose material setups whenever I append from another file because there's no way to track where node groups originally came from..."
                      onChange={e => setFb(p => ({ ...p, problem: e.target.value }))}
                      className="field-input"
                      style={{ resize: "vertical", minHeight: 100, fontFamily: "Inter, sans-serif" }} />
                  </div>

                  {/* Notify toggle */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      className="relative mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all duration-200"
                      style={{
                        background: fb.notify_updates ? "rgba(165,42,255,0.2)" : "transparent",
                        border: `1px solid ${fb.notify_updates ? "rgba(165,42,255,0.6)" : "var(--border-hover)"}`,
                        cursor: "pointer",
                      }}
                      onClick={() => setFb(p => ({ ...p, notify_updates: !p.notify_updates }))}>
                      {fb.notify_updates && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l2 2L7 1.5" stroke="#c97fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      Notify me when Cicely updates address this problem or related issues.
                    </span>
                  </label>

                  {fState === "error" && (
                    <p style={{ fontSize: 13, color: "#ff8080", padding: "8px 12px", background: "rgba(255,100,100,0.07)", borderRadius: 8, border: "1px solid rgba(255,100,100,0.15)" }}>
                      {fMsg}
                    </p>
                  )}

                  <button type="submit" disabled={fState === "loading"}
                    className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-200"
                    style={{
                      background: "rgba(165,42,255,0.12)",
                      border: "1px solid rgba(165,42,255,0.25)",
                      color: "#c97fff",
                      cursor: fState === "loading" ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                    }}
                    onMouseEnter={e => {
                      if (fState !== "loading") {
                        (e.currentTarget as HTMLElement).style.background = "rgba(165,42,255,0.2)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(165,42,255,0.4)";
                      }
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(165,42,255,0.12)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(165,42,255,0.25)";
                    }}>
                    {fState === "loading" ? <><Spinner /> Sending...</> : "Submit Feedback"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-center text-micro mt-8">
          No spam. No ads. Just updates about Cicely when they matter.
        </p>
      </div>
    </section>
  );
}
