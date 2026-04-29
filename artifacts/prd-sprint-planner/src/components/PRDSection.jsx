import { useState } from "react";

const EMPTY_SECTIONS = [
  { key: "problem",  label: "Problem Statement", hint: "What problem does this feature solve? Who experiences it and how often?" },
  { key: "goals",    label: "Goals",             hint: "What does success look like? Define measurable outcomes." },
  { key: "personas", label: "Target Users",      hint: "Who are the target users? Describe their roles, needs, and pain points." },
  { key: "useCases", label: "Use Cases",         hint: "List the primary use cases and user flows this feature enables." },
  { key: "metrics",  label: "Success Metrics",   hint: "How will you measure the impact? Define key metrics and baselines." },
];

function prdToText(prd) {
  if (!prd) return "";
  if (typeof prd === "string") return prd;
  const parts = [];
  if (prd.problem)  parts.push(`Problem Statement\n${prd.problem}`);
  if (prd.goals)    parts.push(`Goals\n${prd.goals}`);
  if (prd.personas) parts.push(`Target Users\n${prd.personas}`);
  if (Array.isArray(prd.useCases) && prd.useCases.length)
    parts.push(`Use Cases\n${prd.useCases.map((u) => `• ${u}`).join("\n")}`);
  if (Array.isArray(prd.metrics) && prd.metrics.length)
    parts.push(`Success Metrics\n${prd.metrics.map((m) => `• ${m}`).join("\n")}`);
  return parts.join("\n\n");
}

function TextRow({ label, value }) {
  return (
    <div className="prd-row">
      <span className="prd-label">{label}</span>
      <div className="prd-content">{value}</div>
    </div>
  );
}

function ListRow({ label, items }) {
  const safeItems = Array.isArray(items) ? items : [];
  return (
    <div className="prd-row">
      <span className="prd-label">{label}</span>
      <ul className="prd-list">
        {safeItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function StringPRD({ prd }) {
  return (
    <div className="prd-row">
      <span className="prd-label">Full PRD</span>
      <div className="prd-content" style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
        {prd}
      </div>
    </div>
  );
}

export default function PRDSection({ prd, summary }) {
  const [copied, setCopied] = useState(false);

  const hasData  = !!prd;
  const isString = typeof prd === "string";

  function handleCopy() {
    const text = prdToText(prd);
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  return (
    <div className="card card--indigo">
      <div className="card-header">
        <h2 className="card-title">Product Requirements Document</h2>
        {hasData && (
          <button className="btn-copy-prd" onClick={handleCopy}>
            {copied ? (
              <span className="btn-copy-prd--success">✓ Copied!</span>
            ) : (
              "Copy PRD"
            )}
          </button>
        )}
      </div>
      <div className="card-body prd-body">
        {!hasData && (
          EMPTY_SECTIONS.map(({ key, label, hint }) => (
            <div key={key} className="prd-row">
              <span className="prd-label">{label}</span>
              <div className="prd-placeholder">
                <p className="placeholder-text">{hint}</p>
              </div>
            </div>
          ))
        )}

        {hasData && isString && <StringPRD prd={prd} />}

        {hasData && !isString && (
          <>
            <TextRow label="Problem Statement" value={prd.problem} />
            <TextRow label="Goals"             value={prd.goals} />
            <TextRow label="Target Users"      value={prd.personas} />
            <ListRow label="Use Cases"         items={prd.useCases} />
            <ListRow label="Success Metrics"   items={prd.metrics} />
          </>
        )}
      </div>
    </div>
  );
}
