// frontend/src/components/tasks/TaskDetail.tsx

'use client';

import {
  FormEvent,
  useState,
} from 'react';

import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

import {
  formatDate,
  formatDateTime,
} from '@/lib/utils';

import {
  Task,
  TaskPriority,
  TaskStatus,
} from './TaskRow';

interface TaskDetailProps {
  task: Task;
  loading?: boolean;
  onClose?: () => void;
  onStatusChange?: (
    status: TaskStatus,
  ) => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  onComment?: (
    comment: string,
  ) => void | Promise<void>;
}

const statusConfig: Record<
  TaskStatus,
  {
    label: string;
    variant:
      | 'default'
      | 'success'
      | 'warning'
      | 'info';
  }
> = {
  todo: {
    label: 'To Do',
    variant: 'default',
  },

  in_progress: {
    label: 'Doing',
    variant: 'info',
  },

  completed: {
    label: 'Completed',
    variant: 'success',
  },
};

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

export default function TaskDetail({
  task,
  loading = false,
  onClose,
  onStatusChange,
  onDelete,
  onComment,
}: TaskDetailProps) {
  const [comment, setComment] =
    useState('');

  const status =
    statusConfig[task.status];

  const priority =
    priorityConfig[
      task.priority || 'none'
    ];

  async function handleComment(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const value = comment.trim();

    if (!value || !onComment) {
      return;
    }

    await onComment(value);

    setComment('');
  }

  return (
    <div className="flex min-h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close task"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-800"
            >
              ←
            </button>
          )}

          <span className="truncate text-xs text-neutral-400">
            Task
          </span>
        </div>

        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100"
        >
          ⋯
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-5 py-7">
          {/* Title */}
          <div className="mb-7">
            <h1
              className={[
                'text-xl font-semibold tracking-tight',
                task.status ===
                'completed'
                  ? 'text-neutral-400 line-through'
                  : 'text-neutral-900',
              ].join(' ')}
            >
              {task.title}
            </h1>

            {task.description && (
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-neutral-500">
                {task.description}
              </p>
            )}
          </div>

          {/* Details */}
          <div className="rounded-lg border border-neutral-200">
            {/* Status */}
            <div className="grid gap-3 border-b border-neutral-100 px-4 py-3 sm:grid-cols-[120px_1fr] sm:items-center">
              <span className="text-xs font-medium text-neutral-500">
                Status
              </span>

              <div>
                <select
                  value={task.status}
                  disabled={
                    loading ||
                    !onStatusChange
                  }
                  onChange={(event) =>
                    onStatusChange?.(
                      event.target
                        .value as TaskStatus,
                    )
                  }
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-neutral-400"
                >
                  <option value="todo">
                    To Do
                  </option>

                  <option value="in_progress">
                    Doing
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </div>
            </div>

            {/* Priority */}
            <div className="grid gap-3 border-b border-neutral-100 px-4 py-3 sm:grid-cols-[120px_1fr] sm:items-center">
              <span className="text-xs font-medium text-neutral-500">
                Priority
              </span>

              <div>
                <Badge
                  variant={priority.variant}
                  dot
                >
                  {priority.label}
                </Badge>
              </div>
            </div>

            {/* Due date */}
            <div className="grid gap-3 border-b border-neutral-100 px-4 py-3 sm:grid-cols-[120px_1fr] sm:items-center">
              <span className="text-xs font-medium text-neutral-500">
                Due date
              </span>

              <span className="text-xs text-neutral-700">
                {formatDate(
                  task.dueDate,
                )}
              </span>
            </div>

            {/* Members */}
            <div className="grid gap-3 border-b border-neutral-100 px-4 py-3 sm:grid-cols-[120px_1fr] sm:items-center">
              <span className="text-xs font-medium text-neutral-500">
                Members
              </span>

              <div>
                {task.members?.length ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {task.members.map(
                      (member) => (
                        <div
                          key={member._id}
                          className="flex items-center gap-1.5"
                        >
                          <Avatar
                            src={
                              member.avatar
                            }
                            name={
                              member.name
                            }
                            size="sm"
                          />

                          <span className="text-xs text-neutral-700">
                            {member.name}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-neutral-400">
                    No members
                  </span>
                )}
              </div>
            </div>

            {/* Labels */}
            <div className="grid gap-3 px-4 py-3 sm:grid-cols-[120px_1fr] sm:items-center">
              <span className="text-xs font-medium text-neutral-500">
                Labels
              </span>

              <div className="flex flex-wrap gap-1.5">
                {task.labels?.length ? (
                  task.labels.map(
                    (label) => (
                      <Badge
                        key={label}
                        variant="default"
                      >
                        {label}
                      </Badge>
                    ),
                  )
                ) : (
                  <span className="text-xs text-neutral-400">
                    No labels
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Updates */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-900">
                Updates
              </h2>

              <span className="text-[10px] text-neutral-400">
                {task.updatedAt
                  ? formatDateTime(
                      task.updatedAt,
                    )
                  : ''}
              </span>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-4">
              <p className="text-xs leading-5 text-neutral-500">
                Add an update or comment
                about this task.
              </p>

              <form
                onSubmit={handleComment}
                className="mt-3"
              >
                <textarea
                  value={comment}
                  onChange={(event) =>
                    setComment(
                      event.target.value,
                    )
                  }
                  placeholder="Write an update..."
                  rows={3}
                  className="w-full resize-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
                />

                <div className="mt-2 flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={
                      !comment.trim() ||
                      loading ||
                      !onComment
                    }
                  >
                    Reply
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Delete */}
          {onDelete && (
            <div className="mt-8 border-t border-neutral-100 pt-5">
              <Button
                variant="danger"
                size="sm"
                type="button"
                onClick={onDelete}
                disabled={loading}
              >
                Delete Task
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}