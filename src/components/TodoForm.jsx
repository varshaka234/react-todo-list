import { useState } from 'react'

function TodoForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedText = taskText.trim()

    if (!trimmedText) return

    onAddTask(trimmedText)
    setTaskText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">
        What needs to get done?
      </label>
      <div className="input-wrap">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="input-icon">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <input
          id="new-task"
          type="text"
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="What needs to get done?"
          autoComplete="off"
        />
      </div>
      <button className="add-button" type="submit" disabled={!taskText.trim()}>
        <span>Add task</span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
      </button>
    </form>
  )
}

export default TodoForm
