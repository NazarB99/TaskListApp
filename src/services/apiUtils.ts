export const BASE_URL = 'http://localhost:3000';

export const fetchWithTimeout = (
  path: string,
  options: RequestInit = {},
  timeout = 15000,
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  return fetch(path, {
    ...options,
    signal: controller.signal,
  }).then(response => {
    clearTimeout(id);
    return response;
  });
};
