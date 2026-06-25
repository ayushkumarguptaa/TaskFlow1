const TaskCard = ({ task, onEdit, onDelete }) => {
  const due = task.dueDate ? new Date(task.dueDate) : null;
  const overdue = due && due < new Date() && task.status !== "done";

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "—";

  return (
    <div className="card task-card">
      <div className="task-card-header">
        <div>
          <h3>{task.title}</h3>
          <p className="muted task-card-meta">{task.description}</p>
        </div>
        <span className={`badge badge-${task.priority}`}>{task.priority}</span>
      </div>

      <div className="task-card-body">
        <div>
          <p className="task-label">Due</p>
          <p className="task-value">{due ? formatDate(due) : "No date"}</p>
          {overdue && <span className="overdue">Overdue</span>}
        </div>

        <div>
          <p className="task-label">Estimate</p>
          <p className="task-value">{task.estimatedHours || "—"} hrs</p>
        </div>
      </div>

      <div className="task-card-actions">
        <button onClick={() => onEdit(task)} className="btn-ghost">Edit</button>
        <button onClick={() => onDelete(task._id)} className="btn-ghost">Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;