import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/constants';
import Task from './Task';

interface TaskColumnProps {
  title: string;
  tasks: Array<{ id: string; title: string }>;
  onMoveTask: (id: string, columnTitle: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onMoveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item: { id: string }) => onMoveTask(item.id, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="w-1/4 p-4 bg-gray-100 rounded shadow-md">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onMoveTask={(id) => onMoveTask(id, title)} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
