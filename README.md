# Task Management Dashboard

A responsive Kanban-style task management dashboard built with TypeScript, Vite, and modern React libraries. Users can view tasks, create new tasks, and drag them between "To Do", "In Progress", and "Done" columns, with changes persisted via a mock REST API.

## Features

- ✅ 3-column Kanban board (To Do, In Progress, Done)  
- 📝 Add new tasks using a modal form  
- 🔄 Drag-and-drop tasks between columns and reorder within columns  
- 🔗 Fetch and persist tasks via a mock REST API (`json-server`)  
- 📱 Fully responsive for desktop and mobile screens  

## Technologies Used

- **Frontend**: Vite, React, TypeScript  
- **UI Components**: Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/)  
- **State Management**: Redux Toolkit (with async thunks)  
- **Drag-and-Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`  
- **API**: `json-server` for simulating a REST API  

## Getting Started

### Prerequisites

- Node.js (v18 or higher)  
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/task-management.git
   cd task-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the mock API server**

   ```bash
   npm run server
   ```

   This will run `json-server` at [http://localhost:3001](http://localhost:3001)

4. **Start the development server**

   In a separate terminal:

   ```bash
   npm run dev
   ```

   This will start the Vite dev server at [http://localhost:5173](http://localhost:5173)

> 🧪 Both servers need to run concurrently in separate terminals.

## Folder Structure

```
src/
├── components/        // UI components (TaskCard, Column, etc.)
├── store/              // Redux slices and async thunks
├── hooks/             // Custom React hooks (if any)
├── types/             // TypeScript type definitions
├── lib/             // Utility functions
└── App.tsx            // Root component
```

## Future Improvements

- Add task filtering and search
- Toast notifications for success/error states
- Advanced task fields like due dates, priority, and assignees
- Improved drag animations and mobile touch support
- Accessibility enhancements
- Unit and integration testing



