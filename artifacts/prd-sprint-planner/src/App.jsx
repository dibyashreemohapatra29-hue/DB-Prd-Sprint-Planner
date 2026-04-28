import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PRDSection from "./components/PRDSection";
import TaskTable from "./components/TaskTable";
import SprintBoard from "./components/SprintBoard";
import FullReport from "./components/FullReport";
import HistoryPanel from "./components/HistoryPanel";
import HistorySection from "./components/HistorySection";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    featureTitle: "",
    featureDescription: "",
    targetUsers: "",
    businessGoal: "",
  });

  const [result, setResult]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [showReport, setShowReport] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  }

  // Pre-fill form from a history record (supports both local DB and Supabase field names)
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setError("");
    if (!formData.featureTitle.trim() || !formData.featureDescription.trim()) {
      setError("Feature Title and Description are required.");
      return;
    }

    setLoading(true);
    setResult(null);

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
        onHistory={() => setShowHistory(true)}
        loading={loading}
        error={error}
      />

      <main className="main-content">
        <div className="main-topbar">
          <div>
            <h1 className="main-title">Output</h1>
            {result && (
              <p className="main-subtitle">
                Generated plan for <strong>{formData.featureTitle}</strong>
              </p>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {result && (
              <button className="btn-view-report" onClick={() => setShowReport(true)}>
                View Full Report
              </button>
            )}
            <div className="avatar">PM</div>
          </div>
        </div>

        {loading && (
          <div className="loading-bar">
            <div className="loading-bar-inner" />
          </div>
        )}

        <div className="output-scroll">
          <PRDSection prd={result?.prd} summary={result?.summary} />
          <TaskTable items={result?.items} />
          <SprintBoard items={result?.items} />
          <HistorySection onReuse={handleReuse} />
        </div>
      </main>

      {showReport && result && (
        <FullReport
          result={result}
          featureTitle={formData.featureTitle}
          onClose={() => setShowReport(false)}
        />
      )}

      {showHistory && (
        <HistoryPanel
          onReuse={handleReuse}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}
