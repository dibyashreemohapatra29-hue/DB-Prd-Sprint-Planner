import { useEffect, useState } from "react";

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function PRDContent({ prd }) {
  if (!prd) return <p className="adm-prd-empty">No PRD content available.</p>;

  if (typeof prd === "string") {
    return (
      <div className="adm-prd-text">
        {prd.split("\n").filter(Boolean).map((line, i) => {
          if (/^#{1,3}\s/.test(line)) {
            return <p key={i} className="adm-prd-heading">{line.replace(/^#{1,3}\s/, "")}</p>;
          }
          if (/^\*\*(.+)\*\*/.test(line)) {
            return <p key={i} className="adm-prd-bold">{line.replace(/\*\*/g, "")}</p>;
          }
          if (/^[-•]\s/.test(line)) {
            return <p key={i} className="adm-prd-bullet">{line.replace(/^[-•]\s/, "")}</p>;
          }
          return <p key={i} className="adm-prd-para">{line}</p>;
        })}
      </div>
    );
  }

  if (typeof prd === "object") {
    return (
      <div className="adm-prd-rows">
        {Object.entries(prd).map(([key, val]) => (
          <div key={key} className="adm-prd-row">
            <span className="adm-prd-label">
              {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim()}
            </span>
            <span className="adm-prd-value">
              {Array.isArray(val) ? val.join(", ") : String(val)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function EffortBadge({ effort }) {
  const level = (effort || "").toLowerCase();
  const cls = level.includes("high") ? "adm-badge--effort-high"
    : level.includes("med")  ? "adm-badge--effort-med"
    : level.includes("low")  ? "adm-badge--effort-low"
    : "adm-badge--effort-low";
  return <span className={`adm-badge ${cls}`}>{effort || "—"} effort</span>;
}

function PriorityBadge({ priority }) {
  const level = (priority || "").toLowerCase();
  const cls = level === "high" ? "adm-badge--priority-high"
    : level === "medium"       ? "adm-badge--priority-med"
    : "adm-badge--priority-low";
  return <span className={`adm-badge ${cls}`}>{priority || "—"} priority</span>;
}

function RiskBadge({ risk }) {
  const level = (risk || "").toLowerCase();
  const cls = level === "high" ? "adm-badge--risk-high"
    : level === "medium"       ? "adm-badge--risk-med"
    : "adm-badge--risk-low";
  return <span className={`adm-badge ${cls}`}>{risk || "—"} risk</span>;
}

function WorkflowCard({ rec, onReuse, onDelete }) {
  const [open,      setOpen]      = useState(false);
  const [confirm,   setConfirm]   = useState(false);
  const [deleting,  setDeleting]  = useState(false);
  const [delError,  setDelError]  = useState("");

  const out      = rec.output || {};
  const meta     = out.metadata || {};
  const items    = Array.isArray(out.items) ? out.items : [];
  const insights = Array.isArray(out.insights) ? out.insights : [];

  async function handleDelete(e) {
    e.stopPropagation();
    if (!confirm) { setConfirm(true); return; }
    setDeleting(true);
    setDelError("");
    try {
      const res = await fetch(`/api/history/${rec.id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Delete failed");
      }
      onDelete(rec.id);
    } catch (err) {
      setDelError(err.message || "Could not delete workflow.");
      setDeleting(false);
      setConfirm(false);
    }
  }

  function cancelDelete(e) {
    e.stopPropagation();
    setConfirm(false);
    setDelError("");
  }

  return (
    <div className={`adm-card ${open ? "adm-card--open" : ""}`}>

      {/* ── Collapsed header ── */}
      <div
        className="adm-card-header"
        role="button"
        tabIndex={0}
        onClick={() => { setConfirm(false); setOpen((v) => !v); }}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setConfirm(false); setOpen((v) => !v); } }}
      >
        <div className="adm-card-header-left">
          <span className="adm-card-chevron">{open ? "▾" : "▸"}</span>
          <div>
            <p className="adm-card-title">{rec.title || "Untitled"}</p>
            <p className="adm-card-date">{formatDate(rec.created_at)}</p>
          </div>
        </div>
        <div className="adm-card-header-right">
          {meta.priority && <PriorityBadge priority={meta.priority} />}
          {meta.risk      && <RiskBadge risk={meta.risk} />}
          {meta.effort    && <EffortBadge effort={meta.effort} />}
          {confirm ? (
            <span className="adm-delete-confirm" onClick={(e) => e.stopPropagation()}>
              <span className="adm-delete-confirm-text">Delete?</span>
              <button className="adm-delete-confirm-yes" onClick={handleDelete} disabled={deleting}>
                {deleting ? "…" : "Yes"}
              </button>
              <button className="adm-delete-confirm-no" onClick={cancelDelete}>No</button>
            </span>
          ) : (
            <button
              className="adm-delete-btn"
              onClick={handleDelete}
              title="Delete workflow"
              aria-label="Delete workflow"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      {delError && <p className="adm-delete-error">{delError}</p>}

      {/* ── Expanded body ── */}
      {open && (
        <div className="adm-card-body">

          {/* Inputs */}
          <div className="adm-section">
            <p className="adm-section-label">Inputs</p>
            <div className="adm-inputs-grid">
              <div className="adm-input-field">
                <span className="adm-input-key">Title</span>
                <span className="adm-input-val">{rec.title || "—"}</span>
              </div>
              <div className="adm-input-field">
                <span className="adm-input-key">Target Users</span>
                <span className="adm-input-val">{rec.users || "—"}</span>
              </div>
              <div className="adm-input-field adm-input-field--full">
                <span className="adm-input-key">Description</span>
                <span className="adm-input-val">{rec.description || "—"}</span>
              </div>
              <div className="adm-input-field adm-input-field--full">
                <span className="adm-input-key">Business Goal</span>
                <span className="adm-input-val">{rec.goal || "—"}</span>
              </div>
            </div>
          </div>

          {/* Logic Layer */}
          <div className="adm-section">
            <p className="adm-section-label">Logic Layer</p>
            <div className="adm-logic-row">
              <div className="adm-logic-stat">
                <span className="adm-logic-num">{items.length}</span>
                <span className="adm-logic-desc">Sprint Tasks</span>
              </div>
              <div className="adm-logic-stat">
                <span className="adm-logic-num">{insights.length}</span>
                <span className="adm-logic-desc">Insights</span>
              </div>
              <div className="adm-logic-stat">
                <span className="adm-logic-num">{meta.priority || "—"}</span>
                <span className="adm-logic-desc">Priority</span>
              </div>
              <div className="adm-logic-stat">
                <span className="adm-logic-num">{meta.risk || "—"}</span>
                <span className="adm-logic-desc">Risk</span>
              </div>
              <div className="adm-logic-stat">
                <span className="adm-logic-num">{meta.effort || "—"}</span>
                <span className="adm-logic-desc">Effort</span>
              </div>
            </div>

            {items.length > 0 && (
              <div className="adm-items-table-wrap">
                <table className="adm-items-table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Sprint</th>
                      <th>Priority</th>
                      <th>Effort</th>
                      <th>Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.task || item.name || "—"}</td>
                        <td>{item.sprint != null ? `Sprint ${item.sprint}` : "—"}</td>
                        <td>
                          <span className={`adm-badge adm-badge--sm adm-badge--priority-${(item.priority || "").toLowerCase()}`}>
                            {item.priority || "—"}
                          </span>
                        </td>
                        <td>{item.effort || "—"}</td>
                        <td>
                          <span className={`adm-badge adm-badge--sm adm-badge--risk-${(item.risk || "").toLowerCase()}`}>
                            {item.risk || "—"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Full PRD */}
          <div className="adm-section">
            <p className="adm-section-label">Full PRD</p>
            <PRDContent prd={out.prd} />
          </div>

          {/* Insights */}
          {insights.length > 0 && (
            <div className="adm-section">
              <p className="adm-section-label">Insights</p>
              <ul className="adm-insights-list">
                {insights.map((ins, i) => (
                  <li key={i}>{ins}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="adm-card-footer">
            <span className="adm-card-footer-date">Generated {formatDate(rec.created_at)}</span>
            <button className="adm-reuse-btn" onClick={() => onReuse(rec)}>
              Reuse in Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const LEVELS = ["All", "High", "Medium", "Low"];

function FilterGroup({ label, value, onChange }) {
  return (
    <div className="adm-filter-group">
      <span className="adm-filter-label">{label}</span>
      <div className="adm-filter-pills">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            className={`adm-filter-pill ${value === lvl ? "adm-filter-pill--active" : ""}`}
            onClick={() => onChange(lvl)}
          >
            {lvl}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HistorySection({ onReuse, refreshKey = 0 }) {
  const [records,        setRecords]        = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState("");
  const [search,         setSearch]         = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterRisk,     setFilterRisk]     = useState("All");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRecords(data);
        else setError("Unexpected response from server.");
      })
      .catch(() => setError("Could not load history."))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const query = search.trim().toLowerCase();

  const filtered = records.filter((rec) => {
    if (query) {
      const inTitle = (rec.title || "").toLowerCase().includes(query);
      const inDesc  = (rec.description || "").toLowerCase().includes(query);
      if (!inTitle && !inDesc) return false;
    }
    const meta = rec.output?.metadata || {};
    if (filterPriority !== "All" && (meta.priority || "").toLowerCase() !== filterPriority.toLowerCase()) return false;
    if (filterRisk     !== "All" && (meta.risk     || "").toLowerCase() !== filterRisk.toLowerCase())     return false;
    return true;
  });

  const hasFilters = query || filterPriority !== "All" || filterRisk !== "All";

  function clearFilters() {
    setSearch("");
    setFilterPriority("All");
    setFilterRisk("All");
  }

  return (
    <section className="adm-dashboard">

      {/* Header */}
      <div className="adm-dashboard-header">
        <div>
          <h2 className="adm-dashboard-title">Workflow History</h2>
          <p className="adm-dashboard-subtitle">
            {loading ? "Loading…"
              : records.length === 0 ? "All generated workflows appear here"
              : hasFilters
                ? `${filtered.length} of ${records.length} workflow${records.length !== 1 ? "s" : ""} match`
                : `${records.length} workflow${records.length !== 1 ? "s" : ""} — click any card to expand`}
          </p>
        </div>
        {hasFilters && (
          <button className="adm-clear-btn" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {/* Search + Filters */}
      {!loading && !error && records.length > 0 && (
        <div className="adm-controls">
          <div className="adm-search-wrap">
            <span className="adm-search-icon">⌕</span>
            <input
              className="adm-search-input"
              type="text"
              placeholder="Search by title or description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="adm-search-clear" onClick={() => setSearch("")} aria-label="Clear search">✕</button>
            )}
          </div>
          <div className="adm-filters-row">
            <FilterGroup label="Priority" value={filterPriority} onChange={setFilterPriority} />
            <FilterGroup label="Risk"     value={filterRisk}     onChange={setFilterRisk} />
          </div>
        </div>
      )}

      {/* States */}
      {loading && <p className="adm-state-msg">Loading workflows…</p>}
      {error   && <p className="adm-state-msg adm-state-msg--error">{error}</p>}

      {!loading && !error && records.length === 0 && (
        <p className="adm-state-msg">No workflows yet. Generate your first plan above.</p>
      )}

      {!loading && !error && records.length > 0 && filtered.length === 0 && (
        <p className="adm-state-msg">No workflows match your search or filters.</p>
      )}

      {/* Cards */}
      {!loading && !error && filtered.length > 0 && (
        <div className="adm-cards-list">
          {filtered.map((rec, i) => (
            <WorkflowCard
              key={rec.id ?? i}
              rec={rec}
              onReuse={onReuse}
              onDelete={(id) => setRecords((prev) => prev.filter((r) => r.id !== id))}
            />
          ))}
        </div>
      )}
    </section>
  );
}
