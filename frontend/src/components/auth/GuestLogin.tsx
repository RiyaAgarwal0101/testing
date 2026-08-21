// frontend/src/components/auth/GuestLogin.tsx

'use client';

import {
  FormEvent,
  useState,
} from 'react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';

interface GuestLoginProps {
  onSuccess?: () => void;
  className?: string;
}

export default function GuestLogin({
  onSuccess,
  className = '',
}: GuestLoginProps) {
  const {
    guestLogin,
    loading,
  } = useAuth();

  const [name, setName] =
    useState('');

  const [error, setError] =
    useState('');

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');

    try {
      await guestLogin({
        name:
          name.trim() || undefined,
      });

      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to continue as guest.',
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        'space-y-4',
        className,
      ].join(' ')}
    >
      <div>
        <h2 className="text-sm font-semibold text-neutral-900">
          Continue as guest
        </h2>

        <p className="mt-1 text-xs text-neutral-500">
          Explore the task manager without
          creating an account.
        </p>
      </div>

      <Input
        label="Name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        placeholder="Guest"
        maxLength={50}
      />

      {error && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </div>
      )}

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Continue as Guest
      </Button>
    </form>
  );
}