import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";

const STORAGE_KEY = "focus-list-tasks";
const FILTERS = ["All", "Active", "Completed"];

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (!savedTasks) return [];

    const parsedTasks = JSON.parse(savedTasks);
    if (!Array.isArray(parsedTasks)) return [];

    const seenIds = new Set();

    return parsedTasks.reduce((validTasks, task) => {
      if (
        !task ||
        typeof task.id !== "string" ||
        typeof task.text !== "string" ||
        typeof task.completed !== "boolean"
      ) {
        return validTasks;
      }

      const id = task.id.trim();
      const text = task.text.trim();
      if (!id || !text || seenIds.has(id)) return validTasks;

      seenIds.add(id);
      validTasks.push({ id, text, completed: task.completed });
      return validTasks;
    }, []);
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // The app remains usable when browser storage is unavailable or full.
    }
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const completionPercent = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;
  const visibleTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  function addTask(text) {
    const id =
      globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    setTasks((currentTasks) => [
      ...currentTasks,
      { id, text, completed: false },
    ]);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  function clearCompleted() {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
  }

  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m5 12 4.2 4.2L19 6.5" />
            </svg>
          </span>
          <span>
            daymark<span className="brand-period">.</span>
          </span>
        </a>
        <span className="topbar-note">
          <span className="online-dot" /> A little progress, every day
        </span>
      </header>

      <main id="home">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">{today}</p>
          <h1 id="page-title">
            Make space for
            <br className="desktop-break" /> what matters.
          </h1>
          <p className="intro-copy">
            A simple To-Do List application to organize your daily tasks, track
            progress, and stay productive.
          </p>
        </section>

        <section className="dashboard" aria-label="Task dashboard">
          <div className="stats-row" aria-label="Task summary">
            <article className="stat-card total-stat">
              <span className="stat-label">Total tasks</span>
              <span className="stat-value">{tasks.length}</span>
              <span className="stat-detail">On your list</span>
              <span className="stat-icon total-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M8 5h11a2 2 0 0 1 2 2v13H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
                  <path d="M8 5v12m4-8h5m-5 4h5" />
                </svg>
              </span>
            </article>
            <article className="stat-card active-stat">
              <span className="stat-label">To do</span>
              <span className="stat-value">{activeCount}</span>
              <span className="stat-detail">Ready when you are</span>
              <span className="stat-icon active-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
            </article>
            <article className="stat-card completed-stat">
              <span className="stat-label">Completed</span>
              <span className="stat-value">{completedCount}</span>
              <span className="stat-detail">Look at you go</span>
              <span className="stat-icon completed-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="m5 12 4.2 4.2L19 6.5" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </span>
            </article>
          </div>

          <section className="task-panel" aria-labelledby="tasks-heading">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">YOUR SPACE</p>
                <h2 id="tasks-heading">Your tasks</h2>
              </div>
              <span className="remaining-label">
                {activeCount === 1 ? "1 task" : `${activeCount} tasks`} left
              </span>
            </div>

            <TodoForm onAddTask={addTask} />

            <div className="list-toolbar">
              <div
                className="filter-tabs"
                role="group"
                aria-label="Filter tasks"
              >
                {FILTERS.map((filterName) => (
                  <button
                    className={`filter-button${filter === filterName ? " selected" : ""}`}
                    key={filterName}
                    type="button"
                    onClick={() => setFilter(filterName)}
                    aria-pressed={filter === filterName}
                  >
                    {filterName}
                    <span className="filter-count">
                      {filterName === "All"
                        ? tasks.length
                        : filterName === "Active"
                          ? activeCount
                          : completedCount}
                    </span>
                  </button>
                ))}
              </div>
              {completedCount > 0 && (
                <button
                  className="clear-button"
                  type="button"
                  onClick={clearCompleted}
                >
                  Clear completed
                </button>
              )}
            </div>

            <TodoList
              tasks={visibleTasks}
              filter={filter}
              onToggle={toggleTask}
              onDelete={deleteTask}
              hasAnyTasks={tasks.length > 0}
            />
            {tasks.length > 0 && (
              <>
                <div className="progress-summary">
                  <div className="progress-copy">
                    <span>Daily progress</span>
                    <strong>{completionPercent}%</strong>
                  </div>
                  <div
                    className="progress-track"
                    role="progressbar"
                    aria-label="Tasks completed"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={completionPercent}
                  >
                    <span style={{ width: `${completionPercent}%` }} />
                  </div>
                </div>
                <div className="panel-footer">
                  <span>Small steps add up.</span>
                  <span>
                    {completedCount} of {tasks.length} done
                  </span>
                </div>
              </>
            )}
          </section>
        </section>
      </main>
      <footer className="site-footer">
        <span>Made for your next small win.</span>
        <span>Your tasks stay on this device.</span>
      </footer>
    </div>
  );
}

export default App;
