var serviceWorkerOption = {
  "assets": []
};
        
        /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/worker/service_worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers/data.ts":
/*!*****************************!*\
  !*** ./src/helpers/data.ts ***!
  \*****************************/
/*! exports provided: generateId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateId", function() { return generateId; });
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateId(length = 10) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length - 1));
    }
    return result;
}


/***/ }),

/***/ "./src/worker/extensions/benchmark_builder.ts":
/*!****************************************************!*\
  !*** ./src/worker/extensions/benchmark_builder.ts ***!
  \****************************************************/
/*! exports provided: registerBenchmark, buildBenchmarkScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerBenchmark", function() { return registerBenchmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildBenchmarkScript", function() { return buildBenchmarkScript; });
/* harmony import */ var helpers_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! helpers/data */ "./src/helpers/data.ts");

const libPromise = Promise.all([
    fetch('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js').then((response) => response.text()),
    fetch('https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.6/platform.min.js').then((response) => response.text()),
    fetch('https://cdnjs.cloudflare.com/ajax/libs/benchmark/2.1.4/benchmark.min.js').then((response) => response.text()),
]);
const benchmarks = new Map();
function generateBenchmarkId() {
    return `bnch_${Object(helpers_data__WEBPACK_IMPORTED_MODULE_0__["generateId"])()}`;
}
function registerBenchmark(request) {
    const id = generateBenchmarkId();
    benchmarks.set(id, request);
    return id;
}
function buildBenchmarkScript(id) {
    const request = benchmarks.get(id);
    if (!request) {
        return new Response(null, { status: 404 });
    }
    benchmarks.delete(id);
    return libPromise.then((libCode) => {
        return new Response(`
			${libCode.join('\n')}
			${request.setupCode}
			const suite = new Benchmark.Suite;

			suite
			${request.suites
            .map((suite, index) => `
				.add('${index}', function() {
					${suite}
				})
			`)
            .join('')}
			
			.on('cycle', function(event) {
				self.postMessage({
          hz: event.target.hz,
          size: event.target.stats.sample.length,
          rme: event.target.stats.rme
        })
			})
			.on('complete', function() {
				self.postMessage('finish')
			})
			.run();
		`, {
            headers: {
                'Content-Type': 'text/javascript',
            },
        });
    });
}


/***/ }),

/***/ "./src/worker/extensions/context.ts":
/*!******************************************!*\
  !*** ./src/worker/extensions/context.ts ***!
  \******************************************/
/*! exports provided: ctx, respond */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ctx", function() { return ctx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "respond", function() { return respond; });
const ctx = self;
/**
 * Respond to window request
 */
function respond(type, client, id, payload) {
    if (client && id) {
        client.postMessage({ id, type, payload }, []);
    }
    else {
        throw new Error('Expected message source and ID for responding');
    }
}


/***/ }),

/***/ "./src/worker/service_worker.ts":
/*!**************************************!*\
  !*** ./src/worker/service_worker.ts ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extensions_benchmark_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extensions/benchmark_builder */ "./src/worker/extensions/benchmark_builder.ts");
/* harmony import */ var _extensions_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extensions/context */ "./src/worker/extensions/context.ts");


const { log } = console;
/**
 * Service Worker Installation
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 */
_extensions_context__WEBPACK_IMPORTED_MODULE_1__["ctx"].addEventListener('install', (event) => {
    log('Service worker is installing');
    event.waitUntil(_extensions_context__WEBPACK_IMPORTED_MODULE_1__["ctx"].skipWaiting());
});
_extensions_context__WEBPACK_IMPORTED_MODULE_1__["ctx"].addEventListener('activate', (event) => {
    log('Service worker is activating');
    event.waitUntil(_extensions_context__WEBPACK_IMPORTED_MODULE_1__["ctx"].skipWaiting());
});
/**
 * Handling incoming messages
 */
_extensions_context__WEBPACK_IMPORTED_MODULE_1__["ctx"].addEventListener('message', (event) => {
    const { data, source } = event;
    const message = data;
    switch (message.type) {
        case 'register_benchmmark': {
            const { id, payload } = message;
            const benchmarkId = Object(_extensions_benchmark_builder__WEBPACK_IMPORTED_MODULE_0__["registerBenchmark"])(payload);
            Object(_extensions_context__WEBPACK_IMPORTED_MODULE_1__["respond"])('benchmark_registered', source, id, benchmarkId);
            break;
        }
        default:
            log('Unknown message type:', message.type);
    }
});
/**
 * Interception of browser requests
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
 */
