'use client';

import { Sidebar } from './Sidebar';

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Sidebar />

      <main className="min-h-screen pl-0 md:pl-[220px]">
        {children}
      </main>
    </div>
  );
}