
## Summary

My task management dashboard meets all the core requirements of the assignment, offering users a fully functional Kanban board where they can create tasks, view them, and move them across different stages using drag-and-drop. The application integrates seamlessly with a mock API to ensure that all changes are persisted, and it uses Redux Toolkit to manage the global state and handle asynchronous API interactions through thunks.

The user interface is clean and minimalistic, with a modern design that adapts well to both desktop and mobile screens. The drag-and-drop experience feels smooth and intuitive, making it easy for users to not only shift tasks between columns like "To Do", "In Progress", and "Done", but also reorder them within each column—this goes a step beyond the core assignment expectations.

One of the standout strengths of my implementation is the way the codebase is structured. There's a clear separation of concerns, which makes the code easy to understand and maintain. I’ve also incorporated TypeScript throughout the project to enforce type safety, helping to catch potential issues early during development. The use of Redux with async thunks adds a solid architectural layer for managing API calls and state updates in a predictable way.

## Self-Criticism

- **Error Handling**: While errors are tracked in state, they're not clearly shown in the UI.
- **Column Space Limitation**:There's a usability issue where tasks cannot be dragged to a column when there is no more visible space in that column. This happens because the overflow handling isn't properly implemented, preventing users from dropping tasks when the target area is not in view.
- **Loading States**: Functional, but could be more visible to users with better indicators or skeletons.
- **Form Validation**: Currently minimal—could use stronger validation rules.
- **Drag UX**: Drag-and-drop works well, but animations and visual feedback could be smoother.
- **Mobile Experience**: Dragging on smaller screens isn’t as intuitive as it could be.
- **TypeScript**: This is still an area I’m actively improving. While I’ve applied types throughout the app, I found some advanced typing situations challenging and used AI as a guide when I got stuck.

## With More Time

- Add toast notifications for errors and retry options.
- Implement offline support using local storage.
- Optimize large lists using virtualization.
- Improve accessibility for keyboard and screen readers.
- Add filtering, search, due dates, and priority levels to tasks.
- Refine drag animations and UI transitions for a smoother experience.
- Write comprehensive tests (unit + integration).

## Stack Ratings

- **React**: 9/10 – Clean component logic and solid state management.
- **Redux Toolkit**: 8/10 – Well-structured async flows, room to improve with normalization.
- **TypeScript**: 7/10 – Used consistently, but I’m still building confidence with complex types.
- **DnD Kit**: 6.5/10 – Core features work well, especially considering my limited prior experience. Still learning the nuances of advanced drag logic.
- **Tailwind CSS**: 9.5/10 – Aesthetic and responsive, though some components could be abstracted further.
- **API Integration**: 8.5/10 – Reliable and functional, but error UI needs improvement.

