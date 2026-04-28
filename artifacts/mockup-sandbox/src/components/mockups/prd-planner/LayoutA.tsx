import { useState } from "react";

export function LayoutA() {
  const [form, setForm] = useState({ title: "", description: "", users: "", goal: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f5f6f8", color: "#111827" }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{ width: 300, minWidth: 300, background: "#ffffff", borderRight: "1px solid #e4e7ec", display: "flex", flexDirection: "column", boxShadow: "2px 0 8px rgba(0,0,0,.04)" }}>
        {/* Sidebar header */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f0f2f5" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ color: "#6366f1", fontSize: 16 }}>◈</span>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827", letterSpacing: "-0.2px" }}>PRD → Sprint Planner</span>
          </div>
          <p style={{ fontSize: "0.72rem", color: "#9ca3af", lineHeight: 1.4 }}>Fill in the fields below and generate your plan.</p>
        </div>

        {/* Form fields */}
        <div style={{ padding: "16px 20px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { id: "title", label: "Feature Title", placeholder: "e.g., Add dark mode", name: "title" },
            { id: "users", label: "Target Users", placeholder: "e.g., power users", name: "users" },
            { id: "goal", label: "Business Goal", placeholder: "e.g., increase retention", name: "goal" },
          ].map(f => (
            <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em" }}>{f.label}</label>
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
            <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em" }}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="Describe the feature and problem..."
              rows={4}
              style={{ padding: "8px 10px", border: "1.5px solid #e4e7ec", borderRadius: 6, fontSize: "0.82rem", color: "#111827", background: "#f9fafb", resize: "vertical", outline: "none", fontFamily: "inherit" }}
            />
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f2f5" }}>
          <button style={{ width: "100%", padding: "11px", background: "#6366f1", color: "#fff", fontWeight: 700, fontSize: "0.875rem", border: "none", borderRadius: 8, cursor: "pointer", boxShadow: "0 2px 8px rgba(99,102,241,.35)" }}>
            Generate Plan
          </button>
        </div>
      </aside>

      {/* ── MAIN OUTPUT AREA ── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Page title bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <h1 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827" }}>Output</h1>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#6366f1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 }}>PM</div>
        </div>

        {/* PRD */}
        <Card title="Product Requirements Document" accent="#6366f1">
          {["Problem Statement", "Goals & Success Criteria", "User Personas", "Use Cases", "Metrics & KPIs"].map(s => (
            <SubRow key={s} label={s} />
          ))}
        </Card>

        {/* Tasks */}
        <Card title="Tasks" accent="#f59e0b">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Task", "Effort", "Priority", "Dependencies"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "9px 14px", fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #e4e7ec" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={4} style={{ padding: "28px", textAlign: "center", color: "#9ca3af", fontStyle: "italic", fontSize: "0.82rem" }}>Tasks will appear here once you generate a plan</td></tr>
            </tbody>
          </table>
        </Card>

        {/* Sprint */}
        <Card title="Sprint Plan" accent="#10b981">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[["Team A", "#6366f1"], ["Team B", "#10b981"], ["Team C", "#f59e0b"]].map(([team, color]) => (
              <div key={team} style={{ border: "1px solid #e4e7ec", borderRadius: 8, overflow: "hidden", background: "#f9fafb" }}>
                <div style={{ background: "#fff", borderTop: `3px solid ${color}`, borderBottom: "1px solid #e4e7ec", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.82rem" }}>{team}</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "2px 7px", borderRadius: 999, background: color + "18", color: color as string }}>0 tasks</span>
                </div>
                <div style={{ padding: 10, minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ color: "#9ca3af", fontStyle: "italic", fontSize: "0.78rem" }}>Tasks will appear here</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}

function Card({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,.06)", overflow: "hidden", borderTop: `3px solid ${accent}` }}>
      <div style={{ padding: "16px 20px 12px" }}>
        <h2 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#111827" }}>{title}</h2>
      </div>
      <div style={{ padding: "0 20px 20px" }}>{children}</div>
    </div>
  );
}

function SubRow({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0f2f5" }}>
      <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.07em", minWidth: 130, paddingTop: 2 }}>{label}</span>
      <div style={{ flex: 1, background: "#f9fafb", border: "1.5px dashed #e4e7ec", borderRadius: 6, padding: "8px 12px", minHeight: 36 }}>
        <p style={{ color: "#9ca3af", fontStyle: "italic", fontSize: "0.78rem" }}>Will be generated...</p>
      </div>
    </div>
  );
}
