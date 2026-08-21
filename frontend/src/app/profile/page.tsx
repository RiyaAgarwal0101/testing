// frontend/src/app/profile/page.tsx

'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import ProfileForm from '@/components/profile/ProfileForm';

import {
  useAuth,
} from '@/context/AuthContext';

import {
  authFetch,
  getApiUrl,
} from '@/lib/auth';

import {
  UpdateUserPayload,
} from '@/types/user';

export default function ProfilePage() {
  const router = useRouter();

  const {
    user,
    loading: authLoading,
    refreshUser,
    logout,
  } = useAuth();

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState('');

  const [
    success,
    setSuccess,
  ] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [
    authLoading,
    user,
    router,
  ]);

  async function handleSubmit(
    payload: UpdateUserPayload,
  ) {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response =
        await authFetch(
          getApiUrl('/users/me'),
          {
            method: 'PATCH',

            body: JSON.stringify(
              payload,
            ),
          },
        );

      const data =
        await response
          .json()
          .catch(() => null);

      if (!response.ok) {
        const message =
          Array.isArray(
            data?.message,
          )
            ? data.message.join(
                ', ',
              )
            : data?.message ||
              'Unable to update profile.';

        throw new Error(
          message,
        );
      }

      await refreshUser();

      setSuccess(
        'Profile updated successfully.',
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update profile.',
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleLeaveWorkspace() {
    const confirmed =
      window.confirm(
        'Are you sure you want to leave this workspace?',
      );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      const response =
        await authFetch(
          getApiUrl(
            '/users/me/workspace',
          ),
          {
            method: 'DELETE',
          },
        );

      const data =
        await response
          .json()
          .catch(() => null);

      if (!response.ok) {
        const message =
          Array.isArray(
            data?.message,
          )
            ? data.message.join(
                ', ',
              )
            : data?.message ||
              'Unable to leave workspace.';

        throw new Error(
          message,
        );
      }

      await logout();

      router.push('/login');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to leave workspace.',
      );
    }
  }

  if (
    authLoading ||
    !user
  ) {
    return (
      <main className="min-h-screen bg-[#f7f7f7] p-6">
        <div className="mx-auto max-w-3xl animate-pulse">
          <div className="h-6 w-32 rounded bg-neutral-200" />

          <div className="mt-6 h-96 rounded-xl bg-white" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        {/* Page heading */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() =>
              router.push('/')
            }
            className="mb-4 text-xs text-neutral-500 hover:text-neutral-900"
          >
            ← Back to app
          </button>

          <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
            Profile
          </h1>

          <p className="mt-1 text-xs text-neutral-500">
            Manage your personal information
            and workspace access.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-xs text-green-600">
            {success}
          </div>
        )}

        {/* Profile card */}
        <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-neutral-900">
              Profile
            </h2>

            <p className="mt-0.5 text-[11px] text-neutral-400">
              Your account information
            </p>
          </div>

          {/* Avatar preview */}
          <div className="border-b border-neutral-100 px-5 py-5">
            <div className="flex items-center gap-4">
              <Avatar
                src={user.avatar}
                name={user.name}
                size="lg"
              />

              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {user.name}
                </p>

                <p className="mt-0.5 text-xs text-neutral-500">
                  {user.email}
                </p>

                {user.isGuest && (
                  <span className="mt-2 inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">
                    Guest account
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-5 py-5">
            <ProfileForm
              user={user}
              onSubmit={handleSubmit}
              loading={saving}
            />
          </div>
        </section>

        {/* Workspace */}
        <section className="mt-5 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-neutral-900">
              Workspace access
            </h2>

            <p className="mt-0.5 text-[11px] text-neutral-400">
              Manage your access to the current
              workspace.
            </p>
          </div>

          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-neutral-800">
                Leave workspace
              </p>

              <p className="mt-1 max-w-md text-[11px] leading-5 text-neutral-500">
                Leaving the workspace will remove
                your access to its projects and
                tasks.
              </p>
            </div>

            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={
                handleLeaveWorkspace
              }
            >
              Leave Workspace
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}