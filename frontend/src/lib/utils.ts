// frontend/src/lib/utils.ts

export function cn(
  ...classes: Array<
    string | false | null | undefined
  >
) {
  return classes.filter(Boolean).join(' ');
}

export function getInitials(
  name?: string | null,
) {
  if (!name?.trim()) {
    return '?';
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
}

export function formatDate(
  value?: string | Date | null,
) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  ).format(date);
}

export function formatShortDate(
  value?: string | Date | null,
) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      day: '2-digit',
      month: 'short',
    },
  ).format(date);
}

export function formatDateTime(
  value?: string | Date | null,
) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  ).format(date);
}

export function isOverdue(
  value?: string | Date | null,
) {
  if (!value) {
    return false;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return date.getTime() < Date.now();
}

export function truncate(
  value: string,
  maxLength: number,
) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(
    0,
    maxLength,
  )}...`;
}

export function capitalize(
  value: string,
) {
  if (!value) {
    return '';
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

export function sleep(
  milliseconds: number,
) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}