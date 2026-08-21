import { Task } from '@/types/task';

const groups = [
  ['todo', 'To Do'],
  ['doing', 'Doing'],
  ['completed', 'Completed'],
  ['onhold', 'On Hold'],
] as const;

export function TaskList({
  tasks,
}: {
  tasks: Task[];
}) {
  return (
    <div className="space-y-6">
      {groups.map(
        ([status, title]) => {
          const items =
            tasks.filter(
              (task) =>
                task.status ===
                status,
            );

          return (
            <section key={status}>
              <h2 className="mb-2 text-sm font-medium">
                ▾ {title}
              </h2>

              <div className="overflow-hidden rounded-lg border border-[var(--border)]">
                <div className="grid grid-cols-[1fr_140px_120px_140px_50px] bg-[var(--surface-muted)] px-3 py-2 text-xs text-[var(--muted)]">
                  <span>Task</span>
                  <span>Priority</span>
                  <span>Members</span>
                  <span>Due Date</span>
                  <span>Actions</span>
                </div>

                {items.map(
                  (task) => (
                    <div
                      key={task._id}
                      className="grid grid-cols-[1fr_140px_120px_140px_50px] border-t border-[var(--border)] px-3 py-3 text-sm"
                    >
                      <span>
                        {task.title}
                      </span>

                      <span>
                        {task.priority}
                      </span>

                      <span>
                        {task.assigneeId ||
                          '—'}
                      </span>

                      <span>
                        {task.dueDate
                          ? new Date(
                              task.dueDate,
                            ).toLocaleDateString(
                              'en-GB',
                            )
                          : '—'}
                      </span>

                      <span>
                        ...
                      </span>
                    </div>
                  ),
                )}

                <button className="border-t border-[var(--border)] px-3 py-3 text-sm text-[var(--muted)]">
                  + Add Task
                </button>
              </div>
            </section>
          );
        },
      )}
    </div>
  );
}