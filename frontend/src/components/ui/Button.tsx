'use client';

import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
} from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'outline';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-black text-white hover:bg-neutral-800 focus:ring-black',

  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-300',

  ghost:
    'bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-300',

  danger:
    'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-200',

  outline:
    'border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 focus:ring-neutral-300',
};

const sizeClasses = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    children,
    className = '',
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-md font-medium',
        'transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        'whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <span
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
});

export default Button;