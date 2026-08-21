// frontend/src/app/projects/page.tsx

'use client';

import {
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import ProjectList from '@/components/projects/ProjectList';
import ProjectForm from '@/components/projects/ProjectForm';

import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

import {
  useProjects,
} from '@/hooks/useProjects';

import {
  CreateProjectPayload,
  Project,
} from '@/types/project';

export default function ProjectsPage() {
  const router = useRouter();

  const {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects();

  const [
    isCreateOpen,
    setIsCreateOpen,
  ] = useState(false);

  const [
    editingProject,
    setEditingProject,
  ] = useState<Project | null>(
    null,
  );

  async function handleCreate(
    payload: CreateProjectPayload,
  ) {
    await createProject(payload);

    setIsCreateOpen(false);
  }

  async function handleDelete(
    project: Project,
  ) {
    const confirmed =
      window.confirm(
        `Delete "${project.name}"? This action cannot be undone.`,
      );

    if (!confirmed) {
      return;
    }

    await deleteProject(
      project._id,
    );
  }

  function handleProjectClick(
    project: Project,
  ) {
    router.push(
      `/projects/${project._id}`,
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
              Projects
            </h1>

            <p className="mt-1 text-xs text-neutral-500">
              Manage your workspace projects.
            </p>
          </div>

          <Button
            size="sm"
            onClick={() =>
              setIsCreateOpen(true)
            }
          >
            + New Project
          </Button>
        </header>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-red-100 bg-red-50 px-4 py-3">
            <p className="text-xs text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Projects */}
        <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">
                  All Projects
                </h2>

                <p className="mt-0.5 text-[11px] text-neutral-400">
                  {projects.length}{' '}
                  {projects.length ===
                  1
                    ? 'project'
                    : 'projects'}
                </p>
              </div>

              {loading && (
                <span className="text-[11px] text-neutral-400">
                  Loading...
                </span>
              )}
            </div>
          </div>

          {projects.length === 0 &&
          !loading ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-lg">
                📁
              </div>

              <h3 className="mt-4 text-sm font-semibold text-neutral-900">
                No projects yet
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-neutral-500">
                Create your first project
                to start organizing tasks
                and collaborate with your
                workspace.
              </p>

              <Button
                size="sm"
                className="mt-4"
                onClick={() =>
                  setIsCreateOpen(true)
                }
              >
                Create Project
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <ProjectList
                projects={projects}
                loading={loading}
                onProjectClick={
                  handleProjectClick
                }
                onEdit={(project) =>
                  setEditingProject(
                    project,
                  )
                }
                onDelete={
                  handleDelete
                }
              />
            </div>
          )}
        </section>
      </div>

      {/* Create project */}
      <Modal
        open={isCreateOpen}
        onClose={() =>
          setIsCreateOpen(false)
        }
        title="Create Project"
      >
        <ProjectForm
          onSubmit={handleCreate}
          onCancel={() =>
            setIsCreateOpen(false)
          }
          loading={loading}
        />
      </Modal>

      {/* Edit project */}
      {editingProject && (
        <Modal
          open={true}
          onClose={() =>
            setEditingProject(
              null,
            )
          }
          title="Edit Project"
        >
          <ProjectForm
            project={
              editingProject
            }
            onSubmit={async (
              payload,
            ) => {
              await updateProject(
                editingProject._id,
                payload,
              );

              setEditingProject(
                null,
              );
            }}
            onCancel={() =>
              setEditingProject(
                null,
              )
            }
            loading={loading}
          />
        </Modal>
      )}
    </main>
  );
}