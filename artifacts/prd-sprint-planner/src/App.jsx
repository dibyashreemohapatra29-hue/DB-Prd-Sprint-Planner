import { useState } from "react";
import Navbar from "./components/Navbar";
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

  function handleSubmit() {}

  return (
    <div className="page-root">
      <Navbar />
      <main className="page-content">
        <div className="page-container">

          <section className="section-block">
            <InputForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </section>

          <div className="output-heading">
            <span className="output-badge">Output</span>
            <div className="output-divider" />
          </div>

          <section className="section-block">
            <PRDSection />
          </section>

          <section className="section-block">
            <TaskTable />
          </section>

          <section className="section-block">
            <SprintBoard />
          </section>

        </div>
      </main>
    </div>
  );
}
