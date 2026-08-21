const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        ...options.headers,
      },
    },
  );

  if (!response.ok) {
    const message =
      await response.text();

    throw new Error(
      message || 'Request failed',
    );
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint),

  post: <T>(
    endpoint: string,
    body?: unknown,
  ) =>
    request<T>(endpoint, {
      method: 'POST',
      body: body
        ? JSON.stringify(body)
        : undefined,
    }),

  patch: <T>(
    endpoint: string,
    body: unknown,
  ) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: 'DELETE',
    }),
};