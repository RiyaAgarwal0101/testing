import {
  getAccessToken,
} from './auth';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    getAccessToken();

  const response =
    await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers: {
          'Content-Type':
            'application/json',

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
    const contentType =
      response.headers.get(
        'content-type',
      );

    let message =
      'Request failed.';

    if (
      contentType?.includes(
        'application/json',
      )
    ) {
      const data =
        await response.json();

      if (
        Array.isArray(
          data?.message,
        )
      ) {
        message =
          data.message.join(', ');
      } else if (data?.message) {
        message =
          data.message;
      }
    } else {
      message =
        await response.text();
    }

    throw new Error(message);
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
      body:
        body !== undefined
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

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ??
//   'http://localhost:4000/api';

// async function request<T>(
//   endpoint: string,
//   options: RequestInit = {},
// ): Promise<T> {
//   const token =
//     typeof window !== 'undefined'
//       ? localStorage.getItem('token')
//       : null;

//   const response = await fetch(
//     `${API_URL}${endpoint}`,
//     {
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token
//           ? {
//               Authorization: `Bearer ${token}`,
//             }
//           : {}),
//         ...options.headers,
//       },
//     },
//   );

//   if (!response.ok) {
//     const message =
//       await response.text();

//     throw new Error(
//       message || 'Request failed',
//     );
//   }

//   return response.json();
// }

// export const api = {
//   get: <T>(endpoint: string) =>
//     request<T>(endpoint),

//   post: <T>(
//     endpoint: string,
//     body?: unknown,
//   ) =>
//     request<T>(endpoint, {
//       method: 'POST',
//       body: body
//         ? JSON.stringify(body)
//         : undefined,
//     }),

//   patch: <T>(
//     endpoint: string,
//     body: unknown,
//   ) =>
//     request<T>(endpoint, {
//       method: 'PATCH',
//       body: JSON.stringify(body),
//     }),

//   delete: <T>(endpoint: string) =>
//     request<T>(endpoint, {
//       method: 'DELETE',
//     }),
// };