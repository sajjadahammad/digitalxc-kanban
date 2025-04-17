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
    <div className="bg-muted/30 rounded-md p-3 w-full md:80">
        <h2 className="font-semibold mb-4">{title}({tasks.length})</h2>
        <div ref={setNodeRef} className="min-h-[200px]">
            <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </SortableContext>
        </div>
    </div>
  )
}
