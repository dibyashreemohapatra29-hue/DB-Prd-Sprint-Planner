import { useState } from "react";
import InputForm from "./components/InputForm";
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

  function handleSubmit() {
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">PRD to Sprint Planner</h1>
        <p className="app-subtitle">
          Turn your product ideas into structured plans and sprint-ready tasks
        </p>
      </header>

      <main className="main-layout">
        <section className="input-section">
          <InputForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </section>

        <section className="output-section">
          <PRDSection />
          <TaskTable />
          <SprintBoard />
        </section>
      </main>
    </div>
  );
}
