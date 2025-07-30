// src/api.ts
import { BASE_URL } from './config';

export const apiFetch = (path: string, options: RequestInit = {}) => {
  return fetch(`${BASE_URL}${path}`, {
    credentials: 'include', // ✅ 始终携带 Cookie
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
};
