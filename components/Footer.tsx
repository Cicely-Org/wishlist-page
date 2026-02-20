export default function Footer() {
  return (
    <footer className="relative py-10 px-6" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--violet), var(--deep))", boxShadow: "0 0 10px var(--violet-dim)" }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 600, color: "#fff" }}>C</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.03em" }}>cicely</span>
        </div>

        <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center" }}>
          Version control for Blender artists. Currently in early access.
        </p>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--emerald)", boxShadow: "0 0 6px var(--emerald-glow)" }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--text-muted)" }}>
            building in public
          </span>
        </div>
      </div>
    </footer>
  );
}
