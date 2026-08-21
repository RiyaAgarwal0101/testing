// frontend/src/components/tasks/TaskRow.tsx

'use client';

import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';

import {
  formatShortDate,
  isOverdue,
} from '@/lib/utils';
import {
  Task,
  TaskStatus,
  TaskPriority,
} from '@/types/task';
// export type TaskStatus =
//   | 'todo'
//   | 'doing'
//   | 'completed';

// export type TaskPriority =
//   | 'none'
//   | 'urgent'
//   | 'high'
//   | 'medium'
//   | 'low';

// export interface TaskMember {
//   _id: string;
//   name: string;
//   avatar?: string | null;
// }

// export interface Task {
//   _id: string;
//   projectId?: string;
//   title: string;
//   description?: string;
//   status: TaskStatus;
//   priority?: TaskPriority;
//   dueDate?: string;
//   members?: TaskMember[];
//   labels?: string[];
//   createdAt?: string;
//   updatedAt?: string;
// }

interface TaskRowProps {
  task: Task;
  onClick?: (task: Task) => void;
  onStatusChange?: (
    task: Task,
    status: TaskStatus,
  ) => void;
  onDelete?: (task: Task) => void;
}

const priorityConfig: Record<
  TaskPriority,
  {
    label: string;
    variant:
      | 'default'
      | 'success'
      | 'warning'
      | 'danger';
  }
> = {
  none: {
    label: 'No Priority',
    variant: 'default',
  },

  urgent: {
    label: 'Urgent',
    variant: 'danger',
  },

  high: {
    label: 'High',
    variant: 'danger',
  },

  medium: {
    label: 'Medium',
    variant: 'warning',
  },

  low: {
    label: 'Low',
    variant: 'default',
  },
};

function getPriority(
  priority?: TaskPriority,
) {
  return (
    priorityConfig[
      priority || 'none'
    ] ||
    priorityConfig.none
  );
}

export default function TaskRow({
  task,
  onClick,
  onStatusChange,
  onDelete,
}: TaskRowProps) {
  const priority = getPriority(
    task.priority,
  );

  const overdue =
    Boolean(
      task.dueDate &&
        task.status !== 'completed' &&
        isOverdue(task.dueDate),
    );

  return (
    <div className="group grid min-w-[700px] grid-cols-[minmax(250px,1fr)_120px_150px_110px_60px] items-center border-b border-neutral-100 bg-white transition-colors hover:bg-neutral-50">
      {/* Task */}
      <button
        type="button"
        onClick={() => onClick?.(task)}
        className="flex min-w-0 items-center gap-3 px-4 py-3 text-left"
      >
        <span
          className={[
            'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
            task.status === 'completed'
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-neutral-300',
          ].join(' ')}
        >
          {task.status ===
            'completed' && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12L10 17L19 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        <span className="min-w-0">
          <span
            className={[
              'block truncate text-sm font-medium',
              task.status ===
              'completed'
                ? 'text-neutral-400 line-through'
                : 'text-neutral-900',
            ].join(' ')}
          >
            {task.title}
          </span>

          {task.description && (
            <span className="mt-0.5 block truncate text-[11px] text-neutral-400">
              {task.description}
            </span>
          )}
        </span>
      </button>

      {/* Priority */}
      <div className="px-4">
        <Badge
          variant={priority.variant}
          dot
        >
          {priority.label}
        </Badge>
      </div>

      {/* Members */}
      <div className="flex items-center px-4">
        {task.members?.length ? (
          <div className="flex items-center -space-x-1.5">
            {task.members
              .slice(0, 3)
              .map((member) => (
                <Avatar
                  key={member._id}
                  src={member.avatar}
                  name={member.name}
                  size="sm"
                  className="border-2 border-white"
                />
              ))}

            {task.members.length > 3 && (
              <span className="ml-2 text-[10px] text-neutral-400">
                +{task.members.length - 3}
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs text-neutral-400">
            —
          </span>
        )}
      </div>

      {/* Due date */}
      <div
        className={[
          'px-4 text-xs',
          overdue
            ? 'font-medium text-red-500'
            : 'text-neutral-500',
        ].join(' ')}
      >
        {formatShortDate(
          task.dueDate,
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-center px-2">
        <button
          type="button"
          aria-label={`Task actions for ${task.title}`}
          className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 opacity-60 hover:bg-neutral-100 hover:text-neutral-700 group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation();

            if (
              onStatusChange &&
              task.status !== 'completed'
            ) {
              onStatusChange(
                task,
                'completed',
              );
            }
          }}
        >
          ⋯
        </button>

        {onDelete && (
          <button
            type="button"
            className="sr-only"
            onClick={() =>
              onDelete(task)
            }
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}