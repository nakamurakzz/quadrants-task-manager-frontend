import { useDrag } from 'react-dnd';
import { ItemTypes } from '../utils/constants';

interface TaskProps {
  task: { id: string; title: string };
  onMoveTask: (id: string, quadrantName: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onMoveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onMoveTask(item.id, "");
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`task p-2 mb-2 text-white rounded shadow-lg ${
        isDragging ? 'bg-gray-400' : 'bg-blue-600'
      }`}
    >
      {task.title}
    </div>
  );
};

export default Task;
