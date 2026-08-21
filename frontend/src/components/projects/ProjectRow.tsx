'use client';

import Badge from '@/components/ui/Badge';

export type ProjectPriority =
  | 'none'
  | 'urgent'
  | 'high'
  | 'medium'
  | 'low';
import {
  Project,
} from '@/types/project';
// export interface Project {
//   _id: string;
//   ownerId?: string;
//   name: string;
//   desc?: string;
//   color?: string;
//   private?: boolean;
//   priority?: ProjectPriority;
//   dueDate?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

interface ProjectRowProps {
  project: Project;
  onClick?: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

const priorityConfig: Record<
  ProjectPriority,
  {
    label: string;
    variant: 'default' | 'success' | 'warning' | 'danger' | 'info';
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

function formatDate(date?: string) {
  if (!date) {
    return '—';
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

export default function ProjectRow({
  project,
  onClick,
  onEdit,
  onDelete,
}: ProjectRowProps) {
  const priority =
    priorityConfig[
      project.priority || 'none'
    ];

  return (
    <div
      className={[
        'group grid min-w-[620px]',
        'grid-cols-[minmax(220px,1fr)_140px_140px_70px]',
        'items-center',
        'border-b border-neutral-100',
        'bg-white',
        'transition-colors',
        'hover:bg-neutral-50',
      ].join(' ')}
    >
      {/* Project */}
      <button
        type="button"
        onClick={() => onClick?.(project)}
        className="flex min-w-0 items-center gap-3 px-4 py-3 text-left"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{
            backgroundColor:
              project.color || '#171717',
          }}
        />

        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-neutral-900">
            {project.name}
          </span>

          {project.isPrivate && (
            <span className="mt-0.5 block text-[10px] text-neutral-400">
              Private
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

      {/* Due date */}
      <div className="px-4 text-xs text-neutral-500">
        {formatDate(project.dueDate)}
      </div>

      {/* Actions */}
      <div className="relative flex justify-center px-2">
        <button
          type="button"
          aria-label={`Actions for ${project.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 opacity-60 transition-opacity hover:bg-neutral-100 hover:text-neutral-700 group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.(project);
          }}
        >
          <span className="text-base leading-none">
            ⋯
          </span>
        </button>

        {onDelete && (
          <button
            type="button"
            className="sr-only"
            onClick={() => onDelete(project)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}