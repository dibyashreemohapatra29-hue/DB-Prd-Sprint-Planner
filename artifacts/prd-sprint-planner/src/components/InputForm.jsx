export default function InputForm({ formData, onChange, onSubmit }) {
  return (
    <div className="card">
      <h2 className="section-title">Feature Input</h2>

      <div className="form-row">
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
        </div>
      </div>

      <div className="form-row">
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
        </div>
        <div className="form-group">
          <label htmlFor="featureDescription">Feature Description</label>
          <input
            id="featureDescription"
            type="text"
            name="featureDescription"
            value={formData.featureDescription}
            onChange={onChange}
            placeholder="Describe the feature, users, and problem..."
          />
        </div>
      </div>

      <button className="btn-primary" onClick={onSubmit}>
        Generate Plan
      </button>
    </div>
  );
}
