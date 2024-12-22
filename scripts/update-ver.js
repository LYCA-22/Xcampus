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

    // 读取 package.json 获取版本号
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

    const envContent = `
VITE_APP_VERSION=${pkg.version}
VITE_BUILD_TIME=${buildTime}
VITE_GIT_HASH=${gitHash}
`;

    fs.writeFileSync('.env', envContent);
};

updateEnv();