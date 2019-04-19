/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      // App is being served from cache by a service worker.
      // For more details, visit https://goo.gl/AFskqB
    },
    registered () {
      // Service worker has been registered.
    },
    cached () {
      // Content has been cached for offline use.
    },
    updatefound () {
      // New content is downloading.
    },
    updated () {
      alert('app updated, reloading')
      window.location.reload
      // New content is available; please refresh.
    },
    offline () {
      // No internet connection found. App is running in offline mode.
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
