'use client';

import { ReactNode } from 'react';

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default:
    'bg-neutral-100 text-neutral-600',

  success:
    'bg-green-50 text-green-600',

  warning:
    'bg-yellow-50 text-yellow-700',

  danger:
    'bg-red-50 text-red-600',

  info:
    'bg-blue-50 text-blue-600',

  purple:
    'bg-purple-50 text-purple-600',
};

const dots: Record<BadgeVariant, string> = {
  default: 'bg-neutral-400',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  purple: 'bg-purple-500',
};

export default function Badge({
  children,
  variant = 'default',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5',
        'rounded-md px-2 py-1',
        'text-[11px] font-medium',
        variants[variant],
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          className={[
            'h-1.5 w-1.5 rounded-full',
            dots[variant],
          ].join(' ')}
        />
      )}

      {children}
    </span>
  );
}