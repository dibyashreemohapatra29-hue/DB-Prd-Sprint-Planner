function SubSection({ label, placeholder }) {
  return (
    <div className="prd-subsection">
      <div className="prd-subsection-label">{label}</div>
      <div className="prd-subsection-body">
        <p className="placeholder-text">{placeholder}</p>
      </div>
    </div>
  );
}

export default function PRDSection() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Product Requirements Document</h2>
        <p className="card-description">Auto-generated PRD based on your feature input.</p>
      </div>
      <div className="card-body prd-body">
        <SubSection
          label="Problem Statement"
          placeholder="What problem does this feature solve? Who experiences it and how often?"
        />
        <SubSection
          label="Goals & Success Criteria"
          placeholder="What does success look like? Define measurable outcomes."
        />
        <SubSection
          label="User Personas"
          placeholder="Who are the target users? Describe their roles, needs, and pain points."
        />
        <SubSection
          label="Use Cases"
          placeholder="List the primary use cases and user flows this feature enables."
        />
        <SubSection
          label="Metrics & KPIs"
          placeholder="How will you measure the impact? Define key metrics and baselines."
        />
      </div>
    </div>
  );
}
