// frontend/src/hooks/useTasks.ts

'use client';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  authFetch,
  getApiUrl,
} from '@/lib/auth';

import {
  Task,
  TaskPriority,
  TaskStatus,
} from '@/components/tasks/TaskRow';

export interface CreateTaskPayload {
  title: string;

  description?: string;

  projectId: string;

  status?: TaskStatus;

  priority?: TaskPriority;

  dueDate?: string;

  memberIds?: string[];

  labels?: string[];
}

export interface UpdateTaskPayload {
  title?: string;

  description?: string;

  projectId?: string;

  status?: TaskStatus;

  priority?: TaskPriority;

  dueDate?: string;

  memberIds?: string[];

  labels?: string[];
}

interface UseTasksOptions {
  projectId?: string;

  autoFetch?: boolean;
}

interface UseTasksReturn {
  tasks: Task[];

  loading: boolean;

  error: string | null;

  fetchTasks: () => Promise<Task[]>;

  createTask: (
    payload: CreateTaskPayload,
  ) => Promise<Task>;

  updateTask: (
    id: string,
    payload: UpdateTaskPayload,
  ) => Promise<Task>;

  updateTaskStatus: (
    id: string,
    status: TaskStatus,
  ) => Promise<Task>;

  deleteTask: (
    id: string,
  ) => Promise<void>;

  refresh: () => Promise<Task[]>;

  clearError: () => void;
}

function getErrorMessage(
  data: unknown,
  fallback: string,
) {
  if (
    typeof data === 'object' &&
    data !== null &&
    'message' in data
  ) {
    const message = (
      data as {
        message?: string | string[];
      }
    ).message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    if (message) {
      return message;
    }
  }

  return fallback;
}

export function useTasks(
  options: UseTasksOptions = {},
): UseTasksReturn {
  const {
    projectId,
    autoFetch = true,
  } = options;

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const fetchTasks =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const query = projectId
          ? `?projectId=${encodeURIComponent(
              projectId,
            )}`
          : '';

        const response =
          await authFetch(
            getApiUrl(
              `/tasks${query}`,
            ),
          );

        const data =
          await response
            .json()
            .catch(() => null);

        if (!response.ok) {
          throw new Error(
            getErrorMessage(
              data,
              'Unable to load tasks.',
            ),
          );
        }

        const loadedTasks =
          Array.isArray(data)
            ? data
            : data?.tasks || [];

        setTasks(
          loadedTasks,
        );

        return loadedTasks;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Unable to load tasks.';

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    }, [projectId]);

  const createTask =
    useCallback(
      async (
        payload: CreateTaskPayload,
      ) => {
        setLoading(true);
        setError(null);

        try {
          const response =
            await authFetch(
              getApiUrl('/tasks'),
              {
                method: 'POST',

                body: JSON.stringify(
                  payload,
                ),
              },
            );

          const data =
            await response
              .json()
              .catch(() => null);

          if (!response.ok) {
            throw new Error(
              getErrorMessage(
                data,
                'Unable to create task.',
              ),
            );
          }

          const task =
            (data?.task ||
              data) as Task;

          setTasks(
            (current) => [
              ...current,
              task,
            ],
          );

          return task;
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'Unable to create task.';

          setError(message);

          throw err;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const updateTask =
    useCallback(
      async (
        id: string,
        payload: UpdateTaskPayload,
      ) => {
        setLoading(true);
        setError(null);

        try {
          const response =
            await authFetch(
              getApiUrl(
                `/tasks/${id}`,
              ),
              {
                method: 'PATCH',

                body: JSON.stringify(
                  payload,
                ),
              },
            );

          const data =
            await response
              .json()
              .catch(() => null);

          if (!response.ok) {
            throw new Error(
              getErrorMessage(
                data,
                'Unable to update task.',
              ),
            );
          }

          const updatedTask =
            (data?.task ||
              data) as Task;

          setTasks(
            (current) =>
              current.map(
                (task) =>
                  task._id === id
                    ? updatedTask
                    : task,
              ),
          );

          return updatedTask;
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'Unable to update task.';

          setError(message);

          throw err;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const updateTaskStatus =
    useCallback(
      async (
        id: string,
        status: TaskStatus,
      ) => {
        return updateTask(
          id,
          { status },
        );
      },
      [updateTask],
    );

  const deleteTask =
    useCallback(
      async (id: string) => {
        setLoading(true);
        setError(null);

        try {
          const response =
            await authFetch(
              getApiUrl(
                `/tasks/${id}`,
              ),
              {
                method: 'DELETE',
              },
            );

          const data =
            await response
              .json()
              .catch(() => null);

          if (!response.ok) {
            throw new Error(
              getErrorMessage(
                data,
                'Unable to delete task.',
              ),
            );
          }

          setTasks(
            (current) =>
              current.filter(
                (task) =>
                  task._id !== id,
              ),
          );
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'Unable to delete task.';

          setError(message);

          throw err;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const clearError =
    useCallback(() => {
      setError(null);
    }, []);

  const refresh =
    useCallback(
      () => fetchTasks(),
      [fetchTasks],
    );

  useEffect(() => {
    if (!autoFetch) {
      return;
    }

    fetchTasks().catch(() => {
      // Error is already stored in state.
    });
  }, [
    autoFetch,
    fetchTasks,
  ]);

  return {
    tasks,

    loading,

    error,

    fetchTasks,

    createTask,

    updateTask,

    updateTaskStatus,

    deleteTask,

    refresh,

    clearError,
  };
}

export default useTasks;