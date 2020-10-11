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
    const [, path, scope] = /http[:s]+\/\/.*?(\/(.*?)\/.*$)/.exec(url) || [];
    switch (scope) {
        case 'benchmark':
            event.respondWith(Object(_extensions_benchmark_builder__WEBPACK_IMPORTED_MODULE_0__["buildBenchmarkScript"])(path.split('/').pop() || ''));
            break;
        default:
            event.respondWith(fetch(url));
    }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2VyL2V4dGVuc2lvbnMvYmVuY2htYXJrX2J1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci9leHRlbnNpb25zL2NvbnRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtlci9zZXJ2aWNlX3dvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUNPO0FBQ1A7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQUE7QUFBQTtBQUFBO0FBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtEQUFVLEdBQUc7QUFDaEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsbUNBQW1DLGNBQWM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBeUY7QUFDckM7QUFDcEQsT0FBTyxNQUFNO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBRztBQUNIO0FBQ0Esb0JBQW9CLHVEQUFHO0FBQ3ZCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx1REFBRztBQUNILFdBQVcsZUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQyxnQ0FBZ0MsdUZBQWlCO0FBQ2pELFlBQVksbUVBQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFHO0FBQ0gsV0FBVyxXQUFXLE1BQU0sR0FBRztBQUMvQjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsMEZBQW9CO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJzdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvd29ya2VyL3NlcnZpY2Vfd29ya2VyLnRzXCIpO1xuIiwiY29uc3QgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSWQobGVuZ3RoID0gMTApIHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gY2hhcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCAtIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB7IGdlbmVyYXRlSWQgfSBmcm9tICdoZWxwZXJzL2RhdGEnO1xuY29uc3QgbGliUHJvbWlzZSA9IFByb21pc2UuYWxsKFtcbiAgICBmZXRjaCgnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvbG9kYXNoLmpzLzQuMTcuMjAvbG9kYXNoLm1pbi5qcycpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpLFxuICAgIGZldGNoKCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9wbGF0Zm9ybS8xLjMuNi9wbGF0Zm9ybS5taW4uanMnKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKSxcbiAgICBmZXRjaCgnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYmVuY2htYXJrLzIuMS40L2JlbmNobWFyay5taW4uanMnKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKSxcbl0pO1xuY29uc3QgYmVuY2htYXJrcyA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGdlbmVyYXRlQmVuY2htYXJrSWQoKSB7XG4gICAgcmV0dXJuIGBibmNoXyR7Z2VuZXJhdGVJZCgpfWA7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJCZW5jaG1hcmsocmVxdWVzdCkge1xuICAgIGNvbnN0IGlkID0gZ2VuZXJhdGVCZW5jaG1hcmtJZCgpO1xuICAgIGJlbmNobWFya3Muc2V0KGlkLCByZXF1ZXN0KTtcbiAgICByZXR1cm4gaWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRCZW5jaG1hcmtTY3JpcHQoaWQpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gYmVuY2htYXJrcy5nZXQoaWQpO1xuICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgfVxuICAgIGJlbmNobWFya3MuZGVsZXRlKGlkKTtcbiAgICByZXR1cm4gbGliUHJvbWlzZS50aGVuKChsaWJDb2RlKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoYFxuXHRcdFx0JHtsaWJDb2RlLmpvaW4oJ1xcbicpfVxuXHRcdFx0JHtyZXF1ZXN0LnNldHVwQ29kZX1cblx0XHRcdGNvbnN0IHN1aXRlID0gbmV3IEJlbmNobWFyay5TdWl0ZTtcblxuXHRcdFx0c3VpdGVcblx0XHRcdCR7cmVxdWVzdC5zdWl0ZXNcbiAgICAgICAgICAgIC5tYXAoKHN1aXRlLCBpbmRleCkgPT4gYFxuXHRcdFx0XHQuYWRkKCcke2luZGV4fScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCR7c3VpdGV9XG5cdFx0XHRcdH0pXG5cdFx0XHRgKVxuICAgICAgICAgICAgLmpvaW4oJycpfVxuXHRcdFx0XG5cdFx0XHQub24oJ2N5Y2xlJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0c2VsZi5wb3N0TWVzc2FnZShldmVudC50YXJnZXQudG9TdHJpbmcoKSlcblx0XHRcdH0pXG5cdFx0XHQub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYucG9zdE1lc3NhZ2UoJ2ZpbmlzaCcpXG5cdFx0XHR9KVxuXHRcdFx0LnJ1bigpO1xuXHRcdGAsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBjdHggPSBzZWxmO1xuLyoqXG4gKiBSZXNwb25kIHRvIHdpbmRvdyByZXF1ZXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNwb25kKHR5cGUsIGNsaWVudCwgaWQsIHBheWxvYWQpIHtcbiAgICBpZiAoY2xpZW50ICYmIGlkKSB7XG4gICAgICAgIGNsaWVudC5wb3N0TWVzc2FnZSh7IGlkLCB0eXBlLCBwYXlsb2FkIH0sIFtdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbWVzc2FnZSBzb3VyY2UgYW5kIElEIGZvciByZXNwb25kaW5nJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgYnVpbGRCZW5jaG1hcmtTY3JpcHQsIHJlZ2lzdGVyQmVuY2htYXJrIH0gZnJvbSAnLi9leHRlbnNpb25zL2JlbmNobWFya19idWlsZGVyJztcbmltcG9ydCB7IGN0eCwgcmVzcG9uZCB9IGZyb20gJy4vZXh0ZW5zaW9ucy9jb250ZXh0JztcbmNvbnN0IHsgbG9nIH0gPSBjb25zb2xlO1xuLyoqXG4gKiBTZXJ2aWNlIFdvcmtlciBJbnN0YWxsYXRpb25cbiAqIFJlZjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1NlcnZpY2VfV29ya2VyX0FQSS9Vc2luZ19TZXJ2aWNlX1dvcmtlcnNcbiAqL1xuY3R4LmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCAoZXZlbnQpID0+IHtcbiAgICBsb2coJ1NlcnZpY2Ugd29ya2VyIGlzIGluc3RhbGxpbmcnKTtcbiAgICBldmVudC53YWl0VW50aWwoY3R4LnNraXBXYWl0aW5nKCkpO1xufSk7XG4vKipcbiAqIEhhbmRsaW5nIGluY29taW5nIG1lc3NhZ2VzXG4gKi9cbmN0eC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBzb3VyY2UgfSA9IGV2ZW50O1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhO1xuICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3JlZ2lzdGVyX2JlbmNobW1hcmsnOiB7XG4gICAgICAgICAgICBjb25zdCB7IGlkLCBwYXlsb2FkIH0gPSBtZXNzYWdlO1xuICAgICAgICAgICAgY29uc3QgYmVuY2htYXJrSWQgPSByZWdpc3RlckJlbmNobWFyayhwYXlsb2FkKTtcbiAgICAgICAgICAgIHJlc3BvbmQoJ2JlbmNobWFya19yZWdpc3RlcmVkJywgc291cmNlLCBpZCwgYmVuY2htYXJrSWQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGxvZygnVW5rbm93biBtZXNzYWdlIHR5cGU6JywgbWVzc2FnZS50eXBlKTtcbiAgICB9XG59KTtcbi8qKlxuICogSW50ZXJjZXB0aW9uIG9mIGJyb3dzZXIgcmVxdWVzdHNcbiAqIFJlZjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ZldGNoRXZlbnRcbiAqL1xuY3R4LmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgeyByZXF1ZXN0OiB7IHVybCB9LCB9ID0gZXZlbnQ7XG4gICAgY29uc3QgWywgcGF0aCwgc2NvcGVdID0gL2h0dHBbOnNdK1xcL1xcLy4qPyhcXC8oLio/KVxcLy4qJCkvLmV4ZWModXJsKSB8fCBbXTtcbiAgICBzd2l0Y2ggKHNjb3BlKSB7XG4gICAgICAgIGNhc2UgJ2JlbmNobWFyayc6XG4gICAgICAgICAgICBldmVudC5yZXNwb25kV2l0aChidWlsZEJlbmNobWFya1NjcmlwdChwYXRoLnNwbGl0KCcvJykucG9wKCkgfHwgJycpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZXZlbnQucmVzcG9uZFdpdGgoZmV0Y2godXJsKSk7XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9