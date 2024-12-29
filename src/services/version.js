export const version = {
    number: import.meta.env.VITE_APP_VERSION || '1.0.0',
    buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
    commit: import.meta.env.VITE_GIT_HASH || 'development',
    mode: import.meta.env.VITE_MODE || 'production'
};