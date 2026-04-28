export default function TaskTable() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Tasks</h2>
        <p className="card-description">Breakdown of engineering tasks derived from the PRD.</p>
      </div>
      <div className="card-body no-padding">
        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Effort</th>
                <th>Priority</th>
                <th>Dependencies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="placeholder-cell">
                  Tasks will appear here once you generate a plan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
