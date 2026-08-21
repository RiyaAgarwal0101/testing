'use client';

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className = '',
      id,
      ...props
    },
    ref,
  ) {
    const inputId =
      id ||
      (label
        ? `input-${label
            .toLowerCase()
            .replace(/\s+/g, '-')}`
        : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-xs font-medium text-neutral-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              'h-10 w-full rounded-md border',
              'bg-white px-3',
              'text-sm text-neutral-900',
              'placeholder:text-neutral-400',
              'outline-none',
              'transition-colors',
              'focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100',
              'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
              error
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-neutral-200',
              leftIcon ? 'pl-9' : '',
              rightIcon ? 'pr-9' : '',
              className,
            ].join(' ')}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}

        {!error && hint && (
          <p className="mt-1 text-xs text-neutral-400">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

export default Input;