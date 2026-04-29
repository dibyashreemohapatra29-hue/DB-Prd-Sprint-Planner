import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PRDSection from "./components/PRDSection";
import TaskTable from "./components/TaskTable";
import SprintBoard from "./components/SprintBoard";
import FullReport from "./components/FullReport";
import HistorySection from "./components/HistorySection";
import HistoryPanel from "./components/HistoryPanel";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    featureTitle: "",
    featureDescription: "",
    targetUsers: "",
    businessGoal: "",
  });

  const [result,      setResult]      = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showReport,       setShowReport]       = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [view,             setView]             = useState("output");
  const [historyKey,       setHistoryKey]       = useState(0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleReuse(record) {
    setFormData({
      featureTitle:       record.title        ?? record.featureTitle ?? "",
      featureDescription: record.description  ?? "",
      targetUsers:        record.users        ?? record.targetUsers  ?? "",
      businessGoal:       record.goal         ?? record.businessGoal ?? "",
    });
    const out = record.output ?? record;
    setResult({
      summary:  out.summary,
      prd:      out.prd,
      items:    out.items,
      insights: out.insights,
      metadata: out.metadata,
    });
    setError("");
    setFieldErrors({});
    setView("output");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToHistory() {
    setHistoryKey((k) => k + 1);
    setView("history");
  }

  function validate() {
    const errs = {};
    if (!formData.featureTitle.trim())       errs.featureTitle       = "Feature Title is required.";
    if (!formData.featureDescription.trim()) errs.featureDescription = "Description is required.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function runGenerate() {
    if (!validate()) return;

    setLoading(true);
    setError("");
    setView("output");

    try {
      const res = await fetch(`/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:       formData.featureTitle,
          description: formData.featureDescription,
          users:       formData.targetUsers,
          goal:        formData.businessGoal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setResult(data);
        setHistoryKey((k) => k + 1);
      }
    } catch {
      setError("Could not reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    setResult(null);
    runGenerate();
  }

  function handleRegenerate() {
    runGenerate();
  }

  return (
    <div className="app-shell">
      <Sidebar
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onHistory={() => setShowHistoryPanel(true)}
        loading={loading}
        error={error}
        fieldErrors={fieldErrors}
      />

      <main className="main-content">

        {/* ── Top bar with nav tabs ── */}
        <div className="main-topbar">
          <nav className="main-tabs">
            <button
              className={`main-tab ${view === "output" ? "main-tab--active" : ""}`}
              onClick={() => setView("output")}
            >
              Output
            </button>
            <button
              className={`main-tab ${view === "history" ? "main-tab--active" : ""}`}
              onClick={goToHistory}
            >
              History
            </button>
          </nav>

          <div className="main-topbar-right">
            {view === "output" && result && (
              <>
                <button
                  className="btn-regenerate"
                  onClick={handleRegenerate}
                  disabled={loading}
                  title="Re-run with the same inputs"
                >
                  {loading ? (
                    <span className="btn-spinner" />
                  ) : (
                    "↻ Regenerate"
                  )}
                </button>
                <button className="btn-view-report" onClick={() => setShowReport(true)}>
                  View Full Report
                </button>
              </>
            )}
            <div className="avatar">PM</div>
          </div>
        </div>

        {/* ── Loading bar ── */}
        {loading && (
          <div className="loading-bar">
            <div className="loading-bar-inner" />
          </div>
        )}

        {/* ── API / network error banner ── */}
        {error && view === "output" && (
          <div className="error-banner">
            <span className="error-banner-icon">⚠</span>
            <span>{error}</span>
            <button className="error-banner-close" onClick={() => setError("")}>✕</button>
          </div>
        )}

        {/* ── Output view ── */}
        {view === "output" && (
          <div className="output-scroll">
            {result && (
              <p className="output-context-label">
                Generated plan for <strong>{formData.featureTitle}</strong>
              </p>
            )}
            <PRDSection prd={result?.prd} summary={result?.summary} />
            <TaskTable items={result?.items} />
            <SprintBoard items={result?.items} />
          </div>
        )}

        {/* ── History view ── */}
        {view === "history" && (
          <div className="output-scroll">
            <HistorySection key={historyKey} onReuse={handleReuse} />
          </div>
        )}

      </main>

      {showReport && result && (
        <FullReport
          result={result}
          featureTitle={formData.featureTitle}
          onClose={() => setShowReport(false)}
        />
      )}

      {showHistoryPanel && (
        <HistoryPanel
          refreshKey={historyKey}
          onReuse={(rec) => { handleReuse(rec); setShowHistoryPanel(false); }}
          onClose={() => setShowHistoryPanel(false)}
        />
      )}
    </div>
  );
}
