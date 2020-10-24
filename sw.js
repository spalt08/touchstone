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
/******/ 	__webpack_require__.p = "/";
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
				self.postMessage(event.target.toString())
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2VyL2V4dGVuc2lvbnMvYmVuY2htYXJrX2J1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci9leHRlbnNpb25zL2NvbnRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci9zZXJ2aWNlX3dvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUNPO0FBQ1A7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQUE7QUFBQTtBQUFBO0FBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtEQUFVLEdBQUc7QUFDaEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsbUNBQW1DLGNBQWM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBeUY7QUFDckM7QUFDcEQsT0FBTyxNQUFNO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBRztBQUNIO0FBQ0Esb0JBQW9CLHVEQUFHO0FBQ3ZCLENBQUM7QUFDRCx1REFBRztBQUNIO0FBQ0Esb0JBQW9CLHVEQUFHO0FBQ3ZCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx1REFBRztBQUNILFdBQVcsZUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQyxnQ0FBZ0MsdUZBQWlCO0FBQ2pELFlBQVksbUVBQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFHO0FBQ0gsV0FBVyxXQUFXLE1BQU0sR0FBRztBQUMvQjtBQUNBLDBCQUEwQiwwRkFBb0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJzdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy93b3JrZXIvc2VydmljZV93b3JrZXIudHNcIik7XG4iLCJjb25zdCBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJZChsZW5ndGggPSAxMCkge1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcnMubGVuZ3RoIC0gMSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgZ2VuZXJhdGVJZCB9IGZyb20gJ2hlbHBlcnMvZGF0YSc7XG5jb25zdCBsaWJQcm9taXNlID0gUHJvbWlzZS5hbGwoW1xuICAgIGZldGNoKCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9sb2Rhc2guanMvNC4xNy4yMC9sb2Rhc2gubWluLmpzJykudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSksXG4gICAgZmV0Y2goJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3BsYXRmb3JtLzEuMy42L3BsYXRmb3JtLm1pbi5qcycpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpLFxuICAgIGZldGNoKCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9iZW5jaG1hcmsvMi4xLjQvYmVuY2htYXJrLm1pbi5qcycpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpLFxuXSk7XG5jb25zdCBiZW5jaG1hcmtzID0gbmV3IE1hcCgpO1xuZnVuY3Rpb24gZ2VuZXJhdGVCZW5jaG1hcmtJZCgpIHtcbiAgICByZXR1cm4gYGJuY2hfJHtnZW5lcmF0ZUlkKCl9YDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckJlbmNobWFyayhyZXF1ZXN0KSB7XG4gICAgY29uc3QgaWQgPSBnZW5lcmF0ZUJlbmNobWFya0lkKCk7XG4gICAgYmVuY2htYXJrcy5zZXQoaWQsIHJlcXVlc3QpO1xuICAgIHJldHVybiBpZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEJlbmNobWFya1NjcmlwdChpZCkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBiZW5jaG1hcmtzLmdldChpZCk7XG4gICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDQwNCB9KTtcbiAgICB9XG4gICAgYmVuY2htYXJrcy5kZWxldGUoaWQpO1xuICAgIHJldHVybiBsaWJQcm9taXNlLnRoZW4oKGxpYkNvZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShgXG5cdFx0XHQke2xpYkNvZGUuam9pbignXFxuJyl9XG5cdFx0XHQke3JlcXVlc3Quc2V0dXBDb2RlfVxuXHRcdFx0Y29uc3Qgc3VpdGUgPSBuZXcgQmVuY2htYXJrLlN1aXRlO1xuXG5cdFx0XHRzdWl0ZVxuXHRcdFx0JHtyZXF1ZXN0LnN1aXRlc1xuICAgICAgICAgICAgLm1hcCgoc3VpdGUsIGluZGV4KSA9PiBgXG5cdFx0XHRcdC5hZGQoJyR7aW5kZXh9JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JHtzdWl0ZX1cblx0XHRcdFx0fSlcblx0XHRcdGApXG4gICAgICAgICAgICAuam9pbignJyl9XG5cdFx0XHRcblx0XHRcdC5vbignY3ljbGUnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRzZWxmLnBvc3RNZXNzYWdlKGV2ZW50LnRhcmdldC50b1N0cmluZygpKVxuXHRcdFx0fSlcblx0XHRcdC5vbignY29tcGxldGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5wb3N0TWVzc2FnZSgnZmluaXNoJylcblx0XHRcdH0pXG5cdFx0XHQucnVuKCk7XG5cdFx0YCwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiZXhwb3J0IGNvbnN0IGN0eCA9IHNlbGY7XG4vKipcbiAqIFJlc3BvbmQgdG8gd2luZG93IHJlcXVlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbmQodHlwZSwgY2xpZW50LCBpZCwgcGF5bG9hZCkge1xuICAgIGlmIChjbGllbnQgJiYgaWQpIHtcbiAgICAgICAgY2xpZW50LnBvc3RNZXNzYWdlKHsgaWQsIHR5cGUsIHBheWxvYWQgfSwgW10pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBtZXNzYWdlIHNvdXJjZSBhbmQgSUQgZm9yIHJlc3BvbmRpbmcnKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBidWlsZEJlbmNobWFya1NjcmlwdCwgcmVnaXN0ZXJCZW5jaG1hcmsgfSBmcm9tICcuL2V4dGVuc2lvbnMvYmVuY2htYXJrX2J1aWxkZXInO1xuaW1wb3J0IHsgY3R4LCByZXNwb25kIH0gZnJvbSAnLi9leHRlbnNpb25zL2NvbnRleHQnO1xuY29uc3QgeyBsb2cgfSA9IGNvbnNvbGU7XG4vKipcbiAqIFNlcnZpY2UgV29ya2VyIEluc3RhbGxhdGlvblxuICogUmVmOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU2VydmljZV9Xb3JrZXJfQVBJL1VzaW5nX1NlcnZpY2VfV29ya2Vyc1xuICovXG5jdHguYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIChldmVudCkgPT4ge1xuICAgIGxvZygnU2VydmljZSB3b3JrZXIgaXMgaW5zdGFsbGluZycpO1xuICAgIGV2ZW50LndhaXRVbnRpbChjdHguc2tpcFdhaXRpbmcoKSk7XG59KTtcbmN0eC5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIChldmVudCkgPT4ge1xuICAgIGxvZygnU2VydmljZSB3b3JrZXIgaXMgYWN0aXZhdGluZycpO1xuICAgIGV2ZW50LndhaXRVbnRpbChjdHguc2tpcFdhaXRpbmcoKSk7XG59KTtcbi8qKlxuICogSGFuZGxpbmcgaW5jb21pbmcgbWVzc2FnZXNcbiAqL1xuY3R4LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB7IGRhdGEsIHNvdXJjZSB9ID0gZXZlbnQ7XG4gICAgY29uc3QgbWVzc2FnZSA9IGRhdGE7XG4gICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAncmVnaXN0ZXJfYmVuY2htbWFyayc6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWQsIHBheWxvYWQgfSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICBjb25zdCBiZW5jaG1hcmtJZCA9IHJlZ2lzdGVyQmVuY2htYXJrKHBheWxvYWQpO1xuICAgICAgICAgICAgcmVzcG9uZCgnYmVuY2htYXJrX3JlZ2lzdGVyZWQnLCBzb3VyY2UsIGlkLCBiZW5jaG1hcmtJZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbG9nKCdVbmtub3duIG1lc3NhZ2UgdHlwZTonLCBtZXNzYWdlLnR5cGUpO1xuICAgIH1cbn0pO1xuLyoqXG4gKiBJbnRlcmNlcHRpb24gb2YgYnJvd3NlciByZXF1ZXN0c1xuICogUmVmOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmV0Y2hFdmVudFxuICovXG5jdHguYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB7IHJlcXVlc3Q6IHsgdXJsIH0sIH0gPSBldmVudDtcbiAgICBpZiAodXJsLmluY2x1ZGVzKCcvYmVuY2htYXJrLycpKSB7XG4gICAgICAgIGV2ZW50LnJlc3BvbmRXaXRoKGJ1aWxkQmVuY2htYXJrU2NyaXB0KHVybC5zcGxpdCgnLycpLnBvcCgpIHx8ICcnKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBldmVudC5yZXNwb25kV2l0aChmZXRjaCh1cmwpKTtcbiAgICB9XG4gICAgLy8gY29uc3QgWywgcGF0aCwgc2NvcGVdID0gL2h0dHBbOnNdK1xcL1xcLy4qPyhcXC8oLio/KVxcLy4qJCkvLmV4ZWModXJsKSB8fCBbXVxuICAgIC8vIHN3aXRjaCAoc2NvcGUpIHtcbiAgICAvLyAgIGNhc2UgJ2JlbmNobWFyayc6XG4gICAgLy8gICAgIGV2ZW50LnJlc3BvbmRXaXRoKGJ1aWxkQmVuY2htYXJrU2NyaXB0KHBhdGguc3BsaXQoJy8nKS5wb3AoKSB8fCAnJykpXG4gICAgLy8gICAgIGJyZWFrXG4gICAgLy8gICBkZWZhdWx0OlxuICAgIC8vICAgICBldmVudC5yZXNwb25kV2l0aChmZXRjaCh1cmwpKVxuICAgIC8vIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==