'use client';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';

import {
  Project,
  ProjectPriority,
} from './ProjectRow';

interface ProjectFormProps {
  project?: Project | null;
  loading?: boolean;
  onSubmit: (
    data: {
      name: string;
      desc: string;
      color: string;
      private: boolean;
      priority: ProjectPriority;
      dueDate: string;
    },
  ) => void | Promise<void>;
  onCancel?: () => void;
}

interface FormState {
  name: string;
  desc: string;
  color: string;
  private: boolean;
  priority: ProjectPriority;
  dueDate: string;
}

const defaultForm: FormState = {
  name: '',
  desc: '',
  color: '#171717',
  private: false,
  priority: 'no_priority',
  dueDate: '',
};

const priorityOptions = [
  {
    value: 'no_priority',
    label: 'No Priority',
  },
  {
    value: 'urgent',
    label: 'Urgent',
  },
  {
    value: 'high',
    label: 'High',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'low',
    label: 'Low',
  },
];

export default function ProjectForm({
  project,
  loading = false,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [form, setForm] =
    useState<FormState>(defaultForm);

  const [error, setError] = useState('');

  useEffect(() => {
    if (!project) {
      setForm(defaultForm);
      return;
    }

    setForm({
      name: project.name || '',
      desc: project.desc || '',
      color: project.color || '#171717',
      private: project.private || false,
      priority:
        project.priority || 'no_priority',
      dueDate: project.dueDate
        ? project.dueDate.slice(0, 10)
        : '',
    });
  }, [project]);

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');

    if (!form.name.trim()) {
      setError('Project name is required.');
      return;
    }

    if (form.name.trim().length > 100) {
      setError(
        'Project name must be 100 characters or less.',
      );
      return;
    }

    try {
      await onSubmit({
        ...form,
        name: form.name.trim(),
        desc: form.desc.trim(),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong.',
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Name */}
      <Input
        label="Project name"
        value={form.name}
        onChange={(event) =>
          updateField(
            'name',
            event.target.value,
          )
        }
        placeholder="e.g. Design Homepage"
        maxLength={100}
        autoFocus
      />

      {/* Description */}
      <div>
        <label
          htmlFor="project-description"
          className="mb-1.5 block text-xs font-medium text-neutral-700"
        >
          Description
        </label>

        <textarea
          id="project-description"
          value={form.desc}
          onChange={(event) =>
            updateField(
              'desc',
              event.target.value,
            )
          }
          placeholder="Add a short description..."
          rows={3}
          maxLength={1000}
          className="w-full resize-none rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
        />

        <div className="mt-1 text-right text-[10px] text-neutral-400">
          {form.desc.length}/1000
        </div>
      </div>

      {/* Priority + Date */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-neutral-700">
            Priority
          </label>

          <Dropdown
            value={form.priority}
            options={priorityOptions}
            onChange={(value) =>
              updateField(
                'priority',
                value as ProjectPriority,
              )
            }
            className="w-full"
            menuClassName="w-full"
          />
        </div>

        <Input
          label="Due date"
          type="date"
          value={form.dueDate}
          onChange={(event) =>
            updateField(
              'dueDate',
              event.target.value,
            )
          }
        />
      </div>

      {/* Color */}
      <div>
        <label
          htmlFor="project-color"
          className="mb-1.5 block text-xs font-medium text-neutral-700"
        >
          Project color
        </label>

        <div className="flex items-center gap-3">
          <input
            id="project-color"
            type="color"
            value={form.color}
            onChange={(event) =>
              updateField(
                'color',
                event.target.value,
              )
            }
            className="h-10 w-12 cursor-pointer rounded-md border border-neutral-200 bg-white p-1"
          />

          <Input
            value={form.color}
            onChange={(event) =>
              updateField(
                'color',
                event.target.value,
              )
            }
            placeholder="#171717"
          />
        </div>
      </div>

      {/* Private */}
      <label className="flex cursor-pointer items-center justify-between rounded-lg border border-neutral-200 p-3">
        <div>
          <p className="text-xs font-medium text-neutral-800">
            Private project
          </p>

          <p className="mt-0.5 text-[11px] text-neutral-500">
            Only you can access this project.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={form.private}
          onClick={() =>
            updateField(
              'private',
              !form.private,
            )
          }
          className={[
            'relative h-5 w-9 rounded-full',
            'transition-colors',
            form.private
              ? 'bg-black'
              : 'bg-neutral-200',
          ].join(' ')}
        >
          <span
            className={[
              'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm',
              'transition-transform',
              form.private
                ? 'translate-x-[18px]'
                : 'translate-x-0.5',
            ].join(' ')}
          />
        </button>
      </label>

      {/* Error */}
      {error && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 border-t border-neutral-100 pt-4">
        {onCancel && (
          <Button
            variant="ghost"
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          loading={loading}
        >
          {project
            ? 'Save Changes'
            : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}