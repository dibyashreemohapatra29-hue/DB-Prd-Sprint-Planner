const subsections = [
  { label: "Problem Statement",      hint: "What problem does this feature solve? Who experiences it and how often?" },
  { label: "Goals & Success Criteria", hint: "What does success look like? Define measurable outcomes." },
  { label: "User Personas",          hint: "Who are the target users? Describe their roles, needs, and pain points." },
  { label: "Use Cases",              hint: "List the primary use cases and user flows this feature enables." },
  { label: "Metrics & KPIs",        hint: "How will you measure the impact? Define key metrics and baselines." },
];

export default function PRDSection() {
  return (
    <div className="card card--indigo">
      <div className="card-header">
        <h2 className="card-title">Product Requirements Document</h2>
      </div>
      <div className="card-body prd-body">
        {subsections.map(({ label, hint }) => (
          <div key={label} className="prd-row">
            <span className="prd-label">{label}</span>
            <div className="prd-placeholder">
              <p className="placeholder-text">{hint}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
