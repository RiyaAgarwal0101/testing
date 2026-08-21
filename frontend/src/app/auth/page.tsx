'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

import { api } from '@/lib/api';

export default function AuthPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function continueAsGuest() {
    try {
      setLoading(true);

      const result =
        await api.post<{
          token: string;
        }>('/auth/guest');

      localStorage.setItem(
        'token',
        result.token,
      );

      router.push('/tasks');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="w-full max-w-[320px]">
        <div className="mb-4 flex justify-center">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-white">
              <CheckCircle2 size={14} />
            </div>
            Pyramid
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h1 className="text-center text-xl font-semibold">
            Let&apos;s get back on track
          </h1>

          <p className="mt-1 text-center text-sm text-[var(--muted)]">
            Enter your email below to log in to
            your account.
          </p>

          <button
            onClick={continueAsGuest}
            disabled={loading}
            className="mt-5 h-9 w-full rounded-full bg-black text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? 'Loading...'
              : 'Continue as Guest'}
          </button>

          <button
            disabled
            className="mt-2 h-9 w-full rounded-full border border-[var(--border)] text-sm font-medium opacity-70"
          >
            G  Login with Google
          </button>
        </div>

        <p className="mt-5 text-center text-[11px] leading-4 text-[var(--muted)]">
          By clicking continue, you agree to
          our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </main>
  );
}