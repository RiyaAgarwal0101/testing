// frontend/src/hooks/useProjects.ts

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
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from '@/types/project';

interface UseProjectsOptions {
  autoFetch?: boolean;
}

interface UseProjectsReturn {
  projects: Project[];

  loading: boolean;

  error: string | null;

  fetchProjects: () => Promise<Project[]>;

  createProject: (
    payload: CreateProjectPayload,
  ) => Promise<Project>;

  updateProject: (
    id: string,
    payload: UpdateProjectPayload,
  ) => Promise<Project>;

  deleteProject: (
    id: string,
  ) => Promise<void>;

  refresh: () => Promise<Project[]>;

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

export function useProjects(
  options: UseProjectsOptions = {},
): UseProjectsReturn {
  const {
    autoFetch = true,
  } = options;

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const fetchProjects =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const response =
          await authFetch(
            getApiUrl('/projects'),
          );

        const data =
          await response
            .json()
            .catch(() => null);

        if (!response.ok) {
          throw new Error(
            getErrorMessage(
              data,
              'Unable to load projects.',
            ),
          );
        }

        /*
         * Supports both:
         *
         * [
         *   { ...project }
         * ]
         *
         * and:
         *
         * {
         *   projects: [...]
         * }
         */
        const loadedProjects =
          Array.isArray(data)
            ? data
            : data?.projects || [];

        setProjects(
          loadedProjects,
        );

        return loadedProjects;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Unable to load projects.';

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    }, []);

  const createProject =
    useCallback(
      async (
        payload: CreateProjectPayload,
      ) => {
        setLoading(true);
        setError(null);

        try {
          const response =
            await authFetch(
              getApiUrl('/projects'),
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
                'Unable to create project.',
              ),
            );
          }

          const project =
            data?.project || data;

          setProjects(
            (current) => [
              ...current,
              project,
            ],
          );

          return project as Project;
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'Unable to create project.';

          setError(message);

          throw err;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const updateProject =
    useCallback(
      async (
        id: string,
        payload: UpdateProjectPayload,
      ) => {
        setLoading(true);
        setError(null);

        try {
          const response =
            await authFetch(
              getApiUrl(
                `/projects/${id}`,
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
                'Unable to update project.',
              ),
            );
          }

          const updatedProject =
            (data?.project ||
              data) as Project;

          setProjects(
            (current) =>
              current.map(
                (project) =>
                  project._id === id
                    ? updatedProject
                    : project,
              ),
          );

          return updatedProject;
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'Unable to update project.';

          setError(message);

          throw err;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const deleteProject =
    useCallback(
      async (id: string) => {
        setLoading(true);
        setError(null);

        try {
          const response =
            await authFetch(
              getApiUrl(
                `/projects/${id}`,
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
                'Unable to delete project.',
              ),
            );
          }

          setProjects(
            (current) =>
              current.filter(
                (project) =>
                  project._id !== id,
              ),
          );
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'Unable to delete project.';

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
      () => fetchProjects(),
      [fetchProjects],
    );

  useEffect(() => {
    if (!autoFetch) {
      return;
    }

    fetchProjects().catch(() => {
      // Error is already stored in state.
    });
  }, [
    autoFetch,
    fetchProjects,
  ]);

  return {
    projects,

    loading,

    error,

    fetchProjects,

    createProject,

    updateProject,

    deleteProject,

    refresh,

    clearError,
  };
}

export default useProjects;