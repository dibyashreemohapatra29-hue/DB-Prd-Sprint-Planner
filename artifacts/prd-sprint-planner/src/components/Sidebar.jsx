export default function Sidebar({ formData, onChange, onSubmit }) {
  const fields = [
    { name: "featureTitle",       label: "Feature Title",    placeholder: "e.g., Add dark mode for dashboard", type: "input" },
    { name: "targetUsers",        label: "Target Users",     placeholder: "e.g., power users, new users",      type: "input" },
    { name: "businessGoal",       label: "Business Goal",    placeholder: "e.g., increase retention",          type: "input" },
    { name: "featureDescription", label: "Description",      placeholder: "Describe the feature and problem…", type: "textarea" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-logo">◈</span>
          <span className="sidebar-title">PRD → Sprint Planner</span>
        </div>
        <p className="sidebar-subtitle">Fill in the fields below and generate your plan.</p>
      </div>

      <div className="sidebar-form">
        {fields.map(({ name, label, placeholder, type }) => (
          <div key={name} className="form-group">
            <label htmlFor={name}>{label}</label>
            {type === "textarea" ? (
              <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={onChange}
                placeholder={placeholder}
                rows={5}
              />
            ) : (
              <input
                id={name}
                type="text"
                name={name}
                value={formData[name]}
                onChange={onChange}
                placeholder={placeholder}
              />
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="btn-generate" onClick={onSubmit}>
          Generate Plan
        </button>
      </div>
    </aside>
  );
}
