const TEAMS = [
  { name: "Team A", color: "#6366f1" },
  { name: "Team B", color: "#10b981" },
  { name: "Team C", color: "#f59e0b" },
];

function distributeItems(items) {
  const buckets = [[], [], []];
  if (!items || items.length === 0) return buckets;
  items.forEach((item, i) => buckets[i % 3].push(item));
  return buckets;
}

export default function SprintBoard({ items }) {
  const buckets = distributeItems(items);
  const hasData = items && items.length > 0;

  return (
    <div className="card card--green">
      <div className="card-header">
        <h2 className="card-title">Sprint Plan</h2>
      </div>
      <div className="card-body">
        <div className="sprint-grid">
          {TEAMS.map(({ name, color }, idx) => {
            const teamItems = buckets[idx];
            return (
              <div key={name} className="sprint-col">
                <div className="sprint-col-head" style={{ borderTopColor: color }}>
                  <span className="sprint-col-name">{name}</span>
                  <span className="sprint-col-badge" style={{ background: color + "18", color }}>
                    {teamItems.length} {teamItems.length === 1 ? "task" : "tasks"}
                  </span>
                </div>
                <div className="sprint-col-body">
                  {hasData ? (
                    teamItems.map((item, i) => (
                      <div key={i} className="sprint-card">
                        <span className="sprint-card-name">{item.name}</span>
                        <span className="sprint-card-meta">{item.effort} effort</span>
                      </div>
                    ))
                  ) : (
                    <div className="sprint-placeholder">
                      <p className="placeholder-text">Tasks will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
