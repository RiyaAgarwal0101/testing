'use client';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export interface Profile {
  _id?: string;
  email: string;
  name: string;
  title?: string;
  username?: string;
  avatar?: string | null;
  isGuest?: boolean;
}

interface ProfileFormProps {
  profile: Profile;
  loading?: boolean;
  onSubmit: (
    data: {
      name: string;
      title: string;
      username: string;
      avatar?: string;
    },
  ) => void | Promise<void>;
  onLeaveWorkspace?: () => void | Promise<void>;
}

export default function ProfileForm({
  profile,
  loading = false,
  onSubmit,
  onLeaveWorkspace,
}: ProfileFormProps) {
  const [name, setName] =
    useState(profile.name || '');

  const [title, setTitle] =
    useState(profile.title || '');

  const [username, setUsername] =
    useState(profile.username || '');

  const [avatar, setAvatar] =
    useState(profile.avatar || '');

  const [error, setError] = useState('');

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(profile.name || '');
    setTitle(profile.title || '');
    setUsername(profile.username || '');
    setAvatar(profile.avatar || '');
  }, [profile]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');
    setSaved(false);

    if (!name.trim()) {
      setError('Full name is required.');
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        title: title.trim(),
        username: username.trim(),
        avatar: avatar.trim(),
      });

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save profile.',
      );
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-neutral-900">
          Profile
        </h1>

        <p className="mt-1 text-xs text-neutral-500">
          Manage your personal information.
        </p>
      </div>

      {/* Profile card */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
      >
        {/* Profile picture */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <div>
            <p className="text-xs font-medium text-neutral-800">
              Profile picture
            </p>

            <p className="mt-0.5 text-[11px] text-neutral-400">
              Your profile image
            </p>
          </div>

          <Avatar
            src={avatar}
            name={name}
            size="md"
          />
        </div>

        {/* Email */}
        <div className="grid gap-3 border-b border-neutral-100 px-5 py-4 sm:grid-cols-[150px_1fr] sm:items-center">
          <div>
            <p className="text-xs font-medium text-neutral-800">
              Email
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="min-w-0 flex-1 truncate rounded-md bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
              {profile.email}
            </span>

            <span
              className="text-neutral-400"
              aria-hidden="true"
            >
              ✎
            </span>
          </div>
        </div>

        {/* Avatar URL */}
        <div className="grid gap-3 border-b border-neutral-100 px-5 py-4 sm:grid-cols-[150px_1fr] sm:items-center">
          <div>
            <p className="text-xs font-medium text-neutral-800">
              Avatar URL
            </p>
          </div>

          <Input
            value={avatar}
            onChange={(event) =>
              setAvatar(event.target.value)
            }
            placeholder="https://..."
          />
        </div>

        {/* Full name */}
        <div className="grid gap-3 border-b border-neutral-100 px-5 py-4 sm:grid-cols-[150px_1fr] sm:items-center">
          <div>
            <p className="text-xs font-medium text-neutral-800">
              Full name
            </p>
          </div>

          <Input
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Your full name"
            maxLength={100}
          />
        </div>

        {/* Title */}
        <div className="grid gap-3 border-b border-neutral-100 px-5 py-4 sm:grid-cols-[150px_1fr] sm:items-center">
          <div>
            <p className="text-xs font-medium text-neutral-800">
              Title
            </p>

            <p className="mt-0.5 text-[10px] text-neutral-400">
              Your job title or role
            </p>
          </div>

          <Input
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Designer"
            maxLength={100}
          />
        </div>

        {/* Username */}
        <div className="grid gap-3 px-5 py-4 sm:grid-cols-[150px_1fr] sm:items-center">
          <div>
            <p className="text-xs font-medium text-neutral-800">
              Username
            </p>

            <p className="mt-0.5 text-[10px] text-neutral-400">
              One word, like a nickname or first name
            </p>
          </div>

          <Input
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="username"
            maxLength={50}
          />
        </div>

        {/* Form footer */}
        <div className="flex flex-col gap-2 border-t border-neutral-100 bg-neutral-50/40 px-5 py-3 sm:flex-row sm:items-center sm:justify-end">
          {error && (
            <p className="mr-auto text-xs text-red-600">
              {error}
            </p>
          )}

          {saved && (
            <p className="mr-auto text-xs text-green-600">
              Profile saved.
            </p>
          )}

          <Button
            type="submit"
            loading={loading}
          >
            Save Changes
          </Button>
        </div>
      </form>

      {/* Workspace access */}
      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-neutral-900">
          Workspace access
        </h2>

        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-neutral-800">
              Leave workspace
            </p>

            <p className="mt-1 text-[11px] text-neutral-500">
              Remove yourself from the workspace.
            </p>
          </div>

          {onLeaveWorkspace && (
            <Button
              variant="danger"
              type="button"
              onClick={onLeaveWorkspace}
            >
              Leave Workspace
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}