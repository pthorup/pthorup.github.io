if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((reg) => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err));
  });
}
