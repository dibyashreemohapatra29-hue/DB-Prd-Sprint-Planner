import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PRDSection from "./components/PRDSection";
import TaskTable from "./components/TaskTable";
import SprintBoard from "./components/SprintBoard";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    featureTitle: "",
    featureDescription: "",
    targetUsers: "",
    businessGoal: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {}

  return (
    <div className="app-shell">
      <Sidebar formData={formData} onChange={handleChange} onSubmit={handleSubmit} />

      <main className="main-content">
        <div className="main-topbar">
          <h1 className="main-title">Output</h1>
          <div className="avatar">PM</div>
        </div>

        <PRDSection />
        <TaskTable />
        <SprintBoard />
      </main>
    </div>
  );
}
