import TodoItem from './TodoItem.jsx'

function TodoList({ tasks, filter, onToggle, onDelete, hasAnyTasks }) {
  if (tasks.length === 0) {
    const isFilteredEmpty = hasAnyTasks

    return (
      <div className="empty-state" role="status">
        <div className="empty-icon" aria-hidden="true">
          {isFilteredEmpty ? (
            <svg viewBox="0 0 48 48">
              <path d="M12 8h24a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3Z" />
              <path d="M17 17h14M17 24h14M17 31h8" />
            </svg>
          ) : (
            <svg viewBox="0 0 48 48">
              <path d="M24 7v34M7 24h34" />
              <circle cx="24" cy="24" r="19" />
            </svg>
          )}
        </div>
        <h3>{isFilteredEmpty ? `No ${filter.toLowerCase()} tasks` : 'A little room to breathe'}</h3>
        <p>
          {isFilteredEmpty
            ? 'Try another filter to see more of your list.'
            : 'Add your first task above and make today count.'}
        </p>
      </div>
    )
  }

  const renderTaskItems = (taskItems) =>
    taskItems.map((task) => (
      <TodoItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
    ))

  return (
    <ul className="todo-list" aria-label={`${filter} tasks`}>
      {renderTaskItems(tasks)}
    </ul>
  )
}

export default TodoList
