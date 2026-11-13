function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className={`todo-item${task.completed ? ' is-completed' : ''}`}>
      <button
        type="button"
        className="task-check"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? `Mark ${task.text} as active` : `Mark ${task.text} as completed`}
        aria-pressed={task.completed}
      >
        {task.completed && (
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="m5 10 3.2 3.2L15.5 6" />
          </svg>
        )}
      </button>
      <span className="task-text">{task.text}</span>
      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.text}`}
        title="Delete task"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3" />
        </svg>
      </button>
    </li>
  )
}

export default TodoItem
