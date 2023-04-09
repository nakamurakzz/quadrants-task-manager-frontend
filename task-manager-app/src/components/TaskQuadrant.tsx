import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/constants';
import Task from './Task';

interface TaskQuadrantProps {
  quadrantName: string;
  tasks: Array<{ id: string; title: string }>;
  onMoveTask: (id: string, quadrantName: string) => void;
}

const TaskQuadrant: React.FC<TaskQuadrantProps> = ({ quadrantName, tasks, onMoveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item: {id: string}) => onMoveTask(item.id, quadrantName),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="w-full p-4 bg-gray-100 rounded shadow-md">
      <h2 className="mb-4 text-xl font-semibold">{quadrantName}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onMoveTask={onMoveTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskQuadrant;