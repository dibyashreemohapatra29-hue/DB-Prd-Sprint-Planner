const teams = [
  { name: "Team A", color: "#6366f1" },
  { name: "Team B", color: "#10b981" },
  { name: "Team C", color: "#f59e0b" },
];

export default function SprintBoard() {
  return (
    <div className="card card--green">
      <div className="card-header">
        <h2 className="card-title">Sprint Plan</h2>
      </div>
      <div className="card-body">
        <div className="sprint-grid">
          {teams.map(({ name, color }) => (
            <div key={name} className="sprint-col">
              <div className="sprint-col-head" style={{ borderTopColor: color }}>
                <span className="sprint-col-name">{name}</span>
                <span className="sprint-col-badge" style={{ background: color + "18", color }}>
                  0 tasks
                </span>
              </div>
              <div className="sprint-col-body">
                <div className="sprint-placeholder">
                  <p className="placeholder-text">Tasks will appear here</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
