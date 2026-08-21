// frontend/src/lib/auth.ts

export interface AuthUser {
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

export interface LoginPayload {
  email: string;
  password: string;
}

export interface GuestLoginPayload {
  name?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:4000/api';

const TOKEN_KEY = 'task-manager-access-token';

function isBrowser() {
  return typeof window !== 'undefined';
}

export function getAccessToken(): string | null {
  if (!isBrowser()) {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string) {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAccessToken() {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
}

async function parseResponse<T>(
  response: Response,
): Promise<T> {
  const contentType =
    response.headers.get('content-type');

  const isJson =
    contentType?.includes('application/json');

  const data = isJson
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    let message = 'Something went wrong.';

    if (
      typeof data === 'object' &&
      data !== null &&
      'message' in data
    ) {
      const serverMessage = (
        data as { message?: string | string[] }
      ).message;

      if (Array.isArray(serverMessage)) {
        message = serverMessage.join(', ');
      } else if (serverMessage) {
        message = serverMessage;
      }
    } else if (typeof data === 'string' && data) {
      message = data;
    }

    throw new Error(message);
  }

  return data as T;
}

export async function login(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  const data =
    await parseResponse<AuthResponse>(response);

  setAccessToken(data.accessToken);

  return data;
}
export async function guestLogin(
  payload: GuestLoginPayload = {},
): Promise<AuthResponse> {
  const response = await fetch(
    `${API_URL}/auth/guest`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  const data =
    await parseResponse<AuthResponse>(
      response,
    );

  setAccessToken(
    data.accessToken,
  );

  return data;
}
// export async function guestLogin(
//   payload: GuestLoginPayload = {},
// ): Promise<AuthResponse> {
//   const response = await fetch(
//     `${API_URL}/auth/guest`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     },
//   );

//   const data =
//     await parseResponse<AuthResponse>(response);

//   setAccessToken(data.accessToken);

//   return data;
// }

export async function getCurrentUser(): Promise<AuthUser> {
  const token = getAccessToken();

  if (!token) {
    throw new Error('Not authenticated.');
  }

  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    },
  );

  if (response.status === 401) {
    removeAccessToken();
  }

  return parseResponse<AuthUser>(response);
}

export async function logout(): Promise<void> {
  const token = getAccessToken();

  try {
    if (token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } finally {
    removeAccessToken();
  }
}

export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const token = getAccessToken();

  const headers = new Headers(
    init.headers,
  );

  if (
    init.body &&
    !headers.has('Content-Type')
  ) {
    headers.set(
      'Content-Type',
      'application/json',
    );
  }

  if (token) {
    headers.set(
      'Authorization',
      `Bearer ${token}`,
    );
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    removeAccessToken();
  }

  return response;
}

export function getApiUrl(path: string) {
  if (!path.startsWith('/')) {
    return `${API_URL}/${path}`;
  }

  return `${API_URL}${path}`;
}

export { API_URL };