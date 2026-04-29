export default function Sidebar({ formData, onChange, onSubmit, onHistory, loading, error, fieldErrors = {} }) {
  const fields = [
    { name: "featureTitle",       label: "Feature Title",    placeholder: "e.g., Add dark mode for dashboard", type: "input",    required: true },
    { name: "targetUsers",        label: "Target Users",     placeholder: "e.g., power users, new users",      type: "input",    required: false },
    { name: "businessGoal",       label: "Business Goal",    placeholder: "e.g., increase retention",          type: "input",    required: false },
    { name: "featureDescription", label: "Description",      placeholder: "Describe the feature and problem…", type: "textarea", required: true },
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
        {fields.map(({ name, label, placeholder, type, required }) => (
          <div key={name} className={`form-group ${fieldErrors[name] ? "form-group--error" : ""}`}>
            <label htmlFor={name}>
              {label}
              {required && <span className="form-required">*</span>}
            </label>
            {type === "textarea" ? (
              <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={onChange}
                placeholder={placeholder}
                rows={5}
                disabled={loading}
                className={fieldErrors[name] ? "input--error" : ""}
              />
            ) : (
              <input
                id={name}
                type="text"
                name={name}
                value={formData[name]}
                onChange={onChange}
                placeholder={placeholder}
                disabled={loading}
                className={fieldErrors[name] ? "input--error" : ""}
              />
            )}
            {fieldErrors[name] && (
              <p className="field-error">{fieldErrors[name]}</p>
            )}
          </div>
        ))}

        {error && <div className="form-error">{error}</div>}
      </div>

      <div className="sidebar-footer">
        <button className="btn-generate" onClick={onSubmit} disabled={loading}>
          {loading ? (
            <span className="btn-generate-loading">
              <span className="btn-spinner" />
              Generating…
            </span>
          ) : (
            "Generate Plan"
          )}
        </button>
        <button className="btn-history" onClick={onHistory} disabled={loading}>
          🕑 View History
        </button>
      </div>
    </aside>
  );
}
