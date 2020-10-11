import { WorkerOutcomingMessageMap, WorkerOutcomingMessageTypes } from 'worker/types'

export const ctx = (self as unknown) as ServiceWorkerGlobalScope

/**
 * Respond to window request
 */
export function respond<K extends WorkerOutcomingMessageTypes>(
  type: K,
  client: Client | ServiceWorker | MessagePort | null,
  id?: string,
  payload?: WorkerOutcomingMessageMap[K]
) {
  if (client && id) {
    client.postMessage({ id, type, payload }, [])
  } else {
    throw new Error('Expected message source and ID for responding')
  }
}
