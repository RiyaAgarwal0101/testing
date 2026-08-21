'use client';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  xs: 'h-5 w-5 text-[8px]',
  sm: 'h-7 w-7 text-[10px]',
  md: 'h-8 w-8 text-xs',
  lg: 'h-10 w-10 text-sm',
  xl: 'h-16 w-16 text-lg',
};

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/);

  if (!parts.length || !parts[0]) {
    return '?';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Avatar({
  src,
  name = '',
  size = 'md',
  className = '',
}: AvatarProps) {
  return (
    <div
      className={[
        'relative flex shrink-0 items-center justify-center',
        'overflow-hidden rounded-full',
        'bg-neutral-200 font-medium text-neutral-700',
        sizes[size],
        className,
      ].join(' ')}
    >
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}