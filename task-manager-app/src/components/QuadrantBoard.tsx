import { useState } from 'react';
import TaskQuadrant from './TaskQuadrant';

interface QuadrantBoardProps {
  tasks: {
    [key: string]: Array<{ id: string; title: string }>;
  };
}

const QuadrantBoard: React.FC<QuadrantBoardProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleMoveTask = (id: string, newQuadrantName: string) => {
    const oldQuadrantName = Object.keys(tasks).find((quadrantName) =>
      tasks[quadrantName].find((task) => task.id === id),
    );
  
    if (!oldQuadrantName) {
      return;
    }
  
    const taskIndex = tasks[oldQuadrantName].findIndex((task) => task.id === id);
    const task = tasks[oldQuadrantName][taskIndex];
  
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
  
      newTasks[oldQuadrantName] = [
        ...newTasks[oldQuadrantName].slice(0, taskIndex),
        ...newTasks[oldQuadrantName].slice(taskIndex + 1),
      ];
  
      newTasks[newQuadrantName] = [...newTasks[newQuadrantName], task];
  
      return newTasks;
    });
  };

  return (
    <div className="quadrant-board flex flex-wrap">
      {Object.entries(tasks).map(([quadrantName, quadrantTasks]) => (
        <div key={quadrantName} className="w-1/2 p-4">
          <TaskQuadrant
            quadrantName={quadrantName}
            tasks={quadrantTasks}
            onMoveTask={handleMoveTask}
          />
        </div>
      ))}
    </div>
  );
};

export default QuadrantBoard;
