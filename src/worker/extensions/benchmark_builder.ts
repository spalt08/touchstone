import { generateId } from 'helpers/data'

export type BenchmarkRequest = {
  setupCode: string
  suites: string[]
}

const libPromise = Promise.all([
  fetch('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js').then((response) => response.text()),
  fetch('https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.6/platform.min.js').then((response) => response.text()),
  fetch('https://cdnjs.cloudflare.com/ajax/libs/benchmark/2.1.4/benchmark.min.js').then((response) => response.text()),
])
const benchmarks = new Map<string, BenchmarkRequest>()

function generateBenchmarkId() {
  return `bnch_${generateId()}`
}

export function registerBenchmark(request: BenchmarkRequest) {
  const id = generateBenchmarkId()
  benchmarks.set(id, request)
  return id
}

export function buildBenchmarkScript(id: string): Response | Promise<Response> {
  const request = benchmarks.get(id)

  if (!request) {
    return new Response(null, { status: 404 })
  }

  benchmarks.delete(id)

  return libPromise.then((libCode) => {
    return new Response(
      `
			${libCode.join('\n')}
			${request.setupCode}
			const suite = new Benchmark.Suite;

			suite
			${request.suites
        .map(
          (suite, index) => `
				.add('${index}', function() {
					${suite}
				})
			`
        )
        .join('')}
			
			.on('cycle', function(event) {
				self.postMessage(event.target.toString())
			})
			.on('complete', function() {
				self.postMessage('finish')
			})
			.run();
		`,
      {
        headers: {
          'Content-Type': 'text/javascript',
        },
      }
    )
  })
}
