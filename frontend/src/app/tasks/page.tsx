'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { TaskList } from '@/components/tasks/TaskList';
import { api } from '@/lib/api';
import { Task } from '@/types/task';

type View = 'board' | 'list';

export default function TasksPage() {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [view, setView] =
    useState<View>('board');

  const [search, setSearch] =
    useState('');

  useEffect(() => {
    async function load() {
      const data =
        await api.get<Task[]>('/tasks');

      setTasks(data);
    }

    load();
  }, []);

  const filteredTasks =
    tasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase(),
        ),
    );

  return (
    <AppShell>
      <div className="border-b border-[var(--border)]">
        <div className="flex min-h-16 items-center justify-between gap-4 px-5">
          <h1 className="text-lg font-semibold">
            Tasks
          </h1>

          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search"
              className="h-9 w-[180px] rounded-md border border-[var(--border)] bg-transparent px-3 text-sm outline-none"
            />

            <button
              onClick={() =>
                setView('list')
              }
              className="rounded-md border px-3 py-2 text-sm"
            >
              List
            </button>

            <button
              onClick={() =>
                setView('board')
              }
              className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm text-white"
            >
              Board
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        {view === 'board' ? (
          <TaskBoard tasks={filteredTasks} />
        ) : (
          <TaskList tasks={filteredTasks} />
        )}
      </div>
    </AppShell>
  );
}