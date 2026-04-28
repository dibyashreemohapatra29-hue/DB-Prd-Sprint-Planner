import { useEffect, useState } from "react";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 1)   return "just now";
  if (mins  < 60)  return `${mins}m ago`;
  if (hours < 24)  return `${hours}h ago`;
  return `${days}d ago`;
}

export default function HistoryPanel({ onReuse, onClose }) {
  const [records, setRecords]  = useState([]);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState("");

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRecords(data);
        else setError("Could not load history.");
      })
      .catch(() => setError("Could not reach the server."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="history-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="history-panel">

        {/* Header */}
        <div className="history-header">
          <div>
            <h2 className="history-title">History</h2>
            <p className="history-subtitle">Past generated plans — click any to reuse</p>
          </div>
          <button className="report-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className="history-body">
          {loading && <p className="history-empty">Loading…</p>}
          {error   && <p className="history-empty" style={{ color: "#dc2626" }}>{error}</p>}

          {!loading && !error && records.length === 0 && (
            <p className="history-empty">No history yet. Generate your first plan to see it here.</p>
          )}

          {!loading && records.map((rec) => (
            <div key={rec.id} className="history-card">
              <div className="history-card-body">
                <p className="history-card-title">{rec.featureTitle}</p>
                <p className="history-card-meta">
                  {rec.targetUsers && <span>{rec.targetUsers} · </span>}
                  <span>{timeAgo(rec.createdAt)}</span>
                </p>
                {rec.metadata && (
                  <div className="history-card-badges">
                    <span className={`history-badge history-badge--priority-${rec.metadata.priority?.toLowerCase()}`}>
                      {rec.metadata.priority} priority
                    </span>
                    <span className={`history-badge history-badge--risk-${rec.metadata.risk?.toLowerCase()}`}>
                      {rec.metadata.risk} risk
                    </span>
                  </div>
                )}
              </div>
              <button
                className="history-reuse-btn"
                onClick={() => { onReuse(rec); onClose(); }}
              >
                Reuse
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
