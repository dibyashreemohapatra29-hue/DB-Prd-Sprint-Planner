import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PRDSection from "./components/PRDSection";
import TaskTable from "./components/TaskTable";
import SprintBoard from "./components/SprintBoard";
import FullReport from "./components/FullReport";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    featureTitle: "",
    featureDescription: "",
    targetUsers: "",
    businessGoal: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showReport, setShowReport] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
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
          title: formData.featureTitle,
          description: formData.featureDescription,
          users: formData.targetUsers,
          goal: formData.businessGoal,
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
        loading={loading}
        error={error}
      />

      <main className="main-content">
        {/* Top bar */}
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

        {/* Output preview — scrollable */}
        <div className="output-scroll">
          <PRDSection prd={result?.prd} summary={result?.summary} />
          <TaskTable items={result?.items} />
          <SprintBoard items={result?.items} />
        </div>
      </main>

      {/* Full report modal */}
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
