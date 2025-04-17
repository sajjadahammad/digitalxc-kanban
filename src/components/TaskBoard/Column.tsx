import { useDroppable } from "@dnd-kit/core"
import { SortableContext,verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Task,TaskStatus } from "../../types"
import TaskCard from "./TaskCard"

interface ColumnProps {
title:string;
tasks:Task[];
status:TaskStatus;
}


export default function Column({title,tasks,status}:ColumnProps) {
    const {setNodeRef} = useDroppable({
        id:status,
    })
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-3 w-full md:w-80 shadow-md">
        <h2 className="font-semibold mb-4 text-white">{title}({tasks.length})</h2>
        <div ref={setNodeRef} className="min-h-[300px]">
            <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </SortableContext>
        </div>
    </div>
  )
}
