const SUBSECTIONS = [
  { key: "problem",   label: "Problem Statement",       hint: "What problem does this feature solve? Who experiences it and how often?" },
  { key: "goals",     label: "Goals & Success Criteria", hint: "What does success look like? Define measurable outcomes." },
  { key: "personas",  label: "User Personas",            hint: "Who are the target users? Describe their roles, needs, and pain points." },
  { key: "usecases",  label: "Use Cases",                hint: "List the primary use cases and user flows this feature enables." },
  { key: "metrics",   label: "Metrics & KPIs",          hint: "How will you measure the impact? Define key metrics and baselines." },
];

export default function PRDSection({ summary, insights }) {
  const hasData = summary || (insights && insights.length > 0);

  return (
    <div className="card card--indigo">
      <div className="card-header">
        <h2 className="card-title">Product Requirements Document</h2>
      </div>
      <div className="card-body prd-body">
        {hasData ? (
          <>
            {summary && (
              <div className="prd-row">
                <span className="prd-label">Summary</span>
                <div className="prd-content">{summary}</div>
              </div>
            )}
            {insights && insights.length > 0 && (
              <div className="prd-row">
                <span className="prd-label">Insights</span>
                <ul className="prd-insights">
                  {insights.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          SUBSECTIONS.map(({ key, label, hint }) => (
            <div key={key} className="prd-row">
              <span className="prd-label">{label}</span>
              <div className="prd-placeholder">
                <p className="placeholder-text">{hint}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
