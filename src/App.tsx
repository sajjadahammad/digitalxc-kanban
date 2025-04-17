
import Canvas from "./components/TaskBoard/Canvas"
import { CreateTaskModal } from "./components/CreateTaskModal"
import { useState } from "react";

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
     <div className="min-h-screen font-poppins bg-slate-900">
          <Canvas onAddTask={() => setIsCreateModalOpen(true)} />
          <CreateTaskModal 
            open={isCreateModalOpen} 
            onClose={() => setIsCreateModalOpen(false)} 
          />
        </div>
    </>
  )
}

export default App