_extensions_context__WEBPACK_IMPORTED_MODULE_1__["ctx"].addEventListener('fetch', (event) => {
    const { request: { url }, } = event;
    if (url.includes('/benchmark/')) {
        event.respondWith(Object(_extensions_benchmark_builder__WEBPACK_IMPORTED_MODULE_0__["buildBenchmarkScript"])(url.split('/').pop() || ''));
    }
    else {
        event.respondWith(fetch(url));
    }
    // const [, path, scope] = /http[:s]+\/\/.*?(\/(.*?)\/.*$)/.exec(url) || []
    // switch (scope) {
    //   case 'benchmark':
    //     event.respondWith(buildBenchmarkScript(path.split('/').pop() || ''))
    //     break
    //   default:
    //     event.respondWith(fetch(url))
    // }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2VyL2V4dGVuc2lvbnMvYmVuY2htYXJrX2J1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci9leHRlbnNpb25zL2NvbnRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci9zZXJ2aWNlX3dvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUNPO0FBQ1A7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQUE7QUFBQTtBQUFBO0FBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtEQUFVLEdBQUc7QUFDaEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsbUNBQW1DLGNBQWM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7QUNyREE7QUFBQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWEE7QUFBQTtBQUFBO0FBQXlGO0FBQ3JDO0FBQ3BELE9BQU8sTUFBTTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQUc7QUFDSDtBQUNBLG9CQUFvQix1REFBRztBQUN2QixDQUFDO0FBQ0QsdURBQUc7QUFDSDtBQUNBLG9CQUFvQix1REFBRztBQUN2QixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsdURBQUc7QUFDSCxXQUFXLGVBQWU7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakMsZ0NBQWdDLHVGQUFpQjtBQUNqRCxZQUFZLG1FQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBRztBQUNILFdBQVcsV0FBVyxNQUFNLEdBQUc7QUFDL0I7QUFDQSwwQkFBMEIsMEZBQW9CO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3dvcmtlci9zZXJ2aWNlX3dvcmtlci50c1wiKTtcbiIsImNvbnN0IGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUlkKGxlbmd0aCA9IDEwKSB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGggLSAxKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZUlkIH0gZnJvbSAnaGVscGVycy9kYXRhJztcbmNvbnN0IGxpYlByb21pc2UgPSBQcm9taXNlLmFsbChbXG4gICAgZmV0Y2goJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2xvZGFzaC5qcy80LjE3LjIwL2xvZGFzaC5taW4uanMnKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKSxcbiAgICBmZXRjaCgnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvcGxhdGZvcm0vMS4zLjYvcGxhdGZvcm0ubWluLmpzJykudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSksXG4gICAgZmV0Y2goJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2JlbmNobWFyay8yLjEuNC9iZW5jaG1hcmsubWluLmpzJykudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSksXG5dKTtcbmNvbnN0IGJlbmNobWFya3MgPSBuZXcgTWFwKCk7XG5mdW5jdGlvbiBnZW5lcmF0ZUJlbmNobWFya0lkKCkge1xuICAgIHJldHVybiBgYm5jaF8ke2dlbmVyYXRlSWQoKX1gO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQmVuY2htYXJrKHJlcXVlc3QpIHtcbiAgICBjb25zdCBpZCA9IGdlbmVyYXRlQmVuY2htYXJrSWQoKTtcbiAgICBiZW5jaG1hcmtzLnNldChpZCwgcmVxdWVzdCk7XG4gICAgcmV0dXJuIGlkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQmVuY2htYXJrU2NyaXB0KGlkKSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGJlbmNobWFya3MuZ2V0KGlkKTtcbiAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogNDA0IH0pO1xuICAgIH1cbiAgICBiZW5jaG1hcmtzLmRlbGV0ZShpZCk7XG4gICAgcmV0dXJuIGxpYlByb21pc2UudGhlbigobGliQ29kZSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKGBcblx0XHRcdCR7bGliQ29kZS5qb2luKCdcXG4nKX1cblx0XHRcdCR7cmVxdWVzdC5zZXR1cENvZGV9XG5cdFx0XHRjb25zdCBzdWl0ZSA9IG5ldyBCZW5jaG1hcmsuU3VpdGU7XG5cblx0XHRcdHN1aXRlXG5cdFx0XHQke3JlcXVlc3Quc3VpdGVzXG4gICAgICAgICAgICAubWFwKChzdWl0ZSwgaW5kZXgpID0+IGBcblx0XHRcdFx0LmFkZCgnJHtpbmRleH0nLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQke3N1aXRlfVxuXHRcdFx0XHR9KVxuXHRcdFx0YClcbiAgICAgICAgICAgIC5qb2luKCcnKX1cblx0XHRcdFxuXHRcdFx0Lm9uKCdjeWNsZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgIGh6OiBldmVudC50YXJnZXQuaHosXG4gICAgICAgICAgc2l6ZTogZXZlbnQudGFyZ2V0LnN0YXRzLnNhbXBsZS5sZW5ndGgsXG4gICAgICAgICAgcm1lOiBldmVudC50YXJnZXQuc3RhdHMucm1lXG4gICAgICAgIH0pXG5cdFx0XHR9KVxuXHRcdFx0Lm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLnBvc3RNZXNzYWdlKCdmaW5pc2gnKVxuXHRcdFx0fSlcblx0XHRcdC5ydW4oKTtcblx0XHRgLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJleHBvcnQgY29uc3QgY3R4ID0gc2VsZjtcbi8qKlxuICogUmVzcG9uZCB0byB3aW5kb3cgcmVxdWVzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uZCh0eXBlLCBjbGllbnQsIGlkLCBwYXlsb2FkKSB7XG4gICAgaWYgKGNsaWVudCAmJiBpZCkge1xuICAgICAgICBjbGllbnQucG9zdE1lc3NhZ2UoeyBpZCwgdHlwZSwgcGF5bG9hZCB9LCBbXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG1lc3NhZ2Ugc291cmNlIGFuZCBJRCBmb3IgcmVzcG9uZGluZycpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGJ1aWxkQmVuY2htYXJrU2NyaXB0LCByZWdpc3RlckJlbmNobWFyayB9IGZyb20gJy4vZXh0ZW5zaW9ucy9iZW5jaG1hcmtfYnVpbGRlcic7XG5pbXBvcnQgeyBjdHgsIHJlc3BvbmQgfSBmcm9tICcuL2V4dGVuc2lvbnMvY29udGV4dCc7XG5jb25zdCB7IGxvZyB9ID0gY29uc29sZTtcbi8qKlxuICogU2VydmljZSBXb3JrZXIgSW5zdGFsbGF0aW9uXG4gKiBSZWY6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TZXJ2aWNlX1dvcmtlcl9BUEkvVXNpbmdfU2VydmljZV9Xb3JrZXJzXG4gKi9cbmN0eC5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgKGV2ZW50KSA9PiB7XG4gICAgbG9nKCdTZXJ2aWNlIHdvcmtlciBpcyBpbnN0YWxsaW5nJyk7XG4gICAgZXZlbnQud2FpdFVudGlsKGN0eC5za2lwV2FpdGluZygpKTtcbn0pO1xuY3R4LmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgKGV2ZW50KSA9PiB7XG4gICAgbG9nKCdTZXJ2aWNlIHdvcmtlciBpcyBhY3RpdmF0aW5nJyk7XG4gICAgZXZlbnQud2FpdFVudGlsKGN0eC5za2lwV2FpdGluZygpKTtcbn0pO1xuLyoqXG4gKiBIYW5kbGluZyBpbmNvbWluZyBtZXNzYWdlc1xuICovXG5jdHguYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YSwgc291cmNlIH0gPSBldmVudDtcbiAgICBjb25zdCBtZXNzYWdlID0gZGF0YTtcbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlICdyZWdpc3Rlcl9iZW5jaG1tYXJrJzoge1xuICAgICAgICAgICAgY29uc3QgeyBpZCwgcGF5bG9hZCB9ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIGNvbnN0IGJlbmNobWFya0lkID0gcmVnaXN0ZXJCZW5jaG1hcmsocGF5bG9hZCk7XG4gICAgICAgICAgICByZXNwb25kKCdiZW5jaG1hcmtfcmVnaXN0ZXJlZCcsIHNvdXJjZSwgaWQsIGJlbmNobWFya0lkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBsb2coJ1Vua25vd24gbWVzc2FnZSB0eXBlOicsIG1lc3NhZ2UudHlwZSk7XG4gICAgfVxufSk7XG4vKipcbiAqIEludGVyY2VwdGlvbiBvZiBicm93c2VyIHJlcXVlc3RzXG4gKiBSZWY6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GZXRjaEV2ZW50XG4gKi9cbmN0eC5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHsgcmVxdWVzdDogeyB1cmwgfSwgfSA9IGV2ZW50O1xuICAgIGlmICh1cmwuaW5jbHVkZXMoJy9iZW5jaG1hcmsvJykpIHtcbiAgICAgICAgZXZlbnQucmVzcG9uZFdpdGgoYnVpbGRCZW5jaG1hcmtTY3JpcHQodXJsLnNwbGl0KCcvJykucG9wKCkgfHwgJycpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGV2ZW50LnJlc3BvbmRXaXRoKGZldGNoKHVybCkpO1xuICAgIH1cbiAgICAvLyBjb25zdCBbLCBwYXRoLCBzY29wZV0gPSAvaHR0cFs6c10rXFwvXFwvLio/KFxcLyguKj8pXFwvLiokKS8uZXhlYyh1cmwpIHx8IFtdXG4gICAgLy8gc3dpdGNoIChzY29wZSkge1xuICAgIC8vICAgY2FzZSAnYmVuY2htYXJrJzpcbiAgICAvLyAgICAgZXZlbnQucmVzcG9uZFdpdGgoYnVpbGRCZW5jaG1hcmtTY3JpcHQocGF0aC5zcGxpdCgnLycpLnBvcCgpIHx8ICcnKSlcbiAgICAvLyAgICAgYnJlYWtcbiAgICAvLyAgIGRlZmF1bHQ6XG4gICAgLy8gICAgIGV2ZW50LnJlc3BvbmRXaXRoKGZldGNoKHVybCkpXG4gICAgLy8gfVxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9