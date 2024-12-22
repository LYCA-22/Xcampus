import { execSync } from 'child_process';
import fs from 'fs';

const getGitHash = () => {
    try {
        return execSync('git rev-parse --short HEAD').toString().trim();
    } catch (error) {
        return 'unknown';
    }
};

const updateEnv = () => {
    const gitHash = getGitHash();
    const buildTime = new Date().toISOString();

    // 读取 package.json 获取版本号并递增
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    const [major, minor, patch] = pkg.version.split('.').map(Number);
    const newVersion = `${major}.${minor}.${patch + 1}`; // 自动递增 Patch 版本号

    const envContent = `
        VITE_APP_VERSION=${newVersion}
        VITE_BUILD_TIME=${buildTime}
        VITE_GIT_HASH=${gitHash}
    `;

    fs.writeFileSync('.env', envContent);
};

updateEnv();