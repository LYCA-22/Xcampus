// scripts/update-version.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGitHash() {
    try {
        return execSync('git rev-parse --short HEAD').toString().trim();
    } catch {
        return 'unknown';
    }
}

function updateVersion() {
    const pkgPath = path.resolve(__dirname, '../package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

    const buildInfo = {
        version: pkg.version,
        buildTime: new Date().toISOString(),
        gitHash: getGitHash(),
        mode: process.env.MODE || 'production'
    };

    // 寫入 .env
    const envContent = `
VITE_APP_VERSION=${buildInfo.version}
VITE_BUILD_TIME=${buildInfo.buildTime}
VITE_GIT_HASH=${buildInfo.gitHash}
VITE_MODE=${buildInfo.mode}
`;

    fs.writeFileSync(path.resolve(__dirname, '../.env'), envContent);

    // 寫入 buildInfo.json 到 public 資料夾
    fs.writeFileSync(
        path.resolve(__dirname, '../public/buildInfo.json'),
        JSON.stringify(buildInfo, null, 2)
    );

    console.log('Version info updated:', buildInfo);
}

updateVersion();