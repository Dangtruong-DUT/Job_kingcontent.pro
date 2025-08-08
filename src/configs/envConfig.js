import { z } from 'zod';

const envSchema = z.object({
    VITE_API_URL: z.string().url(),
    VITE_FB_APP_ID: z.string(),
    VITE_FB_APP_SCOPE: z.string(),
    VITE_FB_APP_API_VERSION: z.string(),
    VITE_VIDEO_EDITOR_URL: z.string().url(),
    VITE_THREADS_APP_ID_2: z.string(),
    VITE_THREADS_APP_REDIRECT_URI: z.string().url(),
    VITE_THREADS_APP_SCOPE: z.string(),
    VITE_TIKTOK_CLIENT_ID: z.string(),
    VITE_TIKTOK_SCOPE: z.string(),
    VITE_TIKTOK_REDIRECT_URI: z.string().url(),
    VITE_TIKTOK_CLIENT_SECRET: z.string(),
});

const envVars = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_FB_APP_ID: import.meta.env.VITE_FB_APP_ID,
    VITE_FB_APP_SCOPE: import.meta.env.VITE_FB_APP_SCOPE,
    VITE_FB_APP_API_VERSION: import.meta.env.VITE_FB_APP_API_VERSION,
    VITE_VIDEO_EDITOR_URL: import.meta.env.VITE_VIDEO_EDITOR_URL,
    VITE_THREADS_APP_ID_2: import.meta.env.VITE_THREADS_APP_ID_2,
    VITE_THREADS_APP_REDIRECT_URI: import.meta.env.VITE_THREADS_APP_REDIRECT_URI,
    VITE_THREADS_APP_SCOPE: import.meta.env.VITE_THREADS_APP_SCOPE,
    VITE_TIKTOK_CLIENT_ID: import.meta.env.VITE_TIKTOK_CLIENT_ID,
    VITE_TIKTOK_SCOPE: import.meta.env.VITE_TIKTOK_SCOPE,
    VITE_TIKTOK_REDIRECT_URI: import.meta.env.VITE_TIKTOK_REDIRECT_URI,
    VITE_TIKTOK_CLIENT_SECRET: import.meta.env.VITE_TIKTOK_CLIENT_SECRET,
};

const parsed = envSchema.safeParse(envVars);
if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error('Invalid environment variables:', parsed.error.format());
    throw new Error('Invalid environment variables');
}

export const env = parsed.data;
