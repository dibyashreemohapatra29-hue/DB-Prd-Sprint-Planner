function SprintColumn({ title, color, cards }) {
  return (
    <div className="sprint-column">
      <div className="sprint-column-header" style={{ borderTopColor: color }}>
        <span className="sprint-column-title">{title}</span>
        <span className="sprint-column-badge" style={{ background: color + "18", color }}>
          0 tasks
        </span>
      </div>
      <div className="sprint-column-body">
        {cards.map((card, i) => (
          <div className="sprint-card" key={i}>
            <p className="sprint-card-text">{card}</p>
          </div>
        ))}
        <div className="sprint-card sprint-card-placeholder">
          <p className="placeholder-text">Tasks will appear here</p>
        </div>
      </div>
    </div>
  );
}

export default function SprintBoard() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Sprint Plan</h2>
        <p className="card-description">Tasks distributed across teams for the upcoming sprint.</p>
      </div>
      <div className="card-body">
        <div className="sprint-board">
          <SprintColumn title="Team A" color="#6366f1" cards={[]} />
          <SprintColumn title="Team B" color="#10b981" cards={[]} />
          <SprintColumn title="Team C" color="#f59e0b" cards={[]} />
        </div>
      </div>
    </div>
  );
}
