import Link from 'next/link';
import {
  CalendarDays,
  Tag,
} from 'lucide-react';

import { Task } from '@/types/task';

export function TaskCard({
  task,
}: {
  task: Task;
}) {
  return (
    <Link
      href={`/task/${task._id}`}
      className="block rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 transition hover:-translate-y-[1px] hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium">
          {task.title}
        </h3>

        <span className="text-xs text-[var(--muted)]">
          ...
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-pink-500 to-blue-500" />

          <span>
            {task.assigneeId ||
              'Admin'}
          </span>
        </div>

        {task.dueDate && (
          <div className="rounded-full bg-red-50 px-2 py-1 text-[11px] text-red-500">
            <CalendarDays
              size={12}
              className="mr-1 inline"
            />

            {new Date(
              task.dueDate,
            ).toLocaleDateString(
              'en-GB',
              {
                day: '2-digit',
                month: 'short',
              },
            )}
          </div>
        )}
      </div>

      {task.labels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {task.labels.map(
            (label) => (
              <span
                key={label}
                className="rounded-full bg-[var(--surface-muted)] px-2 py-1 text-[10px]"
              >
                <Tag
                  size={10}
                  className="mr-1 inline"
                />
                {label}
              </span>
            ),
          )}
        </div>
      )}
    </Link>
  );
}