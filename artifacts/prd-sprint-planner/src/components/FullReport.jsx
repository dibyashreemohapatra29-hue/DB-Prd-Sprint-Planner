const BADGE = {
  High:   { bg: "#fee2e2", color: "#dc2626" },
  Medium: { bg: "#fef3c7", color: "#d97706" },
  Low:    { bg: "#dcfce7", color: "#16a34a" },
};

function Badge({ value }) {
  const s = BADGE[value] || BADGE.Low;
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "0.72rem", fontWeight: 700, padding: "2px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>
      {value}
    </span>
  );
}

const TEAMS = [
  { name: "Team A", color: "#6366f1" },
  { name: "Team B", color: "#10b981" },
  { name: "Team C", color: "#f59e0b" },
];

function distributeItems(items) {
  const b = [[], [], []];
  (items || []).forEach((item, i) => b[i % 3].push(item));
  return b;
}

export default function FullReport({ result, featureTitle, onClose }) {
  const { prd, items, insights, metadata } = result;
  const buckets = distributeItems(items);

  return (
    <div className="report-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="report-panel">

        {/* ── Header ── */}
        <div className="report-header">
          <div>
            <h2 className="report-title">Full Plan Report</h2>
            <p className="report-subtitle">{featureTitle}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {metadata && (
              <div style={{ display: "flex", gap: 8 }}>
                <span className="report-meta-chip">Priority <Badge value={metadata.priority} /></span>
                <span className="report-meta-chip">Risk <Badge value={metadata.risk} /></span>
              </div>
            )}
            <button className="report-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="report-body">

          {/* 1. PRD */}
          <section className="report-section">
            <h3 className="report-section-title report-section-title--indigo">
              <span>📋</span> Product Requirements Document
            </h3>
            {prd && typeof prd === "string" && (
              <div className="report-prd">
                <div className="report-prd-row">
                  <span className="report-prd-label">Full PRD</span>
                  <div className="report-prd-value" style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                    {prd}
                  </div>
                </div>
              </div>
            )}
            {prd && typeof prd === "object" && (
              <div className="report-prd">
                {[
                  { label: "Problem Statement", value: prd.problem,  type: "text" },
                  { label: "Goals",             value: prd.goals,    type: "text" },
                  { label: "Target Users",      value: prd.personas, type: "text" },
                  { label: "Use Cases",         value: prd.useCases, type: "list" },
                  { label: "Success Metrics",   value: prd.metrics,  type: "list" },
                ].map(({ label, value, type }) => (
                  <div key={label} className="report-prd-row">
                    <span className="report-prd-label">{label}</span>
                    <div className="report-prd-value">
                      {type === "text" ? (
                        <p>{value}</p>
                      ) : (
                        <ul className="report-list">
                          {(Array.isArray(value) ? value : []).map((v, i) => <li key={i}>{v}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 2. Insights */}
          {insights && insights.length > 0 && (
            <section className="report-section">
              <h3 className="report-section-title report-section-title--indigo">
                <span>💡</span> Insights
              </h3>
              <ul className="report-insights">
                {insights.map((ins, i) => <li key={i}>{ins}</li>)}
              </ul>
            </section>
          )}

          {/* 3. Tasks */}
          <section className="report-section">
            <h3 className="report-section-title report-section-title--amber">
              <span>📝</span> Tasks
            </h3>
            <div className="report-table-wrap">
              <table className="report-table">
                <thead>
                  <tr>
                    {["Task", "Effort", "Priority", "Risk"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(items || []).map((item, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{item.task || item.name || "—"}</td>
                      <td><Badge value={item.effort} /></td>
                      <td><Badge value={item.priority} /></td>
                      <td><Badge value={item.risk} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Sprint Plan */}
          <section className="report-section">
            <h3 className="report-section-title report-section-title--green">
              <span>🏃</span> Sprint Plan
            </h3>
            <div className="report-sprint">
              {TEAMS.map(({ name, color }, idx) => (
                <div key={name} className="report-sprint-col">
                  <div className="report-sprint-head" style={{ borderTopColor: color }}>
                    <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{name}</span>
                    <span className="report-sprint-badge" style={{ background: color + "18", color }}>
                      {buckets[idx].length} {buckets[idx].length === 1 ? "task" : "tasks"}
                    </span>
                  </div>
                  <div className="report-sprint-body">
                    {buckets[idx].length > 0 ? (
                      buckets[idx].map((item, i) => (
                        <div key={i} className="report-sprint-card">
                          <span style={{ fontSize: "0.82rem", fontWeight: 500 }}>{item.task || item.name || "—"}</span>
                          <Badge value={item.effort} />
                        </div>
                      ))
                    ) : (
                      <p style={{ color: "#9ca3af", fontStyle: "italic", fontSize: "0.78rem", padding: "8px 0" }}>No tasks assigned</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
