import { useCallback, useState } from 'react';
import TaskColumn from './TaskColumn';

interface TaskBoardProps {
  tasks: Record<string, Array<{ id: string; title: string }>>;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(tasks);

  const moveTask = useCallback((taskId: string, newColumnTitle: string) => {
    // ここでバックエンドにタスクの移動を通知する
  }, []);

  const handleMoveTask = (id: string, newColumnTitle: string) => {
    const oldColumnTitle = Object.keys(tasks).find((columnTitle) =>
      tasks[columnTitle].find((task) => task.id === id),
    );
  
    if (!oldColumnTitle) {
      return;
    }
  
    const taskIndex = tasks[oldColumnTitle].findIndex((task) => task.id === id);
    const task = tasks[oldColumnTitle][taskIndex];
  
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
  
      newTasks[oldColumnTitle] = [
        ...newTasks[oldColumnTitle].slice(0, taskIndex),
        ...newTasks[oldColumnTitle].slice(taskIndex + 1),
      ];
  
      newTasks[newColumnTitle] = [...newTasks[newColumnTitle], task];
  
      return newTasks;
    });
  };

  return (
    <div className="flex justify-around task-board">
      {Object.keys(columns).map((columnTitle) => (
        <TaskColumn
          key={columnTitle}
          title={columnTitle}
          tasks={columns[columnTitle]}
          onMoveTask={moveTask}
        />
      ))}
    </div>
  );
};

export default TaskBoard;