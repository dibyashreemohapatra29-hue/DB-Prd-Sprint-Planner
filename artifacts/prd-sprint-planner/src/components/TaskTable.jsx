const BADGE = {
  High:   { bg: "#fee2e2", color: "#dc2626" },
  Medium: { bg: "#fef3c7", color: "#d97706" },
  Low:    { bg: "#dcfce7", color: "#16a34a" },
};

function Badge({ value }) {
  const s = BADGE[value] || BADGE.Low;
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>
      {value}
    </span>
  );
}

export default function TaskTable({ items }) {
  const hasData = items && items.length > 0;

  return (
    <div className="card card--amber">
      <div className="card-header">
        <h2 className="card-title">Tasks</h2>
      </div>
      <div className="card-body no-pad">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Effort</th>
              <th>Priority</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {hasData ? (
              items.map((item, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500, color: "#111827" }}>{item.name}</td>
                  <td><Badge value={item.effort} /></td>
                  <td><Badge value={item.priority} /></td>
                  <td><Badge value={item.risk} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="placeholder-cell">
                  Tasks will appear here once you generate a plan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
