// frontend/src/types/user.ts

export interface User {
  _id: string;

  email: string;

  name: string;

  username?: string;

  title?: string;

  avatar?: string | null;

  isGuest?: boolean;

  createdAt?: string;

  updatedAt?: string;
}

export interface UpdateUserPayload {
  name?: string;

  username?: string;

  title?: string;

  avatar?: string | null;
}

export interface UserResponse {
  user: User;
}