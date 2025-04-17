import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';


import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { fetchTasks, selectTasks, updateTask } from '../../store/slices/tasksSlice';
import { Task, TaskStatus } from '../../types';
import Column from './Column';
import TaskCard from './TaskCard';
import { Button } from '../ui/button';

const useDispatch = () => useReduxDispatch<AppDispatch>();

interface TaskBoardProps {
    onAddTask: () => void;
}
export default function Canvas({ onAddTask }: TaskBoardProps) {
    const dispatch = useDispatch();
    const { tasks, loading } = useSelector(selectTasks)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])


    const handleDragStart = (event: DragStartEvent) => {
        const taskId = event.active.id as string;
        const task = tasks.find((task) => task.id === taskId) || null;
        if (task) {
            setActiveTask(task);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
      // Removed event.preventDefault() as it is not applicable for DragEndEvent
        setActiveTask(null);
        
        const { active, over } = event;
        if (!over) return;
        
        const taskId = active.id;
        const dropColumnId = over.id;
        
        if (dropColumnId === 'todo' || dropColumnId === 'inprogress' || dropColumnId === 'done') {
          const task = tasks.find(t => t.id === taskId);
          if (task && task.status !== dropColumnId) {
            dispatch(updateTask({
              ...task,
              status: dropColumnId as TaskStatus
            }));
          }
        }
      };

      
      const todoTasks = tasks.filter(task => task.status === 'todo');
      const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
      const doneTasks = tasks.filter(task => task.status === 'done');

      

      if (loading && tasks.length === 0) {
        return <div className="flex justify-center p-10">Loading tasks...</div>;
      }
    return (
        <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Task Board</h1>
        <Button onClick={onAddTask}>Add New Task</Button>
      </div>
      
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Column title="To Do" tasks={todoTasks} status="todo" />
          <Column title="In Progress" tasks={inProgressTasks} status="inprogress" />
          <Column title="Done" tasks={doneTasks} status="done" />
        </div>
        
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>
      </DndContext>
    </div>
    )
}
