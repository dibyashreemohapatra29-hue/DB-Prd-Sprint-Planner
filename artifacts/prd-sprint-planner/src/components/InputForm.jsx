export default function InputForm({ formData, onChange, onSubmit }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Feature Input</h2>
        <p className="card-description">Describe your feature and we'll generate a full product plan.</p>
      </div>
      <div className="card-body">
        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="featureTitle">Feature Title</label>
            <input
              id="featureTitle"
              type="text"
              name="featureTitle"
              value={formData.featureTitle}
              onChange={onChange}
              placeholder="e.g., Add dark mode for dashboard"
            />
            <span className="helper-text">A short, descriptive name for the feature.</span>
          </div>
          <div className="form-group">
            <label htmlFor="targetUsers">Target Users</label>
            <input
              id="targetUsers"
              type="text"
              name="targetUsers"
              value={formData.targetUsers}
              onChange={onChange}
              placeholder="e.g., power users, new users"
            />
            <span className="helper-text">Who will primarily use this feature?</span>
          </div>
          <div className="form-group">
            <label htmlFor="businessGoal">Business Goal</label>
            <input
              id="businessGoal"
              type="text"
              name="businessGoal"
              value={formData.businessGoal}
              onChange={onChange}
              placeholder="e.g., increase retention, improve UX"
            />
            <span className="helper-text">The outcome this feature drives.</span>
          </div>
          <div className="form-group">
            <label htmlFor="featureDescription">Feature Description</label>
            <textarea
              id="featureDescription"
              name="featureDescription"
              value={formData.featureDescription}
              onChange={onChange}
              placeholder="Describe the feature, users, and problem..."
              rows={3}
            />
            <span className="helper-text">Provide context, constraints, and user pain points.</span>
          </div>
        </div>
        <div className="form-footer">
          <button className="btn-primary" onClick={onSubmit}>
            Generate Plan
          </button>
        </div>
      </div>
    </div>
  );
}
