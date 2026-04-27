export default function TaskTable() {
  return (
    <div className="card card-tasks">
      <h2 className="section-title">Tasks</h2>
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
                Tasks will appear here
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
