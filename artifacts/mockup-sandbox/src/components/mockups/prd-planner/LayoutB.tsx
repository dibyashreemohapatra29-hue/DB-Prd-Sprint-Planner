import { useState } from "react";

export function LayoutB() {
  const [form, setForm] = useState({ title: "", users: "", goal: "", description: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div style={{ minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f5f6f8", color: "#111827", display: "flex", flexDirection: "column" }}>

      {/* ── TOP NAV ── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e4e7ec", padding: "0 28px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,.05)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#6366f1" }}>◈</span>
          <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>PRD → Sprint Planner</span>
        </div>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#6366f1", color: "#fff", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>PM</div>
      </nav>

      {/* ── COMPACT INPUT BAR ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e4e7ec", padding: "14px 28px", flexShrink: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr auto", gap: 10, alignItems: "end", maxWidth: 1100, margin: "0 auto" }}>
          {[
            { name: "title", label: "Feature Title", placeholder: "e.g., Add dark mode" },
            { name: "users", label: "Target Users", placeholder: "e.g., power users" },
            { name: "goal", label: "Business Goal", placeholder: "e.g., increase retention" },
            { name: "description", label: "Description", placeholder: "Describe the feature..." },
          ].map(f => (
            <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: "0.68rem", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}</label>
              <input
                name={f.name}
                value={(form as any)[f.name]}
                onChange={onChange}
                placeholder={f.placeholder}
                style={{ padding: "8px 10px", border: "1.5px solid #e4e7ec", borderRadius: 6, fontSize: "0.82rem", color: "#111827", background: "#f9fafb", outline: "none" }}
              />
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: "0.68rem", color: "transparent" }}>_</label>
            <button style={{ padding: "8px 18px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", whiteSpace: "nowrap" }}>
              Generate Plan
            </button>
          </div>
        </div>
      </div>

      {/* ── 3-COLUMN CONTENT GRID ── */}
      <main style={{ flex: 1, padding: "24px 28px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 18, alignItems: "start" }}>

          {/* COL 1 — PRD */}
          <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderTop: "3px solid #6366f1", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
            <div style={{ padding: "14px 18px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block" }}></span>
                <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827" }}>PRD</h2>
              </div>
              <p style={{ fontSize: "0.72rem", color: "#9ca3af" }}>Product Requirements Document</p>
            </div>
            <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Problem", "Goals", "Personas", "Use Cases", "Metrics"].map(s => (
                <div key={s}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{s}</div>
                  <div style={{ background: "#f9fafb", border: "1.5px dashed #e4e7ec", borderRadius: 5, padding: "8px 10px", minHeight: 36 }}>
                    <p style={{ color: "#9ca3af", fontStyle: "italic", fontSize: "0.72rem" }}>Will be generated...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COL 2 — Tasks */}
          <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderTop: "3px solid #f59e0b", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
            <div style={{ padding: "14px 18px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}></span>
                <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827" }}>Tasks</h2>
              </div>
              <p style={{ fontSize: "0.72rem", color: "#9ca3af" }}>Engineering breakdown</p>
            </div>
            <div style={{ overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.72rem" }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    {["Task", "Effort", "Priority", "Deps"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e4e7ec", fontSize: "0.65rem" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={4} style={{ padding: "40px 10px", textAlign: "center", color: "#9ca3af", fontStyle: "italic" }}>Tasks will appear here</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* COL 3 — Sprint */}
          <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderTop: "3px solid #10b981", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
            <div style={{ padding: "14px 18px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
                <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827" }}>Sprint Plan</h2>
              </div>
              <p style={{ fontSize: "0.72rem", color: "#9ca3af" }}>Team allocation</p>
            </div>
            <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[["Team A", "#6366f1"], ["Team B", "#10b981"], ["Team C", "#f59e0b"]].map(([team, color]) => (
                <div key={team} style={{ border: "1px solid #e4e7ec", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ background: "#f9fafb", borderBottom: "1px solid #e4e7ec", padding: "7px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.78rem" }}>{team}</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "2px 7px", borderRadius: 999, background: (color as string) + "18", color: color as string }}>0 tasks</span>
                  </div>
                  <div style={{ padding: 10, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: "#9ca3af", fontStyle: "italic", fontSize: "0.72rem" }}>Tasks will appear here</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
