import { env } from '@/configs/envConfig';
export const loginThreads = () => {
  const THREADS_APP_ID = env.VITE_THREADS_APP_ID_2;
  const REDIRECT_URI = env.VITE_THREADS_APP_REDIRECT_URI;
  const SCOPES = env.VITE_THREADS_APP_SCOPE;
  const loginUrl = `https://www.threads.net/oauth/authorize?client_id=${THREADS_APP_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}`;

  window.open(loginUrl);
};

