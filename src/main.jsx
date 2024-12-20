import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css'
import App from './App';
import { AuthProvider } from './AuthContext';
import { registerSW } from 'virtual:pwa-register';

// 註冊 Service Worker
const updateSW = registerSW({
    onNeedRefresh() {
        // 當有新版本時的處理
        updateSW()
    },
    onOfflineReady() {
        // 離線功能準備就緒時的處理
        console.log('App ready to work offline')
    },
});

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);