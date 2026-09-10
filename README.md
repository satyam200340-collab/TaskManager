# Task Manager

A simple, clean, and responsive Task Management web application built with **React** and **Tailwind CSS**.

---

## Features

- **Add New Tasks**:
  - Open a clean modal to add a task with **Task Name**, **Owner** (optional), **Priority** (Low / Medium / High), and **Status** (To-Do / Working on it / Done / Stuck).
  - Automatically records the date when the task is added.
- **Live Search**:
  - Search tasks in real time.
  - Matches against both **Task Name** and **Priority**.
- **Sorting**:
  - Sort by **Priority** (High → Low or Low → High).
  - Sort by **Added Date** (Newest First or Oldest First).
- **Card-Style Rows**:
  - Tasks are rendered as distinct, rounded cards with comfortable spacing.
  - Color-coded status pills:
    - **Working on it**: Orange
    - **Done**: Green (with strike-through on task title)
    - **Stuck**: Red
    - **To-Do**: Gray
- **Edit Tasks**:
  - Click on any task or the **Edit** button to modify fields.
  - Changes save immediately.
- **Single & Bulk Deletion**:
  - Delete individual tasks with confirmation.
  - Checkboxes enable multi-selection, showing a **Delete Selected (N)** button with confirmation.
- **LocalStorage Persistence**:
  - Automatically saves tasks to the browser's `localStorage` so tasks remain after page refreshes.

---

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS v4**

---

## Project Structure

```text
app-01/
├── src/
│   ├── components/
│   │   ├── DeleteConfirmModal.jsx  # Confirmation dialog for deleting tasks
│   │   ├── TaskCard.jsx            # Individual task row card component
│   │   ├── TaskList.jsx            # Main view, toolbar, search, and sorting
│   │   └── TaskModal.jsx           # Modal for adding and editing tasks
│   ├── constants/
│   │   └── tasks.js                # Initial tasks and status/priority lists
│   ├── App.jsx                     # Top-level state and localStorage sync
│   ├── index.css                   # Tailwind styles and base font
│   └── main.jsx                    # React root render
├── index.html                      # HTML entry point
├── package.json                    # Project dependencies and scripts
└── vite.config.js                  # Vite configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- `npm`

### Installation

1. Navigate to the project directory:
   ```bash
   cd app-01
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173/
```

### Building for Production

To create an optimized production build:
```bash
npm run build
```

---

## License

MIT
