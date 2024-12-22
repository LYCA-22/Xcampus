const Number = import.meta.env.VITE_APP_VERSION
const BuildTime = import.meta.env.VITE_BUILD_TIME
const Commit = import.meta.env.VITE_GIT_HASH

export const version = {
    number: Number || '1.0.0',
    buildTime: BuildTime || new Date().toISOString(),
    commit: Commit || 'development'
};