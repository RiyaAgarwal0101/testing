'use client';

import {
  useMemo,
  useState,
} from 'react';

import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';

import ProjectRow, {
  Project,
  ProjectPriority,
} from './ProjectRow';

interface ProjectListProps {
  projects: Project[];
  loading?: boolean;
  onAddProject?: () => void;
  onProjectClick?: (project: Project) => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (project: Project) => void;
}

const priorityOptions = [
  {
    value: 'all',
    label: 'All priorities',
  },
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

export default function ProjectList({
  projects,
  loading = false,
  onAddProject,
  onProjectClick,
  onEditProject,
  onDeleteProject,
}: ProjectListProps) {
  const [search, setSearch] = useState('');
  const [priority, setPriority] =
    useState('all');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.desc
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesPriority =
        priority === 'all' ||
        project.priority === priority;

      return Boolean(
        matchesSearch && matchesPriority,
      );
    });
  }, [projects, search, priority]);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-base font-semibold text-neutral-900">
            Projects
          </h1>

          <p className="mt-0.5 text-xs text-neutral-500">
            {projects.length}{' '}
            {projects.length === 1
              ? 'project'
              : 'projects'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden sm:block">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L16.65 16.65M19 11A8 8 0 1 1 3 11A8 8 0 0 1 19 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search"
              className="h-9 w-40 rounded-md border border-neutral-200 bg-white pl-8 pr-3 text-xs outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
            />
          </div>

          <Dropdown
            value={priority}
            options={priorityOptions}
            onChange={setPriority}
            align="right"
            trigger={
              <span className="inline-flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 6H20M7 12H17M10 18H14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <span className="hidden sm:inline">
                  Filter
                </span>
              </span>
            }
          />

          <Button
            size="sm"
            onClick={onAddProject}
          >
            <span className="text-base leading-none">
              +
            </span>

            <span className="hidden sm:inline">
              Add Project
            </span>

            <span className="sm:hidden">
              Add
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="mb-3 sm:hidden">
        <div className="relative">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L16.65 16.65M19 11A8 8 0 1 1 3 11A8 8 0 0 1 19 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search projects"
            className="h-9 w-full rounded-md border border-neutral-200 bg-white pl-8 pr-3 text-xs outline-none focus:border-neutral-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        {/* Header */}
        <div className="overflow-x-auto">
          <div className="min-w-[620px]">
            <div className="grid grid-cols-[minmax(220px,1fr)_140px_140px_70px] border-b border-neutral-200 bg-neutral-50">
              <div className="px-4 py-2.5 text-[11px] font-medium text-neutral-500">
                Projects
              </div>

              <div className="px-4 py-2.5 text-[11px] font-medium text-neutral-500">
                Priority
              </div>

              <div className="px-4 py-2.5 text-[11px] font-medium text-neutral-500">
                Due Date
              </div>

              <div className="px-4 py-2.5 text-center text-[11px] font-medium text-neutral-500">
                Actions
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="divide-y divide-neutral-100">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="grid grid-cols-[minmax(220px,1fr)_140px_140px_70px] animate-pulse"
                  >
                    <div className="px-4 py-4">
                      <div className="h-3 w-40 rounded bg-neutral-100" />
                    </div>

                    <div className="px-4 py-4">
                      <div className="h-5 w-16 rounded bg-neutral-100" />
                    </div>

                    <div className="px-4 py-4">
                      <div className="h-3 w-20 rounded bg-neutral-100" />
                    </div>

                    <div />
                  </div>
                ))}
              </div>
            )}

            {/* Rows */}
            {!loading &&
              filteredProjects.map((project) => (
                <ProjectRow
                  key={project._id}
                  project={project}
                  onClick={onProjectClick}
                  onEdit={onEditProject}
                  onDelete={onDeleteProject}
                />
              ))}

            {/* Empty state */}
            {!loading &&
              filteredProjects.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 7H20V20H4V7ZM7 7V4H17V7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <p className="text-sm font-medium text-neutral-800">
                    {search
                      ? 'No projects found'
                      : 'No projects yet'}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {search
                      ? 'Try changing your search or filter.'
                      : 'Create your first project to get started.'}
                  </p>
                </div>
              )}

            {/* Add project */}
            {!loading && onAddProject && (
              <button
                type="button"
                onClick={onAddProject}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
              >
                <span className="text-base leading-none">
                  +
                </span>

                Add Project
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}