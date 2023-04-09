import type { NextPage } from 'next';
import Head from 'next/head';
import TaskBoard from '../components/TaskBoard';
import QuadrantBoard from '../components/QuadrantBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const tasks = {
  'Todo': [
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
  ],
  'In Progress': [
    { id: '3', title: 'Task 3' },
  ],
  'Done': [],
};

const quadrants = {
  'Not Easy, Not Effective': [
    { id: '5', title: 'Task 5' },
  ],
  'Easy, Not Effective': [
    { id: '6', title: 'Task 6' },
  ],
  'Not Easy, Effective': [],
  'Easy Effective': [],
};

const Home: NextPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Head>
          <title>Task Manager App</title>
          <meta name="description" content="タスク管理アプリケーション" />
          <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="container mx-auto mt-10 px-4">
            <h1 className="mb-6 text-2xl font-bold text-center">Kanban Board</h1>
            <TaskBoard tasks={tasks} />
            <h1 className="mt-16 mb-6 text-2xl font-bold text-center">Quadrant Board</h1>
            <QuadrantBoard tasks={quadrants} />
            </main>
            </div>
          </DndProvider>
  );
};

export default Home;