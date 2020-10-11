import SW from 'serviceworker-webpack-plugin/lib/runtime'
import {
  WorkerIncomingMessage,
  WorkerIncomingMessageMap,
  WorkerIncomingMessageTypes,
  WorkerOutcomingMessage,
  WorkerOutcomingMessageMap,
  WorkerRequestResponseMap,
} from './types'

const { log } = console
const pendingRequests = new Map<string, (payload: WorkerOutcomingMessage['payload']) => unknown>()
const pendingMessages: WorkerIncomingMessage[] = []

export function serviceWorkerRequest<K extends WorkerIncomingMessageTypes>(type: K, payload: WorkerIncomingMessageMap[K]) {
  return new Promise<WorkerOutcomingMessageMap[WorkerRequestResponseMap[K]]>((resolve) => {
    const id = type + Date.now().toString() + Math.random() * 1000
    const message = { id, type, payload } as WorkerIncomingMessage

    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message)
    } else {
      pendingMessages.push(message)
    }

    pendingRequests.set(id, resolve)
  })
}

export function initServiceWorker() {
  SW.register()

  navigator.serviceWorker.ready.then((registration) => {
    log('Service worker loaded with scope:', registration.scope, navigator.serviceWorker.controller)
    resendPendingRequests()

    navigator.serviceWorker.addEventListener('message', (event) => {
      const data = event.data as WorkerOutcomingMessage

      // response
      if (data.id) {
        const { id, payload } = data
        const resolve = pendingRequests.get(id)

        if (resolve) {
          resolve(payload)
          pendingRequests.delete(id)
        }
      } else {
        log('Unknown message', data)
      }
    })
  })
}

function resendPendingRequests() {
  if (navigator.serviceWorker.controller) {
    for (let i = 0; i < pendingMessages.length; i++) {
      navigator.serviceWorker.controller.postMessage(pendingMessages[i])
    }
    pendingMessages.length = 0
  }
}
