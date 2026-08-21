'use client';

import { useState } from 'react';

const fields = [
  'Priority',
  'Members',
  'Due Date',
  'Labels',
  'Status',
  'Reporter',
];

export function FieldsMenu() {
  const [open, setOpen] =
    useState(false);

  const [selected, setSelected] =
    useState<string[]>([
      'Priority',
      'Members',
      'Due Date',
    ]);

  function toggle(field: string) {
    setSelected((current) =>
      current.includes(field)
        ? current.filter(
            (item) => item !== field,
          )
        : [...current, field],
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="rounded-md border border-[var(--border)] px-3 py-2 text-sm"
      >
        Fields
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-52 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg">
          {fields.map((field) => (
            <label
              key={field}
              className="flex cursor-pointer items-center justify-between rounded px-2 py-2 text-sm hover:bg-[var(--surface-muted)]"
            >
              {field}

              <input
                type="checkbox"
                checked={selected.includes(
                  field,
                )}
                onChange={() =>
                  toggle(field)
                }
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}