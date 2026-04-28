import { useState } from "react";

const tabs = ["PRD", "Tasks", "Sprint Plan"] as const;
type Tab = typeof tabs[number];

export function LayoutC() {
  const [form, setForm] = useState({ title: "", users: "", goal: "", description: "" });
  const [activeTab, setActiveTab] = useState<Tab>("PRD");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const tabColors: Record<Tab, string> = { "PRD": "#6366f1", "Tasks": "#f59e0b", "Sprint Plan": "#10b981" };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f5f6f8", color: "#111827", display: "flex", flexDirection: "column" }}>

      {/* ── TOP NAV ── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e4e7ec", padding: "0 32px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,.05)", flexShrink: 0, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#6366f1" }}>◈</span>
          <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>PRD → Sprint Planner</span>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#6366f1", color: "#fff", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>PM</div>
      </nav>

      <div style={{ flex: 1, maxWidth: 820, margin: "0 auto", width: "100%", padding: "28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* ── STEP 1: INPUT (always visible) ── */}
        <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,.05)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #f0f2f5", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#6366f1", color: "#fff", fontWeight: 700, fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</div>
            <div>
              <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>Define Your Feature</h2>
              <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Fill in the details to generate your plan</p>
            </div>
          </div>
          <div style={{ padding: "20px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { name: "title", label: "Feature Title", placeholder: "e.g., Add dark mode for dashboard" },
                { name: "users", label: "Target Users", placeholder: "e.g., power users, new users" },
                { name: "goal", label: "Business Goal", placeholder: "e.g., increase retention, improve UX" },
              ].map(f => (
                <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4b5563" }}>{f.label}</label>
                  <input
                    name={f.name}
                    value={(form as any)[f.name]}
                    onChange={onChange}
                    placeholder={f.placeholder}
                    style={{ padding: "9px 12px", border: "1.5px solid #e4e7ec", borderRadius: 7, fontSize: "0.85rem", outline: "none" }}
                  />
                  <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>Required</span>
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4b5563" }}>Feature Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="Describe the feature, users, and problem..."
                  rows={3}
                  style={{ padding: "9px 12px", border: "1.5px solid #e4e7ec", borderRadius: 7, fontSize: "0.85rem", outline: "none", resize: "none", fontFamily: "inherit" }}
                />
                <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>Context and constraints</span>
              </div>
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <button style={{ padding: "10px 28px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 7, fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", boxShadow: "0 2px 8px rgba(99,102,241,.3)" }}>
                Generate Plan →
              </button>
            </div>
          </div>
        </div>

        {/* ── STEP 2: TABBED OUTPUT ── */}
        <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,.05)", overflow: "hidden" }}>
          {/* Step header */}
          <div style={{ padding: "16px 24px 0", borderBottom: "1px solid #f0f2f5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e4e7ec", color: "#9ca3af", fontWeight: 700, fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</div>
              <div>
                <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#9ca3af" }}>Generated Output</h2>
                <p style={{ fontSize: "0.72rem", color: "#9ca3af" }}>Your plan will appear here after generating</p>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 0 }}>
              {tabs.map(tab => {
                const isActive = activeTab === tab;
                const color = tabColors[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "9px 20px",
                      border: "none",
                      borderBottom: isActive ? `2px solid ${color}` : "2px solid transparent",
                      background: "transparent",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "0.82rem",
                      color: isActive ? color : "#9ca3af",
                      cursor: "pointer",
                      transition: "all 0.15s"
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          <div style={{ padding: "20px 24px" }}>
            {activeTab === "PRD" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Problem Statement", hint: "What problem does this feature solve?" },
                  { label: "Goals & Success Criteria", hint: "What does success look like?" },
                  { label: "User Personas", hint: "Who are the target users?" },
                  { label: "Use Cases", hint: "List the primary use cases and user flows." },
                  { label: "Metrics & KPIs", hint: "How will you measure impact?" },
                ].map(({ label, hint }) => (
                  <div key={label}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</div>
                    <div style={{ background: "#f9fafb", border: "1.5px dashed #e4e7ec", borderRadius: 7, padding: "12px 14px" }}>
                      <p style={{ color: "#9ca3af", fontStyle: "italic", fontSize: "0.8rem" }}>{hint}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Tasks" && (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    {["Task", "Effort", "Priority", "Dependencies"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #e4e7ec" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={4} style={{ padding: "48px", textAlign: "center", color: "#9ca3af", fontStyle: "italic" }}>Tasks will appear here once you generate a plan</td></tr>
                </tbody>
              </table>
            )}

            {activeTab === "Sprint Plan" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                {[["Team A", "#6366f1"], ["Team B", "#10b981"], ["Team C", "#f59e0b"]].map(([team, color]) => (
                  <div key={team} style={{ border: "1px solid #e4e7ec", borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ background: "#fff", borderTop: `3px solid ${color}`, borderBottom: "1px solid #e4e7ec", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.82rem" }}>{team}</span>
                      <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "2px 7px", borderRadius: 999, background: (color as string) + "18", color: color as string }}>0 tasks</span>
                    </div>
                    <div style={{ background: "#f9fafb", padding: 10, minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ border: "1.5px dashed #e4e7ec", borderRadius: 6, padding: "12px 16px", textAlign: "center", width: "100%" }}>
                        <p style={{ color: "#9ca3af", fontStyle: "italic", fontSize: "0.75rem" }}>Tasks will appear here</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
