import { Task, TaskStatus } from '@/types/task';
import { TaskColumn } from './TaskColumn';

const columns: {
  status: TaskStatus;
  title: string;
}[] = [
  {
    status: 'todo',
    title: 'To Do',
  },
  {
    status: 'doing',
    title: 'Doing',
  },
  {
    status: 'completed',
    title: 'Completed',
  },
  {
    status: 'onhold',
    title: 'On Hold',
  },
];

export function TaskBoard({
  tasks,
}: {
  tasks: Task[];
}) {
  return (
    <div className="grid min-w-[1000px] grid-cols-4 gap-3 xl:min-w-0">
      {columns.map((column) => (
        <TaskColumn
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks.filter(
            (task) =>
              task.status ===
              column.status,
          )}
        />
      ))}
    </div>
  );
}