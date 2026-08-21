'use client';

import Link from 'next/link';
import {
  FolderKanban,
  ListTodo,
  User,
} from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[220px] border-r border-[var(--border)] bg-[var(--surface)] md:block">
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" />

          <span className="text-sm font-semibold">
            Dexter
          </span>
        </div>

        <div className="mt-7">
          <div className="mb-2 px-2 text-xs font-medium text-[var(--muted)]">
            Workspace
          </div>

          <nav className="space-y-1">
            <Link
              href="/tasks"
              className="flex h-9 items-center gap-3 rounded-md px-2 text-sm hover:bg-[var(--surface-muted)]"
            >
              <ListTodo size={16} />
              Tasks
            </Link>

            <Link
              href="/projects"
              className="flex h-9 items-center gap-3 rounded-md px-2 text-sm hover:bg-[var(--surface-muted)]"
            >
              <FolderKanban size={16} />
              Projects
            </Link>
          </nav>
        </div>

        <div className="mt-auto">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-[var(--surface-muted)]"
          >
            <User size={16} />
            Profile
          </Link>
        </div>
      </div>
    </aside>
  );
}