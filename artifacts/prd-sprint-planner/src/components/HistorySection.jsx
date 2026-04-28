import { useEffect, useState } from "react";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistorySection({ onReuse }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRecords(data);
        else setError("Unexpected response from server.");
      })
      .catch(() => setError("Could not load history."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="history-section">
      <div className="history-section-header">
        <h2 className="history-section-title">History</h2>
        <p className="history-section-subtitle">Previously generated plans</p>
      </div>

      {loading && <p className="history-section-empty">Loading…</p>}
      {error   && <p className="history-section-empty">{error}</p>}

      {!loading && !error && records.length === 0 && (
        <p className="history-section-empty">No plans generated yet. Fill in the form and hit Generate!</p>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="history-section-list">
          {records.map((rec, i) => (
            <div key={i} className="hsec-card">
              <div className="hsec-card-info">
                <span className="hsec-card-title">{rec.title}</span>
                <span className="hsec-card-date">{formatDate(rec.created_at)}</span>
              </div>
              <button className="hsec-reuse-btn" onClick={() => onReuse(rec)}>
                Reuse
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
