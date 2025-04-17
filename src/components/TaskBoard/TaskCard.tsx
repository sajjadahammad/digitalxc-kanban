import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Task } from '../../types';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '../ui/card'
  
  interface TaskCardProps {
    task: Task;
  }

export default function TaskCard({task}: TaskCardProps) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
    return (
        <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="mb-4 cursor-grab"
      >
        <CardHeader className="p-3">
          <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
        </CardHeader>
        {task.description && (
          <CardContent className="p-3 pt-0">
            <p className="text-xs text-muted-foreground">{task.description}</p>
          </CardContent>
        )}
      </Card>
    )
}
