'use client';

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  value?: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  menuClassName?: string;
  align?: 'left' | 'right';
  trigger?: ReactNode;
}

export default function Dropdown({
  value,
  options,
  onChange,
  placeholder = 'Select',
  disabled = false,
  className = '',
  menuClassName = '',
  align = 'left',
  trigger,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find(
    (option) => option.value === value,
  );

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={[
        'relative inline-block',
        className,
      ].join(' ')}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className={[
          'inline-flex h-9 items-center gap-2',
          'rounded-md border border-neutral-200',
          'bg-white px-3',
          'text-sm text-neutral-700',
          'hover:bg-neutral-50',
          'disabled:cursor-not-allowed disabled:opacity-50',
        ].join(' ')}
      >
        {trigger || (
          <>
            {selected?.icon}

            <span>
              {selected?.label || placeholder}
            </span>

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className={[
                'transition-transform',
                open ? 'rotate-180' : '',
              ].join(' ')}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      {open && (
        <div
          className={[
            'absolute top-[calc(100%+6px)] z-40',
            'min-w-[180px]',
            'rounded-lg border border-neutral-200',
            'bg-white p-1',
            'shadow-lg',
            align === 'right'
              ? 'right-0'
              : 'left-0',
            menuClassName,
          ].join(' ')}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => {
                if (option.disabled) {
                  return;
                }

                onChange(option.value);
                setOpen(false);
              }}
              className={[
                'flex w-full items-center gap-2',
                'rounded-md px-2.5 py-2',
                'text-left text-xs',
                option.value === value
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
                'disabled:cursor-not-allowed disabled:opacity-40',
              ].join(' ')}
            >
              {option.icon && (
                <span className="shrink-0">
                  {option.icon}
                </span>
              )}

              <span className="flex-1">
                {option.label}
              </span>

              {option.value === value && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12L10 17L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}