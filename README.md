# Daymark To-Do List

A calm, responsive task dashboard built with React and Vite. Add tasks, track what is active or complete, and keep your list available between visits with browser localStorage.

## Features

- Add tasks with the button or by pressing **Enter**.
- Whitespace-only tasks are rejected; surrounding whitespace is trimmed.
- Mark a task active or completed, or delete it individually.
- Filter the list by **All**, **Active**, or **Completed**.
- View total, active, and completed task counts at a glance.
- Clear all completed tasks in one action.
- Friendly empty states, responsive layout, keyboard focus indicators, and reduced-motion support.
- Tasks are saved in localStorage and restored when the app is reopened or refreshed.
- No backend, database, or UI framework required.

## Requirements

- Node.js 20.19+ or 22.12+ (required by the installed Vite version)
- npm

## Installation

From the `todo-list` project directory, install dependencies:

```sh
npm install
```

## Run locally

Start the Vite development server:

```sh
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

## Build and lint

Create a production build:

```sh
npm run build
```

Run ESLint:

```sh
npm run lint
```

Preview the production build locally:

```sh
npm run preview
```

## Project structure

```text
src/
  components/
    TodoForm.jsx   # Validated task input and submit behavior
    TodoItem.jsx   # Completion and delete controls for one task
    TodoList.jsx   # Filtered task list and empty states
  App.jsx          # Task state, filtering, counts, and localStorage
  App.css          # Dashboard and responsive component styles
  index.css        # Global reset and design tokens
```

## Persistence

Tasks are stored in the browser under the `focus-list-tasks` localStorage key. Data stays in the current browser profile and is not synced to a server. Clearing browser site data removes the saved tasks.
