import { BenchmarkRequest } from './extensions/benchmark_builder'

export type WorkerIncomingMessageMap = {
  register_benchmmark: BenchmarkRequest
}

export type WorkerOutcomingMessageMap = {
  benchmark_registered: string
}

export type WorkerRequestResponseMap = {
  register_benchmmark: 'benchmark_registered'
}

export type WorkerIncomingMessageTypes = keyof WorkerIncomingMessageMap
export type WorkerIncomingMessage = {
  [Type in WorkerIncomingMessageTypes]: {
    id?: string
    type: Type
    payload: WorkerIncomingMessageMap[Type]
  }
}[WorkerIncomingMessageTypes]

export type WorkerOutcomingMessageTypes = keyof WorkerOutcomingMessageMap
export type WorkerOutcomingMessage = {
  [Type in WorkerOutcomingMessageTypes]: {
    id?: string
    type: Type
    payload: WorkerOutcomingMessageMap[Type]
  }
}[WorkerOutcomingMessageTypes]
