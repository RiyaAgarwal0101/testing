// frontend/src/app/task/[id]/page.tsx

'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  useRouter,
} from 'next/navigation';

import Button from '@/components/ui/Button';
import TaskDetail from '@/components/tasks/TaskDetail';
import {
  Task,
  TaskStatus,
} from '@/types/task';
// import {
//   Task,
//   TaskStatus,
// } from '@/components/tasks/TaskRow';

import {
  authFetch,
  getApiUrl,
} from '@/lib/auth';

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();

  const id =
    typeof params.id === 'string'
      ? params.id
      : '';

  const [task, setTask] =
    useState<Task | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    let active = true;

    async function loadTask() {
      setLoading(true);
      setError('');

      try {
        const response =
          await authFetch(
            getApiUrl(
              `/tasks/${id}`,
            ),
          );

        if (!response.ok) {
          const data =
            await response
              .json()
              .catch(() => null);

          throw new Error(
            data?.message ||
              'Unable to load task.',
          );
        }

        const data =
          await response.json();

        /*
         * Supports either:
         *
         * { ...task }
         *
         * or
         *
         * { task: { ...task } }
         */
        const loadedTask =
          data?.task || data;

        if (active) {
          setTask(loadedTask);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load task.',
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTask();

    return () => {
      active = false;
    };
  }, [id]);

  async function updateStatus(
    status: TaskStatus,
  ) {
    if (!task) {
      return;
    }

    const previousTask = task;

    setTask({
      ...task,
      status,
    });

    try {
      const response =
        await authFetch(
          getApiUrl(
            `/tasks/${task._id}`,
          ),
          {
            method: 'PATCH',
            body: JSON.stringify({
              status,
            }),
          },
        );

      if (!response.ok) {
        const data =
          await response
            .json()
            .catch(() => null);

        throw new Error(
          data?.message ||
            'Unable to update task.',
        );
      }

      const data =
        await response.json();

      setTask(
        data?.task || data,
      );
    } catch (err) {
      setTask(previousTask);

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update task.',
      );
    }
  }

  async function deleteTask() {
    if (!task) {
      return;
    }

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this task?',
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await authFetch(
          getApiUrl(
            `/tasks/${task._id}`,
          ),
          {
            method: 'DELETE',
          },
        );

      if (!response.ok) {
        const data =
          await response
            .json()
            .catch(() => null);

        throw new Error(
          data?.message ||
            'Unable to delete task.',
        );
      }

      router.back();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete task.',
      );
    }
  }

  async function addComment(
    comment: string,
  ) {
    if (!task) {
      return;
    }

    /*
     * If you have a dedicated comments/updates
     * endpoint, connect it here.
     *
     * Example:
     *
     * POST /tasks/:id/comments
     */

    try {
      const response =
        await authFetch(
          getApiUrl(
            `/tasks/${task._id}/comments`,
          ),
          {
            method: 'POST',
            body: JSON.stringify({
              content: comment,
            }),
          },
        );

      if (!response.ok) {
        const data =
          await response
            .json()
            .catch(() => null);

        throw new Error(
          data?.message ||
            'Unable to add comment.',
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to add comment.',
      );

      throw err;
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-50 p-4 sm:p-6">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="mb-4 h-8 w-24 rounded bg-neutral-200" />

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div className="h-6 w-64 rounded bg-neutral-100" />

            <div className="mt-4 h-4 w-full max-w-lg rounded bg-neutral-100" />

            <div className="mt-8 space-y-3">
              <div className="h-12 rounded bg-neutral-100" />
              <div className="h-12 rounded bg-neutral-100" />
              <div className="h-12 rounded bg-neutral-100" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!task) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
        <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 text-center">
          <h1 className="text-sm font-semibold text-neutral-900">
            Task not found
          </h1>

          <p className="mt-2 text-xs text-neutral-500">
            {error ||
              'This task may have been deleted or you may not have access to it.'}
          </p>

          <Button
            className="mt-5"
            size="sm"
            onClick={() =>
              router.back()
            }
          >
            Go Back
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      {error && (
        <div className="border-b border-red-100 bg-red-50 px-4 py-2 text-center text-xs text-red-600">
          {error}
        </div>
      )}

      <div className="min-h-screen">
        <TaskDetail
          task={task}
          onClose={() =>
            router.back()
          }
          onStatusChange={
            updateStatus
          }
          onDelete={deleteTask}
          onComment={addComment}
        />
      </div>
    </main>
  );
}