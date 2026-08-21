import { Plus } from 'lucide-react';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';

export function TaskColumn({
  title,
  status,
  tasks,
}: {
  title: string;
  status: string;
  tasks: Task[];
}) {
  return (
    <section className="rounded-lg bg-[var(--surface-muted)] p-2">
      <div className="flex items-center justify-between px-2 py-2">
        <h2 className="text-sm font-medium">
          {title}
        </h2>

        <button className="rounded p-1 hover:bg-[var(--border)]">
          <Plus size={15} />
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))}
      </div>

      <button className="mt-2 flex w-full items-center gap-2 px-2 py-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
        <Plus size={14} />
        Add Task
      </button>
    </section>
  );
}