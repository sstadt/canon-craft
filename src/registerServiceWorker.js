/* eslint-disable no-console */

import { register } from 'register-service-worker'

var updateFound = false

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      // App is being served from cache by a service worker.
      // For more details, visit https://goo.gl/AFskqB
      document.dispatchEvent(new CustomEvent('application-ready'))
    },
    registered () {
      // Service worker has been registered.
      document.dispatchEvent(new CustomEvent('application-registered'))
    },
    cached () {
      // Content has been cached for offline use.
      document.dispatchEvent(new CustomEvent('application-cached'))
    },
    updatefound () {
      // New content is downloading.
      updateFound = true
      document.dispatchEvent(new CustomEvent('application-update-found'))
    },
    updated () {
      // New content is available; please refresh.
      if (updateFound) {
        updateFound = false
        document.dispatchEvent(new CustomEvent('application-updated'))
      }
    },
    offline () {
      // No internet connection found. App is running in offline mode.
      document.dispatchEvent(new CustomEvent('application-offline'))
    },
    error (error) {
      document.dispatchEvent(new CustomEvent('application-error'))
      console.error('Error during service worker registration:', error)
    }
  })
}
