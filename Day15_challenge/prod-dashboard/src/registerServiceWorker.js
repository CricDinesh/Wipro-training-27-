export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => console.log('Service worker registered:', reg.scope))
        .catch((err) => console.warn('SW registration failed:', err));
    });
  }
}
