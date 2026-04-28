export default function TaskTable() {
  return (
    <div className="card card--amber">
      <div className="card-header">
        <h2 className="card-title">Tasks</h2>
      </div>
      <div className="card-body no-pad">
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
  );
}
