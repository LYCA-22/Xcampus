// src/serviceWorkerRegistration.js
import './service-worker.js'

export function register() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('Service Worker 註冊成功：', registration);
      }).catch((error) => {
        console.log('Service Worker 註冊失敗：', error);
      });
    }
  }

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}