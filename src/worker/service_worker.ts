import { buildBenchmarkScript, registerBenchmark } from './extensions/benchmark_builder'
import { ctx, respond } from './extensions/context'
import { WorkerIncomingMessage } from './types'

const { log } = console

/**
 * Service Worker Installation
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 */
ctx.addEventListener('install', (event) => {
  log('Service worker is installing')

  event.waitUntil(ctx.skipWaiting())
})

ctx.addEventListener('activate', (event) => {
  log('Service worker is activating')

  event.waitUntil(ctx.skipWaiting())
})

/**
 * Handling incoming messages
 */
ctx.addEventListener('message', (event) => {
  const { data, source } = event
  const message = data as WorkerIncomingMessage

  switch (message.type) {
    case 'register_benchmmark': {
      const { id, payload } = message
      const benchmarkId = registerBenchmark(payload)
      respond('benchmark_registered', source, id, benchmarkId)
      break
    }

    default:
      log('Unknown message type:', message.type)
  }
})

/**
 * Interception of browser requests
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
 */
ctx.addEventListener('fetch', (event) => {
  const {
    request: { url },
  } = event

  if (url.includes('/benchmark/')) {
    event.respondWith(buildBenchmarkScript(url.split('/').pop() || ''))
  } else {
    event.respondWith(fetch(url))
  }
  // const [, path, scope] = /http[:s]+\/\/.*?(\/(.*?)\/.*$)/.exec(url) || []

  // switch (scope) {
  //   case 'benchmark':
  //     event.respondWith(buildBenchmarkScript(path.split('/').pop() || ''))
  //     break

  //   default:
  //     event.respondWith(fetch(url))
  // }
})
