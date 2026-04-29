import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PRDSection from "./components/PRDSection";
import TaskTable from "./components/TaskTable";
import SprintBoard from "./components/SprintBoard";
import FullReport from "./components/FullReport";
import HistorySection from "./components/HistorySection";
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
  const [showReport,  setShowReport]  = useState(false);
  const [view,        setView]        = useState("output");
  const [historyKey,  setHistoryKey]  = useState(0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
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
    setView("output");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToHistory() {
    setHistoryKey((k) => k + 1);
    setView("history");
  }

  async function handleSubmit() {
    setError("");
    if (!formData.featureTitle.trim() || !formData.featureDescription.trim()) {
      setError("Feature Title and Description are required.");
      return;
    }

    setLoading(true);
    setResult(null);
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
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onHistory={goToHistory}
        loading={loading}
        error={error}
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
              <button className="btn-view-report" onClick={() => setShowReport(true)}>
                View Full Report
              </button>
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
    </div>
  );
}
