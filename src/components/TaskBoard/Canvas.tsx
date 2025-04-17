import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';


import {
    DndContext,
    DragEndEvent,
    // DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { fetchTasks, reorderTasks, selectTasks, updateTask } from '../../store/slices/tasksSlice';
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
      setActiveTask(null);
      const { active, over } = event;
      
      if (!over) return;
      
      const taskId = active.id;
      const overItemId = over.id;
      
      if (overItemId === 'todo' || overItemId === 'inprogress' || overItemId === 'done') {
        const task = tasks.find(t => t.id === taskId);
        if (task && task.status !== overItemId) {
          const tasksInNewColumn = tasks.filter(t => t.status === overItemId);
          const maxOrder = tasksInNewColumn.length > 0 
            ? Math.max(...tasksInNewColumn.map(t => t.order || 0)) 
            : -1;
          
          dispatch(updateTask({
            ...task,
            status: overItemId as TaskStatus,
            order: maxOrder + 1
          }));
        }
        return;
      }
      
      const activeTask = tasks.find(t => t.id === taskId);
      const overTask = tasks.find(t => t.id === overItemId);
      
      if (!activeTask || !overTask || activeTask.status !== overTask.status) return;
      
      const columnTasks = tasks
        .filter(t => t.status === activeTask.status)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      const activeIndex = columnTasks.findIndex(t => t.id === taskId);
      const overIndex = columnTasks.findIndex(t => t.id === overItemId);
      
      if (activeIndex !== overIndex) {
        const reordered = [...columnTasks];
        const [movedTask] = reordered.splice(activeIndex, 1);
        reordered.splice(overIndex, 0, movedTask);
        
        const updatedTasks = reordered.map((task, index) => ({
          ...task,
          order: index
        }));
        
        dispatch(reorderTasks(updatedTasks));
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
        <Button onClick={onAddTask} className='bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer'>Add New Task</Button>
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
