if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/create-vv-app/sw.js', { scope: '/create-vv-app/' })})}