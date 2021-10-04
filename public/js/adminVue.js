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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "IncredibleOffers",
  data: function data() {
    return {
      productWarranty: {
        data: []
      },
      page: 1,
      formValue: {
        price1: '',
        price2: '',
        product_number: '',
        product_number_cart: ''
      },
      date1: '',
      date2: '',
      options: {
        numeral: true
      },
      product_warranty_id: '',
      selected_key: '',
      show_modal: true,
      search_value: '',
      show_delete_confirm: false,
      validation_errors: {
        price1: false,
        price2: false,
        product_number: false,
        product_number_cart: false,
        date1: false,
        date2: false
      },
      input_labels: {
        price1: 'هزینه محصول',
        price2: 'هزینه محصول برای فروش',
        product_number: 'تعداد موجودی محصول',
        product_number_cart: 'تعداد قابل سفارش در سبد خرید',
        date1: 'زمان شروع تخفیف',
        date2: 'زمان پایان تخفیف'
      },
      server_validation_error: false
    };
  },
  mounted: function mounted() {
    this.get_product_warranty(1);
  },
  methods: {
    get_product_warranty: function get_product_warranty(page) {
      var _this = this;

      this.page = page;
      var url = this.$siteUrl + 'admin/ajax/product-warranty?page=' + page + '&search=' + this.search_value;
      this.axios.get(url).then(function (response) {
        _this.productWarranty = response.data;
      });
    },
    show_select_product_modal: function show_select_product_modal(id, key) {
      this.server_validation_error = false;
      this.product_warranty_id = id;
      this.selected_key = key;
      this.formValue.price1 = this.productWarranty.data[key].price1;
      this.formValue.price2 = this.productWarranty.data[key].price2;
      this.formValue.product_number = this.productWarranty.data[key].product_number;
      this.formValue.product_number_cart = this.productWarranty.data[key].product_number_cart;
      this.date1 = this.productWarranty.data[this.selected_key].offers_start_date != null ? this.productWarranty.data[this.selected_key].offers_start_date : '';
      this.date2 = this.productWarranty.data[this.selected_key].offers_end_date != null ? this.productWarranty.data[this.selected_key].offers_end_date : '';
      $('#show_product_modal').modal('show');
    },
    add: function add() {
      var _this2 = this;

      this.date1 = $("#pcal1").val();
      this.date2 = $("#pcal2").val();
      var validation = this.validationForm();

      if (validation) {
        var formData = new FormData();
        formData.append('price1', this.formValue.price1);
        formData.append('price2', this.formValue.price2);
        formData.append('product_number', this.formValue.product_number);
        formData.append('product_number_cart', this.formValue.product_number_cart);
        formData.append('start_date', this.date1);
        formData.append('end_date', this.date2);
        var url = this.$siteUrl + 'admin/incredible-offers/add/' + this.product_warranty_id;
        this.axios.post(url, formData).then(function (response) {
          if (response.data == 'success') {
            _this2.productWarranty.data[_this2.selected_key].is_offer = 1;
            _this2.productWarranty.data[_this2.selected_key].price1 = _this2.formValue.price1;
            _this2.productWarranty.data[_this2.selected_key].price2 = _this2.formValue.price2;
            _this2.productWarranty.data[_this2.selected_key].product_number = _this2.formValue.product_number;
            _this2.productWarranty.data[_this2.selected_key].product_number_cart = _this2.formValue.product_number_cart;
            _this2.productWarranty.data[_this2.selected_key].offers_start_date = _this2.date1;
            _this2.productWarranty.data[_this2.selected_key].offers_end_date = _this2.date2;
            $('#show_product_modal').modal('hide');
          } else if (response.data.type == 'server_error') {
            _this2.server_validation_error = response.data.errors;
          }
        });
      }
    },
    delete_offer: function delete_offer(id, key) {
      this.product_warranty_id = id;
      this.selected_key = key;
      $('#delete_ofer_confirm').modal('show');
    },
    delete_offer_request: function delete_offer_request() {
      var _this3 = this;

      var url = this.$siteUrl + 'admin/incredible-offers/delete/' + this.product_warranty_id;
      this.axios.post(url).then(function (response) {
        if (response.data != 'error') {
          $('#delete_ofer_confirm').modal('hide');
          _this3.productWarranty.data[_this3.selected_key].is_offer = 0;
          _this3.productWarranty.data[_this3.selected_key].price1 = response.data.price1;
          _this3.productWarranty.data[_this3.selected_key].price2 = response.data.price2;
          _this3.productWarranty.data[_this3.selected_key].product_number = response.data.product_number;
          _this3.productWarranty.data[_this3.selected_key].product_number_cart = response.data.product_number_cart;
          _this3.productWarranty.data[_this3.selected_key].offers_start_date = '';
          _this3.productWarranty.data[_this3.selected_key].offers_end_date = '';
        }
      });
    },
    validationForm: function validationForm() {
      var hasNotError = true;

      for (var input in this.formValue) {
        if (this.formValue[input] == '' || this.formValue[input] == null) {
          this.validation_errors[input] = this.input_labels[input] + ' نمی تواند خالی باشد';
          hasNotError = false;
        }
      }

      if (this.date1 == '' || this.date1 == null) {
        this.validation_errors.date1 = this.input_labels.date1 + ' نمی تواند خالی باشد';
        hasNotError = false;
      }

      if (this.date2 == '' || this.date2 == null) {
        this.validation_errors.date2 = this.input_labels.date2 + ' نمی تواند خالی باشد';
        hasNotError = false;
      }

      return hasNotError;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OrderSteps.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/OrderSteps.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "OrderSteps",
  props: ['status', 'order_statuses', 'order_info_id'],
  mounted: function mounted() {
    this.sendStatus = this.status;
  },
  data: function data() {
    return {
      sendStatus: 0,
      changeToStatus: 0
    };
  },
  methods: {
    changeOrderStatus: function changeOrderStatus(key) {
      this.changeToStatus = key;
      $("#changeStep").modal('show');
    },
    confirmChangeStatus: function confirmChangeStatus() {
      var _this = this;

      var url = this.$siteUrl + 'admin/orders/status/update';
      var data = new FormData();
      data.append('status', this.changeToStatus);
      data.append('order_info_id', this.order_info_id);
      this.axios.post(url, data).then(function (response) {
        if (response.data != 'error') {
          $("#changeStep").modal('hide');
          _this.sendStatus = _this.changeToStatus;
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SaleReport.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SaleReport.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var highcharts_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! highcharts-vue */ "./node_modules/highcharts-vue/dist/highcharts-vue.min.js");
/* harmony import */ var highcharts_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(highcharts_vue__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "SaleReport",
  components: {
    highcharts: highcharts_vue__WEBPACK_IMPORTED_MODULE_0__["Chart"]
  },
  props: ['product_id'],
  data: function data() {
    return {
      requested: false,
      chartOptions: {
        series: [{
          data: [],
          color: '#fb3449',
          dataLabels: {
            enabled: true,
            color: 'rgb(0,0,0)',
            formatter: function formatter() {
              return number_format(this.y);
            },
            rotation: -90,
            align: 'right',
            y: 10
          }
        }],
        legend: {
          enabled: false
        },
        title: {
          text: ''
        },
        chart: {
          type: 'column',
          style: {
            fontFamily: 'IRANSans'
          }
        },
        xAxis: {
          type: 'category' //برای نمایش اسم ماه ها

        },
        yAxis: {
          title: {
            text: 'قیمت'
          },
          labels: {
            useHTML: true,
            formatter: function formatter() {
              return '<div class="chart_price" dir="rtl"><span>' + number_format(this.value) + '</span><span class="chart_tooman"> تومان</span></div>';
            }
          }
        },
        tooltip: {
          useHTML: true,
          formatter: function formatter() {
            return '<div class="c_chart_tooltip">' + '<p>میزان فروش در <span>' + getMonthName(this.x) + '</span></p>' + '<div dir="rtl"><b>' + number_format(this.y) + '</b><span>تومان</span></div>' + '</div>';
          }
        }
      },
      commissionOptions: {
        series: [{
          data: [],
          color: '#00bfd6',
          dataLabels: {
            enabled: true,
            color: 'rgb(0,0,0)',
            formatter: function formatter() {
              return number_format(this.y);
            },
            rotation: -90,
            align: 'right',
            y: 10
          }
        }],
        legend: {
          enabled: false
        },
        title: {
          text: ''
        },
        chart: {
          type: 'column',
          style: {
            fontFamily: 'IRANSans'
          }
        },
        xAxis: {
          type: 'category' //برای نمایش اسم ماه ها

        },
        yAxis: {
          title: {
            text: 'قیمت'
          },
          labels: {
            useHTML: true,
            formatter: function formatter() {
              return '<div class="chart_price" dir="rtl"><span>' + number_format(this.value) + '</span><span class="chart_tooman"> تومان</span></div>';
            }
          }
        },
        tooltip: {
          useHTML: true,
          formatter: function formatter() {
            return '<div class="c_chart_tooltip">' + '<p>میزان کمیسیون دریافتی در <span>' + getMonthName(this.x) + '</span></p>' + '<div dir="rtl"><b>' + number_format(this.y) + '</b><span>تومان</span></div>' + '</div>';
          }
        }
      },
      selected_year: '',
      yearList: [],
      monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      total_sale: 0,
      total_commission: 0,
      selected_sale: 0,
      selected_commission: 0,
      url: ''
    };
  },
  mounted: function mounted() {
    if (this.product_id != undefined) {
      this.url = this.$siteUrl + 'admin/report/product-sale/get-data?selected_year=' + this.selected_year + '&product_id=' + this.product_id;
    } else {
      this.url = this.$siteUrl + 'admin/report/overall-sale/get-data?selected_year=' + this.selected_year;
    }

    this.getChartData();
  },
  methods: {
    getChartData: function getChartData() {
      var _this = this;

      if (!this.requested) {
        $("#loading_box").show();
        this.axios.get(this.url).then(function (response) {
          $("#loading_box").hide();
          _this.yearList = response.data.year_list;
          var app = _this;
          console.log(response.data); //با هر بار دریافت اطلاعات، دیتای چارت را پاک می کنیم تا دوباره پر کنیم

          _this.chartOptions.series[0].data = [];
          _this.commissionOptions.series[0].data = [];
          var sales = response.data.sales;
          _this.total_sale = response.data.total_sale;
          _this.total_commission = response.data.total_commission;
          _this.selected_sale = response.data.selected_sale;
          _this.selected_commission = response.data.selected_commission;

          if (sales) {
            sales.forEach(function (row, key) {
              if (key != 0) {
                app.chartOptions.series[0].data.push([app.getMonthName(key), row]);
              }
            });
          }

          var commissions = response.data.commissions;

          if (commissions) {
            commissions.forEach(function (row, key) {
              if (key != 0) {
                app.commissionOptions.series[0].data.push([app.getMonthName(key), row]);
              }
            });
          }

          _this.$nextTick(function () {
            $(this.$refs.yearList).selectpicker('refresh');
          });
        })["catch"](function (error) {});
      }
    },
    number_format: function number_format(number) {
      return new Intl.NumberFormat('fa').format(number);
    },
    getMonthName: function getMonthName(key) {
      key = key - 1;
      return this.monthNames[key];
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomInput.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StockroomInput.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "StockroomInput",
  props: ['stockrooms'],
  data: function data() {
    return {
      stockroomId: 0,
      description: '',
      productList: {
        data: []
      },
      searchText: '',
      productCount: [],
      selectedProducts: [],
      errors: [],
      serverError: ''
    };
  },
  mounted: function mounted() {
    if (this.productList.data.length < 1) {
      this.getProductWarranty(1);
    }
  },
  methods: {
    getProductWarranty: function getProductWarranty(page) {
      var _this = this;

      var url = this.$siteUrl + 'admin/stockrooms/input/get-products?page=' + page + '&search=' + this.searchText;
      this.axios.get(url).then(function (response) {
        for (var i = 0; i < response.data.data.length; i++) {
          _this.productCount[i] = response.data.data[i].product_number;
        }

        _this.productList = response.data;
      })["catch"](function (error) {});
    },
    checkInList: function checkInList(id) {
      var result = false;
      this.selectedProducts.forEach(function (row) {
        if (row.id == id) {
          result = true;
        }
      });
      return result;
    },
    addToSelectedProduct: function addToSelectedProduct(id, key) {
      if (parseInt(this.productCount[key]) > 0) {
        var item = this.productList.data[key];
        item.product_number = this.productCount[key];
        this.selectedProducts.push(item);
        console.log(this.selectedProducts);
      }
    },
    removeFromSelectedList: function removeFromSelectedList(key) {
      this.$delete(this.selectedProducts, key);
    },
    sendData: function sendData() {
      var _this2 = this;

      var validation = this.validation();

      if (validation) {
        var list = this.createList();
        var formData = new FormData();
        formData.append('list', list);
        formData.append('stockroom_id', this.stockroomId);
        formData.append('description', this.description);
        var url = this.$siteUrl + 'admin/stockrooms/add-input';
        this.axios.post(url, formData).then(function (response) {
          if (response.data === 'success') {
            _this2.serverError = '';
            window.location = _this2.$siteUrl + 'admin/stockrooms/input/events';
          } else {
            _this2.serverError = 'خطایی در ثبت اطلاعات رخ داده است. مجددا تلاش کنید';
          }
        })["catch"](function (error) {
          _this2.serverError = 'خطایی در ثبت اطلاعات رخ داده است. مجددا تلاش کنید';
        });
      }
    },
    validation: function validation() {
      var result = true;
      this.errors = [];

      if (this.stockroomId == 0) {
        this.errors.push('لطفا انبار مورد نظر خود را انتخاب کنید');
        result = false;
      }

      if (this.selectedProducts.length === 0) {
        this.errors.push('لطفا محصولاتی که می خواهید به انبار اضافه شوند را انتخاب کنید');
        result = false;
      }

      return result;
    },
    createList: function createList() {
      var string = '';
      this.selectedProducts.forEach(function (row) {
        string = string + row.id + '_' + row.product_number + '-';
      });
      return string;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomOutput.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StockroomOutput.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "StockroomOutput",
  props: ['stockrooms'],
  data: function data() {
    return {
      stockroomId: 0,
      description: '',
      productList: {
        data: []
      },
      searchText: '',
      productCount: [],
      selectedProducts: [],
      errors: [],
      serverError: ''
    };
  },
  mounted: function mounted() {
    if (this.productList.data.length < 1) {
      this.getProductWarranty(1);
    }
  },
  methods: {
    getProductWarranty: function getProductWarranty(page) {
      var _this = this;

      var url = this.$siteUrl + 'admin/stockrooms/output/get-products?page=' + page + '&stockroom_id=' + this.stockroomId + '&search=' + this.searchText;
      this.axios.get(url).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.data.data.length; i++) {
          _this.productCount[i] = response.data.data[i].product_count;
        }

        _this.productList = response.data;
      })["catch"](function (error) {});
    },
    checkInList: function checkInList(id) {
      var result = false;
      this.selectedProducts.forEach(function (row) {
        if (row.id == id) {
          result = true;
        }
      });
      return result;
    },
    addToSelectedProduct: function addToSelectedProduct(id, key) {
      if (parseInt(this.productCount[key]) > 0) {
        var item = this.productList.data[key];
        item.product_number = this.productCount[key];
        this.selectedProducts.push(item);
        console.log(this.selectedProducts);
      }
    },
    removeFromSelectedList: function removeFromSelectedList(key) {
      this.$delete(this.selectedProducts, key);
    },
    sendData: function sendData() {
      var _this2 = this;

      var validation = this.validation();

      if (validation) {
        var list = this.createList();
        var formData = new FormData();
        formData.append('list', list);
        formData.append('stockroom_id', this.stockroomId);
        formData.append('description', this.description);
        formData.append('type', 'output');
        var url = this.$siteUrl + 'admin/stockrooms/add-input';
        this.axios.post(url, formData).then(function (response) {
          if (response.data === 'success') {
            _this2.serverError = '';
            window.location = _this2.$siteUrl + 'admin/stockrooms/output/events';
          } else {
            _this2.serverError = 'خطایی در ثبت اطلاعات رخ داده است. مجددا تلاش کنید';
          }
        })["catch"](function (error) {
          _this2.serverError = 'خطایی در ثبت اطلاعات رخ داده است. مجددا تلاش کنید';
        });
      }
    },
    validation: function validation() {
      var result = true;
      this.errors = [];

      if (this.stockroomId == 0) {
        this.errors.push('لطفا انبار مورد نظر خود را انتخاب کنید');
        result = false;
      }

      if (this.selectedProducts.length === 0) {
        this.errors.push('لطفا محصولاتی که می خواهید به انبار اضافه شوند را انتخاب کنید');
        result = false;
      }

      return result;
    },
    createList: function createList() {
      var string = '';
      this.selectedProducts.forEach(function (row) {
        string = string + row.get_product_warranty.id + '_' + row.product_count + '-';
      });
      console.log(string);
      return string;
    }
  },
  watch: {
    stockroomId: function stockroomId() {
      this.getProductWarranty(1);
    }
  }
});

/***/ }),

/***/ "./node_modules/cleave.js/dist/cleave-esm.js":
/*!***************************************************!*\
  !*** ./node_modules/cleave.js/dist/cleave-esm.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var NumeralFormatter = function (numeralDecimalMark,
                                 numeralIntegerScale,
                                 numeralDecimalScale,
                                 numeralThousandsGroupStyle,
                                 numeralPositiveOnly,
                                 stripLeadingZeroes,
                                 prefix,
                                 signBeforePrefix,
                                 tailPrefix,
                                 delimiter) {
    var owner = this;

    owner.numeralDecimalMark = numeralDecimalMark || '.';
    owner.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0;
    owner.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
    owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
    owner.numeralPositiveOnly = !!numeralPositiveOnly;
    owner.stripLeadingZeroes = stripLeadingZeroes !== false;
    owner.prefix = (prefix || prefix === '') ? prefix : '';
    owner.signBeforePrefix = !!signBeforePrefix;
    owner.tailPrefix = !!tailPrefix;
    owner.delimiter = (delimiter || delimiter === '') ? delimiter : ',';
    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';
};

NumeralFormatter.groupStyle = {
    thousand: 'thousand',
    lakh:     'lakh',
    wan:      'wan',
    none:     'none'    
};

NumeralFormatter.prototype = {
    getRawValue: function (value) {
        return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
    },

    format: function (value) {
        var owner = this, parts, partSign, partSignAndPrefix, partInteger, partDecimal = '';

        // strip alphabet letters
        value = value.replace(/[A-Za-z]/g, '')
            // replace the first decimal mark with reserved placeholder
            .replace(owner.numeralDecimalMark, 'M')

            // strip non numeric letters except minus and "M"
            // this is to ensure prefix has been stripped
            .replace(/[^\dM-]/g, '')

            // replace the leading minus with reserved placeholder
            .replace(/^\-/, 'N')

            // strip the other minus sign (if present)
            .replace(/\-/g, '')

            // replace the minus sign (if present)
            .replace('N', owner.numeralPositiveOnly ? '' : '-')

            // replace decimal mark
            .replace('M', owner.numeralDecimalMark);

        // strip any leading zeros
        if (owner.stripLeadingZeroes) {
            value = value.replace(/^(-)?0+(?=\d)/, '$1');
        }

        partSign = value.slice(0, 1) === '-' ? '-' : '';
        if (typeof owner.prefix != 'undefined') {
            if (owner.signBeforePrefix) {
                partSignAndPrefix = partSign + owner.prefix;
            } else {
                partSignAndPrefix = owner.prefix + partSign;
            }
        } else {
            partSignAndPrefix = partSign;
        }
        
        partInteger = value;

        if (value.indexOf(owner.numeralDecimalMark) >= 0) {
            parts = value.split(owner.numeralDecimalMark);
            partInteger = parts[0];
            partDecimal = owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale);
        }

        if(partSign === '-') {
            partInteger = partInteger.slice(1);
        }

        if (owner.numeralIntegerScale > 0) {
          partInteger = partInteger.slice(0, owner.numeralIntegerScale);
        }

        switch (owner.numeralThousandsGroupStyle) {
        case NumeralFormatter.groupStyle.lakh:
            partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + owner.delimiter);

            break;

        case NumeralFormatter.groupStyle.wan:
            partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, '$1' + owner.delimiter);

            break;

        case NumeralFormatter.groupStyle.thousand:
            partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + owner.delimiter);

            break;
        }

        if (owner.tailPrefix) {
            return partSign + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '') + owner.prefix;
        }

        return partSignAndPrefix + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '');
    }
};

var NumeralFormatter_1 = NumeralFormatter;

var DateFormatter = function (datePattern, dateMin, dateMax) {
    var owner = this;

    owner.date = [];
    owner.blocks = [];
    owner.datePattern = datePattern;
    owner.dateMin = dateMin
      .split('-')
      .reverse()
      .map(function(x) {
        return parseInt(x, 10);
      });
    if (owner.dateMin.length === 2) owner.dateMin.unshift(0);

    owner.dateMax = dateMax
      .split('-')
      .reverse()
      .map(function(x) {
        return parseInt(x, 10);
      });
    if (owner.dateMax.length === 2) owner.dateMax.unshift(0);
    
    owner.initBlocks();
};

DateFormatter.prototype = {
    initBlocks: function () {
        var owner = this;
        owner.datePattern.forEach(function (value) {
            if (value === 'Y') {
                owner.blocks.push(4);
            } else {
                owner.blocks.push(2);
            }
        });
    },

    getISOFormatDate: function () {
        var owner = this,
            date = owner.date;

        return date[2] ? (
            date[2] + '-' + owner.addLeadingZero(date[1]) + '-' + owner.addLeadingZero(date[0])
        ) : '';
    },

    getBlocks: function () {
        return this.blocks;
    },

    getValidatedDate: function (value) {
        var owner = this, result = '';

        value = value.replace(/[^\d]/g, '');

        owner.blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    sub0 = sub.slice(0, 1),
                    rest = value.slice(length);

                switch (owner.datePattern[index]) {
                case 'd':
                    if (sub === '00') {
                        sub = '01';
                    } else if (parseInt(sub0, 10) > 3) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > 31) {
                        sub = '31';
                    }

                    break;

                case 'm':
                    if (sub === '00') {
                        sub = '01';
                    } else if (parseInt(sub0, 10) > 1) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > 12) {
                        sub = '12';
                    }

                    break;
                }

                result += sub;

                // update remaining string
                value = rest;
            }
        });

        return this.getFixedDateString(result);
    },

    getFixedDateString: function (value) {
        var owner = this, datePattern = owner.datePattern, date = [],
            dayIndex = 0, monthIndex = 0, yearIndex = 0,
            dayStartIndex = 0, monthStartIndex = 0, yearStartIndex = 0,
            day, month, year, fullYearDone = false;

        // mm-dd || dd-mm
        if (value.length === 4 && datePattern[0].toLowerCase() !== 'y' && datePattern[1].toLowerCase() !== 'y') {
            dayStartIndex = datePattern[0] === 'd' ? 0 : 2;
            monthStartIndex = 2 - dayStartIndex;
            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);

            date = this.getFixedDate(day, month, 0);
        }

        // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
        if (value.length === 8) {
            datePattern.forEach(function (type, index) {
                switch (type) {
                case 'd':
                    dayIndex = index;
                    break;
                case 'm':
                    monthIndex = index;
                    break;
                default:
                    yearIndex = index;
                    break;
                }
            });

            yearStartIndex = yearIndex * 2;
            dayStartIndex = (dayIndex <= yearIndex) ? dayIndex * 2 : (dayIndex * 2 + 2);
            monthStartIndex = (monthIndex <= yearIndex) ? monthIndex * 2 : (monthIndex * 2 + 2);

            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

            date = this.getFixedDate(day, month, year);
        }

        // mm-yy || yy-mm
        if (value.length === 4 && (datePattern[0] === 'y' || datePattern[1] === 'y')) {
            monthStartIndex = datePattern[0] === 'm' ? 0 : 2;
            yearStartIndex = 2 - monthStartIndex;
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 2), 10);

            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 2).length === 2;

            date = [0, month, year];
        }

        // mm-yyyy || yyyy-mm
        if (value.length === 6 && (datePattern[0] === 'Y' || datePattern[1] === 'Y')) {
            monthStartIndex = datePattern[0] === 'm' ? 0 : 4;
            yearStartIndex = 2 - 0.5 * monthStartIndex;
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

            date = [0, month, year];
        }

        date = owner.getRangeFixedDate(date);
        owner.date = date;

        var result = date.length === 0 ? value : datePattern.reduce(function (previous, current) {
            switch (current) {
            case 'd':
                return previous + (date[0] === 0 ? '' : owner.addLeadingZero(date[0]));
            case 'm':
                return previous + (date[1] === 0 ? '' : owner.addLeadingZero(date[1]));
            case 'y':
                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], false) : '');
            case 'Y':
                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], true) : '');
            }
        }, '');

        return result;
    },

    getRangeFixedDate: function (date) {
        var owner = this,
            datePattern = owner.datePattern,
            dateMin = owner.dateMin || [],
            dateMax = owner.dateMax || [];

        if (!date.length || (dateMin.length < 3 && dateMax.length < 3)) return date;

        if (
          datePattern.find(function(x) {
            return x.toLowerCase() === 'y';
          }) &&
          date[2] === 0
        ) return date;

        if (dateMax.length && (dateMax[2] < date[2] || (
          dateMax[2] === date[2] && (dateMax[1] < date[1] || (
            dateMax[1] === date[1] && dateMax[0] < date[0]
          ))
        ))) return dateMax;

        if (dateMin.length && (dateMin[2] > date[2] || (
          dateMin[2] === date[2] && (dateMin[1] > date[1] || (
            dateMin[1] === date[1] && dateMin[0] > date[0]
          ))
        ))) return dateMin;

        return date;
    },

    getFixedDate: function (day, month, year) {
        day = Math.min(day, 31);
        month = Math.min(month, 12);
        year = parseInt((year || 0), 10);

        if ((month < 7 && month % 2 === 0) || (month > 8 && month % 2 === 1)) {
            day = Math.min(day, month === 2 ? (this.isLeapYear(year) ? 29 : 28) : 30);
        }

        return [day, month, year];
    },

    isLeapYear: function (year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    },

    addLeadingZero: function (number) {
        return (number < 10 ? '0' : '') + number;
    },

    addLeadingZeroForYear: function (number, fullYearMode) {
        if (fullYearMode) {
            return (number < 10 ? '000' : (number < 100 ? '00' : (number < 1000 ? '0' : ''))) + number;
        }

        return (number < 10 ? '0' : '') + number;
    }
};

var DateFormatter_1 = DateFormatter;

var TimeFormatter = function (timePattern, timeFormat) {
    var owner = this;

    owner.time = [];
    owner.blocks = [];
    owner.timePattern = timePattern;
    owner.timeFormat = timeFormat;
    owner.initBlocks();
};

TimeFormatter.prototype = {
    initBlocks: function () {
        var owner = this;
        owner.timePattern.forEach(function () {
            owner.blocks.push(2);
        });
    },

    getISOFormatTime: function () {
        var owner = this,
            time = owner.time;

        return time[2] ? (
            owner.addLeadingZero(time[0]) + ':' + owner.addLeadingZero(time[1]) + ':' + owner.addLeadingZero(time[2])
        ) : '';
    },

    getBlocks: function () {
        return this.blocks;
    },

    getTimeFormatOptions: function () {
        var owner = this;
        if (String(owner.timeFormat) === '12') {
            return {
                maxHourFirstDigit: 1,
                maxHours: 12,
                maxMinutesFirstDigit: 5,
                maxMinutes: 60
            };
        }

        return {
            maxHourFirstDigit: 2,
            maxHours: 23,
            maxMinutesFirstDigit: 5,
            maxMinutes: 60
        };
    },

    getValidatedTime: function (value) {
        var owner = this, result = '';

        value = value.replace(/[^\d]/g, '');

        var timeFormatOptions = owner.getTimeFormatOptions();

        owner.blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    sub0 = sub.slice(0, 1),
                    rest = value.slice(length);

                switch (owner.timePattern[index]) {

                case 'h':
                    if (parseInt(sub0, 10) > timeFormatOptions.maxHourFirstDigit) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > timeFormatOptions.maxHours) {
                        sub = timeFormatOptions.maxHours + '';
                    }

                    break;

                case 'm':
                case 's':
                    if (parseInt(sub0, 10) > timeFormatOptions.maxMinutesFirstDigit) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > timeFormatOptions.maxMinutes) {
                        sub = timeFormatOptions.maxMinutes + '';
                    }
                    break;
                }

                result += sub;

                // update remaining string
                value = rest;
            }
        });

        return this.getFixedTimeString(result);
    },

    getFixedTimeString: function (value) {
        var owner = this, timePattern = owner.timePattern, time = [],
            secondIndex = 0, minuteIndex = 0, hourIndex = 0,
            secondStartIndex = 0, minuteStartIndex = 0, hourStartIndex = 0,
            second, minute, hour;

        if (value.length === 6) {
            timePattern.forEach(function (type, index) {
                switch (type) {
                case 's':
                    secondIndex = index * 2;
                    break;
                case 'm':
                    minuteIndex = index * 2;
                    break;
                case 'h':
                    hourIndex = index * 2;
                    break;
                }
            });

            hourStartIndex = hourIndex;
            minuteStartIndex = minuteIndex;
            secondStartIndex = secondIndex;

            second = parseInt(value.slice(secondStartIndex, secondStartIndex + 2), 10);
            minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
            hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

            time = this.getFixedTime(hour, minute, second);
        }

        if (value.length === 4 && owner.timePattern.indexOf('s') < 0) {
            timePattern.forEach(function (type, index) {
                switch (type) {
                case 'm':
                    minuteIndex = index * 2;
                    break;
                case 'h':
                    hourIndex = index * 2;
                    break;
                }
            });

            hourStartIndex = hourIndex;
            minuteStartIndex = minuteIndex;

            second = 0;
            minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
            hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

            time = this.getFixedTime(hour, minute, second);
        }

        owner.time = time;

        return time.length === 0 ? value : timePattern.reduce(function (previous, current) {
            switch (current) {
            case 's':
                return previous + owner.addLeadingZero(time[2]);
            case 'm':
                return previous + owner.addLeadingZero(time[1]);
            case 'h':
                return previous + owner.addLeadingZero(time[0]);
            }
        }, '');
    },

    getFixedTime: function (hour, minute, second) {
        second = Math.min(parseInt(second || 0, 10), 60);
        minute = Math.min(minute, 60);
        hour = Math.min(hour, 60);

        return [hour, minute, second];
    },

    addLeadingZero: function (number) {
        return (number < 10 ? '0' : '') + number;
    }
};

var TimeFormatter_1 = TimeFormatter;

var PhoneFormatter = function (formatter, delimiter) {
    var owner = this;

    owner.delimiter = (delimiter || delimiter === '') ? delimiter : ' ';
    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';

    owner.formatter = formatter;
};

PhoneFormatter.prototype = {
    setFormatter: function (formatter) {
        this.formatter = formatter;
    },

    format: function (phoneNumber) {
        var owner = this;

        owner.formatter.clear();

        // only keep number and +
        phoneNumber = phoneNumber.replace(/[^\d+]/g, '');

        // strip non-leading +
        phoneNumber = phoneNumber.replace(/^\+/, 'B').replace(/\+/g, '').replace('B', '+');

        // strip delimiter
        phoneNumber = phoneNumber.replace(owner.delimiterRE, '');

        var result = '', current, validated = false;

        for (var i = 0, iMax = phoneNumber.length; i < iMax; i++) {
            current = owner.formatter.inputDigit(phoneNumber.charAt(i));

            // has ()- or space inside
            if (/[\s()-]/g.test(current)) {
                result = current;

                validated = true;
            } else {
                if (!validated) {
                    result = current;
                }
                // else: over length input
                // it turns to invalid number again
            }
        }

        // strip ()
        // e.g. US: 7161234567 returns (716) 123-4567
        result = result.replace(/[()]/g, '');
        // replace library delimiter with user customized delimiter
        result = result.replace(/[\s-]/g, owner.delimiter);

        return result;
    }
};

var PhoneFormatter_1 = PhoneFormatter;

var CreditCardDetector = {
    blocks: {
        uatp:          [4, 5, 6],
        amex:          [4, 6, 5],
        diners:        [4, 6, 4],
        discover:      [4, 4, 4, 4],
        mastercard:    [4, 4, 4, 4],
        dankort:       [4, 4, 4, 4],
        instapayment:  [4, 4, 4, 4],
        jcb15:         [4, 6, 5],
        jcb:           [4, 4, 4, 4],
        maestro:       [4, 4, 4, 4],
        visa:          [4, 4, 4, 4],
        mir:           [4, 4, 4, 4],
        unionPay:      [4, 4, 4, 4],
        general:       [4, 4, 4, 4]
    },

    re: {
        // starts with 1; 15 digits, not starts with 1800 (jcb card)
        uatp: /^(?!1800)1\d{0,14}/,

        // starts with 34/37; 15 digits
        amex: /^3[47]\d{0,13}/,

        // starts with 6011/65/644-649; 16 digits
        discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,

        // starts with 300-305/309 or 36/38/39; 14 digits
        diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,

        // starts with 51-55/2221–2720; 16 digits
        mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,

        // starts with 5019/4175/4571; 16 digits
        dankort: /^(5019|4175|4571)\d{0,12}/,

        // starts with 637-639; 16 digits
        instapayment: /^63[7-9]\d{0,13}/,

        // starts with 2131/1800; 15 digits
        jcb15: /^(?:2131|1800)\d{0,11}/,

        // starts with 2131/1800/35; 16 digits
        jcb: /^(?:35\d{0,2})\d{0,12}/,

        // starts with 50/56-58/6304/67; 16 digits
        maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,

        // starts with 22; 16 digits
        mir: /^220[0-4]\d{0,12}/,

        // starts with 4; 16 digits
        visa: /^4\d{0,15}/,

        // starts with 62/81; 16 digits
        unionPay: /^(62|81)\d{0,14}/
    },

    getStrictBlocks: function (block) {
      var total = block.reduce(function (prev, current) {
        return prev + current;
      }, 0);

      return block.concat(19 - total);
    },

    getInfo: function (value, strictMode) {
        var blocks = CreditCardDetector.blocks,
            re = CreditCardDetector.re;

        // Some credit card can have up to 19 digits number.
        // Set strictMode to true will remove the 16 max-length restrain,
        // however, I never found any website validate card number like
        // this, hence probably you don't want to enable this option.
        strictMode = !!strictMode;

        for (var key in re) {
            if (re[key].test(value)) {
                var matchedBlocks = blocks[key];
                return {
                    type: key,
                    blocks: strictMode ? this.getStrictBlocks(matchedBlocks) : matchedBlocks
                };
            }
        }

        return {
            type: 'unknown',
            blocks: strictMode ? this.getStrictBlocks(blocks.general) : blocks.general
        };
    }
};

var CreditCardDetector_1 = CreditCardDetector;

var Util = {
    noop: function () {
    },

    strip: function (value, re) {
        return value.replace(re, '');
    },

    getPostDelimiter: function (value, delimiter, delimiters) {
        // single delimiter
        if (delimiters.length === 0) {
            return value.slice(-delimiter.length) === delimiter ? delimiter : '';
        }

        // multiple delimiters
        var matchedDelimiter = '';
        delimiters.forEach(function (current) {
            if (value.slice(-current.length) === current) {
                matchedDelimiter = current;
            }
        });

        return matchedDelimiter;
    },

    getDelimiterREByDelimiter: function (delimiter) {
        return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
    },

    getNextCursorPosition: function (prevPos, oldValue, newValue, delimiter, delimiters) {
      // If cursor was at the end of value, just place it back.
      // Because new value could contain additional chars.
      if (oldValue.length === prevPos) {
          return newValue.length;
      }

      return prevPos + this.getPositionOffset(prevPos, oldValue, newValue, delimiter ,delimiters);
    },

    getPositionOffset: function (prevPos, oldValue, newValue, delimiter, delimiters) {
        var oldRawValue, newRawValue, lengthOffset;

        oldRawValue = this.stripDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
        newRawValue = this.stripDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
        lengthOffset = oldRawValue.length - newRawValue.length;

        return (lengthOffset !== 0) ? (lengthOffset / Math.abs(lengthOffset)) : 0;
    },

    stripDelimiters: function (value, delimiter, delimiters) {
        var owner = this;

        // single delimiter
        if (delimiters.length === 0) {
            var delimiterRE = delimiter ? owner.getDelimiterREByDelimiter(delimiter) : '';

            return value.replace(delimiterRE, '');
        }

        // multiple delimiters
        delimiters.forEach(function (current) {
            current.split('').forEach(function (letter) {
                value = value.replace(owner.getDelimiterREByDelimiter(letter), '');
            });
        });

        return value;
    },

    headStr: function (str, length) {
        return str.slice(0, length);
    },

    getMaxLength: function (blocks) {
        return blocks.reduce(function (previous, current) {
            return previous + current;
        }, 0);
    },

    // strip prefix
    // Before type  |   After type    |     Return value
    // PEFIX-...    |   PEFIX-...     |     ''
    // PREFIX-123   |   PEFIX-123     |     123
    // PREFIX-123   |   PREFIX-23     |     23
    // PREFIX-123   |   PREFIX-1234   |     1234
    getPrefixStrippedValue: function (value, prefix, prefixLength, prevResult, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix) {
        // No prefix
        if (prefixLength === 0) {
          return value;
        }

        // Value is prefix
        if (value === prefix && value !== '') {
          return '';
        }

        if (signBeforePrefix && (value.slice(0, 1) == '-')) {
            var prev = (prevResult.slice(0, 1) == '-') ? prevResult.slice(1) : prevResult;
            return '-' + this.getPrefixStrippedValue(value.slice(1), prefix, prefixLength, prev, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix);
        }

        // Pre result prefix string does not match pre-defined prefix
        if (prevResult.slice(0, prefixLength) !== prefix && !tailPrefix) {
            // Check if the first time user entered something
            if (noImmediatePrefix && !prevResult && value) return value;
            return '';
        } else if (prevResult.slice(-prefixLength) !== prefix && tailPrefix) {
            // Check if the first time user entered something
            if (noImmediatePrefix && !prevResult && value) return value;
            return '';
        }

        var prevValue = this.stripDelimiters(prevResult, delimiter, delimiters);

        // New value has issue, someone typed in between prefix letters
        // Revert to pre value
        if (value.slice(0, prefixLength) !== prefix && !tailPrefix) {
            return prevValue.slice(prefixLength);
        } else if (value.slice(-prefixLength) !== prefix && tailPrefix) {
            return prevValue.slice(0, -prefixLength - 1);
        }

        // No issue, strip prefix for new value
        return tailPrefix ? value.slice(0, -prefixLength) : value.slice(prefixLength);
    },

    getFirstDiffIndex: function (prev, current) {
        var index = 0;

        while (prev.charAt(index) === current.charAt(index)) {
            if (prev.charAt(index++) === '') {
                return -1;
            }
        }

        return index;
    },

    getFormattedValue: function (value, blocks, blocksLength, delimiter, delimiters, delimiterLazyShow) {
        var result = '',
            multipleDelimiters = delimiters.length > 0,
            currentDelimiter = '';

        // no options, normal input
        if (blocksLength === 0) {
            return value;
        }

        blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    rest = value.slice(length);

                if (multipleDelimiters) {
                    currentDelimiter = delimiters[delimiterLazyShow ? (index - 1) : index] || currentDelimiter;
                } else {
                    currentDelimiter = delimiter;
                }

                if (delimiterLazyShow) {
                    if (index > 0) {
                        result += currentDelimiter;
                    }

                    result += sub;
                } else {
                    result += sub;

                    if (sub.length === length && index < blocksLength - 1) {
                        result += currentDelimiter;
                    }
                }

                // update remaining string
                value = rest;
            }
        });

        return result;
    },

    // move cursor to the end
    // the first time user focuses on an input with prefix
    fixPrefixCursor: function (el, prefix, delimiter, delimiters) {
        if (!el) {
            return;
        }

        var val = el.value,
            appendix = delimiter || (delimiters[0] || ' ');

        if (!el.setSelectionRange || !prefix || (prefix.length + appendix.length) <= val.length) {
            return;
        }

        var len = val.length * 2;

        // set timeout to avoid blink
        setTimeout(function () {
            el.setSelectionRange(len, len);
        }, 1);
    },

    // Check if input field is fully selected
    checkFullSelection: function(value) {
      try {
        var selection = window.getSelection() || document.getSelection() || {};
        return selection.toString().length === value.length;
      } catch (ex) {
        // Ignore
      }

      return false;
    },

    setSelection: function (element, position, doc) {
        if (element !== this.getActiveElement(doc)) {
            return;
        }

        // cursor is already in the end
        if (element && element.value.length <= position) {
          return;
        }

        if (element.createTextRange) {
            var range = element.createTextRange();

            range.move('character', position);
            range.select();
        } else {
            try {
                element.setSelectionRange(position, position);
            } catch (e) {
                // eslint-disable-next-line
                console.warn('The input element type does not support selection');
            }
        }
    },

    getActiveElement: function(parent) {
        var activeElement = parent.activeElement;
        if (activeElement && activeElement.shadowRoot) {
            return this.getActiveElement(activeElement.shadowRoot);
        }
        return activeElement;
    },

    isAndroid: function () {
        return navigator && /android/i.test(navigator.userAgent);
    },

    // On Android chrome, the keyup and keydown events
    // always return key code 229 as a composition that
    // buffers the user’s keystrokes
    // see https://github.com/nosir/cleave.js/issues/147
    isAndroidBackspaceKeydown: function (lastInputValue, currentInputValue) {
        if (!this.isAndroid() || !lastInputValue || !currentInputValue) {
            return false;
        }

        return currentInputValue === lastInputValue.slice(0, -1);
    }
};

var Util_1 = Util;

/**
 * Props Assignment
 *
 * Separate this, so react module can share the usage
 */
var DefaultProperties = {
    // Maybe change to object-assign
    // for now just keep it as simple
    assign: function (target, opts) {
        target = target || {};
        opts = opts || {};

        // credit card
        target.creditCard = !!opts.creditCard;
        target.creditCardStrictMode = !!opts.creditCardStrictMode;
        target.creditCardType = '';
        target.onCreditCardTypeChanged = opts.onCreditCardTypeChanged || (function () {});

        // phone
        target.phone = !!opts.phone;
        target.phoneRegionCode = opts.phoneRegionCode || 'AU';
        target.phoneFormatter = {};

        // time
        target.time = !!opts.time;
        target.timePattern = opts.timePattern || ['h', 'm', 's'];
        target.timeFormat = opts.timeFormat || '24';
        target.timeFormatter = {};

        // date
        target.date = !!opts.date;
        target.datePattern = opts.datePattern || ['d', 'm', 'Y'];
        target.dateMin = opts.dateMin || '';
        target.dateMax = opts.dateMax || '';
        target.dateFormatter = {};

        // numeral
        target.numeral = !!opts.numeral;
        target.numeralIntegerScale = opts.numeralIntegerScale > 0 ? opts.numeralIntegerScale : 0;
        target.numeralDecimalScale = opts.numeralDecimalScale >= 0 ? opts.numeralDecimalScale : 2;
        target.numeralDecimalMark = opts.numeralDecimalMark || '.';
        target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || 'thousand';
        target.numeralPositiveOnly = !!opts.numeralPositiveOnly;
        target.stripLeadingZeroes = opts.stripLeadingZeroes !== false;
        target.signBeforePrefix = !!opts.signBeforePrefix;
        target.tailPrefix = !!opts.tailPrefix;

        // others
        target.swapHiddenInput = !!opts.swapHiddenInput;
        
        target.numericOnly = target.creditCard || target.date || !!opts.numericOnly;

        target.uppercase = !!opts.uppercase;
        target.lowercase = !!opts.lowercase;

        target.prefix = (target.creditCard || target.date) ? '' : (opts.prefix || '');
        target.noImmediatePrefix = !!opts.noImmediatePrefix;
        target.prefixLength = target.prefix.length;
        target.rawValueTrimPrefix = !!opts.rawValueTrimPrefix;
        target.copyDelimiter = !!opts.copyDelimiter;

        target.initValue = (opts.initValue !== undefined && opts.initValue !== null) ? opts.initValue.toString() : '';

        target.delimiter =
            (opts.delimiter || opts.delimiter === '') ? opts.delimiter :
                (opts.date ? '/' :
                    (opts.time ? ':' :
                        (opts.numeral ? ',' :
                            (opts.phone ? ' ' :
                                ' '))));
        target.delimiterLength = target.delimiter.length;
        target.delimiterLazyShow = !!opts.delimiterLazyShow;
        target.delimiters = opts.delimiters || [];

        target.blocks = opts.blocks || [];
        target.blocksLength = target.blocks.length;

        target.root = (typeof commonjsGlobal === 'object' && commonjsGlobal) ? commonjsGlobal : window;
        target.document = opts.document || target.root.document;

        target.maxLength = 0;

        target.backspace = false;
        target.result = '';

        target.onValueChanged = opts.onValueChanged || (function () {});

        return target;
    }
};

var DefaultProperties_1 = DefaultProperties;

/**
 * Construct a new Cleave instance by passing the configuration object
 *
 * @param {String | HTMLElement} element
 * @param {Object} opts
 */
var Cleave = function (element, opts) {
    var owner = this;
    var hasMultipleElements = false;

    if (typeof element === 'string') {
        owner.element = document.querySelector(element);
        hasMultipleElements = document.querySelectorAll(element).length > 1;
    } else {
      if (typeof element.length !== 'undefined' && element.length > 0) {
        owner.element = element[0];
        hasMultipleElements = element.length > 1;
      } else {
        owner.element = element;
      }
    }

    if (!owner.element) {
        throw new Error('[cleave.js] Please check the element');
    }

    if (hasMultipleElements) {
      try {
        // eslint-disable-next-line
        console.warn('[cleave.js] Multiple input fields matched, cleave.js will only take the first one.');
      } catch (e) {
        // Old IE
      }
    }

    opts.initValue = owner.element.value;

    owner.properties = Cleave.DefaultProperties.assign({}, opts);

    owner.init();
};

Cleave.prototype = {
    init: function () {
        var owner = this, pps = owner.properties;

        // no need to use this lib
        if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && (pps.blocksLength === 0 && !pps.prefix)) {
            owner.onInput(pps.initValue);

            return;
        }

        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);

        owner.isAndroid = Cleave.Util.isAndroid();
        owner.lastInputValue = '';
        owner.isBackward = '';

        owner.onChangeListener = owner.onChange.bind(owner);
        owner.onKeyDownListener = owner.onKeyDown.bind(owner);
        owner.onFocusListener = owner.onFocus.bind(owner);
        owner.onCutListener = owner.onCut.bind(owner);
        owner.onCopyListener = owner.onCopy.bind(owner);

        owner.initSwapHiddenInput();

        owner.element.addEventListener('input', owner.onChangeListener);
        owner.element.addEventListener('keydown', owner.onKeyDownListener);
        owner.element.addEventListener('focus', owner.onFocusListener);
        owner.element.addEventListener('cut', owner.onCutListener);
        owner.element.addEventListener('copy', owner.onCopyListener);


        owner.initPhoneFormatter();
        owner.initDateFormatter();
        owner.initTimeFormatter();
        owner.initNumeralFormatter();

        // avoid touch input field if value is null
        // otherwise Firefox will add red box-shadow for <input required />
        if (pps.initValue || (pps.prefix && !pps.noImmediatePrefix)) {
            owner.onInput(pps.initValue);
        }
    },

    initSwapHiddenInput: function () {
        var owner = this, pps = owner.properties;
        if (!pps.swapHiddenInput) return;

        var inputFormatter = owner.element.cloneNode(true);
        owner.element.parentNode.insertBefore(inputFormatter, owner.element);

        owner.elementSwapHidden = owner.element;
        owner.elementSwapHidden.type = 'hidden';

        owner.element = inputFormatter;
        owner.element.id = '';
    },

    initNumeralFormatter: function () {
        var owner = this, pps = owner.properties;

        if (!pps.numeral) {
            return;
        }

        pps.numeralFormatter = new Cleave.NumeralFormatter(
            pps.numeralDecimalMark,
            pps.numeralIntegerScale,
            pps.numeralDecimalScale,
            pps.numeralThousandsGroupStyle,
            pps.numeralPositiveOnly,
            pps.stripLeadingZeroes,
            pps.prefix,
            pps.signBeforePrefix,
            pps.tailPrefix,
            pps.delimiter
        );
    },

    initTimeFormatter: function() {
        var owner = this, pps = owner.properties;

        if (!pps.time) {
            return;
        }

        pps.timeFormatter = new Cleave.TimeFormatter(pps.timePattern, pps.timeFormat);
        pps.blocks = pps.timeFormatter.getBlocks();
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
    },

    initDateFormatter: function () {
        var owner = this, pps = owner.properties;

        if (!pps.date) {
            return;
        }

        pps.dateFormatter = new Cleave.DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax);
        pps.blocks = pps.dateFormatter.getBlocks();
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
    },

    initPhoneFormatter: function () {
        var owner = this, pps = owner.properties;

        if (!pps.phone) {
            return;
        }

        // Cleave.AsYouTypeFormatter should be provided by
        // external google closure lib
        try {
            pps.phoneFormatter = new Cleave.PhoneFormatter(
                new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode),
                pps.delimiter
            );
        } catch (ex) {
            throw new Error('[cleave.js] Please include phone-type-formatter.{country}.js lib');
        }
    },

    onKeyDown: function (event) {
        var owner = this,
            charCode = event.which || event.keyCode;

        owner.lastInputValue = owner.element.value;
        owner.isBackward = charCode === 8;
    },

    onChange: function (event) {
        var owner = this, pps = owner.properties,
            Util = Cleave.Util;

        owner.isBackward = owner.isBackward || event.inputType === 'deleteContentBackward';

        var postDelimiter = Util.getPostDelimiter(owner.lastInputValue, pps.delimiter, pps.delimiters);

        if (owner.isBackward && postDelimiter) {
            pps.postDelimiterBackspace = postDelimiter;
        } else {
            pps.postDelimiterBackspace = false;
        }

        this.onInput(this.element.value);
    },

    onFocus: function () {
        var owner = this,
            pps = owner.properties;
        owner.lastInputValue = owner.element.value;

        if (pps.prefix && pps.noImmediatePrefix && !owner.element.value) {
            this.onInput(pps.prefix);
        }

        Cleave.Util.fixPrefixCursor(owner.element, pps.prefix, pps.delimiter, pps.delimiters);
    },

    onCut: function (e) {
        if (!Cleave.Util.checkFullSelection(this.element.value)) return;
        this.copyClipboardData(e);
        this.onInput('');
    },

    onCopy: function (e) {
        if (!Cleave.Util.checkFullSelection(this.element.value)) return;
        this.copyClipboardData(e);
    },

    copyClipboardData: function (e) {
        var owner = this,
            pps = owner.properties,
            Util = Cleave.Util,
            inputValue = owner.element.value,
            textToCopy = '';

        if (!pps.copyDelimiter) {
            textToCopy = Util.stripDelimiters(inputValue, pps.delimiter, pps.delimiters);
        } else {
            textToCopy = inputValue;
        }

        try {
            if (e.clipboardData) {
                e.clipboardData.setData('Text', textToCopy);
            } else {
                window.clipboardData.setData('Text', textToCopy);
            }

            e.preventDefault();
        } catch (ex) {
            //  empty
        }
    },

    onInput: function (value) {
        var owner = this, pps = owner.properties,
            Util = Cleave.Util;

        // case 1: delete one more character "4"
        // 1234*| -> hit backspace -> 123|
        // case 2: last character is not delimiter which is:
        // 12|34* -> hit backspace -> 1|34*
        // note: no need to apply this for numeral mode
        var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters);
        if (!pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
            value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length);
        }

        // phone formatter
        if (pps.phone) {
            if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
                pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length);
            } else {
                pps.result = pps.phoneFormatter.format(value);
            }
            owner.updateValueState();

            return;
        }

        // numeral formatter
        if (pps.numeral) {
            // Do not show prefix when noImmediatePrefix is specified
            // This mostly because we need to show user the native input placeholder
            if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
                pps.result = '';
            } else {
                pps.result = pps.numeralFormatter.format(value);
            }
            owner.updateValueState();

            return;
        }

        // date
        if (pps.date) {
            value = pps.dateFormatter.getValidatedDate(value);
        }

        // time
        if (pps.time) {
            value = pps.timeFormatter.getValidatedTime(value);
        }

        // strip delimiters
        value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters);

        // strip prefix
        value = Util.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);

        // strip non-numeric characters
        value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value;

        // convert case
        value = pps.uppercase ? value.toUpperCase() : value;
        value = pps.lowercase ? value.toLowerCase() : value;

        // prevent from showing prefix when no immediate option enabled with empty input value
        if (pps.prefix) {
            if (pps.tailPrefix) {
                value = value + pps.prefix;
            } else {
                value = pps.prefix + value;
            }


            // no blocks specified, no need to do formatting
            if (pps.blocksLength === 0) {
                pps.result = value;
                owner.updateValueState();

                return;
            }
        }

        // update credit card props
        if (pps.creditCard) {
            owner.updateCreditCardPropsByValue(value);
        }

        // strip over length characters
        value = Util.headStr(value, pps.maxLength);

        // apply blocks
        pps.result = Util.getFormattedValue(
            value,
            pps.blocks, pps.blocksLength,
            pps.delimiter, pps.delimiters, pps.delimiterLazyShow
        );

        owner.updateValueState();
    },

    updateCreditCardPropsByValue: function (value) {
        var owner = this, pps = owner.properties,
            Util = Cleave.Util,
            creditCardInfo;

        // At least one of the first 4 characters has changed
        if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
            return;
        }

        creditCardInfo = Cleave.CreditCardDetector.getInfo(value, pps.creditCardStrictMode);

        pps.blocks = creditCardInfo.blocks;
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Util.getMaxLength(pps.blocks);

        // credit card type changed
        if (pps.creditCardType !== creditCardInfo.type) {
            pps.creditCardType = creditCardInfo.type;

            pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
        }
    },

    updateValueState: function () {
        var owner = this,
            Util = Cleave.Util,
            pps = owner.properties;

        if (!owner.element) {
            return;
        }

        var endPos = owner.element.selectionEnd;
        var oldValue = owner.element.value;
        var newValue = pps.result;

        endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

        // fix Android browser type="text" input field
        // cursor not jumping issue
        if (owner.isAndroid) {
            window.setTimeout(function () {
                owner.element.value = newValue;
                Util.setSelection(owner.element, endPos, pps.document, false);
                owner.callOnValueChanged();
            }, 1);

            return;
        }

        owner.element.value = newValue;
        if (pps.swapHiddenInput) owner.elementSwapHidden.value = owner.getRawValue();

        Util.setSelection(owner.element, endPos, pps.document, false);
        owner.callOnValueChanged();
    },

    callOnValueChanged: function () {
        var owner = this,
            pps = owner.properties;

        pps.onValueChanged.call(owner, {
            target: {
                name: owner.element.name,
                value: pps.result,
                rawValue: owner.getRawValue()
            }
        });
    },

    setPhoneRegionCode: function (phoneRegionCode) {
        var owner = this, pps = owner.properties;

        pps.phoneRegionCode = phoneRegionCode;
        owner.initPhoneFormatter();
        owner.onChange();
    },

    setRawValue: function (value) {
        var owner = this, pps = owner.properties;

        value = value !== undefined && value !== null ? value.toString() : '';

        if (pps.numeral) {
            value = value.replace('.', pps.numeralDecimalMark);
        }

        pps.postDelimiterBackspace = false;

        owner.element.value = value;
        owner.onInput(value);
    },

    getRawValue: function () {
        var owner = this,
            pps = owner.properties,
            Util = Cleave.Util,
            rawValue = owner.element.value;

        if (pps.rawValueTrimPrefix) {
            rawValue = Util.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);
        }

        if (pps.numeral) {
            rawValue = pps.numeralFormatter.getRawValue(rawValue);
        } else {
            rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
        }

        return rawValue;
    },

    getISOFormatDate: function () {
        var owner = this,
            pps = owner.properties;

        return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
    },

    getISOFormatTime: function () {
        var owner = this,
            pps = owner.properties;

        return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
    },

    getFormattedValue: function () {
        return this.element.value;
    },

    destroy: function () {
        var owner = this;

        owner.element.removeEventListener('input', owner.onChangeListener);
        owner.element.removeEventListener('keydown', owner.onKeyDownListener);
        owner.element.removeEventListener('focus', owner.onFocusListener);
        owner.element.removeEventListener('cut', owner.onCutListener);
        owner.element.removeEventListener('copy', owner.onCopyListener);
    },

    toString: function () {
        return '[Cleave Object]';
    }
};

Cleave.NumeralFormatter = NumeralFormatter_1;
Cleave.DateFormatter = DateFormatter_1;
Cleave.TimeFormatter = TimeFormatter_1;
Cleave.PhoneFormatter = PhoneFormatter_1;
Cleave.CreditCardDetector = CreditCardDetector_1;
Cleave.Util = Util_1;
Cleave.DefaultProperties = DefaultProperties_1;

// for angular directive
((typeof commonjsGlobal === 'object' && commonjsGlobal) ? commonjsGlobal : window)['Cleave'] = Cleave;

// CommonJS
var Cleave_1 = Cleave;

/* harmony default export */ __webpack_exports__["default"] = (Cleave_1);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/highcharts-vue/dist/highcharts-vue.min.js":
/*!****************************************************************!*\
  !*** ./node_modules/highcharts-vue/dist/highcharts-vue.min.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js")):undefined}("undefined"!=typeof self?self:this,function(t){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(e,r){e.exports=t},function(t,e,r){"use strict";function n(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.component(e.tagName||"highcharts",Object(o.a)(e.highcharts||i.a))}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n,r.d(e,"Chart",function(){return a});var o=r(2),c=r(0),i=r.n(c),a=Object(o.a)(i.a)},function(t,e,r){"use strict";function n(t){return i(t)||c(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}var a=r(3),s=function(t){return{template:'<div ref="chart"></div>',render:function(t){return t("div",{ref:"chart"})},props:{constructorType:{type:String,default:"chart"},options:{type:Object,required:!0},callback:Function,updateArgs:{type:Array,default:function(){return[!0,!0]}},highcharts:{type:Object},deepCopyOnUpdate:{type:Boolean,default:!0}},watch:{options:{handler:function(t){var e;(e=this.chart).update.apply(e,[Object(a.a)(t,this.deepCopyOnUpdate)].concat(n(this.updateArgs)))},deep:!0}},mounted:function(){var e=this.highcharts||t;this.options&&e[this.constructorType]?this.chart=e[this.constructorType](this.$refs.chart,Object(a.a)(this.options,!0),this.callback?this.callback:null):this.options?console.warn("'".concat(this.constructorType,"' constructor-type is incorrect. Sometimes this error is caused by the fact, that the corresponding module wasn't imported.")):console.warn('The "options" parameter was not passed.')},beforeDestroy:function(){this.chart&&this.chart.destroy()}}};e.a=s},function(t,e,r){"use strict";function n(t,e,r){function o(o,i){!c.a.isObject(o,!r)||c.a.isClass(o)||c.a.isDOMElement(o)?t[i]=e[i]:t[i]=n(t[i]||c.a.isArray(o)?[]:{},o,r)}return c.a.isArray(e)?e.forEach(o):c.a.objectEach(e,o),t}r.d(e,"a",function(){return i});var o=r(0),c=r.n(o),i=function(t,e){return n({},t,e)}}])});

/***/ }),

/***/ "./node_modules/highcharts/highcharts.js":
/*!***********************************************!*\
  !*** ./node_modules/highcharts/highcharts.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 Highcharts JS v8.2.2 (2020-10-22)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(X,N){ true&&module.exports?(N["default"]=N,module.exports=X.document?N(X):N): true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return N(X)}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):(undefined)})("undefined"!==typeof window?window:this,function(X){function N(f,h,m,z){f.hasOwnProperty(h)||(f[h]=z.apply(null,m))}var m={};N(m,"Core/Globals.js",[],function(){var f="undefined"!==typeof X?X:"undefined"!==typeof window?window:{},h=f.document,
m=f.navigator&&f.navigator.userAgent||"",z=h&&h.createElementNS&&!!h.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,F=/(edge|msie|trident)/i.test(m)&&!f.opera,L=-1!==m.indexOf("Firefox"),K=-1!==m.indexOf("Chrome"),C=L&&4>parseInt(m.split("Firefox/")[1],10);return{product:"Highcharts",version:"8.2.2",deg2rad:2*Math.PI/360,doc:h,hasBidiBug:C,hasTouch:!!f.TouchEvent,isMS:F,isWebKit:-1!==m.indexOf("AppleWebKit"),isFirefox:L,isChrome:K,isSafari:!K&&-1!==m.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(m),
SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:z,win:f,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[],dateFormats:{}}});N(m,"Core/Utilities.js",[m["Core/Globals.js"]],function(f){function h(b,k,t,a){var u=k?"Highcharts error":"Highcharts warning";32===b&&(b=u+": Deprecated member");var c=l(b),H=c?u+" #"+b+": www.highcharts.com/errors/"+b+"/":b.toString();u=function(){if(k)throw Error(H);e.console&&-1===h.messages.indexOf(H)&&
console.log(H)};if("undefined"!==typeof a){var d="";c&&(H+="?");S(a,function(b,k){d+="\n - "+k+": "+b;c&&(H+=encodeURI(k)+"="+encodeURI(b))});H+=d}t?ca(t,"displayError",{code:b,message:H,params:a},u):u();h.messages.push(H)}function m(){var b,k=arguments,t={},a=function(b,k){"object"!==typeof b&&(b={});S(k,function(t,u){!z(t,!0)||n(t)||D(t)?b[u]=k[u]:b[u]=a(b[u]||{},t)});return b};!0===k[0]&&(t=k[1],k=Array.prototype.slice.call(k,2));var u=k.length;for(b=0;b<u;b++)t=a(t,k[b]);return t}function z(b,
k){return!!b&&"object"===typeof b&&(!k||!x(b))}function F(b,k,t){var a;v(k)?w(t)?b.setAttribute(k,t):b&&b.getAttribute&&((a=b.getAttribute(k))||"class"!==k||(a=b.getAttribute(k+"Name"))):S(k,function(k,t){b.setAttribute(t,k)});return a}function L(){for(var b=arguments,k=b.length,t=0;t<k;t++){var a=b[t];if("undefined"!==typeof a&&null!==a)return a}}function K(b,k){if(!b)return k;var t=b.split(".").reverse();if(1===t.length)return k[b];for(b=t.pop();"undefined"!==typeof b&&"undefined"!==typeof k&&null!==
k;)k=k[b],b=t.pop();return k}f.timers=[];var C=f.charts,y=f.doc,e=f.win;(h||(h={})).messages=[];f.error=h;f.merge=m;var I=f.pInt=function(b,k){return parseInt(b,k||10)},v=f.isString=function(b){return"string"===typeof b},x=f.isArray=function(b){b=Object.prototype.toString.call(b);return"[object Array]"===b||"[object Array Iterator]"===b};f.isObject=z;var D=f.isDOMElement=function(b){return z(b)&&"number"===typeof b.nodeType},n=f.isClass=function(b){var k=b&&b.constructor;return!(!z(b,!0)||D(b)||!k||
!k.name||"Object"===k.name)},l=f.isNumber=function(b){return"number"===typeof b&&!isNaN(b)&&Infinity>b&&-Infinity<b},J=f.erase=function(b,k){for(var t=b.length;t--;)if(b[t]===k){b.splice(t,1);break}},w=f.defined=function(b){return"undefined"!==typeof b&&null!==b};f.attr=F;var r=f.splat=function(b){return x(b)?b:[b]},d=f.syncTimeout=function(b,k,t){if(0<k)return setTimeout(b,k,t);b.call(0,t);return-1},g=f.clearTimeout=function(b){w(b)&&clearTimeout(b)},c=f.extend=function(b,k){var t;b||(b={});for(t in k)b[t]=
k[t];return b};f.pick=L;var a=f.css=function(b,k){f.isMS&&!f.svg&&k&&"undefined"!==typeof k.opacity&&(k.filter="alpha(opacity="+100*k.opacity+")");c(b.style,k)},q=f.createElement=function(b,k,t,u,H){b=y.createElement(b);k&&c(b,k);H&&a(b,{padding:"0",border:"none",margin:"0"});t&&a(b,t);u&&u.appendChild(b);return b},p=f.extendClass=function(b,k){var t=function(){};t.prototype=new b;c(t.prototype,k);return t},B=f.pad=function(b,k,t){return Array((k||2)+1-String(b).replace("-","").length).join(t||"0")+
b},A=f.relativeLength=function(b,k,t){return/%$/.test(b)?k*parseFloat(b)/100+(t||0):parseFloat(b)},G=f.wrap=function(b,k,t){var a=b[k];b[k]=function(){var b=Array.prototype.slice.call(arguments),k=arguments,u=this;u.proceed=function(){a.apply(u,arguments.length?arguments:k)};b.unshift(a);b=t.apply(this,b);u.proceed=null;return b}},M=f.format=function(b,k,t){var a="{",u=!1,H=[],c=/f$/,d=/\.([0-9])/,g=f.defaultOptions.lang,p=t&&t.time||f.time;for(t=t&&t.numberFormatter||R;b;){var q=b.indexOf(a);if(-1===
q)break;var U=b.slice(0,q);if(u){U=U.split(":");a=K(U.shift()||"",k);if(U.length&&"number"===typeof a)if(U=U.join(":"),c.test(U)){var r=parseInt((U.match(d)||["","-1"])[1],10);null!==a&&(a=t(a,r,g.decimalPoint,-1<U.indexOf(",")?g.thousandsSep:""))}else a=p.dateFormat(U,a);H.push(a)}else H.push(U);b=b.slice(q+1);a=(u=!u)?"}":"{"}H.push(b);return H.join("")},T=f.getMagnitude=function(b){return Math.pow(10,Math.floor(Math.log(b)/Math.LN10))},Q=f.normalizeTickInterval=function(b,k,a,u,H){var c=b;a=L(a,
1);var d=b/a;k||(k=H?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===u&&(1===a?k=k.filter(function(b){return 0===b%1}):.1>=a&&(k=[1/a])));for(u=0;u<k.length&&!(c=k[u],H&&c*a>=b||!H&&d<=(k[u]+(k[u+1]||k[u]))/2);u++);return c=t(c*a,-Math.round(Math.log(.001)/Math.LN10))},O=f.stableSort=function(b,k){var t=b.length,a,u;for(u=0;u<t;u++)b[u].safeI=u;b.sort(function(b,t){a=k(b,t);return 0===a?b.safeI-t.safeI:a});for(u=0;u<t;u++)delete b[u].safeI},E=f.arrayMin=function(b){for(var k=b.length,t=b[0];k--;)b[k]<
t&&(t=b[k]);return t},u=f.arrayMax=function(b){for(var k=b.length,t=b[0];k--;)b[k]>t&&(t=b[k]);return t},b=f.destroyObjectProperties=function(b,k){S(b,function(t,a){t&&t!==k&&t.destroy&&t.destroy();delete b[a]})},k=f.discardElement=function(b){var k=f.garbageBin;k||(k=q("div"));b&&k.appendChild(b);k.innerHTML=""},t=f.correctFloat=function(b,k){return parseFloat(b.toPrecision(k||14))},H=f.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5},R=
f.numberFormat=function(b,k,t,a){b=+b||0;k=+k;var u=f.defaultOptions.lang,H=(b.toString().split(".")[1]||"").split("e")[0].length,c=b.toString().split("e");if(-1===k)k=Math.min(H,20);else if(!l(k))k=2;else if(k&&c[1]&&0>c[1]){var d=k+ +c[1];0<=d?(c[0]=(+c[0]).toExponential(d).split("e")[0],k=d):(c[0]=c[0].split(".")[0]||0,b=20>k?(c[0]*Math.pow(10,c[1])).toFixed(k):0,c[1]=0)}var g=(Math.abs(c[1]?c[0]:b)+Math.pow(10,-Math.max(k,H)-1)).toFixed(k);H=String(I(g));d=3<H.length?H.length%3:0;t=L(t,u.decimalPoint);
a=L(a,u.thousandsSep);b=(0>b?"-":"")+(d?H.substr(0,d)+a:"");b+=H.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+a);k&&(b+=t+g.slice(-k));c[1]&&0!==+b&&(b+="e"+c[1]);return b};Math.easeInOutSine=function(b){return-.5*(Math.cos(Math.PI*b)-1)};var U=f.getStyle=function(b,k,t){if("width"===k)return k=Math.min(b.offsetWidth,b.scrollWidth),t=b.getBoundingClientRect&&b.getBoundingClientRect().width,t<k&&t>=k-1&&(k=Math.floor(t)),Math.max(0,k-f.getStyle(b,"padding-left")-f.getStyle(b,"padding-right"));if("height"===
k)return Math.max(0,Math.min(b.offsetHeight,b.scrollHeight)-f.getStyle(b,"padding-top")-f.getStyle(b,"padding-bottom"));e.getComputedStyle||h(27,!0);if(b=e.getComputedStyle(b,void 0))b=b.getPropertyValue(k),L(t,"opacity"!==k)&&(b=I(b));return b},Z=f.inArray=function(b,k,t){h(32,!1,void 0,{"Highcharts.inArray":"use Array.indexOf"});return k.indexOf(b,t)},aa=f.find=Array.prototype.find?function(b,k){return b.find(k)}:function(b,k){var t,a=b.length;for(t=0;t<a;t++)if(k(b[t],t))return b[t]};f.keys=function(b){h(32,
!1,void 0,{"Highcharts.keys":"use Object.keys"});return Object.keys(b)};var ba=f.offset=function(b){var k=y.documentElement;b=b.parentElement||b.parentNode?b.getBoundingClientRect():{top:0,left:0};return{top:b.top+(e.pageYOffset||k.scrollTop)-(k.clientTop||0),left:b.left+(e.pageXOffset||k.scrollLeft)-(k.clientLeft||0)}},S=f.objectEach=function(b,k,t){for(var a in b)Object.hasOwnProperty.call(b,a)&&k.call(t||b[a],b[a],a,b)};S({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(b,
k){f[k]=function(t){var a;h(32,!1,void 0,(a={},a["Highcharts."+k]="use Array."+b,a));return Array.prototype[b].apply(t,[].slice.call(arguments,1))}});var Y=f.addEvent=function(b,k,t,a){void 0===a&&(a={});var u=b.addEventListener||f.addEventListenerPolyfill;var c="function"===typeof b&&b.prototype?b.prototype.protoEvents=b.prototype.protoEvents||{}:b.hcEvents=b.hcEvents||{};f.Point&&b instanceof f.Point&&b.series&&b.series.chart&&(b.series.chart.runTrackerClick=!0);u&&u.call(b,k,t,!1);c[k]||(c[k]=
[]);c[k].push({fn:t,order:"number"===typeof a.order?a.order:Infinity});c[k].sort(function(b,k){return b.order-k.order});return function(){W(b,k,t)}},W=f.removeEvent=function(b,k,t){function a(k,t){var a=b.removeEventListener||f.removeEventListenerPolyfill;a&&a.call(b,k,t,!1)}function u(t){var u;if(b.nodeName){if(k){var c={};c[k]=!0}else c=t;S(c,function(b,k){if(t[k])for(u=t[k].length;u--;)a(k,t[k][u].fn)})}}var c;["protoEvents","hcEvents"].forEach(function(H,d){var g=(d=d?b:b.prototype)&&d[H];g&&
(k?(c=g[k]||[],t?(g[k]=c.filter(function(b){return t!==b.fn}),a(k,t)):(u(g),g[k]=[])):(u(g),d[H]={}))})},ca=f.fireEvent=function(b,k,t,a){var u;t=t||{};if(y.createEvent&&(b.dispatchEvent||b.fireEvent)){var H=y.createEvent("Events");H.initEvent(k,!0,!0);c(H,t);b.dispatchEvent?b.dispatchEvent(H):b.fireEvent(k,H)}else t.target||c(t,{preventDefault:function(){t.defaultPrevented=!0},target:b,type:k}),function(k,a){void 0===k&&(k=[]);void 0===a&&(a=[]);var c=0,H=0,d=k.length+a.length;for(u=0;u<d;u++)!1===
(k[c]?a[H]?k[c].order<=a[H].order?k[c++]:a[H++]:k[c++]:a[H++]).fn.call(b,t)&&t.preventDefault()}(b.protoEvents&&b.protoEvents[k],b.hcEvents&&b.hcEvents[k]);a&&!t.defaultPrevented&&a.call(b,t)},V,da=f.uniqueKey=function(){var b=Math.random().toString(36).substring(2,9)+"-",k=0;return function(){return"highcharts-"+(V?"":b)+k++}}(),ea=f.useSerialIds=function(b){return V=L(b,V)},fa=f.isFunction=function(b){return"function"===typeof b},ha=f.getOptions=function(){return f.defaultOptions},ia=f.setOptions=
function(b){f.defaultOptions=m(!0,f.defaultOptions,b);(b.time||b.global)&&f.time.update(m(f.defaultOptions.global,f.defaultOptions.time,b.global,b.time));return f.defaultOptions};e.jQuery&&(e.jQuery.fn.highcharts=function(){var b=[].slice.call(arguments);if(this[0])return b[0]?(new (f[v(b[0])?b.shift():"Chart"])(this[0],b[0],b[1]),this):C[F(this[0],"data-highcharts-chart")]});return{addEvent:Y,arrayMax:u,arrayMin:E,attr:F,clamp:function(b,k,t){return b>k?b<t?b:t:k},clearTimeout:g,correctFloat:t,createElement:q,
css:a,defined:w,destroyObjectProperties:b,discardElement:k,erase:J,error:h,extend:c,extendClass:p,find:aa,fireEvent:ca,format:M,getMagnitude:T,getNestedProperty:K,getOptions:ha,getStyle:U,inArray:Z,isArray:x,isClass:n,isDOMElement:D,isFunction:fa,isNumber:l,isObject:z,isString:v,merge:m,normalizeTickInterval:Q,numberFormat:R,objectEach:S,offset:ba,pad:B,pick:L,pInt:I,relativeLength:A,removeEvent:W,setOptions:ia,splat:r,stableSort:O,syncTimeout:d,timeUnits:H,uniqueKey:da,useSerialIds:ea,wrap:G}});
N(m,"Core/Color/Color.js",[m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h){var m=h.isNumber,z=h.merge,F=h.pInt;"";h=function(){function h(K){this.parsers=[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(h){return[F(h[1]),F(h[2]),F(h[3]),parseFloat(h[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(h){return[F(h[1]),F(h[2]),F(h[3]),1]}}];this.rgba=[];if(f.Color!==h)return new f.Color(K);
if(!(this instanceof h))return new h(K);this.init(K)}h.parse=function(f){return new h(f)};h.prototype.init=function(f){var C,y;if((this.input=f=h.names[f&&f.toLowerCase?f.toLowerCase():""]||f)&&f.stops)this.stops=f.stops.map(function(v){return new h(v[1])});else{if(f&&f.charAt&&"#"===f.charAt()){var e=f.length;f=parseInt(f.substr(1),16);7===e?C=[(f&16711680)>>16,(f&65280)>>8,f&255,1]:4===e&&(C=[(f&3840)>>4|(f&3840)>>8,(f&240)>>4|f&240,(f&15)<<4|f&15,1])}if(!C)for(y=this.parsers.length;y--&&!C;){var I=
this.parsers[y];(e=I.regex.exec(f))&&(C=I.parse(e))}}this.rgba=C||[]};h.prototype.get=function(f){var h=this.input,y=this.rgba;if("undefined"!==typeof this.stops){var e=z(h);e.stops=[].concat(e.stops);this.stops.forEach(function(I,v){e.stops[v]=[e.stops[v][0],I.get(f)]})}else e=y&&m(y[0])?"rgb"===f||!f&&1===y[3]?"rgb("+y[0]+","+y[1]+","+y[2]+")":"a"===f?y[3]:"rgba("+y.join(",")+")":h;return e};h.prototype.brighten=function(f){var h,y=this.rgba;if(this.stops)this.stops.forEach(function(e){e.brighten(f)});
else if(m(f)&&0!==f)for(h=0;3>h;h++)y[h]+=F(255*f),0>y[h]&&(y[h]=0),255<y[h]&&(y[h]=255);return this};h.prototype.setOpacity=function(f){this.rgba[3]=f;return this};h.prototype.tweenTo=function(f,h){var y=this.rgba,e=f.rgba;e.length&&y&&y.length?(f=1!==e[3]||1!==y[3],h=(f?"rgba(":"rgb(")+Math.round(e[0]+(y[0]-e[0])*(1-h))+","+Math.round(e[1]+(y[1]-e[1])*(1-h))+","+Math.round(e[2]+(y[2]-e[2])*(1-h))+(f?","+(e[3]+(y[3]-e[3])*(1-h)):"")+")"):h=f.input||"none";return h};h.names={white:"#ffffff",black:"#000000"};
return h}();f.Color=h;f.color=h.parse;return h});N(m,"Core/Animation/Fx.js",[m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h){var m=f.win,z=h.isNumber,F=h.objectEach;h=function(){function h(f,h,y){this.pos=NaN;this.options=h;this.elem=f;this.prop=y}h.prototype.dSetter=function(){var f=this.paths,h=f&&f[0];f=f&&f[1];var y=[],e=this.now||0;if(1!==e&&h&&f)if(h.length===f.length&&1>e)for(var I=0;I<f.length;I++){for(var v=h[I],x=f[I],D=[],n=0;n<x.length;n++){var l=v[n],J=x[n];D[n]="number"===
typeof l&&"number"===typeof J&&("A"!==x[0]||4!==n&&5!==n)?l+e*(J-l):J}y.push(D)}else y=f;else y=this.toD||[];this.elem.attr("d",y,void 0,!0)};h.prototype.update=function(){var f=this.elem,h=this.prop,y=this.now,e=this.options.step;if(this[h+"Setter"])this[h+"Setter"]();else f.attr?f.element&&f.attr(h,y,null,!0):f.style[h]=y+this.unit;e&&e.call(f,y,this)};h.prototype.run=function(h,C,y){var e=this,I=e.options,v=function(n){return v.stopped?!1:e.step(n)},x=m.requestAnimationFrame||function(n){setTimeout(n,
13)},D=function(){for(var n=0;n<f.timers.length;n++)f.timers[n]()||f.timers.splice(n--,1);f.timers.length&&x(D)};h!==C||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=h,this.end=C,this.unit=y,this.now=this.start,this.pos=0,v.elem=this.elem,v.prop=this.prop,v()&&1===f.timers.push(v)&&x(D)):(delete I.curAnim[this.prop],I.complete&&0===Object.keys(I.curAnim).length&&I.complete.call(this.elem))};h.prototype.step=function(f){var h=+new Date,y=this.options,e=this.elem,I=y.complete,
v=y.duration,x=y.curAnim;if(e.attr&&!e.element)f=!1;else if(f||h>=v+this.startTime){this.now=this.end;this.pos=1;this.update();var D=x[this.prop]=!0;F(x,function(n){!0!==n&&(D=!1)});D&&I&&I.call(e);f=!1}else this.pos=y.easing((h-this.startTime)/v),this.now=this.start+(this.end-this.start)*this.pos,this.update(),f=!0;return f};h.prototype.initPath=function(f,h,y){function e(r,d){for(;r.length<w;){var g=r[0],c=d[w-r.length];c&&"M"===g[0]&&(r[0]="C"===c[0]?["C",g[1],g[2],g[1],g[2],g[1],g[2]]:["L",g[1],
g[2]]);r.unshift(g);D&&r.push(r[r.length-1])}}function I(r,d){for(;r.length<w;)if(d=r[r.length/n-1].slice(),"C"===d[0]&&(d[1]=d[5],d[2]=d[6]),D){var g=r[r.length/n].slice();r.splice(r.length/2,0,d,g)}else r.push(d)}var v=f.startX,x=f.endX;h=h&&h.slice();y=y.slice();var D=f.isArea,n=D?2:1;if(!h)return[y,y];if(v&&x){for(f=0;f<v.length;f++)if(v[f]===x[0]){var l=f;break}else if(v[0]===x[x.length-v.length+f]){l=f;var J=!0;break}else if(v[v.length-1]===x[x.length-v.length+f]){l=v.length-f;break}"undefined"===
typeof l&&(h=[])}if(h.length&&z(l)){var w=y.length+l*n;J?(e(h,y),I(y,h)):(e(y,h),I(h,y))}return[h,y]};h.prototype.fillSetter=function(){h.prototype.strokeSetter.apply(this,arguments)};h.prototype.strokeSetter=function(){this.elem.attr(this.prop,f.color(this.start).tweenTo(f.color(this.end),this.pos),null,!0)};return h}();return f.Fx=h});N(m,"Core/Animation/AnimationUtilities.js",[m["Core/Animation/Fx.js"],m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h,m){var z=m.defined,P=m.getStyle,L=
m.isArray,K=m.isNumber,C=m.isObject,y=m.merge,e=m.objectEach,I=m.pick;m=h.setAnimation=function(l,n){n.renderer.globalAnimation=I(l,n.options.chart.animation,!0)};var v=h.animObject=function(l){return C(l)?h.merge({duration:500,defer:0},l):{duration:l?500:0,defer:0}},x=h.getDeferredAnimation=function(l,n,w){var r=v(n),d=0,g=0;(w?[w]:l.series).forEach(function(c){c=v(c.options.animation);d=n&&z(n.defer)?r.defer:Math.max(d,c.duration+c.defer);g=Math.min(r.duration,c.duration)});l.renderer.forExport&&
(d=0);return{defer:Math.max(0,d-g),duration:Math.min(d,g)}},D=h.animate=function(l,v,w){var r,d="",g,c;if(!C(w)){var a=arguments;w={duration:a[2],easing:a[3],complete:a[4]}}K(w.duration)||(w.duration=400);w.easing="function"===typeof w.easing?w.easing:Math[w.easing]||Math.easeInOutSine;w.curAnim=y(v);e(v,function(a,p){n(l,p);c=new f(l,w,p);g=null;"d"===p&&L(v.d)?(c.paths=c.initPath(l,l.pathArray,v.d),c.toD=v.d,r=0,g=1):l.attr?r=l.attr(p):(r=parseFloat(P(l,p))||0,"opacity"!==p&&(d="px"));g||(g=a);
g&&g.match&&g.match("px")&&(g=g.replace(/px/g,""));c.run(r,g,d)})},n=h.stop=function(l,n){for(var w=h.timers.length;w--;)h.timers[w].elem!==l||n&&n!==h.timers[w].prop||(h.timers[w].stopped=!0)};return{animate:D,animObject:v,getDeferredAnimation:x,setAnimation:m,stop:n}});N(m,"Core/Renderer/SVG/SVGElement.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Color/Color.js"],m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h,m,z){var F=f.animate,P=f.animObject,K=f.stop,C=m.deg2rad,y=m.doc,
e=m.hasTouch,I=m.isFirefox,v=m.noop,x=m.svg,D=m.SVG_NS,n=m.win,l=z.attr,J=z.createElement,w=z.css,r=z.defined,d=z.erase,g=z.extend,c=z.fireEvent,a=z.isArray,q=z.isFunction,p=z.isNumber,B=z.isString,A=z.merge,G=z.objectEach,M=z.pick,T=z.pInt,Q=z.syncTimeout,O=z.uniqueKey;"";f=function(){function E(){this.height=this.element=void 0;this.opacity=1;this.renderer=void 0;this.SVG_NS=D;this.symbolCustomAttribs="x y width height r start end innerR anchorX anchorY rounded".split(" ");this.width=void 0}E.prototype._defaultGetter=
function(a){a=M(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a};E.prototype._defaultSetter=function(a,b,k){k.setAttribute(b,a)};E.prototype.add=function(a){var b=this.renderer,k=this.element;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;"undefined"!==typeof this.textStr&&"text"===this.element.nodeName&&b.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)var t=this.zIndexSetter();t||(a?a.element:b.box).appendChild(k);
if(this.onAdd)this.onAdd();return this};E.prototype.addClass=function(a,b){var k=b?"":this.attr("class")||"";a=(a||"").split(/ /g).reduce(function(b,a){-1===k.indexOf(a)&&b.push(a);return b},k?[k]:[]).join(" ");a!==k&&this.attr("class",a);return this};E.prototype.afterSetters=function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)};E.prototype.align=function(a,b,k){var t,c={};var u=this.renderer;var g=u.alignedObjects;var p,q;if(a){if(this.alignOptions=a,this.alignByTranslate=b,
!k||B(k))this.alignTo=t=k||"renderer",d(g,this),g.push(this),k=void 0}else a=this.alignOptions,b=this.alignByTranslate,t=this.alignTo;k=M(k,u[t],u);t=a.align;u=a.verticalAlign;g=(k.x||0)+(a.x||0);var r=(k.y||0)+(a.y||0);"right"===t?p=1:"center"===t&&(p=2);p&&(g+=(k.width-(a.width||0))/p);c[b?"translateX":"x"]=Math.round(g);"bottom"===u?q=1:"middle"===u&&(q=2);q&&(r+=(k.height-(a.height||0))/q);c[b?"translateY":"y"]=Math.round(r);this[this.placed?"animate":"attr"](c);this.placed=!0;this.alignAttr=
c;return this};E.prototype.alignSetter=function(a){var b={left:"start",center:"middle",right:"end"};b[a]&&(this.alignValue=a,this.element.setAttribute("text-anchor",b[a]))};E.prototype.animate=function(a,b,k){var t=this,c=P(M(b,this.renderer.globalAnimation,!0));b=c.defer;M(y.hidden,y.msHidden,y.webkitHidden,!1)&&(c.duration=0);0!==c.duration?(k&&(c.complete=k),Q(function(){t.element&&F(t,a,c)},b)):(this.attr(a,void 0,k),G(a,function(b,k){c.step&&c.step.call(this,b,{prop:k,pos:1})},this));return this};
E.prototype.applyTextOutline=function(a){var b=this.element,k;-1!==a.indexOf("contrast")&&(a=a.replace(/contrast/g,this.renderer.getContrast(b.style.fill)));a=a.split(" ");var t=a[a.length-1];if((k=a[0])&&"none"!==k&&m.svg){this.fakeTS=!0;a=[].slice.call(b.getElementsByTagName("tspan"));this.ySetter=this.xSetter;k=k.replace(/(^[\d\.]+)(.*?)$/g,function(b,k,t){return 2*k+t});this.removeTextOutline(a);var c=b.textContent?/^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(b.textContent):
!1;var u=b.firstChild;a.forEach(function(a,H){0===H&&(a.setAttribute("x",b.getAttribute("x")),H=b.getAttribute("y"),a.setAttribute("y",H||0),null===H&&b.setAttribute("y",0));H=a.cloneNode(!0);l(c&&!I?a:H,{"class":"highcharts-text-outline",fill:t,stroke:t,"stroke-width":k,"stroke-linejoin":"round"});b.insertBefore(H,u)});c&&I&&a[0]&&(a=a[0].cloneNode(!0),a.textContent=" ",b.insertBefore(a,u))}};E.prototype.attr=function(a,b,k,t){var c=this.element,u,d=this,g,p,q=this.symbolCustomAttribs;if("string"===
typeof a&&"undefined"!==typeof b){var r=a;a={};a[r]=b}"string"===typeof a?d=(this[a+"Getter"]||this._defaultGetter).call(this,a,c):(G(a,function(b,k){g=!1;t||K(this,k);this.symbolName&&-1!==q.indexOf(k)&&(u||(this.symbolAttr(a),u=!0),g=!0);!this.rotation||"x"!==k&&"y"!==k||(this.doTransform=!0);g||(p=this[k+"Setter"]||this._defaultSetter,p.call(this,b,k,c),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(k)&&this.updateShadows(k,b,p))},this),this.afterSetters());
k&&k.call(this);return d};E.prototype.clip=function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")};E.prototype.crisp=function(a,b){b=b||a.strokeWidth||0;var k=Math.round(b)%2/2;a.x=Math.floor(a.x||this.x||0)+k;a.y=Math.floor(a.y||this.y||0)+k;a.width=Math.floor((a.width||this.width||0)-2*k);a.height=Math.floor((a.height||this.height||0)-2*k);r(a.strokeWidth)&&(a.strokeWidth=b);return a};E.prototype.complexColor=function(u,b,k){var t=this.renderer,H,d,g,p,q,B,l,n,
w,E,V=[],v;c(this.renderer,"complexColor",{args:arguments},function(){u.radialGradient?d="radialGradient":u.linearGradient&&(d="linearGradient");if(d){g=u[d];q=t.gradients;B=u.stops;w=k.radialReference;a(g)&&(u[d]=g={x1:g[0],y1:g[1],x2:g[2],y2:g[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===d&&w&&!r(g.gradientUnits)&&(p=g,g=A(g,t.getRadialAttr(w,p),{gradientUnits:"userSpaceOnUse"}));G(g,function(b,k){"id"!==k&&V.push(k,b)});G(B,function(b){V.push(b)});V=V.join(",");if(q[V])E=q[V].attr("id");
else{g.id=E=O();var c=q[V]=t.createElement(d).attr(g).add(t.defs);c.radAttr=p;c.stops=[];B.forEach(function(b){0===b[1].indexOf("rgba")?(H=h.parse(b[1]),l=H.get("rgb"),n=H.get("a")):(l=b[1],n=1);b=t.createElement("stop").attr({offset:b[0],"stop-color":l,"stop-opacity":n}).add(c);c.stops.push(b)})}v="url("+t.url+"#"+E+")";k.setAttribute(b,v);k.gradient=V;u.toString=function(){return v}}})};E.prototype.css=function(a){var b=this.styles,k={},t=this.element,c="",d=!b,u=["textOutline","textOverflow","width"];
a&&a.color&&(a.fill=a.color);b&&G(a,function(a,t){b&&b[t]!==a&&(k[t]=a,d=!0)});if(d){b&&(a=g(b,k));if(a)if(null===a.width||"auto"===a.width)delete this.textWidth;else if("text"===t.nodeName.toLowerCase()&&a.width)var p=this.textWidth=T(a.width);this.styles=a;p&&!x&&this.renderer.forExport&&delete a.width;if(t.namespaceURI===this.SVG_NS){var q=function(b,k){return"-"+k.toLowerCase()};G(a,function(b,k){-1===u.indexOf(k)&&(c+=k.replace(/([A-Z])/g,q)+":"+b+";")});c&&l(t,"style",c)}else w(t,a);this.added&&
("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline))}return this};E.prototype.dashstyleSetter=function(a){var b=this["stroke-width"];"inherit"===b&&(b=1);if(a=a&&a.toLowerCase()){var k=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(a=k.length;a--;)k[a]=
""+T(k[a])*M(b,NaN);a=k.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}};E.prototype.destroy=function(){var a=this,b=a.element||{},k=a.renderer,t=k.isSVG&&"SPAN"===b.nodeName&&a.parentGroup||void 0,c=b.ownerSVGElement;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;K(a);if(a.clipPath&&c){var g=a.clipPath;[].forEach.call(c.querySelectorAll("[clip-path],[CLIP-PATH]"),function(b){-1<b.getAttribute("clip-path").indexOf(g.element.id)&&b.removeAttribute("clip-path")});
a.clipPath=g.destroy()}if(a.stops){for(c=0;c<a.stops.length;c++)a.stops[c].destroy();a.stops.length=0;a.stops=void 0}a.safeRemoveChild(b);for(k.styledMode||a.destroyShadows();t&&t.div&&0===t.div.childNodes.length;)b=t.parentGroup,a.safeRemoveChild(t.div),delete t.div,t=b;a.alignTo&&d(k.alignedObjects,a);G(a,function(b,k){a[k]&&a[k].parentGroup===a&&a[k].destroy&&a[k].destroy();delete a[k]})};E.prototype.destroyShadows=function(){(this.shadows||[]).forEach(function(a){this.safeRemoveChild(a)},this);
this.shadows=void 0};E.prototype.destroyTextPath=function(a,b){var k=a.getElementsByTagName("text")[0];if(k){if(k.removeAttribute("dx"),k.removeAttribute("dy"),b.element.setAttribute("id",""),this.textPathWrapper&&k.getElementsByTagName("textPath").length){for(a=this.textPathWrapper.element.childNodes;a.length;)k.appendChild(a[0]);k.removeChild(this.textPathWrapper.element)}}else if(a.getAttribute("dx")||a.getAttribute("dy"))a.removeAttribute("dx"),a.removeAttribute("dy");this.textPathWrapper&&(this.textPathWrapper=
this.textPathWrapper.destroy())};E.prototype.dSetter=function(c,b,k){a(c)&&("string"===typeof c[0]&&(c=this.renderer.pathToSegments(c)),this.pathArray=c,c=c.reduce(function(b,k,a){return k&&k.join?(a?b+" ":"")+k.join(" "):(k||"").toString()},""));/(NaN| {2}|^$)/.test(c)&&(c="M 0 0");this[b]!==c&&(k.setAttribute(b,c),this[b]=c)};E.prototype.fadeOut=function(a){var b=this;b.animate({opacity:0},{duration:M(a,150),complete:function(){b.attr({y:-9999}).hide()}})};E.prototype.fillSetter=function(a,b,k){"string"===
typeof a?k.setAttribute(b,a):a&&this.complexColor(a,b,k)};E.prototype.getBBox=function(a,b){var k,t=this.renderer,c=this.element,d=this.styles,p=this.textStr,u=t.cache,B=t.cacheKeys,A=c.namespaceURI===this.SVG_NS;b=M(b,this.rotation,0);var l=t.styledMode?c&&E.prototype.getStyle.call(c,"font-size"):d&&d.fontSize;if(r(p)){var n=p.toString();-1===n.indexOf("<")&&(n=n.replace(/[0-9]/g,"0"));n+=["",b,l,this.textWidth,d&&d.textOverflow,d&&d.fontWeight].join()}n&&!a&&(k=u[n]);if(!k){if(A||t.forExport){try{var w=
this.fakeTS&&function(b){[].forEach.call(c.querySelectorAll(".highcharts-text-outline"),function(k){k.style.display=b})};q(w)&&w("none");k=c.getBBox?g({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight};q(w)&&w("")}catch(ca){""}if(!k||0>k.width)k={width:0,height:0}}else k=this.htmlGetBBox();t.isSVG&&(a=k.width,t=k.height,A&&(k.height=t={"11px,17":14,"13px,20":16}[d&&d.fontSize+","+Math.round(t)]||t),b&&(d=b*C,k.width=Math.abs(t*Math.sin(d))+Math.abs(a*Math.cos(d)),k.height=Math.abs(t*Math.cos(d))+
Math.abs(a*Math.sin(d))));if(n&&0<k.height){for(;250<B.length;)delete u[B.shift()];u[n]||B.push(n);u[n]=k}}return k};E.prototype.getStyle=function(a){return n.getComputedStyle(this.element||this,"").getPropertyValue(a)};E.prototype.hasClass=function(a){return-1!==(""+this.attr("class")).split(" ").indexOf(a)};E.prototype.hide=function(a){a?this.attr({y:-9999}):this.attr({visibility:"hidden"});return this};E.prototype.htmlGetBBox=function(){return{height:0,width:0,x:0,y:0}};E.prototype.init=function(a,
b){this.element="span"===b?J(b):y.createElementNS(this.SVG_NS,b);this.renderer=a;c(this,"afterInit")};E.prototype.invert=function(a){this.inverted=a;this.updateTransform();return this};E.prototype.on=function(a,b){var k,t,c=this.element,d;e&&"click"===a?(c.ontouchstart=function(b){k=b.touches[0].clientX;t=b.touches[0].clientY},c.ontouchend=function(a){k&&4<=Math.sqrt(Math.pow(k-a.changedTouches[0].clientX,2)+Math.pow(t-a.changedTouches[0].clientY,2))||b.call(c,a);d=!0;!1!==a.cancelable&&a.preventDefault()},
c.onclick=function(k){d||b.call(c,k)}):c["on"+a]=b;return this};E.prototype.opacitySetter=function(a,b,k){this.opacity=a=Number(Number(a).toFixed(3));k.setAttribute(b,a)};E.prototype.removeClass=function(a){return this.attr("class",(""+this.attr("class")).replace(B(a)?new RegExp("(^| )"+a+"( |$)"):a," ").replace(/ +/g," ").trim())};E.prototype.removeTextOutline=function(a){for(var b=a.length,k;b--;)k=a[b],"highcharts-text-outline"===k.getAttribute("class")&&d(a,this.element.removeChild(k))};E.prototype.safeRemoveChild=
function(a){var b=a.parentNode;b&&b.removeChild(a)};E.prototype.setRadialReference=function(a){var b=this.element.gradient&&this.renderer.gradients[this.element.gradient];this.element.radialReference=a;b&&b.radAttr&&b.animate(this.renderer.getRadialAttr(a,b.radAttr));return this};E.prototype.setTextPath=function(a,b){var k=this.element,t={textAnchor:"text-anchor"},c=!1,d=this.textPathWrapper,g=!d;b=A(!0,{enabled:!0,attributes:{dy:-5,startOffset:"50%",textAnchor:"middle"}},b);var q=b.attributes;if(a&&
b&&b.enabled){d&&null===d.element.parentNode?(g=!0,d=d.destroy()):d&&this.removeTextOutline.call(d.parentGroup,[].slice.call(k.getElementsByTagName("tspan")));this.options&&this.options.padding&&(q.dx=-this.options.padding);d||(this.textPathWrapper=d=this.renderer.createElement("textPath"),c=!0);var u=d.element;(b=a.element.getAttribute("id"))||a.element.setAttribute("id",b=O());if(g)for(a=k.getElementsByTagName("tspan");a.length;)a[0].setAttribute("y",0),p(q.dx)&&a[0].setAttribute("x",-q.dx),u.appendChild(a[0]);
c&&d&&d.add({element:this.text?this.text.element:k});u.setAttributeNS("http://www.w3.org/1999/xlink","href",this.renderer.url+"#"+b);r(q.dy)&&(u.parentNode.setAttribute("dy",q.dy),delete q.dy);r(q.dx)&&(u.parentNode.setAttribute("dx",q.dx),delete q.dx);G(q,function(b,k){u.setAttribute(t[k]||k,b)});k.removeAttribute("transform");this.removeTextOutline.call(d,[].slice.call(k.getElementsByTagName("tspan")));this.text&&!this.renderer.styledMode&&this.attr({fill:"none","stroke-width":0});this.applyTextOutline=
this.updateTransform=v}else d&&(delete this.updateTransform,delete this.applyTextOutline,this.destroyTextPath(k,a),this.updateTransform(),this.options&&this.options.rotation&&this.applyTextOutline(this.options.style.textOutline));return this};E.prototype.shadow=function(a,b,k){var t=[],c=this.element,d=!1,p=this.oldShadowOptions;var q={color:"#000000",offsetX:1,offsetY:1,opacity:.15,width:3};var u;!0===a?u=q:"object"===typeof a&&(u=g(q,a));u&&(u&&p&&G(u,function(b,k){b!==p[k]&&(d=!0)}),d&&this.destroyShadows(),
this.oldShadowOptions=u);if(!u)this.destroyShadows();else if(!this.shadows){var r=u.opacity/u.width;var B=this.parentInverted?"translate(-1,-1)":"translate("+u.offsetX+", "+u.offsetY+")";for(q=1;q<=u.width;q++){var A=c.cloneNode(!1);var n=2*u.width+1-2*q;l(A,{stroke:a.color||"#000000","stroke-opacity":r*q,"stroke-width":n,transform:B,fill:"none"});A.setAttribute("class",(A.getAttribute("class")||"")+" highcharts-shadow");k&&(l(A,"height",Math.max(l(A,"height")-n,0)),A.cutHeight=n);b?b.element.appendChild(A):
c.parentNode&&c.parentNode.insertBefore(A,c);t.push(A)}this.shadows=t}return this};E.prototype.show=function(a){return this.attr({visibility:a?"inherit":"visible"})};E.prototype.strokeSetter=function(a,b,k){this[b]=a;this.stroke&&this["stroke-width"]?(E.prototype.fillSetter.call(this,this.stroke,"stroke",k),k.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===b&&0===a&&this.hasStroke?(k.removeAttribute("stroke"),this.hasStroke=!1):this.renderer.styledMode&&this["stroke-width"]&&
(k.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0)};E.prototype.strokeWidth=function(){if(!this.renderer.styledMode)return this["stroke-width"]||0;var a=this.getStyle("stroke-width"),b=0;if(a.indexOf("px")===a.length-2)b=T(a);else if(""!==a){var k=y.createElementNS(D,"rect");l(k,{width:a,"stroke-width":0});this.element.parentNode.appendChild(k);b=k.getBBox().width;k.parentNode.removeChild(k)}return b};E.prototype.symbolAttr=function(a){var b=this;"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(k){b[k]=
M(a[k],b[k])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})};E.prototype.textSetter=function(a){a!==this.textStr&&(delete this.textPxLength,this.textStr=a,this.added&&this.renderer.buildText(this))};E.prototype.titleSetter=function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=y.createElementNS(this.SVG_NS,"title"),this.element.appendChild(b));b.firstChild&&b.removeChild(b.firstChild);b.appendChild(y.createTextNode(String(M(a,"")).replace(/<[^>]*>/g,"").replace(/&lt;/g,
"<").replace(/&gt;/g,">")))};E.prototype.toFront=function(){var a=this.element;a.parentNode.appendChild(a);return this};E.prototype.translate=function(a,b){return this.attr({translateX:a,translateY:b})};E.prototype.updateShadows=function(a,b,k){var t=this.shadows;if(t)for(var c=t.length;c--;)k.call(t[c],"height"===a?Math.max(b-(t[c].cutHeight||0),0):"d"===a?this.d:b,a,t[c])};E.prototype.updateTransform=function(){var a=this.translateX||0,b=this.translateY||0,k=this.scaleX,t=this.scaleY,c=this.inverted,
d=this.rotation,g=this.matrix,p=this.element;c&&(a+=this.width,b+=this.height);a=["translate("+a+","+b+")"];r(g)&&a.push("matrix("+g.join(",")+")");c?a.push("rotate(90) scale(-1,1)"):d&&a.push("rotate("+d+" "+M(this.rotationOriginX,p.getAttribute("x"),0)+" "+M(this.rotationOriginY,p.getAttribute("y")||0)+")");(r(k)||r(t))&&a.push("scale("+M(k,1)+" "+M(t,1)+")");a.length&&p.setAttribute("transform",a.join(" "))};E.prototype.visibilitySetter=function(a,b,k){"inherit"===a?k.removeAttribute(b):this[b]!==
a&&k.setAttribute(b,a);this[b]=a};E.prototype.xGetter=function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)};E.prototype.zIndexSetter=function(a,b){var k=this.renderer,t=this.parentGroup,c=(t||k).element||k.box,d=this.element,g=!1;k=c===k.box;var p=this.added;var q;r(a)?(d.setAttribute("data-z-index",a),a=+a,this[b]===a&&(p=!1)):r(this[b])&&d.removeAttribute("data-z-index");this[b]=a;if(p){(a=this.zIndex)&&t&&(t.handleZ=!0);b=c.childNodes;for(q=
b.length-1;0<=q&&!g;q--){t=b[q];p=t.getAttribute("data-z-index");var u=!r(p);if(t!==d)if(0>a&&u&&!k&&!q)c.insertBefore(d,b[q]),g=!0;else if(T(p)<=a||u&&(!r(a)||0<=a))c.insertBefore(d,b[q+1]||null),g=!0}g||(c.insertBefore(d,b[k?3:0]||null),g=!0)}return g};return E}();f.prototype["stroke-widthSetter"]=f.prototype.strokeSetter;f.prototype.yGetter=f.prototype.xGetter;f.prototype.matrixSetter=f.prototype.rotationOriginXSetter=f.prototype.rotationOriginYSetter=f.prototype.rotationSetter=f.prototype.scaleXSetter=
f.prototype.scaleYSetter=f.prototype.translateXSetter=f.prototype.translateYSetter=f.prototype.verticalAlignSetter=function(a,c){this[c]=a;this.doTransform=!0};m.SVGElement=f;return m.SVGElement});N(m,"Core/Renderer/SVG/SVGLabel.js",[m["Core/Renderer/SVG/SVGElement.js"],m["Core/Utilities.js"]],function(f,h){var m=this&&this.__extends||function(){var f=function(e,I){f=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(v,e){v.__proto__=e}||function(v,e){for(var f in e)e.hasOwnProperty(f)&&
(v[f]=e[f])};return f(e,I)};return function(e,I){function v(){this.constructor=e}f(e,I);e.prototype=null===I?Object.create(I):(v.prototype=I.prototype,new v)}}(),z=h.defined,F=h.extend,L=h.isNumber,K=h.merge,C=h.removeEvent;return function(h){function e(f,v,x,D,n,l,J,w,r,d){var g=h.call(this)||this;g.init(f,"g");g.textStr=v;g.x=x;g.y=D;g.anchorX=l;g.anchorY=J;g.baseline=r;g.className=d;"button"!==d&&g.addClass("highcharts-label");d&&g.addClass("highcharts-"+d);g.text=f.text("",0,0,w).attr({zIndex:1});
if("string"===typeof n){var c=/^url\((.*?)\)$/.test(n);if(g.renderer.symbols[n]||c)g.symbolKey=n}g.bBox=e.emptyBBox;g.padding=3;g.paddingLeft=0;g.baselineOffset=0;g.needsBox=f.styledMode||c;g.deferredAttr={};g.alignFactor=0;return g}m(e,h);e.prototype.alignSetter=function(e){e={left:0,center:.5,right:1}[e];e!==this.alignFactor&&(this.alignFactor=e,this.bBox&&L(this.xSetting)&&this.attr({x:this.xSetting}))};e.prototype.anchorXSetter=function(e,v){this.anchorX=e;this.boxAttr(v,Math.round(e)-this.getCrispAdjust()-
this.xSetting)};e.prototype.anchorYSetter=function(e,v){this.anchorY=e;this.boxAttr(v,e-this.ySetting)};e.prototype.boxAttr=function(e,v){this.box?this.box.attr(e,v):this.deferredAttr[e]=v};e.prototype.css=function(h){if(h){var v={};h=K(h);e.textProps.forEach(function(e){"undefined"!==typeof h[e]&&(v[e]=h[e],delete h[e])});this.text.css(v);var I="fontSize"in v||"fontWeight"in v;if("width"in v||I)this.updateBoxSize(),I&&this.updateTextPadding()}return f.prototype.css.call(this,h)};e.prototype.destroy=
function(){C(this.element,"mouseenter");C(this.element,"mouseleave");this.text&&this.text.destroy();this.box&&(this.box=this.box.destroy());f.prototype.destroy.call(this)};e.prototype.fillSetter=function(e,v){e&&(this.needsBox=!0);this.fill=e;this.boxAttr(v,e)};e.prototype.getBBox=function(){var e=this.bBox,v=this.padding;return{width:e.width+2*v,height:e.height+2*v,x:e.x-v,y:e.y-v}};e.prototype.getCrispAdjust=function(){return this.renderer.styledMode&&this.box?this.box.strokeWidth()%2/2:(this["stroke-width"]?
parseInt(this["stroke-width"],10):0)%2/2};e.prototype.heightSetter=function(e){this.heightSetting=e};e.prototype.on=function(e,v){var h=this,D=h.text,n=D&&"SPAN"===D.element.tagName?D:void 0;if(n){var l=function(l){("mouseenter"===e||"mouseleave"===e)&&l.relatedTarget instanceof Element&&(h.element.contains(l.relatedTarget)||n.element.contains(l.relatedTarget))||v.call(h.element,l)};n.on(e,l)}f.prototype.on.call(h,e,l||v);return h};e.prototype.onAdd=function(){var e=this.textStr;this.text.add(this);
this.attr({text:z(e)?e:"",x:this.x,y:this.y});this.box&&z(this.anchorX)&&this.attr({anchorX:this.anchorX,anchorY:this.anchorY})};e.prototype.paddingSetter=function(e){z(e)&&e!==this.padding&&(this.padding=e,this.updateTextPadding())};e.prototype.paddingLeftSetter=function(e){z(e)&&e!==this.paddingLeft&&(this.paddingLeft=e,this.updateTextPadding())};e.prototype.rSetter=function(e,v){this.boxAttr(v,e)};e.prototype.shadow=function(e){e&&!this.renderer.styledMode&&(this.updateBoxSize(),this.box&&this.box.shadow(e));
return this};e.prototype.strokeSetter=function(e,v){this.stroke=e;this.boxAttr(v,e)};e.prototype["stroke-widthSetter"]=function(e,v){e&&(this.needsBox=!0);this["stroke-width"]=e;this.boxAttr(v,e)};e.prototype["text-alignSetter"]=function(e){this.textAlign=e};e.prototype.textSetter=function(e){"undefined"!==typeof e&&this.text.attr({text:e});this.updateBoxSize();this.updateTextPadding()};e.prototype.updateBoxSize=function(){var f=this.text.element.style,v={},h=this.padding,D=this.paddingLeft,n=L(this.widthSetting)&&
L(this.heightSetting)&&!this.textAlign||!z(this.text.textStr)?e.emptyBBox:this.text.getBBox();this.width=(this.widthSetting||n.width||0)+2*h+D;this.height=(this.heightSetting||n.height||0)+2*h;this.baselineOffset=h+Math.min(this.renderer.fontMetrics(f&&f.fontSize,this.text).b,n.height||Infinity);this.needsBox&&(this.box||(f=this.box=this.symbolKey?this.renderer.symbol(this.symbolKey):this.renderer.rect(),f.addClass(("button"===this.className?"":"highcharts-label-box")+(this.className?" highcharts-"+
this.className+"-box":"")),f.add(this),f=this.getCrispAdjust(),v.x=f,v.y=(this.baseline?-this.baselineOffset:0)+f),v.width=Math.round(this.width),v.height=Math.round(this.height),this.box.attr(F(v,this.deferredAttr)),this.deferredAttr={});this.bBox=n};e.prototype.updateTextPadding=function(){var e=this.text,f=this.baseline?0:this.baselineOffset,h=this.paddingLeft+this.padding;z(this.widthSetting)&&this.bBox&&("center"===this.textAlign||"right"===this.textAlign)&&(h+={center:.5,right:1}[this.textAlign]*
(this.widthSetting-this.bBox.width));if(h!==e.x||f!==e.y)e.attr("x",h),e.hasBoxWidthChanged&&(this.bBox=e.getBBox(!0),this.updateBoxSize()),"undefined"!==typeof f&&e.attr("y",f);e.x=h;e.y=f};e.prototype.widthSetter=function(e){this.widthSetting=L(e)?e:void 0};e.prototype.xSetter=function(e){this.x=e;this.alignFactor&&(e-=this.alignFactor*((this.widthSetting||this.bBox.width)+2*this.padding),this["forceAnimate:x"]=!0);this.xSetting=Math.round(e);this.attr("translateX",this.xSetting)};e.prototype.ySetter=
function(e){this.ySetting=this.y=Math.round(e);this.attr("translateY",this.ySetting)};e.emptyBBox={width:0,height:0,x:0,y:0};e.textProps="color cursor direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");return e}(f)});N(m,"Core/Renderer/SVG/SVGRenderer.js",[m["Core/Color/Color.js"],m["Core/Globals.js"],m["Core/Renderer/SVG/SVGElement.js"],m["Core/Renderer/SVG/SVGLabel.js"],m["Core/Utilities.js"]],function(f,h,m,z,F){var P=
F.addEvent,K=F.attr,C=F.createElement,y=F.css,e=F.defined,I=F.destroyObjectProperties,v=F.extend,x=F.isArray,D=F.isNumber,n=F.isObject,l=F.isString,J=F.merge,w=F.objectEach,r=F.pick,d=F.pInt,g=F.splat,c=F.uniqueKey,a=h.charts,q=h.deg2rad,p=h.doc,B=h.isFirefox,A=h.isMS,G=h.isWebKit;F=h.noop;var M=h.svg,T=h.SVG_NS,Q=h.symbolSizes,O=h.win,E=function(){function u(b,k,a,c,d,g,p){this.width=this.url=this.style=this.isSVG=this.imgCount=this.height=this.gradients=this.globalAnimation=this.defs=this.chartIndex=
this.cacheKeys=this.cache=this.boxWrapper=this.box=this.alignedObjects=void 0;this.init(b,k,a,c,d,g,p)}u.prototype.init=function(b,k,a,c,d,g,q){var t=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"});q||t.css(this.getStyle(c));c=t.element;b.appendChild(c);K(b,"dir","ltr");-1===b.innerHTML.indexOf("xmlns")&&K(c,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=c;this.boxWrapper=t;this.alignedObjects=[];this.url=(B||G)&&p.getElementsByTagName("base").length?O.location.href.split("#")[0].replace(/<[^>]*>/g,
"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(p.createTextNode("Created with Highcharts 8.2.2"));this.defs=this.createElement("defs").add();this.allowHTML=g;this.forExport=d;this.styledMode=q;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(k,a,!1);var H;B&&b.getBoundingClientRect&&(k=function(){y(b,{left:0,top:0});H=b.getBoundingClientRect();y(b,{left:Math.ceil(H.left)-H.left+"px",top:Math.ceil(H.top)-H.top+
"px"})},k(),this.unSubPixelFix=P(O,"resize",k))};u.prototype.definition=function(b){function k(b,t){var c;g(b).forEach(function(b){var d=a.createElement(b.tagName),g={};w(b,function(b,k){"tagName"!==k&&"children"!==k&&"textContent"!==k&&(g[k]=b)});d.attr(g);d.add(t||a.defs);b.textContent&&d.element.appendChild(p.createTextNode(b.textContent));k(b.children||[],d);c=d});return c}var a=this;return k(b)};u.prototype.getStyle=function(b){return this.style=v({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
fontSize:"12px"},b)};u.prototype.setStyle=function(b){this.boxWrapper.css(this.getStyle(b))};u.prototype.isHidden=function(){return!this.boxWrapper.getBBox().width};u.prototype.destroy=function(){var b=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();I(this.gradients||{});this.gradients=null;b&&(this.defs=b.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null};u.prototype.createElement=function(b){var k=new this.Element;k.init(this,b);return k};u.prototype.getRadialAttr=
function(b,k){return{cx:b[0]-b[2]/2+k.cx*b[2],cy:b[1]-b[2]/2+k.cy*b[2],r:k.r*b[2]}};u.prototype.truncate=function(b,k,a,c,d,g,q){var t=this,H=b.rotation,R,u=c?1:0,A=(a||c).length,r=A,B=[],n=function(b){k.firstChild&&k.removeChild(k.firstChild);b&&k.appendChild(p.createTextNode(b))},l=function(g,p){p=p||g;if("undefined"===typeof B[p])if(k.getSubStringLength)try{B[p]=d+k.getSubStringLength(0,c?p+1:p)}catch(ja){""}else t.getSpanWidth&&(n(q(a||c,g)),B[p]=d+t.getSpanWidth(b,k));return B[p]},e;b.rotation=
0;var w=l(k.textContent.length);if(e=d+w>g){for(;u<=A;)r=Math.ceil((u+A)/2),c&&(R=q(c,r)),w=l(r,R&&R.length-1),u===A?u=A+1:w>g?A=r-1:u=r;0===A?n(""):a&&A===a.length-1||n(R||q(a||c,r))}c&&c.splice(0,r);b.actualWidth=w;b.rotation=H;return e};u.prototype.buildText=function(b){var k=b.element,a=this,c=a.forExport,g=r(b.textStr,"").toString(),q=-1!==g.indexOf("<"),u=k.childNodes,A,B=K(k,"x"),n=b.styles,e=b.textWidth,G=n&&n.lineHeight,f=n&&n.textOutline,V=n&&"ellipsis"===n.textOverflow,E=n&&"nowrap"===
n.whiteSpace,h=n&&n.fontSize,v,D=u.length;n=e&&!b.added&&this.box;var O=function(b){var t;a.styledMode||(t=/(px|em)$/.test(b&&b.style.fontSize)?b.style.fontSize:h||a.style.fontSize||12);return G?d(G):a.fontMetrics(t,b.getAttribute("style")?b:k).h},J=function(b,k){w(a.escapes,function(a,t){k&&-1!==k.indexOf(a)||(b=b.toString().replace(new RegExp(a,"g"),t))});return b},x=function(b,k){var a=b.indexOf("<");b=b.substring(a,b.indexOf(">")-a);a=b.indexOf(k+"=");if(-1!==a&&(a=a+k.length+1,k=b.charAt(a),
'"'===k||"'"===k))return b=b.substring(a+1),b.substring(0,b.indexOf(k))},I=/<br.*?>/g;var m=[g,V,E,G,f,h,e].join();if(m!==b.textCache){for(b.textCache=m;D--;)k.removeChild(u[D]);q||f||V||e||-1!==g.indexOf(" ")&&(!E||I.test(g))?(n&&n.appendChild(k),q?(g=a.styledMode?g.replace(/<(b|strong)>/g,'<span class="highcharts-strong">').replace(/<(i|em)>/g,'<span class="highcharts-emphasized">'):g.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">'),
g=g.replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(I)):g=[g],g=g.filter(function(b){return""!==b}),g.forEach(function(t,d){var g=0,H=0;t=t.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");var q=t.split("|||");q.forEach(function(t){if(""!==t||1===q.length){var R={},u=p.createElementNS(a.SVG_NS,"tspan"),n,r;(n=x(t,"class"))&&K(u,"class",n);if(n=x(t,"style"))n=n.replace(/(;| |^)color([ :])/,"$1fill$2"),K(u,"style",n);if((r=x(t,"href"))&&
!c&&-1===r.split(":")[0].toLowerCase().indexOf("javascript")){var l=p.createElementNS(a.SVG_NS,"a");K(l,"href",r);K(u,"class","highcharts-anchor");l.appendChild(u);a.styledMode||y(u,{cursor:"pointer"})}t=J(t.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==t){u.appendChild(p.createTextNode(t));g?R.dx=0:d&&null!==B&&(R.x=B);K(u,R);k.appendChild(l||u);!g&&v&&(!M&&c&&y(u,{display:"block"}),K(u,"dy",O(u)));if(e){var w=t.replace(/([^\^])-/g,"$1- ").split(" ");R=!E&&(1<q.length||d||1<w.length);l=0;r=
O(u);if(V)A=a.truncate(b,u,t,void 0,0,Math.max(0,e-parseInt(h||12,10)),function(b,k){return b.substring(0,k)+"\u2026"});else if(R)for(;w.length;)w.length&&!E&&0<l&&(u=p.createElementNS(T,"tspan"),K(u,{dy:r,x:B}),n&&K(u,"style",n),u.appendChild(p.createTextNode(w.join(" ").replace(/- /g,"-"))),k.appendChild(u)),a.truncate(b,u,null,w,0===l?H:0,e,function(b,k){return w.slice(0,k).join(" ").replace(/- /g,"-")}),H=b.actualWidth,l++}g++}}});v=v||k.childNodes.length}),V&&A&&b.attr("title",J(b.textStr||"",
["&lt;","&gt;"])),n&&n.removeChild(k),l(f)&&b.applyTextOutline&&b.applyTextOutline(f)):k.appendChild(p.createTextNode(J(g)))}};u.prototype.getContrast=function(b){b=f.parse(b).rgba;b[0]*=1;b[1]*=1.2;b[2]*=.5;return 459<b[0]+b[1]+b[2]?"#000000":"#FFFFFF"};u.prototype.button=function(b,k,a,c,d,g,p,q,u,n){var t=this.label(b,k,a,u,void 0,void 0,n,void 0,"button"),H=0,R=this.styledMode;b=(d=d?J(d):d)&&d.style||{};d&&d.style&&delete d.style;t.attr(J({padding:8,r:2},d));if(!R){d=J({fill:"#f7f7f7",stroke:"#cccccc",
"stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},{style:b},d);var r=d.style;delete d.style;g=J(d,{fill:"#e6e6e6"},g);var B=g.style;delete g.style;p=J(d,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},p);var l=p.style;delete p.style;q=J(d,{style:{color:"#cccccc"}},q);var e=q.style;delete q.style}P(t.element,A?"mouseover":"mouseenter",function(){3!==H&&t.setState(1)});P(t.element,A?"mouseout":"mouseleave",function(){3!==H&&t.setState(H)});t.setState=function(b){1!==
b&&(t.state=H=b);t.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][b||0]);R||t.attr([d,g,p,q][b||0]).css([r,B,l,e][b||0])};R||t.attr(d).css(v({cursor:"default"},r));return t.on("click",function(b){3!==H&&c.call(t,b)})};u.prototype.crispLine=function(b,k,a){void 0===a&&(a="round");var t=b[0],c=b[1];t[1]===c[1]&&(t[1]=c[1]=Math[a](t[1])-k%2/2);t[2]===c[2]&&(t[2]=c[2]=Math[a](t[2])+k%2/2);return b};u.prototype.path=
function(b){var k=this.styledMode?{}:{fill:"none"};x(b)?k.d=b:n(b)&&v(k,b);return this.createElement("path").attr(k)};u.prototype.circle=function(b,k,a){b=n(b)?b:"undefined"===typeof b?{}:{x:b,y:k,r:a};k=this.createElement("circle");k.xSetter=k.ySetter=function(b,k,a){a.setAttribute("c"+k,b)};return k.attr(b)};u.prototype.arc=function(b,k,a,c,d,g){n(b)?(c=b,k=c.y,a=c.r,b=c.x):c={innerR:c,start:d,end:g};b=this.symbol("arc",b,k,a,a,c);b.r=a;return b};u.prototype.rect=function(b,k,a,c,d,g){d=n(b)?b.r:
d;var t=this.createElement("rect");b=n(b)?b:"undefined"===typeof b?{}:{x:b,y:k,width:Math.max(a,0),height:Math.max(c,0)};this.styledMode||("undefined"!==typeof g&&(b.strokeWidth=g,b=t.crisp(b)),b.fill="none");d&&(b.r=d);t.rSetter=function(b,k,a){t.r=b;K(a,{rx:b,ry:b})};t.rGetter=function(){return t.r};return t.attr(b)};u.prototype.setSize=function(b,k,a){var t=this.alignedObjects,c=t.length;this.width=b;this.height=k;for(this.boxWrapper.animate({width:b,height:k},{step:function(){this.attr({viewBox:"0 0 "+
this.attr("width")+" "+this.attr("height")})},duration:r(a,!0)?void 0:0});c--;)t[c].align()};u.prototype.g=function(b){var k=this.createElement("g");return b?k.attr({"class":"highcharts-"+b}):k};u.prototype.image=function(b,k,a,c,d,g){var t={preserveAspectRatio:"none"},p=function(b,k){b.setAttributeNS?b.setAttributeNS("http://www.w3.org/1999/xlink","href",k):b.setAttribute("hc-svg-href",k)},q=function(k){p(H.element,b);g.call(H,k)};1<arguments.length&&v(t,{x:k,y:a,width:c,height:d});var H=this.createElement("image").attr(t);
g?(p(H.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),t=new O.Image,P(t,"load",q),t.src=b,t.complete&&q({})):p(H.element,b);return H};u.prototype.symbol=function(b,k,t,c,d,g){var q=this,H=/^url\((.*?)\)$/,u=H.test(b),R=!u&&(this.symbols[b]?b:"circle"),n=R&&this.symbols[R],A;if(n){"number"===typeof k&&(A=n.call(this.symbols,Math.round(k||0),Math.round(t||0),c||0,d||0,g));var B=this.path(A);q.styledMode||B.attr("fill","none");v(B,{symbolName:R,x:k,y:t,width:c,
height:d});g&&v(B,g)}else if(u){var l=b.match(H)[1];B=this.image(l);B.imgwidth=r(Q[l]&&Q[l].width,g&&g.width);B.imgheight=r(Q[l]&&Q[l].height,g&&g.height);var w=function(){B.attr({width:B.width,height:B.height})};["width","height"].forEach(function(b){B[b+"Setter"]=function(b,k){var a={},t=this["img"+k],c="width"===k?"translateX":"translateY";this[k]=b;e(t)&&(g&&"within"===g.backgroundSize&&this.width&&this.height&&(t=Math.round(t*Math.min(this.width/this.imgwidth,this.height/this.imgheight))),this.element&&
this.element.setAttribute(k,t),this.alignByTranslate||(a[c]=((this[k]||0)-t)/2,this.attr(a)))}});e(k)&&B.attr({x:k,y:t});B.isImg=!0;e(B.imgwidth)&&e(B.imgheight)?w():(B.attr({width:0,height:0}),C("img",{onload:function(){var b=a[q.chartIndex];0===this.width&&(y(this,{position:"absolute",top:"-999em"}),p.body.appendChild(this));Q[l]={width:this.width,height:this.height};B.imgwidth=this.width;B.imgheight=this.height;B.element&&w();this.parentNode&&this.parentNode.removeChild(this);q.imgCount--;if(!q.imgCount&&
b&&!b.hasLoaded)b.onload()},src:l}),this.imgCount++)}return B};u.prototype.clipRect=function(b,k,a,d){var t=c()+"-",g=this.createElement("clipPath").attr({id:t}).add(this.defs);b=this.rect(b,k,a,d,0).add(g);b.id=t;b.clipPath=g;b.count=0;return b};u.prototype.text=function(b,k,a,c){var t={};if(c&&(this.allowHTML||!this.forExport))return this.html(b,k,a);t.x=Math.round(k||0);a&&(t.y=Math.round(a));e(b)&&(t.text=b);b=this.createElement("text").attr(t);c||(b.xSetter=function(b,k,a){var t=a.getElementsByTagName("tspan"),
c=a.getAttribute(k),d;for(d=0;d<t.length;d++){var g=t[d];g.getAttribute(k)===c&&g.setAttribute(k,b)}a.setAttribute(k,b)});return b};u.prototype.fontMetrics=function(b,k){b=!this.styledMode&&/px/.test(b)||!O.getComputedStyle?b||k&&k.style&&k.style.fontSize||this.style&&this.style.fontSize:k&&m.prototype.getStyle.call(k,"font-size");b=/px/.test(b)?d(b):12;k=24>b?b+3:Math.round(1.2*b);return{h:k,b:Math.round(.8*k),f:b}};u.prototype.rotCorr=function(b,k,a){var t=b;k&&a&&(t=Math.max(t*Math.cos(k*q),4));
return{x:-b/3*Math.sin(k*q),y:t}};u.prototype.pathToSegments=function(b){for(var k=[],a=[],c={A:8,C:7,H:2,L:3,M:3,Q:5,S:5,T:3,V:2},d=0;d<b.length;d++)l(a[0])&&D(b[d])&&a.length===c[a[0].toUpperCase()]&&b.splice(d,0,a[0].replace("M","L").replace("m","l")),"string"===typeof b[d]&&(a.length&&k.push(a.slice(0)),a.length=0),a.push(b[d]);k.push(a.slice(0));return k};u.prototype.label=function(b,k,a,c,d,g,p,q,u){return new z(this,b,k,a,c,d,g,p,q,u)};return u}();E.prototype.Element=m;E.prototype.SVG_NS=T;
E.prototype.draw=F;E.prototype.escapes={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"};E.prototype.symbols={circle:function(a,b,k,t){return this.arc(a+k/2,b+t/2,k/2,t/2,{start:.5*Math.PI,end:2.5*Math.PI,open:!1})},square:function(a,b,k,t){return[["M",a,b],["L",a+k,b],["L",a+k,b+t],["L",a,b+t],["Z"]]},triangle:function(a,b,k,t){return[["M",a+k/2,b],["L",a+k,b+t],["L",a,b+t],["Z"]]},"triangle-down":function(a,b,k,t){return[["M",a,b],["L",a+k,b],["L",a+k/2,b+t],["Z"]]},diamond:function(a,
b,k,t){return[["M",a+k/2,b],["L",a+k,b+t/2],["L",a+k/2,b+t],["L",a,b+t/2],["Z"]]},arc:function(a,b,k,t,c){var d=[];if(c){var g=c.start||0,p=c.end||0,q=c.r||k;k=c.r||t||k;var H=.001>Math.abs(p-g-2*Math.PI);p-=.001;t=c.innerR;H=r(c.open,H);var u=Math.cos(g),B=Math.sin(g),n=Math.cos(p),A=Math.sin(p);g=r(c.longArc,.001>p-g-Math.PI?0:1);d.push(["M",a+q*u,b+k*B],["A",q,k,0,g,r(c.clockwise,1),a+q*n,b+k*A]);e(t)&&d.push(H?["M",a+t*n,b+t*A]:["L",a+t*n,b+t*A],["A",t,t,0,g,e(c.clockwise)?1-c.clockwise:0,a+t*
u,b+t*B]);H||d.push(["Z"])}return d},callout:function(a,b,k,t,c){var d=Math.min(c&&c.r||0,k,t),g=d+6,p=c&&c.anchorX||0;c=c&&c.anchorY||0;var q=[["M",a+d,b],["L",a+k-d,b],["C",a+k,b,a+k,b,a+k,b+d],["L",a+k,b+t-d],["C",a+k,b+t,a+k,b+t,a+k-d,b+t],["L",a+d,b+t],["C",a,b+t,a,b+t,a,b+t-d],["L",a,b+d],["C",a,b,a,b,a+d,b]];p&&p>k?c>b+g&&c<b+t-g?q.splice(3,1,["L",a+k,c-6],["L",a+k+6,c],["L",a+k,c+6],["L",a+k,b+t-d]):q.splice(3,1,["L",a+k,t/2],["L",p,c],["L",a+k,t/2],["L",a+k,b+t-d]):p&&0>p?c>b+g&&c<b+t-g?
q.splice(7,1,["L",a,c+6],["L",a-6,c],["L",a,c-6],["L",a,b+d]):q.splice(7,1,["L",a,t/2],["L",p,c],["L",a,t/2],["L",a,b+d]):c&&c>t&&p>a+g&&p<a+k-g?q.splice(5,1,["L",p+6,b+t],["L",p,b+t+6],["L",p-6,b+t],["L",a+d,b+t]):c&&0>c&&p>a+g&&p<a+k-g&&q.splice(1,1,["L",p-6,b],["L",p,b-6],["L",p+6,b],["L",k-d,b]);return q}};h.SVGRenderer=E;h.Renderer=h.SVGRenderer;return h.Renderer});N(m,"Core/Renderer/HTML/HTMLElement.js",[m["Core/Globals.js"],m["Core/Renderer/SVG/SVGElement.js"],m["Core/Utilities.js"]],function(f,
h,m){var z=m.css,F=m.defined,P=m.extend,K=m.pick,C=m.pInt,y=f.isFirefox;P(h.prototype,{htmlCss:function(e){var f="SPAN"===this.element.tagName&&e&&"width"in e,h=K(f&&e.width,void 0);if(f){delete e.width;this.textWidth=h;var x=!0}e&&"ellipsis"===e.textOverflow&&(e.whiteSpace="nowrap",e.overflow="hidden");this.styles=P(this.styles,e);z(this.element,e);x&&this.htmlUpdateTransform();return this},htmlGetBBox:function(){var e=this.element;return{x:e.offsetLeft,y:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}},
htmlUpdateTransform:function(){if(this.added){var e=this.renderer,f=this.element,h=this.translateX||0,x=this.translateY||0,D=this.x||0,n=this.y||0,l=this.textAlign||"left",J={left:0,center:.5,right:1}[l],w=this.styles,r=w&&w.whiteSpace;z(f,{marginLeft:h,marginTop:x});!e.styledMode&&this.shadows&&this.shadows.forEach(function(a){z(a,{marginLeft:h+1,marginTop:x+1})});this.inverted&&[].forEach.call(f.childNodes,function(a){e.invertChild(a,f)});if("SPAN"===f.tagName){w=this.rotation;var d=this.textWidth&&
C(this.textWidth),g=[w,l,f.innerHTML,this.textWidth,this.textAlign].join(),c;(c=d!==this.oldTextWidth)&&!(c=d>this.oldTextWidth)&&((c=this.textPxLength)||(z(f,{width:"",whiteSpace:r||"nowrap"}),c=f.offsetWidth),c=c>d);c&&(/[ \-]/.test(f.textContent||f.innerText)||"ellipsis"===f.style.textOverflow)?(z(f,{width:d+"px",display:"block",whiteSpace:r||"normal"}),this.oldTextWidth=d,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;g!==this.cTT&&(r=e.fontMetrics(f.style.fontSize,f).b,!F(w)||w===(this.oldRotation||
0)&&l===this.oldAlign||this.setSpanRotation(w,J,r),this.getSpanCorrection(!F(w)&&this.textPxLength||f.offsetWidth,r,J,w,l));z(f,{left:D+(this.xCorr||0)+"px",top:n+(this.yCorr||0)+"px"});this.cTT=g;this.oldRotation=w;this.oldAlign=l}}else this.alignOnAdd=!0},setSpanRotation:function(e,f,h){var v={},D=this.renderer.getTransformKey();v[D]=v.transform="rotate("+e+"deg)";v[D+(y?"Origin":"-origin")]=v.transformOrigin=100*f+"% "+h+"px";z(this.element,v)},getSpanCorrection:function(e,f,h){this.xCorr=-e*h;
this.yCorr=-f}});return h});N(m,"Core/Renderer/HTML/HTMLRenderer.js",[m["Core/Globals.js"],m["Core/Renderer/SVG/SVGElement.js"],m["Core/Renderer/SVG/SVGRenderer.js"],m["Core/Utilities.js"]],function(f,h,m,z){var F=f.isFirefox,P=f.isMS,K=f.isWebKit,C=f.win,y=z.attr,e=z.createElement,I=z.extend,v=z.pick;I(m.prototype,{getTransformKey:function(){return P&&!/Edge/.test(C.navigator.userAgent)?"-ms-transform":K?"-webkit-transform":F?"MozTransform":C.opera?"-o-transform":""},html:function(f,D,n){var l=this.createElement("span"),
J=l.element,w=l.renderer,r=w.isSVG,d=function(d,c){["opacity","visibility"].forEach(function(a){d[a+"Setter"]=function(g,p,B){var q=d.div?d.div.style:c;h.prototype[a+"Setter"].call(this,g,p,B);q&&(q[p]=g)}});d.addedSetters=!0};l.textSetter=function(d){d!==J.innerHTML&&(delete this.bBox,delete this.oldTextWidth);this.textStr=d;J.innerHTML=v(d,"");l.doTransform=!0};r&&d(l,l.element.style);l.xSetter=l.ySetter=l.alignSetter=l.rotationSetter=function(d,c){"align"===c?l.alignValue=l.textAlign=d:l[c]=d;
l.doTransform=!0};l.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};l.attr({text:f,x:Math.round(D),y:Math.round(n)}).css({position:"absolute"});w.styledMode||l.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});J.style.whiteSpace="nowrap";l.css=l.htmlCss;r&&(l.add=function(g){var c=w.box.parentNode,a=[];if(this.parentGroup=g){var q=g.div;if(!q){for(;g;)a.push(g),g=g.parentGroup;a.reverse().forEach(function(g){function p(a,c){g[c]=a;"translateX"===
c?r.left=a+"px":r.top=a+"px";g.doTransform=!0}var n=y(g.element,"class");q=g.div=g.div||e("div",n?{className:n}:void 0,{position:"absolute",left:(g.translateX||0)+"px",top:(g.translateY||0)+"px",display:g.display,opacity:g.opacity,pointerEvents:g.styles&&g.styles.pointerEvents},q||c);var r=q.style;I(g,{classSetter:function(a){return function(c){this.element.setAttribute("class",c);a.className=c}}(q),on:function(){a[0].div&&l.on.apply({element:a[0].div},arguments);return g},translateXSetter:p,translateYSetter:p});
g.addedSetters||d(g)})}}else q=c;q.appendChild(J);l.added=!0;l.alignOnAdd&&l.htmlUpdateTransform();return l});return l}});return m});N(m,"Core/Axis/Tick.js",[m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h){var m=h.clamp,z=h.correctFloat,F=h.defined,L=h.destroyObjectProperties,K=h.extend,C=h.fireEvent,y=h.isNumber,e=h.merge,I=h.objectEach,v=h.pick,x=f.deg2rad;h=function(){function f(n,l,e,w,r){this.isNewLabel=this.isNew=!0;this.axis=n;this.pos=l;this.type=e||"";this.parameters=r||{};this.tickmarkOffset=
this.parameters.tickmarkOffset;this.options=this.parameters.options;C(this,"init");e||w||this.addLabel()}f.prototype.addLabel=function(){var n=this,l=n.axis,e=l.options,w=l.chart,r=l.categories,d=l.logarithmic,g=l.names,c=n.pos,a=v(n.options&&n.options.labels,e.labels),q=l.tickPositions,p=c===q[0],B=c===q[q.length-1];g=this.parameters.category||(r?v(r[c],g[c],c):c);var A=n.label;r=(!a.step||1===a.step)&&1===l.tickInterval;q=q.info;var f,h;if(l.dateTime&&q){var D=w.time.resolveDTLFormat(e.dateTimeLabelFormats[!e.grid&&
q.higherRanks[c]||q.unitName]);var x=D.main}n.isFirst=p;n.isLast=B;n.formatCtx={axis:l,chart:w,isFirst:p,isLast:B,dateTimeLabelFormat:x,tickPositionInfo:q,value:d?z(d.lin2log(g)):g,pos:c};e=l.labelFormatter.call(n.formatCtx,this.formatCtx);if(h=D&&D.list)n.shortenLabel=function(){for(f=0;f<h.length;f++)if(A.attr({text:l.labelFormatter.call(K(n.formatCtx,{dateTimeLabelFormat:h[f]}))}),A.getBBox().width<l.getSlotWidth(n)-2*v(a.padding,5))return;A.attr({text:""})};r&&l._addedPlotLB&&n.moveLabel(e,a);
F(A)||n.movedLabel?A&&A.textStr!==e&&!r&&(!A.textWidth||a.style&&a.style.width||A.styles.width||A.css({width:null}),A.attr({text:e}),A.textPxLength=A.getBBox().width):(n.label=A=n.createLabel({x:0,y:0},e,a),n.rotation=0)};f.prototype.createLabel=function(n,l,f){var w=this.axis,r=w.chart;if(n=F(l)&&f.enabled?r.renderer.text(l,n.x,n.y,f.useHTML).add(w.labelGroup):null)r.styledMode||n.css(e(f.style)),n.textPxLength=n.getBBox().width;return n};f.prototype.destroy=function(){L(this,this.axis)};f.prototype.getPosition=
function(n,l,e,w){var r=this.axis,d=r.chart,g=w&&d.oldChartHeight||d.chartHeight;n={x:n?z(r.translate(l+e,null,null,w)+r.transB):r.left+r.offset+(r.opposite?(w&&d.oldChartWidth||d.chartWidth)-r.right-r.left:0),y:n?g-r.bottom+r.offset-(r.opposite?r.height:0):z(g-r.translate(l+e,null,null,w)-r.transB)};n.y=m(n.y,-1E5,1E5);C(this,"afterGetPosition",{pos:n});return n};f.prototype.getLabelPosition=function(n,l,e,w,r,d,g,c){var a=this.axis,q=a.transA,p=a.isLinked&&a.linkedParent?a.linkedParent.reversed:
a.reversed,B=a.staggerLines,A=a.tickRotCorr||{x:0,y:0},f=r.y,h=w||a.reserveSpaceDefault?0:-a.labelOffset*("center"===a.labelAlign?.5:1),v={};F(f)||(f=0===a.side?e.rotation?-8:-e.getBBox().height:2===a.side?A.y+8:Math.cos(e.rotation*x)*(A.y-e.getBBox(!1,0).height/2));n=n+r.x+h+A.x-(d&&w?d*q*(p?-1:1):0);l=l+f-(d&&!w?d*q*(p?1:-1):0);B&&(e=g/(c||1)%B,a.opposite&&(e=B-e-1),l+=a.labelOffset/B*e);v.x=n;v.y=Math.round(l);C(this,"afterGetLabelPosition",{pos:v,tickmarkOffset:d,index:g});return v};f.prototype.getLabelSize=
function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0};f.prototype.getMarkPath=function(n,e,f,w,r,d){return d.crispLine([["M",n,e],["L",n+(r?0:-f),e+(r?f:0)]],w)};f.prototype.handleOverflow=function(n){var e=this.axis,f=e.options.labels,w=n.x,r=e.chart.chartWidth,d=e.chart.spacing,g=v(e.labelLeft,Math.min(e.pos,d[3]));d=v(e.labelRight,Math.max(e.isRadial?0:e.pos+e.len,r-d[1]));var c=this.label,a=this.rotation,q={left:0,center:.5,right:1}[e.labelAlign||c.attr("align")],
p=c.getBBox().width,B=e.getSlotWidth(this),A=B,G=1,h,D={};if(a||"justify"!==v(f.overflow,"justify"))0>a&&w-q*p<g?h=Math.round(w/Math.cos(a*x)-g):0<a&&w+q*p>d&&(h=Math.round((r-w)/Math.cos(a*x)));else if(r=w+(1-q)*p,w-q*p<g?A=n.x+A*(1-q)-g:r>d&&(A=d-n.x+A*q,G=-1),A=Math.min(B,A),A<B&&"center"===e.labelAlign&&(n.x+=G*(B-A-q*(B-Math.min(p,A)))),p>A||e.autoRotation&&(c.styles||{}).width)h=A;h&&(this.shortenLabel?this.shortenLabel():(D.width=Math.floor(h)+"px",(f.style||{}).textOverflow||(D.textOverflow=
"ellipsis"),c.css(D)))};f.prototype.moveLabel=function(n,e){var l=this,w=l.label,r=!1,d=l.axis,g=d.reversed;w&&w.textStr===n?(l.movedLabel=w,r=!0,delete l.label):I(d.ticks,function(a){r||a.isNew||a===l||!a.label||a.label.textStr!==n||(l.movedLabel=a.label,r=!0,a.labelPos=l.movedLabel.xy,delete a.label)});if(!r&&(l.labelPos||w)){var c=l.labelPos||w.xy;w=d.horiz?g?0:d.width+d.left:c.x;d=d.horiz?c.y:g?d.width+d.left:0;l.movedLabel=l.createLabel({x:w,y:d},n,e);l.movedLabel&&l.movedLabel.attr({opacity:0})}};
f.prototype.render=function(e,l,f){var n=this.axis,r=n.horiz,d=this.pos,g=v(this.tickmarkOffset,n.tickmarkOffset);d=this.getPosition(r,d,g,l);g=d.x;var c=d.y;n=r&&g===n.pos+n.len||!r&&c===n.pos?-1:1;f=v(f,1);this.isActive=!0;this.renderGridLine(l,f,n);this.renderMark(d,f,n);this.renderLabel(d,l,f,e);this.isNew=!1;C(this,"afterRender")};f.prototype.renderGridLine=function(n,e,f){var l=this.axis,r=l.options,d=this.gridLine,g={},c=this.pos,a=this.type,q=v(this.tickmarkOffset,l.tickmarkOffset),p=l.chart.renderer,
B=a?a+"Grid":"grid",A=r[B+"LineWidth"],G=r[B+"LineColor"];r=r[B+"LineDashStyle"];d||(l.chart.styledMode||(g.stroke=G,g["stroke-width"]=A,r&&(g.dashstyle=r)),a||(g.zIndex=1),n&&(e=0),this.gridLine=d=p.path().attr(g).addClass("highcharts-"+(a?a+"-":"")+"grid-line").add(l.gridGroup));if(d&&(f=l.getPlotLinePath({value:c+q,lineWidth:d.strokeWidth()*f,force:"pass",old:n})))d[n||this.isNew?"attr":"animate"]({d:f,opacity:e})};f.prototype.renderMark=function(n,e,f){var l=this.axis,r=l.options,d=l.chart.renderer,
g=this.type,c=g?g+"Tick":"tick",a=l.tickSize(c),q=this.mark,p=!q,B=n.x;n=n.y;var A=v(r[c+"Width"],!g&&l.isXAxis?1:0);r=r[c+"Color"];a&&(l.opposite&&(a[0]=-a[0]),p&&(this.mark=q=d.path().addClass("highcharts-"+(g?g+"-":"")+"tick").add(l.axisGroup),l.chart.styledMode||q.attr({stroke:r,"stroke-width":A})),q[p?"attr":"animate"]({d:this.getMarkPath(B,n,a[0],q.strokeWidth()*f,l.horiz,d),opacity:e}))};f.prototype.renderLabel=function(e,l,f,w){var n=this.axis,d=n.horiz,g=n.options,c=this.label,a=g.labels,
q=a.step;n=v(this.tickmarkOffset,n.tickmarkOffset);var p=!0,B=e.x;e=e.y;c&&y(B)&&(c.xy=e=this.getLabelPosition(B,e,c,d,a,n,w,q),this.isFirst&&!this.isLast&&!v(g.showFirstLabel,1)||this.isLast&&!this.isFirst&&!v(g.showLastLabel,1)?p=!1:!d||a.step||a.rotation||l||0===f||this.handleOverflow(e),q&&w%q&&(p=!1),p&&y(e.y)?(e.opacity=f,c[this.isNewLabel?"attr":"animate"](e),this.isNewLabel=!1):(c.attr("y",-9999),this.isNewLabel=!0))};f.prototype.replaceMovedLabel=function(){var e=this.label,l=this.axis,f=
l.reversed;if(e&&!this.isNew){var w=l.horiz?f?l.left:l.width+l.left:e.xy.x;f=l.horiz?e.xy.y:f?l.width+l.top:l.top;e.animate({x:w,y:f,opacity:0},void 0,e.destroy);delete this.label}l.isDirty=!0;this.label=this.movedLabel;delete this.movedLabel};return f}();f.Tick=h;return f.Tick});N(m,"Core/Time.js",[m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h){var m=h.defined,z=h.error,F=h.extend,L=h.isObject,K=h.merge,C=h.objectEach,y=h.pad,e=h.pick,I=h.splat,v=h.timeUnits,x=f.win;h=function(){function h(e){this.options=
{};this.variableTimezone=this.useUTC=!1;this.Date=x.Date;this.getTimezoneOffset=this.timezoneOffsetFunction();this.update(e)}h.prototype.get=function(e,l){if(this.variableTimezone||this.timezoneOffset){var n=l.getTime(),f=n-this.getTimezoneOffset(l);l.setTime(f);e=l["getUTC"+e]();l.setTime(n);return e}return this.useUTC?l["getUTC"+e]():l["get"+e]()};h.prototype.set=function(e,l,f){if(this.variableTimezone||this.timezoneOffset){if("Milliseconds"===e||"Seconds"===e||"Minutes"===e)return l["setUTC"+
e](f);var n=this.getTimezoneOffset(l);n=l.getTime()-n;l.setTime(n);l["setUTC"+e](f);e=this.getTimezoneOffset(l);n=l.getTime()+e;return l.setTime(n)}return this.useUTC?l["setUTC"+e](f):l["set"+e](f)};h.prototype.update=function(n){var l=e(n&&n.useUTC,!0);this.options=n=K(!0,this.options||{},n);this.Date=n.Date||x.Date||Date;this.timezoneOffset=(this.useUTC=l)&&n.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();this.variableTimezone=!(l&&!n.getTimezoneOffset&&!n.timezone)};h.prototype.makeTime=
function(n,l,h,w,r,d){if(this.useUTC){var g=this.Date.UTC.apply(0,arguments);var c=this.getTimezoneOffset(g);g+=c;var a=this.getTimezoneOffset(g);c!==a?g+=a-c:c-36E5!==this.getTimezoneOffset(g-36E5)||f.isSafari||(g-=36E5)}else g=(new this.Date(n,l,e(h,1),e(w,0),e(r,0),e(d,0))).getTime();return g};h.prototype.timezoneOffsetFunction=function(){var e=this,l=this.options,f=l.moment||x.moment;if(!this.useUTC)return function(e){return 6E4*(new Date(e.toString())).getTimezoneOffset()};if(l.timezone){if(f)return function(e){return 6E4*
-f.tz(e,l.timezone).utcOffset()};z(25)}return this.useUTC&&l.getTimezoneOffset?function(e){return 6E4*l.getTimezoneOffset(e.valueOf())}:function(){return 6E4*(e.timezoneOffset||0)}};h.prototype.dateFormat=function(n,l,h){var w;if(!m(l)||isNaN(l))return(null===(w=f.defaultOptions.lang)||void 0===w?void 0:w.invalidDate)||"";n=e(n,"%Y-%m-%d %H:%M:%S");var r=this;w=new this.Date(l);var d=this.get("Hours",w),g=this.get("Day",w),c=this.get("Date",w),a=this.get("Month",w),q=this.get("FullYear",w),p=f.defaultOptions.lang,
B=null===p||void 0===p?void 0:p.weekdays,A=null===p||void 0===p?void 0:p.shortWeekdays;w=F({a:A?A[g]:B[g].substr(0,3),A:B[g],d:y(c),e:y(c,2," "),w:g,b:p.shortMonths[a],B:p.months[a],m:y(a+1),o:a+1,y:q.toString().substr(2,2),Y:q,H:y(d),k:d,I:y(d%12||12),l:d%12||12,M:y(this.get("Minutes",w)),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:y(w.getSeconds()),L:y(Math.floor(l%1E3),3)},f.dateFormats);C(w,function(a,c){for(;-1!==n.indexOf("%"+c);)n=n.replace("%"+c,"function"===typeof a?a.call(r,l):a)});return h?n.substr(0,
1).toUpperCase()+n.substr(1):n};h.prototype.resolveDTLFormat=function(e){return L(e,!0)?e:(e=I(e),{main:e[0],from:e[1],to:e[2]})};h.prototype.getTimeTicks=function(n,l,f,h){var r=this,d=[],g={};var c=new r.Date(l);var a=n.unitRange,q=n.count||1,p;h=e(h,1);if(m(l)){r.set("Milliseconds",c,a>=v.second?0:q*Math.floor(r.get("Milliseconds",c)/q));a>=v.second&&r.set("Seconds",c,a>=v.minute?0:q*Math.floor(r.get("Seconds",c)/q));a>=v.minute&&r.set("Minutes",c,a>=v.hour?0:q*Math.floor(r.get("Minutes",c)/q));
a>=v.hour&&r.set("Hours",c,a>=v.day?0:q*Math.floor(r.get("Hours",c)/q));a>=v.day&&r.set("Date",c,a>=v.month?1:Math.max(1,q*Math.floor(r.get("Date",c)/q)));if(a>=v.month){r.set("Month",c,a>=v.year?0:q*Math.floor(r.get("Month",c)/q));var B=r.get("FullYear",c)}a>=v.year&&r.set("FullYear",c,B-B%q);a===v.week&&(B=r.get("Day",c),r.set("Date",c,r.get("Date",c)-B+h+(B<h?-7:0)));B=r.get("FullYear",c);h=r.get("Month",c);var A=r.get("Date",c),w=r.get("Hours",c);l=c.getTime();r.variableTimezone&&(p=f-l>4*v.month||
r.getTimezoneOffset(l)!==r.getTimezoneOffset(f));l=c.getTime();for(c=1;l<f;)d.push(l),l=a===v.year?r.makeTime(B+c*q,0):a===v.month?r.makeTime(B,h+c*q):!p||a!==v.day&&a!==v.week?p&&a===v.hour&&1<q?r.makeTime(B,h,A,w+c*q):l+a*q:r.makeTime(B,h,A+c*q*(a===v.day?1:7)),c++;d.push(l);a<=v.hour&&1E4>d.length&&d.forEach(function(a){0===a%18E5&&"000000000"===r.dateFormat("%H%M%S%L",a)&&(g[a]="day")})}d.info=F(n,{higherRanks:g,totalRange:a*q});return d};return h}();f.Time=h;return f.Time});N(m,"Core/Options.js",
[m["Core/Globals.js"],m["Core/Color/Color.js"],m["Core/Time.js"],m["Core/Utilities.js"]],function(f,h,m,z){var F=f.isTouchDevice,P=f.svg;h=h.parse;z=z.merge;"";f.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:{Date:void 0,getTimezoneOffset:void 0,timezone:void 0,timezoneOffset:0,useUTC:!0},chart:{styledMode:!1,borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,
height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},caption:{margin:15,text:"",align:"left",verticalAlign:"bottom"},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",
inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,
textAlign:"center"}},tooltip:{enabled:!0,animation:P,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:F?25:10,headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',backgroundColor:h("#f7f7f7").setOpacity(.85).get(),
borderWidth:1,shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};"";f.time=new m(z(f.defaultOptions.global,f.defaultOptions.time));f.dateFormat=function(h,m,y){return f.time.dateFormat(h,m,y)};return{dateFormat:f.dateFormat,defaultOptions:f.defaultOptions,time:f.time}});
N(m,"Core/Axis/Axis.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Color/Color.js"],m["Core/Globals.js"],m["Core/Axis/Tick.js"],m["Core/Utilities.js"],m["Core/Options.js"]],function(f,h,m,z,F,L){var K=f.animObject,C=F.addEvent,y=F.arrayMax,e=F.arrayMin,I=F.clamp,v=F.correctFloat,x=F.defined,D=F.destroyObjectProperties,n=F.error,l=F.extend,J=F.fireEvent,w=F.format,r=F.getMagnitude,d=F.isArray,g=F.isFunction,c=F.isNumber,a=F.isString,q=F.merge,p=F.normalizeTickInterval,B=F.objectEach,A=F.pick,
G=F.relativeLength,M=F.removeEvent,T=F.splat,Q=F.syncTimeout,O=L.defaultOptions,E=m.deg2rad;f=function(){function u(b,k){this.zoomEnabled=this.width=this.visible=this.userOptions=this.translationSlope=this.transB=this.transA=this.top=this.ticks=this.tickRotCorr=this.tickPositions=this.tickmarkOffset=this.tickInterval=this.tickAmount=this.side=this.series=this.right=this.positiveValuesOnly=this.pos=this.pointRangePadding=this.pointRange=this.plotLinesAndBandsGroups=this.plotLinesAndBands=this.paddedTicks=
this.overlap=this.options=this.oldMin=this.oldMax=this.offset=this.names=this.minPixelPadding=this.minorTicks=this.minorTickInterval=this.min=this.maxLabelLength=this.max=this.len=this.left=this.labelFormatter=this.labelEdge=this.isLinked=this.height=this.hasVisibleSeries=this.hasNames=this.coll=this.closestPointRange=this.chart=this.categories=this.bottom=this.alternateBands=void 0;this.init(b,k)}u.prototype.init=function(b,k){var a=k.isX,c=this;c.chart=b;c.horiz=b.inverted&&!c.isZAxis?!a:a;c.isXAxis=
a;c.coll=c.coll||(a?"xAxis":"yAxis");J(this,"init",{userOptions:k});c.opposite=k.opposite;c.side=k.side||(c.horiz?c.opposite?0:2:c.opposite?1:3);c.setOptions(k);var d=this.options,p=d.type;c.labelFormatter=d.labels.formatter||c.defaultLabelFormatter;c.userOptions=k;c.minPixelPadding=0;c.reversed=d.reversed;c.visible=!1!==d.visible;c.zoomEnabled=!1!==d.zoomEnabled;c.hasNames="category"===p||!0===d.categories;c.categories=d.categories||c.hasNames;c.names||(c.names=[],c.names.keys={});c.plotLinesAndBandsGroups=
{};c.positiveValuesOnly=!!c.logarithmic;c.isLinked=x(d.linkedTo);c.ticks={};c.labelEdge=[];c.minorTicks={};c.plotLinesAndBands=[];c.alternateBands={};c.len=0;c.minRange=c.userMinRange=d.minRange||d.maxZoom;c.range=d.range;c.offset=d.offset||0;c.max=null;c.min=null;c.crosshair=A(d.crosshair,T(b.options.tooltip.crosshairs)[a?0:1],!1);k=c.options.events;-1===b.axes.indexOf(c)&&(a?b.axes.splice(b.xAxis.length,0,c):b.axes.push(c),b[c.coll].push(c));c.series=c.series||[];b.inverted&&!c.isZAxis&&a&&"undefined"===
typeof c.reversed&&(c.reversed=!0);c.labelRotation=c.options.labels.rotation;B(k,function(b,k){g(b)&&C(c,k,b)});J(this,"afterInit")};u.prototype.setOptions=function(b){this.options=q(u.defaultOptions,"yAxis"===this.coll&&u.defaultYAxisOptions,[u.defaultTopAxisOptions,u.defaultRightAxisOptions,u.defaultBottomAxisOptions,u.defaultLeftAxisOptions][this.side],q(O[this.coll],b));J(this,"afterSetOptions",{userOptions:b})};u.prototype.defaultLabelFormatter=function(){var b=this.axis,k=c(this.value)?this.value:
NaN,a=b.chart.time,d=b.categories,g=this.dateTimeLabelFormat,p=O.lang,q=p.numericSymbols;p=p.numericSymbolMagnitude||1E3;var e=q&&q.length,u=b.options.labels.format;b=b.logarithmic?Math.abs(k):b.tickInterval;var B=this.chart,l=B.numberFormatter;if(u)var A=w(u,this,B);else if(d)A=""+this.value;else if(g)A=a.dateFormat(g,k);else if(e&&1E3<=b)for(;e--&&"undefined"===typeof A;)a=Math.pow(p,e+1),b>=a&&0===10*k%a&&null!==q[e]&&0!==k&&(A=l(k/a,-1)+q[e]);"undefined"===typeof A&&(A=1E4<=Math.abs(k)?l(k,-1):
l(k,-1,void 0,""));return A};u.prototype.getSeriesExtremes=function(){var b=this,k=b.chart,a;J(this,"getSeriesExtremes",null,function(){b.hasVisibleSeries=!1;b.dataMin=b.dataMax=b.threshold=null;b.softThreshold=!b.isXAxis;b.stacking&&b.stacking.buildStacks();b.series.forEach(function(t){if(t.visible||!k.options.chart.ignoreHiddenSeries){var d=t.options,g=d.threshold;b.hasVisibleSeries=!0;b.positiveValuesOnly&&0>=g&&(g=null);if(b.isXAxis){if(d=t.xData,d.length){d=b.logarithmic?d.filter(b.validatePositiveValue):
d;a=t.getXExtremes(d);var p=a.min;var q=a.max;c(p)||p instanceof Date||(d=d.filter(c),a=t.getXExtremes(d),p=a.min,q=a.max);d.length&&(b.dataMin=Math.min(A(b.dataMin,p),p),b.dataMax=Math.max(A(b.dataMax,q),q))}}else if(t=t.applyExtremes(),c(t.dataMin)&&(p=t.dataMin,b.dataMin=Math.min(A(b.dataMin,p),p)),c(t.dataMax)&&(q=t.dataMax,b.dataMax=Math.max(A(b.dataMax,q),q)),x(g)&&(b.threshold=g),!d.softThreshold||b.positiveValuesOnly)b.softThreshold=!1}})});J(this,"afterGetSeriesExtremes")};u.prototype.translate=
function(b,a,t,d,g,p){var k=this.linkedParent||this,q=1,e=0,H=d?k.oldTransA:k.transA;d=d?k.oldMin:k.min;var u=k.minPixelPadding;g=(k.isOrdinal||k.brokenAxis&&k.brokenAxis.hasBreaks||k.logarithmic&&g)&&k.lin2val;H||(H=k.transA);t&&(q*=-1,e=k.len);k.reversed&&(q*=-1,e-=q*(k.sector||k.len));a?(b=(b*q+e-u)/H+d,g&&(b=k.lin2val(b))):(g&&(b=k.val2lin(b)),b=c(d)?q*(b-d)*H+e+q*u+(c(p)?H*p:0):void 0);return b};u.prototype.toPixels=function(b,k){return this.translate(b,!1,!this.horiz,null,!0)+(k?0:this.pos)};
u.prototype.toValue=function(b,k){return this.translate(b-(k?0:this.pos),!0,!this.horiz,null,!0)};u.prototype.getPlotLinePath=function(b){function k(b,a,k){if("pass"!==l&&b<a||b>k)l?b=I(b,a,k):E=!0;return b}var a=this,d=a.chart,g=a.left,p=a.top,q=b.old,e=b.value,u=b.translatedValue,B=b.lineWidth,l=b.force,r,n,f,h,w=q&&d.oldChartHeight||d.chartHeight,G=q&&d.oldChartWidth||d.chartWidth,E,v=a.transB;b={value:e,lineWidth:B,old:q,force:l,acrossPanes:b.acrossPanes,translatedValue:u};J(this,"getPlotLinePath",
b,function(b){u=A(u,a.translate(e,null,null,q));u=I(u,-1E5,1E5);r=f=Math.round(u+v);n=h=Math.round(w-u-v);c(u)?a.horiz?(n=p,h=w-a.bottom,r=f=k(r,g,g+a.width)):(r=g,f=G-a.right,n=h=k(n,p,p+a.height)):(E=!0,l=!1);b.path=E&&!l?null:d.renderer.crispLine([["M",r,n],["L",f,h]],B||1)});return b.path};u.prototype.getLinearTickPositions=function(b,a,c){var k=v(Math.floor(a/b)*b);c=v(Math.ceil(c/b)*b);var t=[],d;v(k+b)===k&&(d=20);if(this.single)return[a];for(a=k;a<=c;){t.push(a);a=v(a+b,d);if(a===g)break;
var g=a}return t};u.prototype.getMinorTickInterval=function(){var b=this.options;return!0===b.minorTicks?A(b.minorTickInterval,"auto"):!1===b.minorTicks?null:b.minorTickInterval};u.prototype.getMinorTickPositions=function(){var b=this.options,a=this.tickPositions,c=this.minorTickInterval,d=[],g=this.pointRangePadding||0,p=this.min-g;g=this.max+g;var q=g-p;if(q&&q/c<this.len/3){var e=this.logarithmic;if(e)this.paddedTicks.forEach(function(b,a,k){a&&d.push.apply(d,e.getLogTickPositions(c,k[a-1],k[a],
!0))});else if(this.dateTime&&"auto"===this.getMinorTickInterval())d=d.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(c),p,g,b.startOfWeek));else for(b=p+(a[0]-p)%c;b<=g&&b!==d[0];b+=c)d.push(b)}0!==d.length&&this.trimTicks(d);return d};u.prototype.adjustForMinRange=function(){var b=this.options,a=this.min,c=this.max,d=this.logarithmic,g,p,q,u,B;this.isXAxis&&"undefined"===typeof this.minRange&&!d&&(x(b.min)||x(b.max)?this.minRange=null:(this.series.forEach(function(b){u=b.xData;
for(p=B=b.xIncrement?1:u.length-1;0<p;p--)if(q=u[p]-u[p-1],"undefined"===typeof g||q<g)g=q}),this.minRange=Math.min(5*g,this.dataMax-this.dataMin)));if(c-a<this.minRange){var l=this.dataMax-this.dataMin>=this.minRange;var r=this.minRange;var n=(r-c+a)/2;n=[a-n,A(b.min,a-n)];l&&(n[2]=this.logarithmic?this.logarithmic.log2lin(this.dataMin):this.dataMin);a=y(n);c=[a+r,A(b.max,a+r)];l&&(c[2]=d?d.log2lin(this.dataMax):this.dataMax);c=e(c);c-a<r&&(n[0]=c-r,n[1]=A(b.min,c-r),a=y(n))}this.min=a;this.max=
c};u.prototype.getClosest=function(){var b;this.categories?b=1:this.series.forEach(function(a){var k=a.closestPointRange,c=a.visible||!a.chart.options.chart.ignoreHiddenSeries;!a.noSharedTooltip&&x(k)&&c&&(b=x(b)?Math.min(b,k):k)});return b};u.prototype.nameToX=function(b){var a=d(this.categories),c=a?this.categories:this.names,g=b.options.x;b.series.requireSorting=!1;x(g)||(g=!1===this.options.uniqueNames?b.series.autoIncrement():a?c.indexOf(b.name):A(c.keys[b.name],-1));if(-1===g){if(!a)var p=c.length}else p=
g;"undefined"!==typeof p&&(this.names[p]=b.name,this.names.keys[b.name]=p);return p};u.prototype.updateNames=function(){var b=this,a=this.names;0<a.length&&(Object.keys(a.keys).forEach(function(b){delete a.keys[b]}),a.length=0,this.minRange=this.userMinRange,(this.series||[]).forEach(function(a){a.xIncrement=null;if(!a.points||a.isDirtyData)b.max=Math.max(b.max,a.xData.length-1),a.processData(),a.generatePoints();a.data.forEach(function(k,c){if(k&&k.options&&"undefined"!==typeof k.name){var d=b.nameToX(k);
"undefined"!==typeof d&&d!==k.x&&(k.x=d,a.xData[c]=d)}})}))};u.prototype.setAxisTranslation=function(b){var k=this,c=k.max-k.min,d=k.axisPointRange||0,g=0,p=0,q=k.linkedParent,e=!!k.categories,u=k.transA,B=k.isXAxis;if(B||e||d){var l=k.getClosest();q?(g=q.minPointOffset,p=q.pointRangePadding):k.series.forEach(function(b){var c=e?1:B?A(b.options.pointRange,l,0):k.axisPointRange||0,t=b.options.pointPlacement;d=Math.max(d,c);if(!k.single||e)b=b.is("xrange")?!B:B,g=Math.max(g,b&&a(t)?0:c/2),p=Math.max(p,
b&&"on"===t?0:c)});q=k.ordinal&&k.ordinal.slope&&l?k.ordinal.slope/l:1;k.minPointOffset=g*=q;k.pointRangePadding=p*=q;k.pointRange=Math.min(d,k.single&&e?1:c);B&&(k.closestPointRange=l)}b&&(k.oldTransA=u);k.translationSlope=k.transA=u=k.staticScale||k.len/(c+p||1);k.transB=k.horiz?k.left:k.bottom;k.minPixelPadding=u*g;J(this,"afterSetAxisTranslation")};u.prototype.minFromRange=function(){return this.max-this.range};u.prototype.setTickInterval=function(b){var a=this,d=a.chart,g=a.logarithmic,q=a.options,
e=a.isXAxis,u=a.isLinked,B=q.maxPadding,l=q.minPadding,f=q.tickInterval,h=q.tickPixelInterval,w=a.categories,G=c(a.threshold)?a.threshold:null,E=a.softThreshold;a.dateTime||w||u||this.getTickAmount();var O=A(a.userMin,q.min);var D=A(a.userMax,q.max);if(u){a.linkedParent=d[a.coll][q.linkedTo];var M=a.linkedParent.getExtremes();a.min=A(M.min,M.dataMin);a.max=A(M.max,M.dataMax);q.type!==a.linkedParent.options.type&&n(11,1,d)}else{if(E&&x(G))if(a.dataMin>=G)M=G,l=0;else if(a.dataMax<=G){var m=G;B=0}a.min=
A(O,M,a.dataMin);a.max=A(D,m,a.dataMax)}g&&(a.positiveValuesOnly&&!b&&0>=Math.min(a.min,A(a.dataMin,a.min))&&n(10,1,d),a.min=v(g.log2lin(a.min),16),a.max=v(g.log2lin(a.max),16));a.range&&x(a.max)&&(a.userMin=a.min=O=Math.max(a.dataMin,a.minFromRange()),a.userMax=D=a.max,a.range=null);J(a,"foundExtremes");a.beforePadding&&a.beforePadding();a.adjustForMinRange();!(w||a.axisPointRange||a.stacking&&a.stacking.usePercentage||u)&&x(a.min)&&x(a.max)&&(d=a.max-a.min)&&(!x(O)&&l&&(a.min-=d*l),!x(D)&&B&&(a.max+=
d*B));c(a.userMin)||(c(q.softMin)&&q.softMin<a.min&&(a.min=O=q.softMin),c(q.floor)&&(a.min=Math.max(a.min,q.floor)));c(a.userMax)||(c(q.softMax)&&q.softMax>a.max&&(a.max=D=q.softMax),c(q.ceiling)&&(a.max=Math.min(a.max,q.ceiling)));E&&x(a.dataMin)&&(G=G||0,!x(O)&&a.min<G&&a.dataMin>=G?a.min=a.options.minRange?Math.min(G,a.max-a.minRange):G:!x(D)&&a.max>G&&a.dataMax<=G&&(a.max=a.options.minRange?Math.max(G,a.min+a.minRange):G));a.tickInterval=a.min===a.max||"undefined"===typeof a.min||"undefined"===
typeof a.max?1:u&&!f&&h===a.linkedParent.options.tickPixelInterval?f=a.linkedParent.tickInterval:A(f,this.tickAmount?(a.max-a.min)/Math.max(this.tickAmount-1,1):void 0,w?1:(a.max-a.min)*h/Math.max(a.len,h));e&&!b&&a.series.forEach(function(b){b.processData(a.min!==a.oldMin||a.max!==a.oldMax)});a.setAxisTranslation(!0);J(this,"initialAxisTranslation");a.pointRange&&!f&&(a.tickInterval=Math.max(a.pointRange,a.tickInterval));b=A(q.minTickInterval,a.dateTime&&!a.series.some(function(b){return b.noSharedTooltip})?
a.closestPointRange:0);!f&&a.tickInterval<b&&(a.tickInterval=b);a.dateTime||a.logarithmic||f||(a.tickInterval=p(a.tickInterval,void 0,r(a.tickInterval),A(q.allowDecimals,.5>a.tickInterval||void 0!==this.tickAmount),!!this.tickAmount));this.tickAmount||(a.tickInterval=a.unsquish());this.setTickPositions()};u.prototype.setTickPositions=function(){var b=this.options,a=b.tickPositions;var c=this.getMinorTickInterval();var d=b.tickPositioner,g=this.hasVerticalPanning(),p="colorAxis"===this.coll,q=(p||
!g)&&b.startOnTick;g=(p||!g)&&b.endOnTick;this.tickmarkOffset=this.categories&&"between"===b.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===c&&this.tickInterval?this.tickInterval/5:c;this.single=this.min===this.max&&x(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==b.allowDecimals);this.tickPositions=c=a&&a.slice();!c&&(this.ordinal&&this.ordinal.positions||!((this.max-this.min)/this.tickInterval>Math.max(2*this.len,200))?c=this.dateTime?this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval,
b.units),this.min,this.max,b.startOfWeek,this.ordinal&&this.ordinal.positions,this.closestPointRange,!0):this.logarithmic?this.logarithmic.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max):(c=[this.min,this.max],n(19,!1,this.chart)),c.length>this.len&&(c=[c[0],c.pop()],c[0]===c[1]&&(c.length=1)),this.tickPositions=c,d&&(d=d.apply(this,[this.min,this.max])))&&(this.tickPositions=c=d);this.paddedTicks=c.slice(0);this.trimTicks(c,
q,g);this.isLinked||(this.single&&2>c.length&&!this.categories&&!this.series.some(function(b){return b.is("heatmap")&&"between"===b.options.pointPlacement})&&(this.min-=.5,this.max+=.5),a||d||this.adjustTickAmount());J(this,"afterSetTickPositions")};u.prototype.trimTicks=function(b,a,c){var k=b[0],d=b[b.length-1],t=!this.isOrdinal&&this.minPointOffset||0;J(this,"trimTicks");if(!this.isLinked){if(a&&-Infinity!==k)this.min=k;else for(;this.min-t>b[0];)b.shift();if(c)this.max=d;else for(;this.max+t<
b[b.length-1];)b.pop();0===b.length&&x(k)&&!this.options.tickPositions&&b.push((d+k)/2)}};u.prototype.alignToOthers=function(){var b={},a,c=this.options;!1===this.chart.options.chart.alignTicks||!1===c.alignTicks||!1===c.startOnTick||!1===c.endOnTick||this.logarithmic||this.chart[this.coll].forEach(function(k){var c=k.options;c=[k.horiz?c.left:c.top,c.width,c.height,c.pane].join();k.series.length&&(b[c]?a=!0:b[c]=1)});return a};u.prototype.getTickAmount=function(){var b=this.options,a=b.tickAmount,
c=b.tickPixelInterval;!x(b.tickInterval)&&!a&&this.len<c&&!this.isRadial&&!this.logarithmic&&b.startOnTick&&b.endOnTick&&(a=2);!a&&this.alignToOthers()&&(a=Math.ceil(this.len/c)+1);4>a&&(this.finalTickAmt=a,a=5);this.tickAmount=a};u.prototype.adjustTickAmount=function(){var b=this.options,a=this.tickInterval,c=this.tickPositions,d=this.tickAmount,g=this.finalTickAmt,p=c&&c.length,q=A(this.threshold,this.softThreshold?0:null),e;if(this.hasData()){if(p<d){for(e=this.min;c.length<d;)c.length%2||e===
q?c.push(v(c[c.length-1]+a)):c.unshift(v(c[0]-a));this.transA*=(p-1)/(d-1);this.min=b.startOnTick?c[0]:Math.min(this.min,c[0]);this.max=b.endOnTick?c[c.length-1]:Math.max(this.max,c[c.length-1])}else p>d&&(this.tickInterval*=2,this.setTickPositions());if(x(g)){for(a=b=c.length;a--;)(3===g&&1===a%2||2>=g&&0<a&&a<b-1)&&c.splice(a,1);this.finalTickAmt=void 0}}};u.prototype.setScale=function(){var b,a=!1,c=!1;this.series.forEach(function(b){var k;a=a||b.isDirtyData||b.isDirty;c=c||(null===(k=b.xAxis)||
void 0===k?void 0:k.isDirty)||!1});this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();(b=this.len!==this.oldAxisLength)||a||c||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.stacking&&this.stacking.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||
this.max!==this.oldMax)):this.stacking&&this.stacking.cleanStacks();a&&this.panningState&&(this.panningState.isDirty=!0);J(this,"afterSetScale")};u.prototype.setExtremes=function(b,a,c,d,g){var k=this,t=k.chart;c=A(c,!0);k.series.forEach(function(b){delete b.kdTree});g=l(g,{min:b,max:a});J(k,"setExtremes",g,function(){k.userMin=b;k.userMax=a;k.eventArgs=g;c&&t.redraw(d)})};u.prototype.zoom=function(b,a){var k=this,c=this.dataMin,d=this.dataMax,g=this.options,p=Math.min(c,A(g.min,c)),q=Math.max(d,
A(g.max,d));b={newMin:b,newMax:a};J(this,"zoom",b,function(b){var a=b.newMin,g=b.newMax;if(a!==k.min||g!==k.max)k.allowZoomOutside||(x(c)&&(a<p&&(a=p),a>q&&(a=q)),x(d)&&(g<p&&(g=p),g>q&&(g=q))),k.displayBtn="undefined"!==typeof a||"undefined"!==typeof g,k.setExtremes(a,g,!1,void 0,{trigger:"zoom"});b.zoomed=!0});return b.zoomed};u.prototype.setAxisSize=function(){var b=this.chart,a=this.options,c=a.offsets||[0,0,0,0],d=this.horiz,g=this.width=Math.round(G(A(a.width,b.plotWidth-c[3]+c[1]),b.plotWidth)),
p=this.height=Math.round(G(A(a.height,b.plotHeight-c[0]+c[2]),b.plotHeight)),q=this.top=Math.round(G(A(a.top,b.plotTop+c[0]),b.plotHeight,b.plotTop));a=this.left=Math.round(G(A(a.left,b.plotLeft+c[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-p-q;this.right=b.chartWidth-g-a;this.len=Math.max(d?g:p,0);this.pos=d?a:q};u.prototype.getExtremes=function(){var b=this.logarithmic;return{min:b?v(b.lin2log(this.min)):this.min,max:b?v(b.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,
userMin:this.userMin,userMax:this.userMax}};u.prototype.getThreshold=function(b){var a=this.logarithmic,c=a?a.lin2log(this.min):this.min;a=a?a.lin2log(this.max):this.max;null===b||-Infinity===b?b=c:Infinity===b?b=a:c>b?b=c:a<b&&(b=a);return this.translate(b,0,1,0,1)};u.prototype.autoLabelAlign=function(b){var a=(A(b,0)-90*this.side+720)%360;b={align:"center"};J(this,"autoLabelAlign",b,function(b){15<a&&165>a?b.align="right":195<a&&345>a&&(b.align="left")});return b.align};u.prototype.tickSize=function(b){var a=
this.options,c=a["tick"===b?"tickLength":"minorTickLength"],d=A(a["tick"===b?"tickWidth":"minorTickWidth"],"tick"===b&&this.isXAxis&&!this.categories?1:0);if(d&&c){"inside"===a[b+"Position"]&&(c=-c);var g=[c,d]}b={tickSize:g};J(this,"afterTickSize",b);return b.tickSize};u.prototype.labelMetrics=function(){var b=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[b]&&this.ticks[b].label)};u.prototype.unsquish=
function(){var b=this.options.labels,a=this.horiz,c=this.tickInterval,d=c,g=this.len/(((this.categories?1:0)+this.max-this.min)/c),p,q=b.rotation,e=this.labelMetrics(),u,B=Number.MAX_VALUE,l,r=this.max-this.min,n=function(b){var a=b/(g||1);a=1<a?Math.ceil(a):1;a*c>r&&Infinity!==b&&Infinity!==g&&r&&(a=Math.ceil(r/c));return v(a*c)};a?(l=!b.staggerLines&&!b.step&&(x(q)?[q]:g<A(b.autoRotationLimit,80)&&b.autoRotation))&&l.forEach(function(b){if(b===q||b&&-90<=b&&90>=b){u=n(Math.abs(e.h/Math.sin(E*b)));
var a=u+Math.abs(b/360);a<B&&(B=a,p=b,d=u)}}):b.step||(d=n(e.h));this.autoRotation=l;this.labelRotation=A(p,q);return d};u.prototype.getSlotWidth=function(b){var a,d=this.chart,g=this.horiz,p=this.options.labels,q=Math.max(this.tickPositions.length-(this.categories?0:1),1),e=d.margin[3];if(b&&c(b.slotWidth))return b.slotWidth;if(g&&p&&2>(p.step||0))return p.rotation?0:(this.staggerLines||1)*this.len/q;if(!g){b=null===(a=null===p||void 0===p?void 0:p.style)||void 0===a?void 0:a.width;if(void 0!==b)return parseInt(b,
10);if(e)return e-d.spacing[3]}return.33*d.chartWidth};u.prototype.renderUnsquish=function(){var b=this.chart,k=b.renderer,c=this.tickPositions,d=this.ticks,g=this.options.labels,p=g&&g.style||{},q=this.horiz,e=this.getSlotWidth(),u=Math.max(1,Math.round(e-2*(g.padding||5))),B={},l=this.labelMetrics(),r=g.style&&g.style.textOverflow,n=0;a(g.rotation)||(B.rotation=g.rotation||0);c.forEach(function(b){b=d[b];b.movedLabel&&b.replaceMovedLabel();b&&b.label&&b.label.textPxLength>n&&(n=b.label.textPxLength)});
this.maxLabelLength=n;if(this.autoRotation)n>u&&n>l.h?B.rotation=this.labelRotation:this.labelRotation=0;else if(e){var A=u;if(!r){var f="clip";for(u=c.length;!q&&u--;){var h=c[u];if(h=d[h].label)h.styles&&"ellipsis"===h.styles.textOverflow?h.css({textOverflow:"clip"}):h.textPxLength>e&&h.css({width:e+"px"}),h.getBBox().height>this.len/c.length-(l.h-l.f)&&(h.specificTextOverflow="ellipsis")}}}B.rotation&&(A=n>.5*b.chartHeight?.33*b.chartHeight:n,r||(f="ellipsis"));if(this.labelAlign=g.align||this.autoLabelAlign(this.labelRotation))B.align=
this.labelAlign;c.forEach(function(b){var a=(b=d[b])&&b.label,k=p.width,c={};a&&(a.attr(B),b.shortenLabel?b.shortenLabel():A&&!k&&"nowrap"!==p.whiteSpace&&(A<a.textPxLength||"SPAN"===a.element.tagName)?(c.width=A+"px",r||(c.textOverflow=a.specificTextOverflow||f),a.css(c)):a.styles&&a.styles.width&&!c.width&&!k&&a.css({width:null}),delete a.specificTextOverflow,b.rotation=B.rotation)},this);this.tickRotCorr=k.rotCorr(l.b,this.labelRotation||0,0!==this.side)};u.prototype.hasData=function(){return this.series.some(function(b){return b.hasData()})||
this.options.showEmpty&&x(this.min)&&x(this.max)};u.prototype.addTitle=function(b){var a=this.chart.renderer,c=this.horiz,d=this.opposite,g=this.options.title,p,e=this.chart.styledMode;this.axisTitle||((p=g.textAlign)||(p=(c?{low:"left",middle:"center",high:"right"}:{low:d?"right":"left",middle:"center",high:d?"left":"right"})[g.align]),this.axisTitle=a.text(g.text,0,0,g.useHTML).attr({zIndex:7,rotation:g.rotation||0,align:p}).addClass("highcharts-axis-title"),e||this.axisTitle.css(q(g.style)),this.axisTitle.add(this.axisGroup),
this.axisTitle.isNew=!0);e||g.style.width||this.isRadial||this.axisTitle.css({width:this.len+"px"});this.axisTitle[b?"show":"hide"](b)};u.prototype.generateTick=function(b){var a=this.ticks;a[b]?a[b].addLabel():a[b]=new z(this,b)};u.prototype.getOffset=function(){var b=this,a=b.chart,c=a.renderer,d=b.options,g=b.tickPositions,p=b.ticks,q=b.horiz,e=b.side,u=a.inverted&&!b.isZAxis?[1,0,3,2][e]:e,l,n=0,r=0,f=d.title,h=d.labels,G=0,w=a.axisOffset;a=a.clipOffset;var E=[-1,1,1,-1][e],v=d.className,O=b.axisParent;
var D=b.hasData();b.showAxis=l=D||A(d.showEmpty,!0);b.staggerLines=b.horiz&&h.staggerLines;b.axisGroup||(b.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(v||"")).add(O),b.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(v||"")).add(O),b.labelGroup=c.g("axis-labels").attr({zIndex:h.zIndex||7}).addClass("highcharts-"+b.coll.toLowerCase()+"-labels "+(v||"")).add(O));D||b.isLinked?(g.forEach(function(a,
c){b.generateTick(a,c)}),b.renderUnsquish(),b.reserveSpaceDefault=0===e||2===e||{1:"left",3:"right"}[e]===b.labelAlign,A(h.reserveSpace,"center"===b.labelAlign?!0:null,b.reserveSpaceDefault)&&g.forEach(function(b){G=Math.max(p[b].getLabelSize(),G)}),b.staggerLines&&(G*=b.staggerLines),b.labelOffset=G*(b.opposite?-1:1)):B(p,function(b,a){b.destroy();delete p[a]});if(f&&f.text&&!1!==f.enabled&&(b.addTitle(l),l&&!1!==f.reserveSpace)){b.titleOffset=n=b.axisTitle.getBBox()[q?"height":"width"];var M=f.offset;
r=x(M)?0:A(f.margin,q?5:10)}b.renderLine();b.offset=E*A(d.offset,w[e]?w[e]+(d.margin||0):0);b.tickRotCorr=b.tickRotCorr||{x:0,y:0};c=0===e?-b.labelMetrics().h:2===e?b.tickRotCorr.y:0;r=Math.abs(G)+r;G&&(r=r-c+E*(q?A(h.y,b.tickRotCorr.y+8*E):h.x));b.axisTitleMargin=A(M,r);b.getMaxLabelDimensions&&(b.maxLabelDimensions=b.getMaxLabelDimensions(p,g));q=this.tickSize("tick");w[e]=Math.max(w[e],b.axisTitleMargin+n+E*b.offset,r,g&&g.length&&q?q[0]+E*b.offset:0);d=d.offset?0:2*Math.floor(b.axisLine.strokeWidth()/
2);a[u]=Math.max(a[u],d);J(this,"afterGetOffset")};u.prototype.getLinePath=function(b){var a=this.chart,c=this.opposite,d=this.offset,g=this.horiz,p=this.left+(c?this.width:0)+d;d=a.chartHeight-this.bottom-(c?this.height:0)+d;c&&(b*=-1);return a.renderer.crispLine([["M",g?this.left:p,g?d:this.top],["L",g?a.chartWidth-this.right:p,g?d:a.chartHeight-this.bottom]],b)};u.prototype.renderLine=function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))};u.prototype.getTitlePosition=function(){var b=this.horiz,a=this.left,c=this.top,d=this.len,g=this.options.title,p=b?a:c,q=this.opposite,e=this.offset,u=g.x||0,B=g.y||0,l=this.axisTitle,r=this.chart.renderer.fontMetrics(g.style&&g.style.fontSize,l);l=Math.max(l.getBBox(null,0).height-r.h-1,0);d={low:p+(b?0:d),middle:p+d/2,high:p+(b?d:0)}[g.align];a=(b?c+this.height:a)+(b?1:-1)*
(q?-1:1)*this.axisTitleMargin+[-l,l,r.f,-l][this.side];b={x:b?d+u:a+(q?this.width:0)+e+u,y:b?a+B-(q?this.height:0)+e:d+B};J(this,"afterGetTitlePosition",{titlePosition:b});return b};u.prototype.renderMinorTick=function(b){var a=this.chart.hasRendered&&c(this.oldMin),d=this.minorTicks;d[b]||(d[b]=new z(this,b,"minor"));a&&d[b].isNew&&d[b].render(null,!0);d[b].render(null,!1,1)};u.prototype.renderTick=function(b,a){var k,d=this.isLinked,g=this.ticks,p=this.chart.hasRendered&&c(this.oldMin);if(!d||b>=
this.min&&b<=this.max||(null===(k=this.grid)||void 0===k?0:k.isColumn))g[b]||(g[b]=new z(this,b)),p&&g[b].isNew&&g[b].render(a,!0,-1),g[b].render(a)};u.prototype.render=function(){var b=this,a=b.chart,d=b.logarithmic,g=b.options,p=b.isLinked,q=b.tickPositions,e=b.axisTitle,u=b.ticks,l=b.minorTicks,r=b.alternateBands,n=g.stackLabels,f=g.alternateGridColor,A=b.tickmarkOffset,h=b.axisLine,G=b.showAxis,w=K(a.renderer.globalAnimation),E,v;b.labelEdge.length=0;b.overlap=!1;[u,l,r].forEach(function(b){B(b,
function(b){b.isActive=!1})});if(b.hasData()||p)b.minorTickInterval&&!b.categories&&b.getMinorTickPositions().forEach(function(a){b.renderMinorTick(a)}),q.length&&(q.forEach(function(a,c){b.renderTick(a,c)}),A&&(0===b.min||b.single)&&(u[-1]||(u[-1]=new z(b,-1,null,!0)),u[-1].render(-1))),f&&q.forEach(function(c,k){v="undefined"!==typeof q[k+1]?q[k+1]+A:b.max-A;0===k%2&&c<b.max&&v<=b.max+(a.polar?-A:A)&&(r[c]||(r[c]=new m.PlotLineOrBand(b)),E=c+A,r[c].options={from:d?d.lin2log(E):E,to:d?d.lin2log(v):
v,color:f,className:"highcharts-alternate-grid"},r[c].render(),r[c].isActive=!0)}),b._addedPlotLB||((g.plotLines||[]).concat(g.plotBands||[]).forEach(function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);[u,l,r].forEach(function(b){var c,k=[],d=w.duration;B(b,function(b,a){b.isActive||(b.render(a,!1,0),b.isActive=!1,k.push(a))});Q(function(){for(c=k.length;c--;)b[k[c]]&&!b[k[c]].isActive&&(b[k[c]].destroy(),delete b[k[c]])},b!==r&&a.hasRendered&&d?d:0)});h&&(h[h.isPlaced?"animate":"attr"]({d:this.getLinePath(h.strokeWidth())}),
h.isPlaced=!0,h[G?"show":"hide"](G));e&&G&&(g=b.getTitlePosition(),c(g.y)?(e[e.isNew?"attr":"animate"](g),e.isNew=!1):(e.attr("y",-9999),e.isNew=!0));n&&n.enabled&&b.stacking&&b.stacking.renderStackTotals();b.isDirty=!1;J(this,"afterRender")};u.prototype.redraw=function(){this.visible&&(this.render(),this.plotLinesAndBands.forEach(function(b){b.render()}));this.series.forEach(function(b){b.isDirty=!0})};u.prototype.getKeepProps=function(){return this.keepProps||u.keepProps};u.prototype.destroy=function(b){var a=
this,c=a.plotLinesAndBands,d;J(this,"destroy",{keepEvents:b});b||M(a);[a.ticks,a.minorTicks,a.alternateBands].forEach(function(b){D(b)});if(c)for(b=c.length;b--;)c[b].destroy();"axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(b){a[b]&&(a[b]=a[b].destroy())});for(d in a.plotLinesAndBandsGroups)a.plotLinesAndBandsGroups[d]=a.plotLinesAndBandsGroups[d].destroy();B(a,function(b,c){-1===a.getKeepProps().indexOf(c)&&delete a[c]})};u.prototype.drawCrosshair=
function(b,a){var c=this.crosshair,k=A(c.snap,!0),d,g=this.cross,p=this.chart;J(this,"drawCrosshair",{e:b,point:a});b||(b=this.cross&&this.cross.e);if(this.crosshair&&!1!==(x(a)||!k)){k?x(a)&&(d=A("colorAxis"!==this.coll?a.crosshairPos:null,this.isXAxis?a.plotX:this.len-a.plotY)):d=b&&(this.horiz?b.chartX-this.pos:this.len-b.chartY+this.pos);if(x(d)){var q={value:a&&(this.isXAxis?a.x:A(a.stackY,a.y)),translatedValue:d};p.polar&&l(q,{isCrosshair:!0,chartX:b&&b.chartX,chartY:b&&b.chartY,point:a});q=
this.getPlotLinePath(q)||null}if(!x(q)){this.hideCrosshair();return}k=this.categories&&!this.isRadial;g||(this.cross=g=p.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(k?"category ":"thin ")+c.className).attr({zIndex:A(c.zIndex,2)}).add(),p.styledMode||(g.attr({stroke:c.color||(k?h.parse("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":A(c.width,1)}).css({"pointer-events":"none"}),c.dashStyle&&g.attr({dashstyle:c.dashStyle})));g.show().attr({d:q});k&&!c.width&&g.attr({"stroke-width":this.transA});
this.cross.e=b}else this.hideCrosshair();J(this,"afterDrawCrosshair",{e:b,point:a})};u.prototype.hideCrosshair=function(){this.cross&&this.cross.hide();J(this,"afterHideCrosshair")};u.prototype.hasVerticalPanning=function(){var b,a;return/y/.test((null===(a=null===(b=this.chart.options.chart)||void 0===b?void 0:b.panning)||void 0===a?void 0:a.type)||"")};u.prototype.validatePositiveValue=function(b){return c(b)&&0<b};u.defaultOptions={dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",range:!1},
second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,labels:{enabled:!0,indentation:10,x:0,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,showEmpty:!0,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",
style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"};u.defaultYAxisOptions={endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{animation:{},allowOverlap:!1,enabled:!1,crop:!0,overflow:"justify",formatter:function(){var b=this.axis.chart.numberFormatter;return b(this.total,
-1)},style:{color:"#000000",fontSize:"11px",fontWeight:"bold",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0};u.defaultLeftAxisOptions={labels:{x:-15},title:{rotation:270}};u.defaultRightAxisOptions={labels:{x:15},title:{rotation:90}};u.defaultBottomAxisOptions={labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}};u.defaultTopAxisOptions={labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}};u.keepProps="extKey hcEvents names series userMax userMin".split(" ");return u}();
m.Axis=f;return m.Axis});N(m,"Core/Axis/DateTimeAxis.js",[m["Core/Axis/Axis.js"],m["Core/Utilities.js"]],function(f,h){var m=h.addEvent,z=h.getMagnitude,F=h.normalizeTickInterval,L=h.timeUnits,K=function(){function f(f){this.axis=f}f.prototype.normalizeTimeTickInterval=function(f,e){var h=e||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];e=h[h.length-
1];var v=L[e[0]],x=e[1],D;for(D=0;D<h.length&&!(e=h[D],v=L[e[0]],x=e[1],h[D+1]&&f<=(v*x[x.length-1]+L[h[D+1][0]])/2);D++);v===L.year&&f<5*v&&(x=[1,2,5]);f=F(f/v,x,"year"===e[0]?Math.max(z(f/v),1):1);return{unitRange:v,count:f,unitName:e[0]}};return f}();h=function(){function f(){}f.compose=function(f){f.keepProps.push("dateTime");f.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};m(f,"init",function(e){"datetime"!==e.userOptions.type?this.dateTime=
void 0:this.dateTime||(this.dateTime=new K(this))})};f.AdditionsClass=K;return f}();h.compose(f);return h});N(m,"Core/Axis/LogarithmicAxis.js",[m["Core/Axis/Axis.js"],m["Core/Utilities.js"]],function(f,h){var m=h.addEvent,z=h.getMagnitude,F=h.normalizeTickInterval,L=h.pick,K=function(){function f(f){this.axis=f}f.prototype.getLogTickPositions=function(f,e,h,v){var x=this.axis,D=x.len,n=x.options,l=[];v||(this.minorAutoInterval=void 0);if(.5<=f)f=Math.round(f),l=x.getLinearTickPositions(f,e,h);else if(.08<=
f){n=Math.floor(e);var m,w;for(D=.3<f?[1,2,4]:.15<f?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];n<h+1&&!w;n++){var r=D.length;for(m=0;m<r&&!w;m++){var d=this.log2lin(this.lin2log(n)*D[m]);d>e&&(!v||g<=h)&&"undefined"!==typeof g&&l.push(g);g>h&&(w=!0);var g=d}}}else e=this.lin2log(e),h=this.lin2log(h),f=v?x.getMinorTickInterval():n.tickInterval,f=L("auto"===f?null:f,this.minorAutoInterval,n.tickPixelInterval/(v?5:1)*(h-e)/((v?D/x.tickPositions.length:D)||1)),f=F(f,void 0,z(f)),l=x.getLinearTickPositions(f,e,h).map(this.log2lin),
v||(this.minorAutoInterval=f/5);v||(x.tickInterval=f);return l};f.prototype.lin2log=function(f){return Math.pow(10,f)};f.prototype.log2lin=function(f){return Math.log(f)/Math.LN10};return f}();h=function(){function f(){}f.compose=function(f){f.keepProps.push("logarithmic");var e=f.prototype,h=K.prototype;e.log2lin=h.log2lin;e.lin2log=h.lin2log;m(f,"init",function(e){var f=this.logarithmic;"logarithmic"!==e.userOptions.type?this.logarithmic=void 0:(f||(f=this.logarithmic=new K(this)),this.log2lin!==
f.log2lin&&(f.log2lin=this.log2lin.bind(this)),this.lin2log!==f.lin2log&&(f.lin2log=this.lin2log.bind(this)))});m(f,"afterInit",function(){var e=this.logarithmic;e&&(this.lin2val=function(f){return e.lin2log(f)},this.val2lin=function(f){return e.log2lin(f)})})};return f}();h.compose(f);return h});N(m,"Core/Axis/PlotLineOrBand.js",[m["Core/Axis/Axis.js"],m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h,m){var z=m.arrayMax,F=m.arrayMin,P=m.defined,K=m.destroyObjectProperties,C=m.erase,y=m.extend,
e=m.merge,I=m.objectEach,v=m.pick;m=function(){function f(e,f){this.axis=e;f&&(this.options=f,this.id=f.id)}f.prototype.render=function(){h.fireEvent(this,"render");var f=this,n=f.axis,l=n.horiz,m=n.logarithmic,w=f.options,r=w.label,d=f.label,g=w.to,c=w.from,a=w.value,q=P(c)&&P(g),p=P(a),B=f.svgElem,A=!B,G=[],M=w.color,x=v(w.zIndex,0),Q=w.events;G={"class":"highcharts-plot-"+(q?"band ":"line ")+(w.className||"")};var O={},E=n.chart.renderer,u=q?"bands":"lines";m&&(c=m.log2lin(c),g=m.log2lin(g),a=
m.log2lin(a));n.chart.styledMode||(p?(G.stroke=M||"#999999",G["stroke-width"]=v(w.width,1),w.dashStyle&&(G.dashstyle=w.dashStyle)):q&&(G.fill=M||"#e6ebf5",w.borderWidth&&(G.stroke=w.borderColor,G["stroke-width"]=w.borderWidth)));O.zIndex=x;u+="-"+x;(m=n.plotLinesAndBandsGroups[u])||(n.plotLinesAndBandsGroups[u]=m=E.g("plot-"+u).attr(O).add());A&&(f.svgElem=B=E.path().attr(G).add(m));if(p)G=n.getPlotLinePath({value:a,lineWidth:B.strokeWidth(),acrossPanes:w.acrossPanes});else if(q)G=n.getPlotBandPath(c,
g,w);else return;!f.eventsAdded&&Q&&(I(Q,function(b,a){B.on(a,function(b){Q[a].apply(f,[b])})}),f.eventsAdded=!0);(A||!B.d)&&G&&G.length?B.attr({d:G}):B&&(G?(B.show(!0),B.animate({d:G})):B.d&&(B.hide(),d&&(f.label=d=d.destroy())));r&&(P(r.text)||P(r.formatter))&&G&&G.length&&0<n.width&&0<n.height&&!G.isFlat?(r=e({align:l&&q&&"center",x:l?!q&&4:10,verticalAlign:!l&&q&&"middle",y:l?q?16:10:q?6:-4,rotation:l&&!q&&90},r),this.renderLabel(r,G,q,x)):d&&d.hide();return f};f.prototype.renderLabel=function(e,
f,l,h){var n=this.label,r=this.axis.chart.renderer;n||(n={align:e.textAlign||e.align,rotation:e.rotation,"class":"highcharts-plot-"+(l?"band":"line")+"-label "+(e.className||"")},n.zIndex=h,h=this.getLabelText(e),this.label=n=r.text(h,0,0,e.useHTML).attr(n).add(),this.axis.chart.styledMode||n.css(e.style));r=f.xBounds||[f[0][1],f[1][1],l?f[2][1]:f[0][1]];f=f.yBounds||[f[0][2],f[1][2],l?f[2][2]:f[0][2]];l=F(r);h=F(f);n.align(e,!1,{x:l,y:h,width:z(r)-l,height:z(f)-h});n.show(!0)};f.prototype.getLabelText=
function(e){return P(e.formatter)?e.formatter.call(this):e.text};f.prototype.destroy=function(){C(this.axis.plotLinesAndBands,this);delete this.axis;K(this)};return f}();y(f.prototype,{getPlotBandPath:function(e,f,n){void 0===n&&(n=this.options);var l=this.getPlotLinePath({value:f,force:!0,acrossPanes:n.acrossPanes});n=this.getPlotLinePath({value:e,force:!0,acrossPanes:n.acrossPanes});var h=[],w=this.horiz,r=1;e=e<this.min&&f<this.min||e>this.max&&f>this.max;if(n&&l){if(e){var d=n.toString()===l.toString();
r=0}for(e=0;e<n.length;e+=2){f=n[e];var g=n[e+1],c=l[e],a=l[e+1];"M"!==f[0]&&"L"!==f[0]||"M"!==g[0]&&"L"!==g[0]||"M"!==c[0]&&"L"!==c[0]||"M"!==a[0]&&"L"!==a[0]||(w&&c[1]===f[1]?(c[1]+=r,a[1]+=r):w||c[2]!==f[2]||(c[2]+=r,a[2]+=r),h.push(["M",f[1],f[2]],["L",g[1],g[2]],["L",a[1],a[2]],["L",c[1],c[2]],["Z"]));h.isFlat=d}}return h},addPlotBand:function(e){return this.addPlotBandOrLine(e,"plotBands")},addPlotLine:function(e){return this.addPlotBandOrLine(e,"plotLines")},addPlotBandOrLine:function(e,f){var n=
new h.PlotLineOrBand(this,e),l=this.userOptions;this.visible&&(n=n.render());if(n){if(f){var v=l[f]||[];v.push(e);l[f]=v}this.plotLinesAndBands.push(n);this._addedPlotLB=!0}return n},removePlotBandOrLine:function(e){for(var f=this.plotLinesAndBands,n=this.options,l=this.userOptions,h=f.length;h--;)f[h].id===e&&f[h].destroy();[n.plotLines||[],l.plotLines||[],n.plotBands||[],l.plotBands||[]].forEach(function(f){for(h=f.length;h--;)(f[h]||{}).id===e&&C(f,f[h])})},removePlotBand:function(e){this.removePlotBandOrLine(e)},
removePlotLine:function(e){this.removePlotBandOrLine(e)}});h.PlotLineOrBand=m;return h.PlotLineOrBand});N(m,"Core/Tooltip.js",[m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h){var m=f.doc,z=h.clamp,F=h.css,L=h.defined,K=h.discardElement,C=h.extend,y=h.fireEvent,e=h.format,I=h.isNumber,v=h.isString,x=h.merge,D=h.pick,n=h.splat,l=h.syncTimeout,J=h.timeUnits;"";var w=function(){function r(d,g){this.container=void 0;this.crosshairs=[];this.distance=0;this.isHidden=!0;this.isSticky=!1;this.now=
{};this.options={};this.outside=!1;this.chart=d;this.init(d,g)}r.prototype.applyFilter=function(){var d=this.chart;d.renderer.definition({tagName:"filter",id:"drop-shadow-"+d.index,opacity:.5,children:[{tagName:"feGaussianBlur","in":"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode","in":"SourceGraphic"}]}]});d.renderer.definition({tagName:"style",
textContent:".highcharts-tooltip-"+d.index+"{filter:url(#drop-shadow-"+d.index+")}"})};r.prototype.bodyFormatter=function(d){return d.map(function(d){var c=d.series.tooltipOptions;return(c[(d.point.formatPrefix||"point")+"Formatter"]||d.point.tooltipFormatter).call(d.point,c[(d.point.formatPrefix||"point")+"Format"]||"")})};r.prototype.cleanSplit=function(d){this.chart.series.forEach(function(g){var c=g&&g.tt;c&&(!c.isActive||d?g.tt=c.destroy():c.isActive=!1)})};r.prototype.defaultFormatter=function(d){var g=
this.points||n(this);var c=[d.tooltipFooterHeaderFormatter(g[0])];c=c.concat(d.bodyFormatter(g));c.push(d.tooltipFooterHeaderFormatter(g[0],!0));return c};r.prototype.destroy=function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),K(this.container));h.clearTimeout(this.hideTimer);h.clearTimeout(this.tooltipTimeout)};r.prototype.getAnchor=function(d,g){var c=this.chart,
a=c.pointer,q=c.inverted,p=c.plotTop,e=c.plotLeft,f=0,l=0,r,h;d=n(d);this.followPointer&&g?("undefined"===typeof g.chartX&&(g=a.normalize(g)),d=[g.chartX-e,g.chartY-p]):d[0].tooltipPos?d=d[0].tooltipPos:(d.forEach(function(a){r=a.series.yAxis;h=a.series.xAxis;f+=a.plotX+(!q&&h?h.left-e:0);l+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!q&&r?r.top-p:0)}),f/=d.length,l/=d.length,d=[q?c.plotWidth-l:f,this.shared&&!q&&1<d.length&&g?g.chartY-p:q?c.plotHeight-f:l]);return d.map(Math.round)};r.prototype.getDateFormat=
function(d,g,c,a){var q=this.chart.time,p=q.dateFormat("%m-%d %H:%M:%S.%L",g),e={millisecond:15,second:12,minute:9,hour:6,day:3},f="millisecond";for(l in J){if(d===J.week&&+q.dateFormat("%w",g)===c&&"00:00:00.000"===p.substr(6)){var l="week";break}if(J[l]>d){l=f;break}if(e[l]&&p.substr(e[l])!=="01-01 00:00:00.000".substr(e[l]))break;"week"!==l&&(f=l)}if(l)var r=q.resolveDTLFormat(a[l]).main;return r};r.prototype.getLabel=function(){var d,g,c=this,a=this.chart.renderer,q=this.chart.styledMode,p=this.options,
e="tooltip"+(L(p.className)?" "+p.className:""),l=(null===(d=p.style)||void 0===d?void 0:d.pointerEvents)||(!this.followPointer&&p.stickOnContact?"auto":"none"),r;d=function(){c.inContact=!0};var n=function(){var a=c.chart.hoverSeries;c.inContact=!1;if(a&&a.onMouseOut)a.onMouseOut()};if(!this.label){this.outside&&(this.container=r=f.doc.createElement("div"),r.className="highcharts-tooltip-container",F(r,{position:"absolute",top:"1px",pointerEvents:l,zIndex:3}),f.doc.body.appendChild(r),this.renderer=
a=new f.Renderer(r,0,0,null===(g=this.chart.options.chart)||void 0===g?void 0:g.style,void 0,void 0,a.styledMode));this.split?this.label=a.g(e):(this.label=a.label("",0,0,p.shape||"callout",null,null,p.useHTML,null,e).attr({padding:p.padding,r:p.borderRadius}),q||this.label.attr({fill:p.backgroundColor,"stroke-width":p.borderWidth}).css(p.style).css({pointerEvents:l}).shadow(p.shadow));q&&(this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index));if(c.outside&&!c.split){var h=
this.label,w=h.xSetter,v=h.ySetter;h.xSetter=function(a){w.call(h,c.distance);r.style.left=a+"px"};h.ySetter=function(a){v.call(h,c.distance);r.style.top=a+"px"}}this.label.on("mouseenter",d).on("mouseleave",n).attr({zIndex:8}).add()}return this.label};r.prototype.getPosition=function(d,g,c){var a=this.chart,q=this.distance,p={},e=a.inverted&&c.h||0,f,l=this.outside,r=l?m.documentElement.clientWidth-2*q:a.chartWidth,n=l?Math.max(m.body.scrollHeight,m.documentElement.scrollHeight,m.body.offsetHeight,
m.documentElement.offsetHeight,m.documentElement.clientHeight):a.chartHeight,h=a.pointer.getChartPosition(),w=a.containerScaling,E=function(b){return w?b*w.scaleX:b},u=function(b){return w?b*w.scaleY:b},b=function(b){var k="x"===b;return[b,k?r:n,k?d:g].concat(l?[k?E(d):u(g),k?h.left-q+E(c.plotX+a.plotLeft):h.top-q+u(c.plotY+a.plotTop),0,k?r:n]:[k?d:g,k?c.plotX+a.plotLeft:c.plotY+a.plotTop,k?a.plotLeft:a.plotTop,k?a.plotLeft+a.plotWidth:a.plotTop+a.plotHeight])},k=b("y"),t=b("x"),H=!this.followPointer&&
D(c.ttBelow,!a.inverted===!!c.negative),v=function(b,a,c,k,d,g,t){var f="y"===b?u(q):E(q),l=(c-k)/2,r=k<d-q,B=d+q+k<a,n=d-f-c+l;d=d+f-l;if(H&&B)p[b]=d;else if(!H&&r)p[b]=n;else if(r)p[b]=Math.min(t-k,0>n-e?n:n-e);else if(B)p[b]=Math.max(g,d+e+c>a?d:d+e);else return!1},U=function(b,a,c,k,d){var g;d<q||d>a-q?g=!1:p[b]=d<c/2?1:d>a-k/2?a-k-2:d-c/2;return g},x=function(b){var a=k;k=t;t=a;f=b},I=function(){!1!==v.apply(0,k)?!1!==U.apply(0,t)||f||(x(!0),I()):f?p.x=p.y=0:(x(!0),I())};(a.inverted||1<this.len)&&
x();I();return p};r.prototype.getXDateFormat=function(d,g,c){g=g.dateTimeLabelFormats;var a=c&&c.closestPointRange;return(a?this.getDateFormat(a,d.x,c.options.startOfWeek,g):g.day)||g.year};r.prototype.hide=function(d){var g=this;h.clearTimeout(this.hideTimer);d=D(d,this.options.hideDelay,500);this.isHidden||(this.hideTimer=l(function(){g.getLabel().fadeOut(d?void 0:d);g.isHidden=!0},d))};r.prototype.init=function(d,g){this.chart=d;this.options=g;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=
!0;this.split=g.split&&!d.inverted&&!d.polar;this.shared=g.shared||this.split;this.outside=D(g.outside,!(!d.scrollablePixelsX&&!d.scrollablePixelsY))};r.prototype.isStickyOnContact=function(){return!(this.followPointer||!this.options.stickOnContact||!this.inContact)};r.prototype.move=function(d,g,c,a){var q=this,p=q.now,e=!1!==q.options.animation&&!q.isHidden&&(1<Math.abs(d-p.x)||1<Math.abs(g-p.y)),f=q.followPointer||1<q.len;C(p,{x:e?(2*p.x+d)/3:d,y:e?(p.y+g)/2:g,anchorX:f?void 0:e?(2*p.anchorX+c)/
3:c,anchorY:f?void 0:e?(p.anchorY+a)/2:a});q.getLabel().attr(p);q.drawTracker();e&&(h.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){q&&q.move(d,g,c,a)},32))};r.prototype.refresh=function(d,g){var c=this.chart,a=this.options,q=d,p={},e=[],f=a.formatter||this.defaultFormatter;p=this.shared;var l=c.styledMode;if(a.enabled){h.clearTimeout(this.hideTimer);this.followPointer=n(q)[0].series.tooltipOptions.followPointer;var r=this.getAnchor(q,g);g=r[0];var w=r[1];!p||q.series&&
q.series.noSharedTooltip?p=q.getLabelConfig():(c.pointer.applyInactiveState(q),q.forEach(function(a){a.setState("hover");e.push(a.getLabelConfig())}),p={x:q[0].category,y:q[0].y},p.points=e,q=q[0]);this.len=e.length;c=f.call(p,this);f=q.series;this.distance=D(f.tooltipOptions.distance,16);!1===c?this.hide():(this.split?this.renderSplit(c,n(d)):(d=this.getLabel(),a.style.width&&!l||d.css({width:this.chart.spacingBox.width+"px"}),d.attr({text:c&&c.join?c.join(""):c}),d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+
D(q.colorIndex,f.colorIndex)),l||d.attr({stroke:a.borderColor||q.color||f.color||"#666666"}),this.updatePosition({plotX:g,plotY:w,negative:q.negative,ttBelow:q.ttBelow,h:r[2]||0})),this.isHidden&&this.label&&this.label.attr({opacity:1}).show(),this.isHidden=!1);y(this,"refresh")}};r.prototype.renderSplit=function(d,g){function c(b,a,c,d,g){void 0===g&&(g=!0);c?(a=I?0:F,b=z(b-d/2,m.left,m.right-d)):(a-=y,b=g?b-d-k:b+k,b=z(b,g?b:m.left,m.right));return{x:b,y:a}}var a=this,q=a.chart,p=a.chart,e=p.plotHeight,
l=p.plotLeft,r=p.plotTop,n=p.pointer,h=p.renderer,w=p.scrollablePixelsY,O=void 0===w?0:w;w=p.scrollingContainer;w=void 0===w?{scrollLeft:0,scrollTop:0}:w;var E=w.scrollLeft,u=w.scrollTop,b=p.styledMode,k=a.distance,t=a.options,H=a.options.positioner,m={left:E,right:E+p.chartWidth,top:u,bottom:u+p.chartHeight},x=a.getLabel(),I=!(!q.xAxis[0]||!q.xAxis[0].opposite),y=r+u,J=0,F=e-O;v(d)&&(d=[!1,d]);d=d.slice(0,g.length+1).reduce(function(d,p,q){if(!1!==p&&""!==p){q=g[q-1]||{isHeader:!0,plotX:g[0].plotX,
plotY:e,series:{}};var f=q.isHeader,n=f?a:q.series,B=n.tt,A=q.isHeader;var w=q.series;var E="highcharts-color-"+D(q.colorIndex,w.colorIndex,"none");B||(B={padding:t.padding,r:t.borderRadius},b||(B.fill=t.backgroundColor,B["stroke-width"]=t.borderWidth),B=h.label("",0,0,t[A?"headerShape":"shape"]||"callout",void 0,void 0,t.useHTML).addClass((A?"highcharts-tooltip-header ":"")+"highcharts-tooltip-box "+E).attr(B).add(x));B.isActive=!0;B.attr({text:p});b||B.css(t.style).shadow(t.shadow).attr({stroke:t.borderColor||
q.color||w.color||"#333333"});p=n.tt=B;A=p.getBBox();n=A.width+p.strokeWidth();f&&(J=A.height,F+=J,I&&(y-=J));w=q.plotX;w=void 0===w?0:w;E=q.plotY;E=void 0===E?0:E;var v=q.series;if(q.isHeader){w=l+w;var G=r+e/2}else B=v.xAxis,v=v.yAxis,w=B.pos+z(w,-k,B.len+k),v.pos+E>=u+r&&v.pos+E<=u+r+e-O&&(G=v.pos+E);w=z(w,m.left-k,m.right+k);"number"===typeof G?(A=A.height+1,E=H?H.call(a,n,A,q):c(w,G,f,n),d.push({align:H?0:void 0,anchorX:w,anchorY:G,boxWidth:n,point:q,rank:D(E.rank,f?1:0),size:A,target:E.y,tt:p,
x:E.x})):p.isActive=!1}return d},[]);!H&&d.some(function(b){return b.x<m.left})&&(d=d.map(function(b){var a=c(b.anchorX,b.anchorY,b.point.isHeader,b.boxWidth,!1);return C(b,{target:a.y,x:a.x})}));a.cleanSplit();f.distribute(d,F);d.forEach(function(b){var a=b.pos;b.tt.attr({visibility:"undefined"===typeof a?"hidden":"inherit",x:b.x,y:a+y,anchorX:b.anchorX,anchorY:b.anchorY})});d=a.container;q=a.renderer;a.outside&&d&&q&&(p=x.getBBox(),q.setSize(p.width+p.x,p.height+p.y,!1),n=n.getChartPosition(),d.style.left=
n.left+"px",d.style.top=n.top+"px")};r.prototype.drawTracker=function(){if(this.followPointer||!this.options.stickOnContact)this.tracker&&this.tracker.destroy();else{var d=this.chart,g=this.label,c=d.hoverPoint;if(g&&c){var a={x:0,y:0,width:0,height:0};c=this.getAnchor(c);var q=g.getBBox();c[0]+=d.plotLeft-g.translateX;c[1]+=d.plotTop-g.translateY;a.x=Math.min(0,c[0]);a.y=Math.min(0,c[1]);a.width=0>c[0]?Math.max(Math.abs(c[0]),q.width-c[0]):Math.max(Math.abs(c[0]),q.width);a.height=0>c[1]?Math.max(Math.abs(c[1]),
q.height-Math.abs(c[1])):Math.max(Math.abs(c[1]),q.height);this.tracker?this.tracker.attr(a):(this.tracker=g.renderer.rect(a).addClass("highcharts-tracker").add(g),d.styledMode||this.tracker.attr({fill:"rgba(0,0,0,0)"}))}}};r.prototype.styledModeFormat=function(d){return d.replace('style="font-size: 10px"','class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class="highcharts-color-{$1.colorIndex}"')};r.prototype.tooltipFooterHeaderFormatter=function(d,g){var c=g?"footer":
"header",a=d.series,q=a.tooltipOptions,p=q.xDateFormat,f=a.xAxis,l=f&&"datetime"===f.options.type&&I(d.key),r=q[c+"Format"];g={isFooter:g,labelConfig:d};y(this,"headerFormatter",g,function(c){l&&!p&&(p=this.getXDateFormat(d,q,f));l&&p&&(d.point&&d.point.tooltipDateKeys||["key"]).forEach(function(a){r=r.replace("{point."+a+"}","{point."+a+":"+p+"}")});a.chart.styledMode&&(r=this.styledModeFormat(r));c.text=e(r,{point:d,series:a},this.chart)});return g.text};r.prototype.update=function(d){this.destroy();
x(!0,this.chart.options.tooltip.userOptions,d);this.init(this.chart,x(!0,this.options,d))};r.prototype.updatePosition=function(d){var g=this.chart,c=g.pointer,a=this.getLabel(),q=d.plotX+g.plotLeft,p=d.plotY+g.plotTop;c=c.getChartPosition();d=(this.options.positioner||this.getPosition).call(this,a.width,a.height,d);if(this.outside){var e=(this.options.borderWidth||0)+2*this.distance;this.renderer.setSize(a.width+e,a.height+e,!1);if(g=g.containerScaling)F(this.container,{transform:"scale("+g.scaleX+
", "+g.scaleY+")"}),q*=g.scaleX,p*=g.scaleY;q+=c.left-d.x;p+=c.top-d.y}this.move(Math.round(d.x),Math.round(d.y||0),q,p)};return r}();f.Tooltip=w;return f.Tooltip});N(m,"Core/Pointer.js",[m["Core/Color/Color.js"],m["Core/Globals.js"],m["Core/Tooltip.js"],m["Core/Utilities.js"]],function(f,h,m,z){var F=f.parse,P=h.charts,K=h.noop,C=z.addEvent,y=z.attr,e=z.css,I=z.defined,v=z.extend,x=z.find,D=z.fireEvent,n=z.isNumber,l=z.isObject,J=z.objectEach,w=z.offset,r=z.pick,d=z.splat;"";f=function(){function g(c,
a){this.lastValidTouch={};this.pinchDown=[];this.runChartClick=!1;this.chart=c;this.hasDragged=!1;this.options=a;this.unbindContainerMouseLeave=function(){};this.unbindContainerMouseEnter=function(){};this.init(c,a)}g.prototype.applyInactiveState=function(c){var a=[],d;(c||[]).forEach(function(c){d=c.series;a.push(d);d.linkedParent&&a.push(d.linkedParent);d.linkedSeries&&(a=a.concat(d.linkedSeries));d.navigatorSeries&&a.push(d.navigatorSeries)});this.chart.series.forEach(function(c){-1===a.indexOf(c)?
c.setState("inactive",!0):c.options.inactiveOtherPoints&&c.setAllPointsToState("inactive")})};g.prototype.destroy=function(){var c=this;"undefined"!==typeof c.unDocMouseMove&&c.unDocMouseMove();this.unbindContainerMouseLeave();h.chartCount||(h.unbindDocumentMouseUp&&(h.unbindDocumentMouseUp=h.unbindDocumentMouseUp()),h.unbindDocumentTouchEnd&&(h.unbindDocumentTouchEnd=h.unbindDocumentTouchEnd()));clearInterval(c.tooltipTimeout);J(c,function(a,d){c[d]=void 0})};g.prototype.drag=function(c){var a=this.chart,
d=a.options.chart,g=c.chartX,e=c.chartY,f=this.zoomHor,r=this.zoomVert,n=a.plotLeft,h=a.plotTop,w=a.plotWidth,v=a.plotHeight,E=this.selectionMarker,u=this.mouseDownX||0,b=this.mouseDownY||0,k=l(d.panning)?d.panning&&d.panning.enabled:d.panning,t=d.panKey&&c[d.panKey+"Key"];if(!E||!E.touch)if(g<n?g=n:g>n+w&&(g=n+w),e<h?e=h:e>h+v&&(e=h+v),this.hasDragged=Math.sqrt(Math.pow(u-g,2)+Math.pow(b-e,2)),10<this.hasDragged){var H=a.isInsidePlot(u-n,b-h);a.hasCartesianSeries&&(this.zoomX||this.zoomY)&&H&&!t&&
!E&&(this.selectionMarker=E=a.renderer.rect(n,h,f?1:w,r?1:v,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add(),a.styledMode||E.attr({fill:d.selectionMarkerFill||F("#335cad").setOpacity(.25).get()}));E&&f&&(g-=u,E.attr({width:Math.abs(g),x:(0<g?0:g)+u}));E&&r&&(g=e-b,E.attr({height:Math.abs(g),y:(0<g?0:g)+b}));H&&!E&&k&&a.pan(c,d.panning)}};g.prototype.dragStart=function(c){var a=this.chart;a.mouseIsDown=c.type;a.cancelClick=!1;a.mouseDownX=this.mouseDownX=c.chartX;a.mouseDownY=this.mouseDownY=
c.chartY};g.prototype.drop=function(c){var a=this,d=this.chart,g=this.hasPinched;if(this.selectionMarker){var f={originalEvent:c,xAxis:[],yAxis:[]},l=this.selectionMarker,r=l.attr?l.attr("x"):l.x,h=l.attr?l.attr("y"):l.y,w=l.attr?l.attr("width"):l.width,m=l.attr?l.attr("height"):l.height,O;if(this.hasDragged||g)d.axes.forEach(function(d){if(d.zoomEnabled&&I(d.min)&&(g||a[{xAxis:"zoomX",yAxis:"zoomY"}[d.coll]])&&n(r)&&n(h)){var p=d.horiz,b="touchend"===c.type?d.minPixelPadding:0,k=d.toValue((p?r:h)+
b);p=d.toValue((p?r+w:h+m)-b);f[d.coll].push({axis:d,min:Math.min(k,p),max:Math.max(k,p)});O=!0}}),O&&D(d,"selection",f,function(a){d.zoom(v(a,g?{animation:!1}:null))});n(d.index)&&(this.selectionMarker=this.selectionMarker.destroy());g&&this.scaleGroups()}d&&n(d.index)&&(e(d.container,{cursor:d._cursor}),d.cancelClick=10<this.hasDragged,d.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])};g.prototype.findNearestKDPoint=function(c,a,d){var g=this.chart,q=g.hoverPoint;g=g.tooltip;if(q&&
g&&g.isStickyOnContact())return q;var e;c.forEach(function(c){var g=!(c.noSharedTooltip&&a)&&0>c.options.findNearestPointBy.indexOf("y");c=c.searchPoint(d,g);if((g=l(c,!0))&&!(g=!l(e,!0))){g=e.distX-c.distX;var p=e.dist-c.dist,q=(c.series.group&&c.series.group.zIndex)-(e.series.group&&e.series.group.zIndex);g=0<(0!==g&&a?g:0!==p?p:0!==q?q:e.series.index>c.series.index?-1:1)}g&&(e=c)});return e};g.prototype.getChartCoordinatesFromPoint=function(c,a){var d=c.series,g=d.xAxis;d=d.yAxis;var e=r(c.clientX,
c.plotX),f=c.shapeArgs;if(g&&d)return a?{chartX:g.len+g.pos-e,chartY:d.len+d.pos-c.plotY}:{chartX:e+g.pos,chartY:c.plotY+d.pos};if(f&&f.x&&f.y)return{chartX:f.x,chartY:f.y}};g.prototype.getChartPosition=function(){return this.chartPosition||(this.chartPosition=w(this.chart.container))};g.prototype.getCoordinates=function(c){var a={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(d){a[d.isXAxis?"xAxis":"yAxis"].push({axis:d,value:d.toValue(c[d.horiz?"chartX":"chartY"])})});return a};g.prototype.getHoverData=
function(c,a,d,g,e,f){var p,q=[];g=!(!g||!c);var n=a&&!a.stickyTracking,h={chartX:f?f.chartX:void 0,chartY:f?f.chartY:void 0,shared:e};D(this,"beforeGetHoverData",h);n=n?[a]:d.filter(function(a){return h.filter?h.filter(a):a.visible&&!(!e&&a.directTouch)&&r(a.options.enableMouseTracking,!0)&&a.stickyTracking});a=(p=g||!f?c:this.findNearestKDPoint(n,e,f))&&p.series;p&&(e&&!a.noSharedTooltip?(n=d.filter(function(a){return h.filter?h.filter(a):a.visible&&!(!e&&a.directTouch)&&r(a.options.enableMouseTracking,
!0)&&!a.noSharedTooltip}),n.forEach(function(a){var c=x(a.points,function(a){return a.x===p.x&&!a.isNull});l(c)&&(a.chart.isBoosting&&(c=a.getPoint(c)),q.push(c))})):q.push(p));h={hoverPoint:p};D(this,"afterGetHoverData",h);return{hoverPoint:h.hoverPoint,hoverSeries:a,hoverPoints:q}};g.prototype.getPointFromEvent=function(c){c=c.target;for(var a;c&&!a;)a=c.point,c=c.parentNode;return a};g.prototype.onTrackerMouseOut=function(c){c=c.relatedTarget||c.toElement;var a=this.chart.hoverSeries;this.isDirectTouch=
!1;if(!(!a||!c||a.stickyTracking||this.inClass(c,"highcharts-tooltip")||this.inClass(c,"highcharts-series-"+a.index)&&this.inClass(c,"highcharts-tracker")))a.onMouseOut()};g.prototype.inClass=function(c,a){for(var d;c;){if(d=y(c,"class")){if(-1!==d.indexOf(a))return!0;if(-1!==d.indexOf("highcharts-container"))return!1}c=c.parentNode}};g.prototype.init=function(c,a){this.options=a;this.chart=c;this.runChartClick=a.chart.events&&!!a.chart.events.click;this.pinchDown=[];this.lastValidTouch={};m&&(c.tooltip=
new m(c,a.tooltip),this.followTouchMove=r(a.tooltip.followTouchMove,!0));this.setDOMEvents()};g.prototype.normalize=function(c,a){var d=c.touches,g=d?d.length?d.item(0):r(d.changedTouches,c.changedTouches)[0]:c;a||(a=this.getChartPosition());d=g.pageX-a.left;a=g.pageY-a.top;if(g=this.chart.containerScaling)d/=g.scaleX,a/=g.scaleY;return v(c,{chartX:Math.round(d),chartY:Math.round(a)})};g.prototype.onContainerClick=function(c){var a=this.chart,d=a.hoverPoint;c=this.normalize(c);var g=a.plotLeft,e=
a.plotTop;a.cancelClick||(d&&this.inClass(c.target,"highcharts-tracker")?(D(d.series,"click",v(c,{point:d})),a.hoverPoint&&d.firePointEvent("click",c)):(v(c,this.getCoordinates(c)),a.isInsidePlot(c.chartX-g,c.chartY-e)&&D(a,"click",c)))};g.prototype.onContainerMouseDown=function(c){var a=1===((c.buttons||c.button)&1);c=this.normalize(c);if(h.isFirefox&&0!==c.button)this.onContainerMouseMove(c);if("undefined"===typeof c.button||a)this.zoomOption(c),a&&c.preventDefault&&c.preventDefault(),this.dragStart(c)};
g.prototype.onContainerMouseLeave=function(c){var a=P[r(h.hoverChartIndex,-1)],d=this.chart.tooltip;c=this.normalize(c);a&&(c.relatedTarget||c.toElement)&&(a.pointer.reset(),a.pointer.chartPosition=void 0);d&&!d.isHidden&&this.reset()};g.prototype.onContainerMouseEnter=function(c){delete this.chartPosition};g.prototype.onContainerMouseMove=function(c){var a=this.chart;c=this.normalize(c);this.setHoverChartIndex();c.preventDefault||(c.returnValue=!1);"mousedown"===a.mouseIsDown&&this.drag(c);a.openMenu||
!this.inClass(c.target,"highcharts-tracker")&&!a.isInsidePlot(c.chartX-a.plotLeft,c.chartY-a.plotTop)||this.runPointActions(c)};g.prototype.onDocumentTouchEnd=function(c){P[h.hoverChartIndex]&&P[h.hoverChartIndex].pointer.drop(c)};g.prototype.onContainerTouchMove=function(c){this.touch(c)};g.prototype.onContainerTouchStart=function(c){this.zoomOption(c);this.touch(c,!0)};g.prototype.onDocumentMouseMove=function(c){var a=this.chart,d=this.chartPosition;c=this.normalize(c,d);var g=a.tooltip;!d||g&&
g.isStickyOnContact()||a.isInsidePlot(c.chartX-a.plotLeft,c.chartY-a.plotTop)||this.inClass(c.target,"highcharts-tracker")||this.reset()};g.prototype.onDocumentMouseUp=function(c){var a=P[r(h.hoverChartIndex,-1)];a&&a.pointer.drop(c)};g.prototype.pinch=function(c){var a=this,d=a.chart,g=a.pinchDown,e=c.touches||[],f=e.length,l=a.lastValidTouch,n=a.hasZoom,h=a.selectionMarker,w={},m=1===f&&(a.inClass(c.target,"highcharts-tracker")&&d.runTrackerClick||a.runChartClick),E={};1<f&&(a.initiated=!0);n&&
a.initiated&&!m&&!1!==c.cancelable&&c.preventDefault();[].map.call(e,function(c){return a.normalize(c)});"touchstart"===c.type?([].forEach.call(e,function(a,b){g[b]={chartX:a.chartX,chartY:a.chartY}}),l.x=[g[0].chartX,g[1]&&g[1].chartX],l.y=[g[0].chartY,g[1]&&g[1].chartY],d.axes.forEach(function(a){if(a.zoomEnabled){var b=d.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,g=a.toPixels(Math.min(r(a.options.min,a.dataMin),a.dataMin)),p=a.toPixels(Math.max(r(a.options.max,a.dataMax),a.dataMax)),q=Math.max(g,
p);b.min=Math.min(a.pos,Math.min(g,p)-c);b.max=Math.max(a.pos+a.len,q+c)}}),a.res=!0):a.followTouchMove&&1===f?this.runPointActions(a.normalize(c)):g.length&&(h||(a.selectionMarker=h=v({destroy:K,touch:!0},d.plotBox)),a.pinchTranslate(g,e,w,h,E,l),a.hasPinched=n,a.scaleGroups(w,E),a.res&&(a.res=!1,this.reset(!1,0)))};g.prototype.pinchTranslate=function(c,a,d,g,e,f){this.zoomHor&&this.pinchTranslateDirection(!0,c,a,d,g,e,f);this.zoomVert&&this.pinchTranslateDirection(!1,c,a,d,g,e,f)};g.prototype.pinchTranslateDirection=
function(c,a,d,g,e,f,l,r){var p=this.chart,q=c?"x":"y",n=c?"X":"Y",h="chart"+n,u=c?"width":"height",b=p["plot"+(c?"Left":"Top")],k,t,B=r||1,w=p.inverted,A=p.bounds[c?"h":"v"],v=1===a.length,G=a[0][h],m=d[0][h],D=!v&&a[1][h],M=!v&&d[1][h];d=function(){"number"===typeof M&&20<Math.abs(G-D)&&(B=r||Math.abs(m-M)/Math.abs(G-D));t=(b-m)/B+G;k=p["plot"+(c?"Width":"Height")]/B};d();a=t;if(a<A.min){a=A.min;var x=!0}else a+k>A.max&&(a=A.max-k,x=!0);x?(m-=.8*(m-l[q][0]),"number"===typeof M&&(M-=.8*(M-l[q][1])),
d()):l[q]=[m,M];w||(f[q]=t-b,f[u]=k);f=w?1/B:B;e[u]=k;e[q]=a;g[w?c?"scaleY":"scaleX":"scale"+n]=B;g["translate"+n]=f*b+(m-f*G)};g.prototype.reset=function(c,a){var g=this.chart,p=g.hoverSeries,e=g.hoverPoint,f=g.hoverPoints,l=g.tooltip,r=l&&l.shared?f:e;c&&r&&d(r).forEach(function(a){a.series.isCartesian&&"undefined"===typeof a.plotX&&(c=!1)});if(c)l&&r&&d(r).length&&(l.refresh(r),l.shared&&f?f.forEach(function(a){a.setState(a.state,!0);a.series.isCartesian&&(a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,
a),a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a))}):e&&(e.setState(e.state,!0),g.axes.forEach(function(a){a.crosshair&&e.series[a.coll]===a&&a.drawCrosshair(null,e)})));else{if(e)e.onMouseOut();f&&f.forEach(function(a){a.setState()});if(p)p.onMouseOut();l&&l.hide(a);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());g.axes.forEach(function(a){a.hideCrosshair()});this.hoverX=g.hoverPoints=g.hoverPoint=null}};g.prototype.runPointActions=function(c,a){var d=this.chart,
g=d.tooltip&&d.tooltip.options.enabled?d.tooltip:void 0,e=g?g.shared:!1,f=a||d.hoverPoint,l=f&&f.series||d.hoverSeries;l=this.getHoverData(f,l,d.series,(!c||"touchmove"!==c.type)&&(!!a||l&&l.directTouch&&this.isDirectTouch),e,c);f=l.hoverPoint;var n=l.hoverPoints;a=(l=l.hoverSeries)&&l.tooltipOptions.followPointer;e=e&&l&&!l.noSharedTooltip;if(f&&(f!==d.hoverPoint||g&&g.isHidden)){(d.hoverPoints||[]).forEach(function(a){-1===n.indexOf(a)&&a.setState()});if(d.hoverSeries!==l)l.onMouseOver();this.applyInactiveState(n);
(n||[]).forEach(function(a){a.setState("hover")});d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");if(!f.series)return;d.hoverPoints=n;d.hoverPoint=f;f.firePointEvent("mouseOver");g&&g.refresh(e?n:f,c)}else a&&g&&!g.isHidden&&(f=g.getAnchor([{}],c),g.updatePosition({plotX:f[0],plotY:f[1]}));this.unDocMouseMove||(this.unDocMouseMove=C(d.container.ownerDocument,"mousemove",function(a){var c=P[h.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(a)}));d.axes.forEach(function(a){var g=r((a.crosshair||
{}).snap,!0),p;g&&((p=d.hoverPoint)&&p.series[a.coll]===a||(p=x(n,function(c){return c.series[a.coll]===a})));p||!g?a.drawCrosshair(c,p):a.hideCrosshair()})};g.prototype.scaleGroups=function(c,a){var d=this.chart,g;d.series.forEach(function(p){g=c||p.getPlotBox();p.xAxis&&p.xAxis.zoomEnabled&&p.group&&(p.group.attr(g),p.markerGroup&&(p.markerGroup.attr(g),p.markerGroup.clip(a?d.clipRect:null)),p.dataLabelsGroup&&p.dataLabelsGroup.attr(g))});d.clipRect.attr(a||d.clipBox)};g.prototype.setDOMEvents=
function(){var c=this.chart.container,a=c.ownerDocument;c.onmousedown=this.onContainerMouseDown.bind(this);c.onmousemove=this.onContainerMouseMove.bind(this);c.onclick=this.onContainerClick.bind(this);this.unbindContainerMouseEnter=C(c,"mouseenter",this.onContainerMouseEnter.bind(this));this.unbindContainerMouseLeave=C(c,"mouseleave",this.onContainerMouseLeave.bind(this));h.unbindDocumentMouseUp||(h.unbindDocumentMouseUp=C(a,"mouseup",this.onDocumentMouseUp.bind(this)));h.hasTouch&&(C(c,"touchstart",
this.onContainerTouchStart.bind(this)),C(c,"touchmove",this.onContainerTouchMove.bind(this)),h.unbindDocumentTouchEnd||(h.unbindDocumentTouchEnd=C(a,"touchend",this.onDocumentTouchEnd.bind(this))))};g.prototype.setHoverChartIndex=function(){var c=this.chart,a=h.charts[r(h.hoverChartIndex,-1)];if(a&&a!==c)a.pointer.onContainerMouseLeave({relatedTarget:!0});a&&a.mouseIsDown||(h.hoverChartIndex=c.index)};g.prototype.touch=function(c,a){var d=this.chart,g;this.setHoverChartIndex();if(1===c.touches.length)if(c=
this.normalize(c),(g=d.isInsidePlot(c.chartX-d.plotLeft,c.chartY-d.plotTop))&&!d.openMenu){a&&this.runPointActions(c);if("touchmove"===c.type){a=this.pinchDown;var e=a[0]?4<=Math.sqrt(Math.pow(a[0].chartX-c.chartX,2)+Math.pow(a[0].chartY-c.chartY,2)):!1}r(e,!0)&&this.pinch(c)}else a&&this.reset();else 2===c.touches.length&&this.pinch(c)};g.prototype.zoomOption=function(c){var a=this.chart,d=a.options.chart,g=d.zoomType||"";a=a.inverted;/touch/.test(c.type)&&(g=r(d.pinchType,g));this.zoomX=c=/x/.test(g);
this.zoomY=g=/y/.test(g);this.zoomHor=c&&!a||g&&a;this.zoomVert=g&&!a||c&&a;this.hasZoom=c||g};return g}();return h.Pointer=f});N(m,"Core/MSPointer.js",[m["Core/Globals.js"],m["Core/Pointer.js"],m["Core/Utilities.js"]],function(f,h,m){function z(){var e=[];e.item=function(e){return this[e]};v(D,function(f){e.push({pageX:f.pageX,pageY:f.pageY,target:f.target})});return e}function F(e,n,h,r){"touch"!==e.pointerType&&e.pointerType!==e.MSPOINTER_TYPE_TOUCH||!K[f.hoverChartIndex]||(r(e),r=K[f.hoverChartIndex].pointer,
r[n]({type:h,target:e.currentTarget,preventDefault:y,touches:z()}))}var P=this&&this.__extends||function(){var e=function(f,l){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,d){e.__proto__=d}||function(e,d){for(var g in d)d.hasOwnProperty(g)&&(e[g]=d[g])};return e(f,l)};return function(f,l){function r(){this.constructor=f}e(f,l);f.prototype=null===l?Object.create(l):(r.prototype=l.prototype,new r)}}(),K=f.charts,C=f.doc,y=f.noop,e=m.addEvent,I=m.css,v=m.objectEach,x=m.removeEvent,
D={},n=!!f.win.PointerEvent;return function(f){function l(){return null!==f&&f.apply(this,arguments)||this}P(l,f);l.prototype.batchMSEvents=function(e){e(this.chart.container,n?"pointerdown":"MSPointerDown",this.onContainerPointerDown);e(this.chart.container,n?"pointermove":"MSPointerMove",this.onContainerPointerMove);e(C,n?"pointerup":"MSPointerUp",this.onDocumentPointerUp)};l.prototype.destroy=function(){this.batchMSEvents(x);f.prototype.destroy.call(this)};l.prototype.init=function(e,l){f.prototype.init.call(this,
e,l);this.hasZoom&&I(e.container,{"-ms-touch-action":"none","touch-action":"none"})};l.prototype.onContainerPointerDown=function(e){F(e,"onContainerTouchStart","touchstart",function(e){D[e.pointerId]={pageX:e.pageX,pageY:e.pageY,target:e.currentTarget}})};l.prototype.onContainerPointerMove=function(e){F(e,"onContainerTouchMove","touchmove",function(e){D[e.pointerId]={pageX:e.pageX,pageY:e.pageY};D[e.pointerId].target||(D[e.pointerId].target=e.currentTarget)})};l.prototype.onDocumentPointerUp=function(e){F(e,
"onDocumentTouchEnd","touchend",function(e){delete D[e.pointerId]})};l.prototype.setDOMEvents=function(){f.prototype.setDOMEvents.call(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(e)};return l}(h)});N(m,"Core/Legend.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h,m){var z=f.animObject,F=f.setAnimation,L=m.addEvent,K=m.css,C=m.defined,y=m.discardElement,e=m.find,I=m.fireEvent,v=m.format,x=m.isNumber,D=m.merge,n=m.pick,l=m.relativeLength,
J=m.stableSort,w=m.syncTimeout;f=m.wrap;m=h.isFirefox;var r=h.marginNames,d=h.win,g=function(){function c(a,c){this.allItems=[];this.contentGroup=this.box=void 0;this.display=!1;this.group=void 0;this.offsetWidth=this.maxLegendWidth=this.maxItemWidth=this.legendWidth=this.legendHeight=this.lastLineHeight=this.lastItemY=this.itemY=this.itemX=this.itemMarginTop=this.itemMarginBottom=this.itemHeight=this.initialItemY=0;this.options={};this.padding=0;this.pages=[];this.proximate=!1;this.scrollGroup=void 0;
this.widthOption=this.totalItemWidth=this.titleHeight=this.symbolWidth=this.symbolHeight=0;this.chart=a;this.init(a,c)}c.prototype.init=function(a,c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),L(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),this.proximate?this.unchartrender=L(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&this.unchartrender())};c.prototype.setOptions=function(a){var c=n(a.padding,
8);this.options=a;this.chart.styledMode||(this.itemStyle=a.itemStyle,this.itemHiddenStyle=D(this.itemStyle,a.itemHiddenStyle));this.itemMarginTop=a.itemMarginTop||0;this.itemMarginBottom=a.itemMarginBottom||0;this.padding=c;this.initialItemY=c-5;this.symbolWidth=n(a.symbolWidth,16);this.pages=[];this.proximate="proximate"===a.layout&&!this.chart.inverted;this.baseline=void 0};c.prototype.update=function(a,c){var d=this.chart;this.setOptions(D(!0,this.options,a));this.destroy();d.isDirtyLegend=d.isDirtyBox=
!0;n(c,!0)&&d.redraw();I(this,"afterUpdate")};c.prototype.colorizeItem=function(a,c){a.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var d=this.options,g=a.legendItem,e=a.legendLine,f=a.legendSymbol,q=this.itemHiddenStyle.color;d=c?d.itemStyle.color:q;var l=c?a.color||q:q,r=a.options&&a.options.marker,n={fill:l};g&&g.css({fill:d,color:d});e&&e.attr({stroke:l});f&&(r&&f.isMarker&&(n=a.pointAttribs(),c||(n.stroke=n.fill=q)),f.attr(n))}I(this,"afterColorizeItem",
{item:a,visible:c})};c.prototype.positionItems=function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()};c.prototype.positionItem=function(a){var c=this,d=this.options,g=d.symbolPadding,e=!d.rtl,f=a._legendItemPos;d=f[0];f=f[1];var l=a.checkbox,n=a.legendGroup;n&&n.element&&(g={translateX:e?d:this.legendWidth-d-2*g-4,translateY:f},e=function(){I(c,"afterPositionItem",{item:a})},C(n.translateY)?n.animate(g,void 0,e):(n.attr(g),e()));l&&(l.x=d,l.y=f)};
c.prototype.destroyItem=function(a){var c=a.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(c){a[c]&&(a[c]=a[c].destroy())});c&&y(a.checkbox)};c.prototype.destroy=function(){function a(a){this[a]&&(this[a]=this[a].destroy())}this.getAllItems().forEach(function(c){["legendItem","legendGroup"].forEach(a,c)});"clipRect up down pager nav box title group".split(" ").forEach(a,this);this.display=null};c.prototype.positionCheckboxes=function(){var a=this.group&&this.group.alignAttr,
c=this.clipHeight||this.legendHeight,d=this.titleHeight;if(a){var g=a.translateY;this.allItems.forEach(function(e){var p=e.checkbox;if(p){var f=g+d+p.y+(this.scrollOffset||0)+3;K(p,{left:a.translateX+e.checkboxOffset+p.x-20+"px",top:f+"px",display:this.proximate||f>g-6&&f<g+c-6?"":"none"})}},this)}};c.prototype.renderTitle=function(){var a=this.options,c=this.padding,d=a.title,g=0;d.text&&(this.title||(this.title=this.chart.renderer.label(d.text,c-3,c-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}),
this.chart.styledMode||this.title.css(d.style),this.title.add(this.group)),d.width||this.title.css({width:this.maxLegendWidth+"px"}),a=this.title.getBBox(),g=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:g}));this.titleHeight=g};c.prototype.setText=function(a){var c=this.options;a.legendItem.attr({text:c.labelFormat?v(c.labelFormat,a,this.chart):c.labelFormatter.call(a)})};c.prototype.renderItem=function(a){var c=this.chart,d=c.renderer,g=this.options,e=this.symbolWidth,f=g.symbolPadding,
l=this.itemStyle,r=this.itemHiddenStyle,h="horizontal"===g.layout?n(g.itemDistance,20):0,w=!g.rtl,v=a.legendItem,u=!a.series,b=!u&&a.series.drawLegendSymbol?a.series:a,k=b.options;k=this.createCheckboxForItem&&k&&k.showCheckbox;h=e+f+h+(k?20:0);var t=g.useHTML,H=a.options.className;v||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+b.type+"-series highcharts-color-"+a.colorIndex+(H?" "+H:"")+(u?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=v=d.text("",
w?e+f:-f,this.baseline||0,t),c.styledMode||v.css(D(a.visible?l:r)),v.attr({align:w?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(this.fontMetrics=d.fontMetrics(c.styledMode?12:l.fontSize,v),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,v.attr("y",this.baseline)),this.symbolHeight=g.symbolHeight||this.fontMetrics.f,b.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,v,t));k&&!a.checkbox&&this.createCheckboxForItem&&this.createCheckboxForItem(a);this.colorizeItem(a,
a.visible);!c.styledMode&&l.width||v.css({width:(g.itemWidth||this.widthOption||c.spacingBox.width)-h+"px"});this.setText(a);c=v.getBBox();a.itemWidth=a.checkboxOffset=g.itemWidth||a.legendItemWidth||c.width+h;this.maxItemWidth=Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||c.height||this.symbolHeight)};c.prototype.layoutItem=function(a){var c=this.options,d=this.padding,g="horizontal"===c.layout,e=a.itemHeight,
f=this.itemMarginBottom,l=this.itemMarginTop,r=g?n(c.itemDistance,20):0,h=this.maxLegendWidth;c=c.alignColumns&&this.totalItemWidth>h?this.maxItemWidth:a.itemWidth;g&&this.itemX-d+c>h&&(this.itemX=d,this.lastLineHeight&&(this.itemY+=l+this.lastLineHeight+f),this.lastLineHeight=0);this.lastItemY=l+this.itemY+f;this.lastLineHeight=Math.max(e,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];g?this.itemX+=c:(this.itemY+=l+e+f,this.lastLineHeight=e);this.offsetWidth=this.widthOption||Math.max((g?
this.itemX-d-(a.checkbox?0:r):c)+d,this.offsetWidth)};c.prototype.getAllItems=function(){var a=[];this.chart.series.forEach(function(c){var d=c&&c.options;c&&n(d.showInLegend,C(d.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===d.legendType?c.data:c)))});I(this,"afterGetAllItems",{allItems:a});return a};c.prototype.getAlignment=function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)};c.prototype.adjustMargins=
function(a,c){var d=this.chart,g=this.options,e=this.getAlignment();e&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(f,p){f.test(e)&&!C(a[p])&&(d[r[p]]=Math.max(d[r[p]],d.legend[(p+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][p]*g[p%2?"x":"y"]+n(g.margin,12)+c[p]+(d.titleOffset[p]||0)))})};c.prototype.proximatePositions=function(){var a=this.chart,c=[],d="left"===this.options.align;this.allItems.forEach(function(g){var f;var p=d;if(g.yAxis){g.xAxis.options.reversed&&
(p=!p);g.points&&(f=e(p?g.points:g.points.slice(0).reverse(),function(a){return x(a.plotY)}));p=this.itemMarginTop+g.legendItem.getBBox().height+this.itemMarginBottom;var q=g.yAxis.top-a.plotTop;g.visible?(f=f?f.plotY:g.yAxis.height,f+=q-.3*p):f=q+g.yAxis.height;c.push({target:f,size:p,item:g})}},this);h.distribute(c,a.plotHeight);c.forEach(function(c){c.item._legendItemPos[1]=a.plotTop-a.spacing[0]+c.pos})};c.prototype.render=function(){var a=this.chart,c=a.renderer,d=this.group,g=this.box,e=this.options,
f=this.padding;this.itemX=f;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;this.widthOption=l(e.width,a.spacingBox.width-f);var n=a.spacingBox.width-2*f-e.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,2))&&(n/=2);this.maxLegendWidth=this.widthOption||n;d||(this.group=d=c.g("legend").attr({zIndex:7}).add(),this.contentGroup=c.g().attr({zIndex:1}).add(d),this.scrollGroup=c.g().add(this.contentGroup));this.renderTitle();var r=this.getAllItems();J(r,function(a,c){return(a.options&&
a.options.legendIndex||0)-(c.options&&c.options.legendIndex||0)});e.reversed&&r.reverse();this.allItems=r;this.display=n=!!r.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;r.forEach(this.renderItem,this);r.forEach(this.layoutItem,this);r=(this.widthOption||this.offsetWidth)+f;var h=this.lastItemY+this.lastLineHeight+this.titleHeight;h=this.handleOverflow(h);h+=f;g||(this.box=g=c.rect().addClass("highcharts-legend-box").attr({r:e.borderRadius}).add(d),g.isNew=!0);
a.styledMode||g.attr({stroke:e.borderColor,"stroke-width":e.borderWidth||0,fill:e.backgroundColor||"none"}).shadow(e.shadow);0<r&&0<h&&(g[g.isNew?"attr":"animate"](g.crisp.call({},{x:0,y:0,width:r,height:h},g.strokeWidth())),g.isNew=!1);g[n?"show":"hide"]();a.styledMode&&"none"===d.getStyle("display")&&(r=h=0);this.legendWidth=r;this.legendHeight=h;n&&this.align();this.proximate||this.positionItems();I(this,"afterRender")};c.prototype.align=function(a){void 0===a&&(a=this.chart.spacingBox);var c=
this.chart,d=this.options,g=a.y;/(lth|ct|rth)/.test(this.getAlignment())&&0<c.titleOffset[0]?g+=c.titleOffset[0]:/(lbh|cb|rbh)/.test(this.getAlignment())&&0<c.titleOffset[2]&&(g-=c.titleOffset[2]);g!==a.y&&(a=D(a,{y:g}));this.group.align(D(d,{width:this.legendWidth,height:this.legendHeight,verticalAlign:this.proximate?"top":d.verticalAlign}),!0,a)};c.prototype.handleOverflow=function(a){var c=this,d=this.chart,g=d.renderer,e=this.options,f=e.y,l=this.padding;f=d.spacingBox.height+("top"===e.verticalAlign?
-f:f)-l;var r=e.maxHeight,h,w=this.clipRect,v=e.navigation,u=n(v.animation,!0),b=v.arrowSize||12,k=this.nav,t=this.pages,H,m=this.allItems,D=function(a){"number"===typeof a?w.attr({height:a}):w&&(c.clipRect=w.destroy(),c.contentGroup.clip());c.contentGroup.div&&(c.contentGroup.div.style.clip=a?"rect("+l+"px,9999px,"+(l+a)+"px,0)":"auto")},x=function(a){c[a]=g.circle(0,0,1.3*b).translate(b/2,b/2).add(k);d.styledMode||c[a].attr("fill","rgba(0,0,0,0.0001)");return c[a]};"horizontal"!==e.layout||"middle"===
e.verticalAlign||e.floating||(f/=2);r&&(f=Math.min(f,r));t.length=0;a>f&&!1!==v.enabled?(this.clipHeight=h=Math.max(f-20-this.titleHeight-l,0),this.currentPage=n(this.currentPage,1),this.fullHeight=a,m.forEach(function(a,b){var c=a._legendItemPos[1],d=Math.round(a.legendItem.getBBox().height),g=t.length;if(!g||c-t[g-1]>h&&(H||c)!==t[g-1])t.push(H||c),g++;a.pageIx=g-1;H&&(m[b-1].pageIx=g-1);b===m.length-1&&c+d-t[g-1]>h&&c!==H&&(t.push(c),a.pageIx=g);c!==H&&(H=c)}),w||(w=c.clipRect=g.clipRect(0,l,9999,
0),c.contentGroup.clip(w)),D(h),k||(this.nav=k=g.g().attr({zIndex:1}).add(this.group),this.up=g.symbol("triangle",0,0,b,b).add(k),x("upTracker").on("click",function(){c.scroll(-1,u)}),this.pager=g.text("",15,10).addClass("highcharts-legend-navigation"),d.styledMode||this.pager.css(v.style),this.pager.add(k),this.down=g.symbol("triangle-down",0,0,b,b).add(k),x("downTracker").on("click",function(){c.scroll(1,u)})),c.scroll(0),a=f):k&&(D(),this.nav=k.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=
0);return a};c.prototype.scroll=function(a,c){var d=this,g=this.chart,e=this.pages,f=e.length,l=this.currentPage+a;a=this.clipHeight;var q=this.options.navigation,r=this.pager,h=this.padding;l>f&&(l=f);0<l&&("undefined"!==typeof c&&F(c,g),this.nav.attr({translateX:h,translateY:a+this.padding+7+this.titleHeight,visibility:"visible"}),[this.up,this.upTracker].forEach(function(a){a.attr({"class":1===l?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})}),r.attr({text:l+"/"+f}),[this.down,
this.downTracker].forEach(function(a){a.attr({x:18+this.pager.getBBox().width,"class":l===f?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})},this),g.styledMode||(this.up.attr({fill:1===l?q.inactiveColor:q.activeColor}),this.upTracker.css({cursor:1===l?"default":"pointer"}),this.down.attr({fill:l===f?q.inactiveColor:q.activeColor}),this.downTracker.css({cursor:l===f?"default":"pointer"})),this.scrollOffset=-e[l-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),
this.currentPage=l,this.positionCheckboxes(),c=z(n(c,g.renderer.globalAnimation,!0)),w(function(){I(d,"afterScroll",{currentPage:l})},c.duration))};return c}();(/Trident\/7\.0/.test(d.navigator&&d.navigator.userAgent)||m)&&f(g.prototype,"positionItem",function(c,a){var d=this,g=function(){a._legendItemPos&&c.call(d,a)};g();d.bubbleLegend||setTimeout(g)});h.Legend=g;return h.Legend});N(m,"Core/Series/Point.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Globals.js"],m["Core/Utilities.js"]],
function(f,h,m){var z=f.animObject,F=m.defined,L=m.erase,K=m.extend,C=m.fireEvent,y=m.format,e=m.getNestedProperty,I=m.isArray,v=m.isNumber,x=m.isObject,D=m.syncTimeout,n=m.pick,l=m.removeEvent,J=m.uniqueKey;"";f=function(){function f(){this.colorIndex=this.category=void 0;this.formatPrefix="point";this.id=void 0;this.isNull=!1;this.percentage=this.options=this.name=void 0;this.selected=!1;this.total=this.series=void 0;this.visible=!0;this.x=void 0}f.prototype.animateBeforeDestroy=function(){var e=
this,d={x:e.startXPos,opacity:0},g,c=e.getGraphicalProps();c.singular.forEach(function(a){g="dataLabel"===a;e[a]=e[a].animate(g?{x:e[a].startXPos,y:e[a].startYPos,opacity:0}:d)});c.plural.forEach(function(a){e[a].forEach(function(a){a.element&&a.animate(K({x:e.startXPos},a.startYPos?{x:a.startXPos,y:a.startYPos}:{}))})})};f.prototype.applyOptions=function(e,d){var g=this.series,c=g.options.pointValKey||g.pointValKey;e=f.prototype.optionsToObject.call(this,e);K(this,e);this.options=this.options?K(this.options,
e):e;e.group&&delete this.group;e.dataLabels&&delete this.dataLabels;c&&(this.y=f.prototype.getNestedProperty.call(this,c));this.formatPrefix=(this.isNull=n(this.isValid&&!this.isValid(),null===this.x||!v(this.y)))?"null":"point";this.selected&&(this.state="select");"name"in this&&"undefined"===typeof d&&g.xAxis&&g.xAxis.hasNames&&(this.x=g.xAxis.nameToX(this));"undefined"===typeof this.x&&g&&(this.x="undefined"===typeof d?g.autoIncrement(this):d);return this};f.prototype.destroy=function(){function e(){if(d.graphic||
d.dataLabel||d.dataLabels)l(d),d.destroyElements();for(p in d)d[p]=null}var d=this,g=d.series,c=g.chart;g=g.options.dataSorting;var a=c.hoverPoints,f=z(d.series.chart.renderer.globalAnimation),p;d.legendItem&&c.legend.destroyItem(d);a&&(d.setState(),L(a,d),a.length||(c.hoverPoints=null));if(d===c.hoverPoint)d.onMouseOut();g&&g.enabled?(this.animateBeforeDestroy(),D(e,f.duration)):e();c.pointCount--};f.prototype.destroyElements=function(e){var d=this;e=d.getGraphicalProps(e);e.singular.forEach(function(g){d[g]=
d[g].destroy()});e.plural.forEach(function(g){d[g].forEach(function(c){c.element&&c.destroy()});delete d[g]})};f.prototype.firePointEvent=function(e,d,g){var c=this,a=this.series.options;(a.point.events[e]||c.options&&c.options.events&&c.options.events[e])&&c.importEvents();"click"===e&&a.allowPointSelect&&(g=function(a){c.select&&c.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});C(c,e,d,g)};f.prototype.getClassName=function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+
(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+("undefined"!==typeof this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")};f.prototype.getGraphicalProps=function(e){var d=this,g=[],c,a={singular:[],plural:[]};e=e||{graphic:1,dataLabel:1};e.graphic&&g.push("graphic","shadowGroup");e.dataLabel&&g.push("dataLabel",
"dataLabelUpper","connector");for(c=g.length;c--;){var f=g[c];d[f]&&a.singular.push(f)}["dataLabel","connector"].forEach(function(c){var g=c+"s";e[c]&&d[g]&&a.plural.push(g)});return a};f.prototype.getLabelConfig=function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}};f.prototype.getNestedProperty=function(f){if(f)return 0===f.indexOf("custom.")?
e(f,this.options):this[f]};f.prototype.getZone=function(){var e=this.series,d=e.zones;e=e.zoneAxis||"y";var g=0,c;for(c=d[g];this[e]>=c.value;)c=d[++g];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=c&&c.color&&!this.options.color?c.color:this.nonZonedColor;return c};f.prototype.hasNewShapeType=function(){return(this.graphic&&(this.graphic.symbolName||this.graphic.element.nodeName))!==this.shapeType};f.prototype.init=function(e,d,g){this.series=e;this.applyOptions(d,g);this.id=F(this.id)?
this.id:J();this.resolveColor();e.chart.pointCount++;C(this,"afterInit");return this};f.prototype.optionsToObject=function(e){var d={},g=this.series,c=g.options.keys,a=c||g.pointArrayMap||["y"],l=a.length,p=0,n=0;if(v(e)||null===e)d[a[0]]=e;else if(I(e))for(!c&&e.length>l&&(g=typeof e[0],"string"===g?d.name=e[0]:"number"===g&&(d.x=e[0]),p++);n<l;)c&&"undefined"===typeof e[p]||(0<a[n].indexOf(".")?f.prototype.setNestedProperty(d,e[p],a[n]):d[a[n]]=e[p]),p++,n++;else"object"===typeof e&&(d=e,e.dataLabels&&
(g._hasPointLabels=!0),e.marker&&(g._hasPointMarkers=!0));return d};f.prototype.resolveColor=function(){var e=this.series;var d=e.chart.options.chart.colorCount;var g=e.chart.styledMode;delete this.nonZonedColor;g||this.options.color||(this.color=e.color);e.options.colorByPoint?(g||(d=e.options.colors||e.chart.options.colors,this.color=this.color||d[e.colorCounter],d=d.length),g=e.colorCounter,e.colorCounter++,e.colorCounter===d&&(e.colorCounter=0)):g=e.colorIndex;this.colorIndex=n(this.colorIndex,
g)};f.prototype.setNestedProperty=function(e,d,g){g.split(".").reduce(function(c,a,g,e){c[a]=e.length-1===g?d:x(c[a],!0)?c[a]:{};return c[a]},e);return e};f.prototype.tooltipFormatter=function(e){var d=this.series,g=d.tooltipOptions,c=n(g.valueDecimals,""),a=g.valuePrefix||"",f=g.valueSuffix||"";d.chart.styledMode&&(e=d.chart.tooltip.styledModeFormat(e));(d.pointArrayMap||["y"]).forEach(function(d){d="{point."+d;if(a||f)e=e.replace(RegExp(d+"}","g"),a+d+"}"+f);e=e.replace(RegExp(d+"}","g"),d+":,."+
c+"f}")});return y(e,{point:this,series:this.series},d.chart)};return f}();return h.Point=f});N(m,"Core/Series/Series.js",[m["Core/Globals.js"],m["Core/Series/Point.js"],m["Core/Utilities.js"]],function(f,h,m){var z=m.error,F=m.extendClass,L=m.fireEvent,K=m.getOptions,C=m.isObject,y=m.merge,e=m.objectEach;m=function(){function f(e,h){var v=y(f.defaultOptions,h);this.chart=e;this._i=e.series.length;e.series.push(this);this.options=v;this.userOptions=y(h)}f.addSeries=function(e,h){f.seriesTypes[e]=
h};f.cleanRecursively=function(h,m){var v={};e(h,function(e,l){if(C(h[l],!0)&&!h.nodeType&&m[l])e=f.cleanRecursively(h[l],m[l]),Object.keys(e).length&&(v[l]=e);else if(C(h[l])||h[l]!==m[l])v[l]=h[l]});return v};f.getSeries=function(e,h){void 0===h&&(h={});var v=e.options.chart;v=h.type||v.type||v.defaultSeriesType||"";var n=f.seriesTypes[v];n||z(17,!0,e,{missingModuleFor:v});return new n(e,h)};f.seriesType=function(e,m,D,n,l){var v=K().plotOptions||{},w=f.seriesTypes;m=m||"";v[e]=y(v[m],D);f.addSeries(e,
F(w[m]||function(){},n));w[e].prototype.type=e;l&&(w[e].prototype.pointClass=F(h,l));return w[e]};f.prototype.update=function(e,h){void 0===h&&(h=!0);var m=this;e=f.cleanRecursively(e,this.userOptions);var n=e.type;"undefined"!==typeof n&&n!==m.type&&(m=f.getSeries(m.chart,e));L(m,"update",{newOptions:e});m.userOptions=y(e);L(m,"afterUpdate",{newOptions:e});h&&m.chart.redraw();return m};f.defaultOptions={type:"base"};f.seriesTypes={};return f}();m.prototype.pointClass=h;f.seriesType=m.seriesType;
f.seriesTypes=m.seriesTypes;return m});N(m,"Core/Chart/Chart.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Axis/Axis.js"],m["Core/Series/Series.js"],m["Core/Globals.js"],m["Core/Legend.js"],m["Core/MSPointer.js"],m["Core/Options.js"],m["Core/Pointer.js"],m["Core/Time.js"],m["Core/Utilities.js"]],function(f,h,m,z,F,L,K,C,y,e){var I=f.animate,v=f.animObject,x=f.setAnimation,D=z.charts,n=z.doc,l=z.win,J=K.defaultOptions,w=e.addEvent,r=e.attr,d=e.createElement,g=e.css,c=e.defined,a=e.discardElement,
q=e.erase,p=e.error,B=e.extend,A=e.find,G=e.fireEvent,M=e.getStyle,T=e.isArray,Q=e.isFunction,O=e.isNumber,E=e.isObject,u=e.isString,b=e.merge,k=e.numberFormat,t=e.objectEach,H=e.pick,R=e.pInt,U=e.relativeLength,Z=e.removeEvent,aa=e.splat,ba=e.syncTimeout,S=e.uniqueKey,Y=z.marginNames,W=function(){function f(a,b,c){this.yAxis=this.xAxis=this.userOptions=this.titleOffset=this.time=this.symbolCounter=this.spacingBox=this.spacing=this.series=this.renderTo=this.renderer=this.pointer=this.pointCount=this.plotWidth=
this.plotTop=this.plotLeft=this.plotHeight=this.plotBox=this.options=this.numberFormatter=this.margin=this.legend=this.labelCollectors=this.isResizing=this.index=this.container=this.colorCounter=this.clipBox=this.chartWidth=this.chartHeight=this.bounds=this.axisOffset=this.axes=void 0;this.getArgs(a,b,c)}f.prototype.getArgs=function(a,b,c){u(a)||a.nodeName?(this.renderTo=a,this.init(b,c)):this.init(a,b)};f.prototype.init=function(a,c){var d,g=a.series,e=a.plotOptions||{};G(this,"init",{args:arguments},
function(){a.series=null;d=b(J,a);var f=d.chart||{};t(d.plotOptions,function(a,c){E(a)&&(a.tooltip=e[c]&&b(e[c].tooltip)||void 0)});d.tooltip.userOptions=a.chart&&a.chart.forExport&&a.tooltip.userOptions||a.tooltip;d.series=a.series=g;this.userOptions=a;var p=f.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=c;this.isResizing=0;this.options=d;this.axes=[];this.series=[];this.time=a.time&&Object.keys(a.time).length?new y(a.time):z.time;this.numberFormatter=
f.numberFormatter||k;this.styledMode=f.styledMode;this.hasCartesianSeries=f.showAxes;var l=this;l.index=D.length;D.push(l);z.chartCount++;p&&t(p,function(a,b){Q(a)&&w(l,b,a)});l.xAxis=[];l.yAxis=[];l.pointCount=l.colorCounter=l.symbolCounter=0;G(l,"afterInit");l.firstRender()})};f.prototype.initSeries=function(a){var b=this.options.chart;b=a.type||b.type||b.defaultSeriesType;var c=m.seriesTypes[b];c||p(17,!0,this,{missingModuleFor:b});b=new c(this,a);"function"===typeof b.init&&b.init(this,a);return b};
f.prototype.setSeriesData=function(){this.getSeriesOrderByLinks().forEach(function(a){a.points||a.data||!a.enabledDataSorting||a.setData(a.options.data,!1)})};f.prototype.getSeriesOrderByLinks=function(){return this.series.concat().sort(function(a,b){return a.linkedSeries.length||b.linkedSeries.length?b.linkedSeries.length-a.linkedSeries.length:0})};f.prototype.orderSeries=function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName())};f.prototype.isInsidePlot=
function(a,b,c){var d=c?b:a;a=c?a:b;d={x:d,y:a,isInsidePlot:0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight};G(this,"afterIsInsidePlot",d);return d.isInsidePlot};f.prototype.redraw=function(a){G(this,"beforeRedraw");var b=this,c=b.axes,d=b.series,g=b.pointer,k=b.legend,e=b.userOptions.legend,f=b.isDirtyLegend,t=b.hasCartesianSeries,p=b.isDirtyBox,l=b.renderer,q=l.isHidden(),h=[];b.setResponsive&&b.setResponsive(!1);x(b.hasRendered?a:!1,b);q&&b.temporaryDisplay();b.layOutTitles();for(a=d.length;a--;){var n=
d[a];if(n.options.stacking){var u=!0;if(n.isDirty){var r=!0;break}}}if(r)for(a=d.length;a--;)n=d[a],n.options.stacking&&(n.isDirty=!0);d.forEach(function(a){a.isDirty&&("point"===a.options.legendType?("function"===typeof a.updateTotals&&a.updateTotals(),f=!0):e&&(e.labelFormatter||e.labelFormat)&&(f=!0));a.isDirtyData&&G(a,"updatedData")});f&&k&&k.options.enabled&&(k.render(),b.isDirtyLegend=!1);u&&b.getStacks();t&&c.forEach(function(a){b.isResizing&&O(a.min)||(a.updateNames(),a.setScale())});b.getMargins();
t&&(c.forEach(function(a){a.isDirty&&(p=!0)}),c.forEach(function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,h.push(function(){G(a,"afterSetExtremes",B(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(p||u)&&a.redraw()}));p&&b.drawChartBox();G(b,"predraw");d.forEach(function(a){(p||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});g&&g.reset(!0);l.draw();G(b,"redraw");G(b,"render");q&&b.temporaryDisplay(!0);h.forEach(function(a){a.call()})};f.prototype.get=function(a){function b(b){return b.id===
a||b.options&&b.options.id===a}var c=this.series,d;var g=A(this.axes,b)||A(this.series,b);for(d=0;!g&&d<c.length;d++)g=A(c[d].points||[],b);return g};f.prototype.getAxes=function(){var a=this,b=this.options,c=b.xAxis=aa(b.xAxis||{});b=b.yAxis=aa(b.yAxis||{});G(this,"getAxes");c.forEach(function(a,b){a.index=b;a.isX=!0});b.forEach(function(a,b){a.index=b});c.concat(b).forEach(function(b){new h(a,b)});G(this,"afterGetAxes")};f.prototype.getSelectedPoints=function(){var a=[];this.series.forEach(function(b){a=
a.concat(b.getPointsCollection().filter(function(a){return H(a.selectedStaging,a.selected)}))});return a};f.prototype.getSelectedSeries=function(){return this.series.filter(function(a){return a.selected})};f.prototype.setTitle=function(a,b,c){this.applyDescription("title",a);this.applyDescription("subtitle",b);this.applyDescription("caption",void 0);this.layOutTitles(c)};f.prototype.applyDescription=function(a,c){var d=this,g="title"===a?{color:"#333333",fontSize:this.options.isStock?"16px":"18px"}:
{color:"#666666"};g=this.options[a]=b(!this.styledMode&&{style:g},this.options[a],c);var k=this[a];k&&c&&(this[a]=k=k.destroy());g&&!k&&(k=this.renderer.text(g.text,0,0,g.useHTML).attr({align:g.align,"class":"highcharts-"+a,zIndex:g.zIndex||4}).add(),k.update=function(b){d[{title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"}[a]](b)},this.styledMode||k.css(g.style),this[a]=k)};f.prototype.layOutTitles=function(a){var b=[0,0,0],c=this.renderer,d=this.spacingBox;["title","subtitle","caption"].forEach(function(a){var g=
this[a],k=this.options[a],e=k.verticalAlign||"top";a="title"===a?-3:"top"===e?b[0]+2:0;if(g){if(!this.styledMode)var f=k.style.fontSize;f=c.fontMetrics(f,g).b;g.css({width:(k.width||d.width+(k.widthAdjust||0))+"px"});var t=Math.round(g.getBBox(k.useHTML).height);g.align(B({y:"bottom"===e?f:a+f,height:t},k),!1,"spacingBox");k.floating||("top"===e?b[0]=Math.ceil(b[0]+t):"bottom"===e&&(b[2]=Math.ceil(b[2]+t)))}},this);b[0]&&"top"===(this.options.title.verticalAlign||"top")&&(b[0]+=this.options.title.margin);
b[2]&&"bottom"===this.options.caption.verticalAlign&&(b[2]+=this.options.caption.margin);var g=!this.titleOffset||this.titleOffset.join(",")!==b.join(",");this.titleOffset=b;G(this,"afterLayOutTitles");!this.isDirtyBox&&g&&(this.isDirtyBox=this.isDirtyLegend=g,this.hasRendered&&H(a,!0)&&this.isDirtyBox&&this.redraw())};f.prototype.getChartSize=function(){var a=this.options.chart,b=a.width;a=a.height;var d=this.renderTo;c(b)||(this.containerWidth=M(d,"width"));c(a)||(this.containerHeight=M(d,"height"));
this.chartWidth=Math.max(0,b||this.containerWidth||600);this.chartHeight=Math.max(0,U(a,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))};f.prototype.temporaryDisplay=function(a){var b=this.renderTo;if(a)for(;b&&b.style;)b.hcOrigStyle&&(g(b,b.hcOrigStyle),delete b.hcOrigStyle),b.hcOrigDetached&&(n.body.removeChild(b),b.hcOrigDetached=!1),b=b.parentNode;else for(;b&&b.style;){n.body.contains(b)||b.parentNode||(b.hcOrigDetached=!0,n.body.appendChild(b));if("none"===M(b,"display",
!1)||b.hcOricDetached)b.hcOrigStyle={display:b.style.display,height:b.style.height,overflow:b.style.overflow},a={display:"block",overflow:"hidden"},b!==this.renderTo&&(a.height=0),g(b,a),b.offsetWidth||b.style.setProperty("display","block","important");b=b.parentNode;if(b===n.body)break}};f.prototype.setClassName=function(a){this.container.className="highcharts-container "+(a||"")};f.prototype.getContainer=function(){var a=this.options,b=a.chart;var c=this.renderTo;var k=S(),e,f;c||(this.renderTo=
c=b.renderTo);u(c)&&(this.renderTo=c=n.getElementById(c));c||p(13,!0,this);var t=R(r(c,"data-highcharts-chart"));O(t)&&D[t]&&D[t].hasRendered&&D[t].destroy();r(c,"data-highcharts-chart",this.index);c.innerHTML="";b.skipClone||c.offsetWidth||this.temporaryDisplay();this.getChartSize();t=this.chartWidth;var l=this.chartHeight;g(c,{overflow:"hidden"});this.styledMode||(e=B({position:"relative",overflow:"hidden",width:t+"px",height:l+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)",
userSelect:"none"},b.style));this.container=c=d("div",{id:k},e,c);this._cursor=c.style.cursor;this.renderer=new (z[b.renderer]||z.Renderer)(c,t,l,null,b.forExport,a.exporting&&a.exporting.allowHTML,this.styledMode);x(void 0,this);this.setClassName(b.className);if(this.styledMode)for(f in a.defs)this.renderer.definition(a.defs[f]);else this.renderer.setStyle(b.style);this.renderer.chartIndex=this.index;G(this,"afterGetContainer")};f.prototype.getMargins=function(a){var b=this.spacing,d=this.margin,
g=this.titleOffset;this.resetMargins();g[0]&&!c(d[0])&&(this.plotTop=Math.max(this.plotTop,g[0]+b[0]));g[2]&&!c(d[2])&&(this.marginBottom=Math.max(this.marginBottom,g[2]+b[2]));this.legend&&this.legend.display&&this.legend.adjustMargins(d,b);G(this,"getMargins");a||this.getAxisMargins()};f.prototype.getAxisMargins=function(){var a=this,b=a.axisOffset=[0,0,0,0],d=a.colorAxis,g=a.margin,k=function(a){a.forEach(function(a){a.visible&&a.getOffset()})};a.hasCartesianSeries?k(a.axes):d&&d.length&&k(d);
Y.forEach(function(d,k){c(g[k])||(a[d]+=b[k])});a.setChartSize()};f.prototype.reflow=function(a){var b=this,d=b.options.chart,g=b.renderTo,k=c(d.width)&&c(d.height),f=d.width||M(g,"width");d=d.height||M(g,"height");g=a?a.target:l;if(!k&&!b.isPrinting&&f&&d&&(g===l||g===n)){if(f!==b.containerWidth||d!==b.containerHeight)e.clearTimeout(b.reflowTimeout),b.reflowTimeout=ba(function(){b.container&&b.setSize(void 0,void 0,!1)},a?100:0);b.containerWidth=f;b.containerHeight=d}};f.prototype.setReflow=function(a){var b=
this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=w(l,"resize",function(a){b.options&&b.reflow(a)}),w(this,"destroy",this.unbindReflow))};f.prototype.setSize=function(a,b,c){var d=this,k=d.renderer;d.isResizing+=1;x(c,d);c=k.globalAnimation;d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;"undefined"!==typeof a&&(d.options.chart.width=a);"undefined"!==typeof b&&(d.options.chart.height=b);d.getChartSize();d.styledMode||(c?
I:g)(d.container,{width:d.chartWidth+"px",height:d.chartHeight+"px"},c);d.setChartSize(!0);k.setSize(d.chartWidth,d.chartHeight,c);d.axes.forEach(function(a){a.isDirty=!0;a.setScale()});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(c);d.oldChartHeight=null;G(d,"resize");ba(function(){d&&G(d,"endResize",null,function(){--d.isResizing})},v(c).duration)};f.prototype.setChartSize=function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,g=this.chartHeight,k=this.options.chart,
e=this.spacing,f=this.clipOffset,t,p,l,q;this.plotLeft=t=Math.round(this.plotLeft);this.plotTop=p=Math.round(this.plotTop);this.plotWidth=l=Math.max(0,Math.round(d-t-this.marginRight));this.plotHeight=q=Math.max(0,Math.round(g-p-this.marginBottom));this.plotSizeX=b?q:l;this.plotSizeY=b?l:q;this.plotBorderWidth=k.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:e[3],y:e[0],width:d-e[3]-e[1],height:g-e[0]-e[2]};this.plotBox=c.plotBox={x:t,y:p,width:l,height:q};d=2*Math.floor(this.plotBorderWidth/
2);b=Math.ceil(Math.max(d,f[3])/2);c=Math.ceil(Math.max(d,f[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(d,f[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(d,f[2])/2-c))};a||this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation()});G(this,"afterSetChartSize",{skipAxes:a})};f.prototype.resetMargins=function(){G(this,"resetMargins");var a=this,b=a.options.chart;["margin","spacing"].forEach(function(c){var d=b[c],g=E(d)?d:[d,d,d,d];["Top","Right",
"Bottom","Left"].forEach(function(d,k){a[c][k]=H(b[c+d],g[k])})});Y.forEach(function(b,c){a[b]=H(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]};f.prototype.drawChartBox=function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,g=this.chartBackground,k=this.plotBackground,e=this.plotBorder,f=this.styledMode,t=this.plotBGImage,p=a.backgroundColor,l=a.plotBackgroundColor,q=a.plotBackgroundImage,h,n=this.plotLeft,u=this.plotTop,r=this.plotWidth,
m=this.plotHeight,w=this.plotBox,v=this.clipRect,H=this.clipBox,B="animate";g||(this.chartBackground=g=b.rect().addClass("highcharts-background").add(),B="attr");if(f)var A=h=g.strokeWidth();else{A=a.borderWidth||0;h=A+(a.shadow?8:0);p={fill:p||"none"};if(A||g["stroke-width"])p.stroke=a.borderColor,p["stroke-width"]=A;g.attr(p).shadow(a.shadow)}g[B]({x:h/2,y:h/2,width:c-h-A%2,height:d-h-A%2,r:a.borderRadius});B="animate";k||(B="attr",this.plotBackground=k=b.rect().addClass("highcharts-plot-background").add());
k[B](w);f||(k.attr({fill:l||"none"}).shadow(a.plotShadow),q&&(t?(q!==t.attr("href")&&t.attr("href",q),t.animate(w)):this.plotBGImage=b.image(q,n,u,r,m).add()));v?v.animate({width:H.width,height:H.height}):this.clipRect=b.clipRect(H);B="animate";e||(B="attr",this.plotBorder=e=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());f||e.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});e[B](e.crisp({x:n,y:u,width:r,height:m},-e.strokeWidth()));this.isDirtyBox=
!1;G(this,"afterDrawChartBox")};f.prototype.propFromSeries=function(){var a=this,b=a.options.chart,c,d=a.options.series,g,k;["inverted","angular","polar"].forEach(function(e){c=m.seriesTypes[b.type||b.defaultSeriesType];k=b[e]||c&&c.prototype[e];for(g=d&&d.length;!k&&g--;)(c=m.seriesTypes[d[g].type])&&c.prototype[e]&&(k=!0);a[e]=k})};f.prototype.linkSeries=function(){var a=this,b=a.series;b.forEach(function(a){a.linkedSeries.length=0});b.forEach(function(b){var c=b.options.linkedTo;u(c)&&(c=":previous"===
c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,c.enabledDataSorting&&b.setDataSortingOptions(),b.visible=H(b.options.visible,c.options.visible,b.visible))});G(this,"afterLinkSeries")};f.prototype.renderSeries=function(){this.series.forEach(function(a){a.translate();a.render()})};f.prototype.renderLabels=function(){var a=this,b=a.options.labels;b.items&&b.items.forEach(function(c){var d=B(b.style,c.style),g=R(d.left)+a.plotLeft,k=R(d.top)+a.plotTop+12;
delete d.left;delete d.top;a.renderer.text(c.html,g,k).attr({zIndex:2}).css(d).add()})};f.prototype.render=function(){var a=this.axes,b=this.colorAxis,c=this.renderer,d=this.options,g=0,k=function(a){a.forEach(function(a){a.visible&&a.render()})};this.setTitle();this.legend=new F(this,d.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();d=this.plotWidth;a.some(function(a){if(a.horiz&&a.visible&&a.options.labels.enabled&&a.series.length)return g=21,!0});var e=this.plotHeight=
Math.max(this.plotHeight-g,0);a.forEach(function(a){a.setScale()});this.getAxisMargins();var f=1.1<d/this.plotWidth;var t=1.05<e/this.plotHeight;if(f||t)a.forEach(function(a){(a.horiz&&f||!a.horiz&&t)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries?k(a):b&&b.length&&k(b);this.seriesGroup||(this.seriesGroup=c.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.updateContainerScaling();
this.hasRendered=!0};f.prototype.addCredits=function(a){var c=this,d=b(!0,this.options.credits,a);d.enabled&&!this.credits&&(this.credits=this.renderer.text(d.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){d.href&&(l.location.href=d.href)}).attr({align:d.position.align,zIndex:8}),c.styledMode||this.credits.css(d.style),this.credits.add().align(d.position),this.credits.update=function(a){c.credits=c.credits.destroy();c.addCredits(a)})};f.prototype.updateContainerScaling=
function(){var a=this.container;if(2<a.offsetWidth&&2<a.offsetHeight&&a.getBoundingClientRect){var b=a.getBoundingClientRect(),c=b.width/a.offsetWidth;a=b.height/a.offsetHeight;1!==c||1!==a?this.containerScaling={scaleX:c,scaleY:a}:delete this.containerScaling}};f.prototype.destroy=function(){var b=this,c=b.axes,d=b.series,g=b.container,k,e=g&&g.parentNode;G(b,"destroy");b.renderer.forExport?q(D,b):D[b.index]=void 0;z.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");Z(b);for(k=c.length;k--;)c[k]=
c[k].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(k=d.length;k--;)d[k]=d[k].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});g&&(g.innerHTML="",Z(g),e&&a(g));t(b,function(a,c){delete b[c]})};f.prototype.firstRender=function(){var a=this,b=a.options;if(!a.isReadyToRender||
a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();(T(b.series)?b.series:[]).forEach(function(b){a.initSeries(b)});a.linkSeries();a.setSeriesData();G(a,"beforeRender");C&&(a.pointer=z.hasTouch||!l.PointerEvent&&!l.MSPointerEvent?new C(a,b):new L(a,b));a.render();if(!a.renderer.imgCount&&!a.hasLoaded)a.onload();a.temporaryDisplay(!0)}};f.prototype.onload=function(){this.callbacks.concat([this.callback]).forEach(function(a){a&&"undefined"!==typeof this.index&&
a.apply(this,[this])},this);G(this,"load");G(this,"render");c(this.index)&&this.setReflow(this.options.chart.reflow);this.hasLoaded=!0};return f}();W.prototype.callbacks=[];z.chart=function(a,b,c){return new W(a,b,c)};return z.Chart=W});N(m,"Extensions/ScrollablePlotArea.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Chart/Chart.js"],m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h,m,z){var F=f.stop,L=z.addEvent,K=z.createElement,C=z.pick;"";L(h,"afterSetChartSize",function(f){var e=
this.options.chart.scrollablePlotArea,h=e&&e.minWidth;e=e&&e.minHeight;if(!this.renderer.forExport){if(h){if(this.scrollablePixelsX=h=Math.max(0,h-this.chartWidth)){this.plotWidth+=h;this.inverted?(this.clipBox.height+=h,this.plotBox.height+=h):(this.clipBox.width+=h,this.plotBox.width+=h);var v={1:{name:"right",value:h}}}}else e&&(this.scrollablePixelsY=h=Math.max(0,e-this.chartHeight))&&(this.plotHeight+=h,this.inverted?(this.clipBox.width+=h,this.plotBox.width+=h):(this.clipBox.height+=h,this.plotBox.height+=
h),v={2:{name:"bottom",value:h}});v&&!f.skipAxes&&this.axes.forEach(function(e){v[e.side]?e.getPlotLinePath=function(){var f=v[e.side].name,h=this[f];this[f]=h-v[e.side].value;var l=m.Axis.prototype.getPlotLinePath.apply(this,arguments);this[f]=h;return l}:(e.setAxisSize(),e.setAxisTranslation())})}});L(h,"render",function(){this.scrollablePixelsX||this.scrollablePixelsY?(this.setUpScrolling&&this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});h.prototype.setUpScrolling=function(){var f=
this,e={WebkitOverflowScrolling:"touch",overflowX:"hidden",overflowY:"hidden"};this.scrollablePixelsX&&(e.overflowX="auto");this.scrollablePixelsY&&(e.overflowY="auto");this.scrollingParent=K("div",{className:"highcharts-scrolling-parent"},{position:"relative"},this.renderTo);this.scrollingContainer=K("div",{className:"highcharts-scrolling"},e,this.scrollingParent);L(this.scrollingContainer,"scroll",function(){f.pointer&&delete f.pointer.chartPosition});this.innerContainer=K("div",{className:"highcharts-inner-container"},
null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};h.prototype.moveFixedElements=function(){var f=this.container,e=this.fixedRenderer,h=".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),m;this.scrollablePixelsX&&
!this.inverted?m=".highcharts-yaxis":this.scrollablePixelsX&&this.inverted?m=".highcharts-xaxis":this.scrollablePixelsY&&!this.inverted?m=".highcharts-xaxis":this.scrollablePixelsY&&this.inverted&&(m=".highcharts-yaxis");h.push(m,m+"-labels");h.forEach(function(h){[].forEach.call(f.querySelectorAll(h),function(f){(f.namespaceURI===e.SVG_NS?e.box:e.box.parentNode).appendChild(f);f.style.pointerEvents="auto"})})};h.prototype.applyFixed=function(){var f,e,h=!this.fixedDiv,v=this.options.chart.scrollablePlotArea;
h?(this.fixedDiv=K("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2,top:0},null,!0),null===(f=this.scrollingContainer)||void 0===f?void 0:f.parentNode.insertBefore(this.fixedDiv,this.scrollingContainer),this.renderTo.style.overflow="visible",this.fixedRenderer=f=new m.Renderer(this.fixedDiv,this.chartWidth,this.chartHeight,null===(e=this.options.chart)||void 0===e?void 0:e.style),this.scrollableMask=f.path().attr({fill:this.options.chart.backgroundColor||
"#fff","fill-opacity":C(v.opacity,.85),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),this.moveFixedElements(),L(this,"afterShowResetZoom",this.moveFixedElements),L(this,"afterLayOutTitles",this.moveFixedElements)):this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);e=this.chartWidth+(this.scrollablePixelsX||0);f=this.chartHeight+(this.scrollablePixelsY||0);F(this.container);this.container.style.width=e+"px";this.container.style.height=f+"px";this.renderer.boxWrapper.attr({width:e,
height:f,viewBox:[0,0,e,f].join(" ")});this.chartBackground.attr({width:e,height:f});this.scrollingContainer.style.height=this.chartHeight+"px";h&&(v.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixelsX*v.scrollPositionX),v.scrollPositionY&&(this.scrollingContainer.scrollTop=this.scrollablePixelsY*v.scrollPositionY));f=this.axisOffset;h=this.plotTop-f[0]-1;v=this.plotLeft-f[3]-1;e=this.plotTop+this.plotHeight+f[2]+1;f=this.plotLeft+this.plotWidth+f[1]+1;var x=this.plotLeft+
this.plotWidth-(this.scrollablePixelsX||0),D=this.plotTop+this.plotHeight-(this.scrollablePixelsY||0);h=this.scrollablePixelsX?[["M",0,h],["L",this.plotLeft-1,h],["L",this.plotLeft-1,e],["L",0,e],["Z"],["M",x,h],["L",this.chartWidth,h],["L",this.chartWidth,e],["L",x,e],["Z"]]:this.scrollablePixelsY?[["M",v,0],["L",v,this.plotTop-1],["L",f,this.plotTop-1],["L",f,0],["Z"],["M",v,D],["L",v,this.chartHeight],["L",f,this.chartHeight],["L",f,D],["Z"]]:[["M",0,0]];"adjustHeight"!==this.redrawTrigger&&this.scrollableMask.attr({d:h})}});
N(m,"Core/Axis/StackingAxis.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Utilities.js"]],function(f,h){var m=f.getDeferredAnimation,z=h.addEvent,F=h.destroyObjectProperties,L=h.fireEvent,K=h.objectEach,C=h.pick,y=function(){function e(e){this.oldStacks={};this.stacks={};this.stacksTouched=0;this.axis=e}e.prototype.buildStacks=function(){var e=this.axis,f=e.series,h=C(e.options.reversedStacks,!0),m=f.length,n;if(!e.isXAxis){this.usePercentage=!1;for(n=m;n--;){var l=f[h?n:m-n-1];l.setStackedPoints();
l.setGroupedPoints()}for(n=0;n<m;n++)f[n].modifyStacks();L(e,"afterBuildStacks")}};e.prototype.cleanStacks=function(){if(!this.axis.isXAxis){if(this.oldStacks)var e=this.stacks=this.oldStacks;K(e,function(e){K(e,function(e){e.cumulative=e.total})})}};e.prototype.resetStacks=function(){var e=this,f=e.stacks;e.axis.isXAxis||K(f,function(f){K(f,function(h,n){h.touched<e.stacksTouched?(h.destroy(),delete f[n]):(h.total=null,h.cumulative=null)})})};e.prototype.renderStackTotals=function(){var e=this.axis,
f=e.chart,h=f.renderer,D=this.stacks;e=m(f,e.options.stackLabels.animation);var n=this.stackTotalGroup=this.stackTotalGroup||h.g("stack-labels").attr({visibility:"visible",zIndex:6,opacity:0}).add();n.translate(f.plotLeft,f.plotTop);K(D,function(e){K(e,function(e){e.render(n)})});n.animate({opacity:1},e)};return e}();return function(){function e(){}e.compose=function(f){z(f,"init",e.onInit);z(f,"destroy",e.onDestroy)};e.onDestroy=function(){var e=this.stacking;if(e){var f=e.stacks;K(f,function(e,
h){F(e);f[h]=null});e&&e.stackTotalGroup&&e.stackTotalGroup.destroy()}};e.onInit=function(){this.stacking||(this.stacking=new y(this))};return e}()});N(m,"Mixins/LegendSymbol.js",[m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h){var m=h.merge,z=h.pick;return f.LegendSymbolMixin={drawRectangle:function(f,h){var m=f.symbolHeight,C=f.options.squareSymbol;h.legendSymbol=this.chart.renderer.rect(C?(f.symbolWidth-m)/2:0,f.baseline-m+1,C?m:f.symbolWidth,m,z(f.options.symbolRadius,m/2)).addClass("highcharts-point").attr({zIndex:3}).add(h.legendGroup)},
drawLineMarker:function(f){var h=this.options,F=h.marker,C=f.symbolWidth,y=f.symbolHeight,e=y/2,I=this.chart.renderer,v=this.legendGroup;f=f.baseline-Math.round(.3*f.fontMetrics.b);var x={};this.chart.styledMode||(x={"stroke-width":h.lineWidth||0},h.dashStyle&&(x.dashstyle=h.dashStyle));this.legendLine=I.path([["M",0,f],["L",C,f]]).addClass("highcharts-graph").attr(x).add(v);F&&!1!==F.enabled&&C&&(h=Math.min(z(F.radius,e),e),0===this.symbol.indexOf("url")&&(F=m(F,{width:y,height:y}),h=0),this.legendSymbol=
F=I.symbol(this.symbol,C/2-h,f-h,2*h,2*h,F).addClass("highcharts-point").add(v),F.isMarker=!0)}}});N(m,"Core/Series/CartesianSeries.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Series/Series.js"],m["Core/Globals.js"],m["Mixins/LegendSymbol.js"],m["Core/Options.js"],m["Core/Series/Point.js"],m["Core/Renderer/SVG/SVGElement.js"],m["Core/Utilities.js"]],function(f,h,m,z,F,L,K,C){var y=f.animObject,e=F.defaultOptions,I=C.addEvent,v=C.arrayMax,x=C.arrayMin,D=C.clamp,n=C.correctFloat,l=C.defined,
J=C.erase,w=C.error,r=C.extend,d=C.find,g=C.fireEvent,c=C.getNestedProperty,a=C.isArray,q=C.isFunction,p=C.isNumber,B=C.isString,A=C.merge,G=C.objectEach,M=C.pick,T=C.removeEvent,Q=C.splat,O=C.syncTimeout;"";var E=h.seriesTypes,u=m.win;f=h.seriesType("line",void 0,{lineWidth:2,allowPointSelect:!1,crisp:!0,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{enabledThreshold:2,lineColor:"#ffffff",lineWidth:0,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,
lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{animation:{},align:"center",defer:!0,formatter:function(){var a=this.series.chart.numberFormatter;return"number"!==typeof this.y?"":a(this.y,-1)},padding:5,style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0},cropThreshold:300,opacity:1,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},
lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{animation:{duration:0}},inactive:{animation:{duration:50},opacity:.2}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{axisTypes:["xAxis","yAxis"],coll:"series",colorCounter:0,cropShoulder:1,directTouch:!1,isCartesian:!0,parallelArrays:["x","y"],pointClass:L,requireSorting:!0,sorted:!0,init:function(a,c){g(this,"init",{options:c});var b=this,d=a.series,k;this.eventOptions=this.eventOptions||{};this.eventsToUnbind=[];b.chart=
a;b.options=c=b.setOptions(c);b.linkedSeries=[];b.bindAxes();r(b,{name:c.name,state:"",visible:!1!==c.visible,selected:!0===c.selected});var e=c.events;G(e,function(a,c){q(a)&&b.eventOptions[c]!==a&&(q(b.eventOptions[c])&&T(b,c,b.eventOptions[c]),b.eventOptions[c]=a,I(b,c,a))});if(e&&e.click||c.point&&c.point.events&&c.point.events.click||c.allowPointSelect)a.runTrackerClick=!0;b.getColor();b.getSymbol();b.parallelArrays.forEach(function(a){b[a+"Data"]||(b[a+"Data"]=[])});b.isCartesian&&(a.hasCartesianSeries=
!0);d.length&&(k=d[d.length-1]);b._i=M(k&&k._i,-1)+1;b.opacity=b.options.opacity;a.orderSeries(this.insert(d));c.dataSorting&&c.dataSorting.enabled?b.setDataSortingOptions():b.points||b.data||b.setData(c.data,!1);g(this,"afterInit")},is:function(a){return E[a]&&this instanceof E[a]},insert:function(a){var b=this.options.index,c;if(p(b)){for(c=a.length;c--;)if(b>=M(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return M(c,a.length-1)},bindAxes:function(){var a=
this,c=a.options,d=a.chart,e;g(this,"bindAxes",null,function(){(a.axisTypes||[]).forEach(function(b){d[b].forEach(function(d){e=d.options;if(c[b]===e.index||"undefined"!==typeof c[b]&&c[b]===e.id||"undefined"===typeof c[b]&&0===e.index)a.insert(d.series),a[b]=d,d.isDirty=!0});a[b]||a.optionalAxis===b||w(18,!0,d)})});g(this,"afterBindAxes")},updateParallelArrays:function(a,c){var b=a.series,d=arguments,g=p(c)?function(d){var g="y"===d&&b.toYData?b.toYData(a):a[d];b[d+"Data"][c]=g}:function(a){Array.prototype[c].apply(b[a+
"Data"],Array.prototype.slice.call(d,2))};b.parallelArrays.forEach(g)},hasData:function(){return this.visible&&"undefined"!==typeof this.dataMax&&"undefined"!==typeof this.dataMin||this.visible&&this.yData&&0<this.yData.length},autoIncrement:function(){var a=this.options,c=this.xIncrement,d,g=a.pointIntervalUnit,e=this.chart.time;c=M(c,a.pointStart,0);this.pointInterval=d=M(this.pointInterval,a.pointInterval,1);g&&(a=new e.Date(c),"day"===g?e.set("Date",a,e.get("Date",a)+d):"month"===g?e.set("Month",
a,e.get("Month",a)+d):"year"===g&&e.set("FullYear",a,e.get("FullYear",a)+d),d=a.getTime()-c);this.xIncrement=c+d;return c},setDataSortingOptions:function(){var a=this.options;r(this,{requireSorting:!1,sorted:!1,enabledDataSorting:!0,allowDG:!1});l(a.pointRange)||(a.pointRange=1)},setOptions:function(a){var b=this.chart,c=b.options,d=c.plotOptions,f=b.userOptions||{};a=A(a);b=b.styledMode;var p={plotOptions:d,userOptions:a};g(this,"setOptions",p);var h=p.plotOptions[this.type],q=f.plotOptions||{};
this.userOptions=p.userOptions;f=A(h,d.series,f.plotOptions&&f.plotOptions[this.type],a);this.tooltipOptions=A(e.tooltip,e.plotOptions.series&&e.plotOptions.series.tooltip,e.plotOptions[this.type].tooltip,c.tooltip.userOptions,d.series&&d.series.tooltip,d[this.type].tooltip,a.tooltip);this.stickyTracking=M(a.stickyTracking,q[this.type]&&q[this.type].stickyTracking,q.series&&q.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:f.stickyTracking);null===h.marker&&delete f.marker;
this.zoneAxis=f.zoneAxis;c=this.zones=(f.zones||[]).slice();!f.negativeColor&&!f.negativeFillColor||f.zones||(d={value:f[this.zoneAxis+"Threshold"]||f.threshold||0,className:"highcharts-negative"},b||(d.color=f.negativeColor,d.fillColor=f.negativeFillColor),c.push(d));c.length&&l(c[c.length-1].value)&&c.push(b?{}:{color:this.color,fillColor:this.fillColor});g(this,"afterSetOptions",{options:f});return f},getName:function(){return M(this.options.name,"Series "+(this.index+1))},getCyclic:function(a,
c,d){var b=this.chart,g=this.userOptions,k=a+"Index",e=a+"Counter",f=d?d.length:M(b.options.chart[a+"Count"],b[a+"Count"]);if(!c){var p=M(g[k],g["_"+k]);l(p)||(b.series.length||(b[e]=0),g["_"+k]=p=b[e]%f,b[e]+=1);d&&(c=d[p])}"undefined"!==typeof p&&(this[k]=p);this[a]=c},getColor:function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||e.plotOptions[this.type].color,this.chart.options.colors)},getPointsCollection:function(){return(this.hasGroupedData?
this.points:this.data)||[]},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},findPointIndex:function(a,c){var b=a.id,g=a.x,k=this.points,e,f=this.options.dataSorting;if(b)var l=this.chart.get(b);else if(this.linkedParent||this.enabledDataSorting){var h=f&&f.matchByName?"name":"index";l=d(k,function(b){return!b.touched&&b[h]===a[h]});if(!l)return}if(l){var q=l&&l.index;"undefined"!==typeof q&&(e=!0)}"undefined"===typeof q&&p(g)&&(q=this.xData.indexOf(g,
c));-1!==q&&"undefined"!==typeof q&&this.cropped&&(q=q>=this.cropStart?q-this.cropStart:q);!e&&k[q]&&k[q].touched&&(q=void 0);return q},drawLegendSymbol:z.drawLineMarker,updateData:function(a,c){var b=this.options,d=b.dataSorting,g=this.points,k=[],e,f,h,q=this.requireSorting,n=a.length===g.length,u=!0;this.xIncrement=null;a.forEach(function(a,c){var f=l(a)&&this.pointClass.prototype.optionsToObject.call({series:this},a)||{};var t=f.x;if(f.id||p(t)){if(t=this.findPointIndex(f,h),-1===t||"undefined"===
typeof t?k.push(a):g[t]&&a!==b.data[t]?(g[t].update(a,!1,null,!1),g[t].touched=!0,q&&(h=t+1)):g[t]&&(g[t].touched=!0),!n||c!==t||d&&d.enabled||this.hasDerivedData)e=!0}else k.push(a)},this);if(e)for(a=g.length;a--;)(f=g[a])&&!f.touched&&f.remove&&f.remove(!1,c);else!n||d&&d.enabled?u=!1:(a.forEach(function(a,b){g[b].update&&a!==g[b].y&&g[b].update(a,!1,null,!1)}),k.length=0);g.forEach(function(a){a&&(a.touched=!1)});if(!u)return!1;k.forEach(function(a){this.addPoint(a,!1,null,null,!1)},this);null===
this.xIncrement&&this.xData&&this.xData.length&&(this.xIncrement=v(this.xData),this.autoIncrement());return!0},setData:function(b,c,d,g){var k=this,e=k.points,f=e&&e.length||0,t,l=k.options,h=k.chart,q=l.dataSorting,n=null,u=k.xAxis;n=l.turboThreshold;var r=this.xData,m=this.yData,A=(t=k.pointArrayMap)&&t.length,v=l.keys,E=0,H=1,O;b=b||[];t=b.length;c=M(c,!0);q&&q.enabled&&(b=this.sortData(b));!1!==g&&t&&f&&!k.cropped&&!k.hasGroupedData&&k.visible&&!k.isSeriesBoosting&&(O=this.updateData(b,d));if(!O){k.xIncrement=
null;k.colorCounter=0;this.parallelArrays.forEach(function(a){k[a+"Data"].length=0});if(n&&t>n)if(n=k.getFirstValidPoint(b),p(n))for(d=0;d<t;d++)r[d]=this.autoIncrement(),m[d]=b[d];else if(a(n))if(A)for(d=0;d<t;d++)g=b[d],r[d]=g[0],m[d]=g.slice(1,A+1);else for(v&&(E=v.indexOf("x"),H=v.indexOf("y"),E=0<=E?E:0,H=0<=H?H:1),d=0;d<t;d++)g=b[d],r[d]=g[E],m[d]=g[H];else w(12,!1,h);else for(d=0;d<t;d++)"undefined"!==typeof b[d]&&(g={series:k},k.pointClass.prototype.applyOptions.apply(g,[b[d]]),k.updateParallelArrays(g,
d));m&&B(m[0])&&w(14,!0,h);k.data=[];k.options.data=k.userOptions.data=b;for(d=f;d--;)e[d]&&e[d].destroy&&e[d].destroy();u&&(u.minRange=u.userMinRange);k.isDirty=h.isDirtyBox=!0;k.isDirtyData=!!e;d=!1}"point"===l.legendType&&(this.processData(),this.generatePoints());c&&h.redraw(d)},sortData:function(a){var b=this,d=b.options.dataSorting.sortKey||"y",g=function(a,b){return l(b)&&a.pointClass.prototype.optionsToObject.call({series:a},b)||{}};a.forEach(function(c,d){a[d]=g(b,c);a[d].index=d},this);
a.concat().sort(function(a,b){a=c(d,a);b=c(d,b);return b<a?-1:b>a?1:0}).forEach(function(a,b){a.x=b},this);b.linkedSeries&&b.linkedSeries.forEach(function(b){var c=b.options,d=c.data;c.dataSorting&&c.dataSorting.enabled||!d||(d.forEach(function(c,k){d[k]=g(b,c);a[k]&&(d[k].x=a[k].x,d[k].index=k)}),b.setData(d,!1))});return a},getProcessedData:function(a){var b=this.xData,c=this.yData,d=b.length;var g=0;var e=this.xAxis,f=this.options;var p=f.cropThreshold;var l=a||this.getExtremesFromAll||f.getExtremesFromAll,
h=this.isCartesian;a=e&&e.val2lin;f=!(!e||!e.logarithmic);var q=this.requireSorting;if(e){e=e.getExtremes();var n=e.min;var u=e.max}if(h&&this.sorted&&!l&&(!p||d>p||this.forceCrop))if(b[d-1]<n||b[0]>u)b=[],c=[];else if(this.yData&&(b[0]<n||b[d-1]>u)){g=this.cropData(this.xData,this.yData,n,u);b=g.xData;c=g.yData;g=g.start;var r=!0}for(p=b.length||1;--p;)if(d=f?a(b[p])-a(b[p-1]):b[p]-b[p-1],0<d&&("undefined"===typeof m||d<m))var m=d;else 0>d&&q&&(w(15,!1,this.chart),q=!1);return{xData:b,yData:c,cropped:r,
cropStart:g,closestPointRange:m}},processData:function(a){var b=this.xAxis;if(this.isCartesian&&!this.isDirty&&!b.isDirty&&!this.yAxis.isDirty&&!a)return!1;a=this.getProcessedData();this.cropped=a.cropped;this.cropStart=a.cropStart;this.processedXData=a.xData;this.processedYData=a.yData;this.closestPointRange=this.basePointRange=a.closestPointRange},cropData:function(a,c,d,g,e){var b=a.length,k=0,f=b,p;e=M(e,this.cropShoulder);for(p=0;p<b;p++)if(a[p]>=d){k=Math.max(0,p-e);break}for(d=p;d<b;d++)if(a[d]>
g){f=d+e;break}return{xData:a.slice(k,f),yData:c.slice(k,f),start:k,end:f}},generatePoints:function(){var a=this.options,c=a.data,d=this.data,e,f=this.processedXData,p=this.processedYData,l=this.pointClass,h=f.length,q=this.cropStart||0,n=this.hasGroupedData;a=a.keys;var u=[],m;d||n||(d=[],d.length=c.length,d=this.data=d);a&&n&&(this.options.keys=!1);for(m=0;m<h;m++){var w=q+m;if(n){var v=(new l).init(this,[f[m]].concat(Q(p[m])));v.dataGroup=this.groupMap[m];v.dataGroup.options&&(v.options=v.dataGroup.options,
r(v,v.dataGroup.options),delete v.dataLabels)}else(v=d[w])||"undefined"===typeof c[w]||(d[w]=v=(new l).init(this,c[w],f[m]));v&&(v.index=w,u[m]=v)}this.options.keys=a;if(d&&(h!==(e=d.length)||n))for(m=0;m<e;m++)m!==q||n||(m+=h),d[m]&&(d[m].destroyElements(),d[m].plotX=void 0);this.data=d;this.points=u;g(this,"afterGeneratePoints")},getXExtremes:function(a){return{min:x(a),max:v(a)}},getExtremes:function(b,c){var d=this.xAxis,k=this.yAxis,e=this.processedXData||this.xData,f=[],l=0,h=0;var q=0;var n=
this.requireSorting?this.cropShoulder:0,u=k?k.positiveValuesOnly:!1,r;b=b||this.stackedYData||this.processedYData||[];k=b.length;d&&(q=d.getExtremes(),h=q.min,q=q.max);for(r=0;r<k;r++){var m=e[r];var w=b[r];var A=(p(w)||a(w))&&(w.length||0<w||!u);m=c||this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||!d||(e[r+n]||m)>=h&&(e[r-n]||m)<=q;if(A&&m)if(A=w.length)for(;A--;)p(w[A])&&(f[l++]=w[A]);else f[l++]=w}b={dataMin:x(f),dataMax:v(f)};g(this,"afterGetExtremes",{dataExtremes:b});
return b},applyExtremes:function(){var a=this.getExtremes();this.dataMin=a.dataMin;this.dataMax=a.dataMax;return a},getFirstValidPoint:function(a){for(var b=null,c=a.length,d=0;null===b&&d<c;)b=a[d],d++;return b},translate:function(){this.processedXData||this.processData();this.generatePoints();var b=this.options,c=b.stacking,d=this.xAxis,e=d.categories,f=this.enabledDataSorting,h=this.yAxis,q=this.points,u=q.length,r=!!this.modifyValue,m,w=this.pointPlacementToXValue(),v=!!w,A=b.threshold,B=b.startFromThreshold?
A:0,E,O=this.zoneAxis||"y",G=Number.MAX_VALUE;for(m=0;m<u;m++){var x=q[m],y=x.x,z=x.y,C=x.low,J=c&&h.stacking&&h.stacking.stacks[(this.negStacks&&z<(B?0:A)?"-":"")+this.stackKey];if(h.positiveValuesOnly&&!h.validatePositiveValue(z)||d.positiveValuesOnly&&!d.validatePositiveValue(y))x.isNull=!0;x.plotX=E=n(D(d.translate(y,0,0,0,1,w,"flags"===this.type),-1E5,1E5));if(c&&this.visible&&J&&J[y]){var F=this.getStackIndicator(F,y,this.index);if(!x.isNull){var Q=J[y];var I=Q.points[F.key]}}a(I)&&(C=I[0],
z=I[1],C===B&&F.key===J[y].base&&(C=M(p(A)&&A,h.min)),h.positiveValuesOnly&&0>=C&&(C=null),x.total=x.stackTotal=Q.total,x.percentage=Q.total&&x.y/Q.total*100,x.stackY=z,this.irregularWidths||Q.setOffset(this.pointXOffset||0,this.barW||0));x.yBottom=l(C)?D(h.translate(C,0,1,0,1),-1E5,1E5):null;r&&(z=this.modifyValue(z,x));x.plotY="number"===typeof z&&Infinity!==z?D(h.translate(z,0,1,0,1),-1E5,1E5):void 0;x.isInside=this.isPointInside(x);x.clientX=v?n(d.translate(y,0,0,0,1,w)):E;x.negative=x[O]<(b[O+
"Threshold"]||A||0);x.category=e&&"undefined"!==typeof e[x.x]?e[x.x]:x.x;if(!x.isNull&&!1!==x.visible){"undefined"!==typeof K&&(G=Math.min(G,Math.abs(E-K)));var K=E}x.zone=this.zones.length&&x.getZone();!x.graphic&&this.group&&f&&(x.isNew=!0)}this.closestPointRangePx=G;g(this,"afterTranslate")},getValidPoints:function(a,c,d){var b=this.chart;return(a||this.points||[]).filter(function(a){return c&&!b.isInsidePlot(a.plotX,a.plotY,b.inverted)?!1:!1!==a.visible&&(d||!a.isNull)})},getClipBox:function(a,
c){var b=this.options,d=this.chart,g=d.inverted,k=this.xAxis,e=k&&this.yAxis,f=d.options.chart.scrollablePlotArea||{};a&&!1===b.clip&&e?a=g?{y:-d.chartWidth+e.len+e.pos,height:d.chartWidth,width:d.chartHeight,x:-d.chartHeight+k.len+k.pos}:{y:-e.pos,height:d.chartHeight,width:d.chartWidth,x:-k.pos}:(a=this.clipBox||d.clipBox,c&&(a.width=d.plotSizeX,a.x=(d.scrollablePixelsX||0)*(f.scrollPositionX||0)));return c?{width:a.width,x:a.x}:a},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,
g=b.inverted,e=this.clipBox,f=this.getClipBox(a),p=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,f.height,c.xAxis,c.yAxis].join(),l=b[p],h=b[p+"m"];a&&(f.width=0,g&&(f.x=b.plotHeight+(!1!==c.clip?0:b.plotTop)));l?b.hasLoaded||l.attr(f):(a&&(b[p+"m"]=h=d.clipRect(g?b.plotSizeX+99:-99,g?-b.plotLeft:-b.plotTop,99,g?b.chartWidth:b.chartHeight)),b[p]=l=d.clipRect(f),l.count={length:0});a&&!l.count[this.index]&&(l.count[this.index]=!0,l.count.length+=1);if(!1!==c.clip||a)this.group.clip(a||
e?l:b.clipRect),this.markerGroup.clip(h),this.sharedClipKey=p;a||(l.count[this.index]&&(delete l.count[this.index],--l.count.length),0===l.count.length&&p&&b[p]&&(e||(b[p]=b[p].destroy()),b[p+"m"]&&(b[p+"m"]=b[p+"m"].destroy())))},animate:function(a){var b=this.chart,c=y(this.options.animation);if(!b.hasRendered)if(a)this.setClip(c);else{var d=this.sharedClipKey;a=b[d];var g=this.getClipBox(c,!0);a&&a.animate(g,c);b[d+"m"]&&b[d+"m"].animate({width:g.width+99,x:g.x-(b.inverted?0:99)},c)}},afterAnimate:function(){this.setClip();
g(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,c=this.chart,d,g,e=this.options.marker,f=this[this.specialGroup]||this.markerGroup,p=this.xAxis,l=M(e.enabled,!p||p.isRadial?!0:null,this.closestPointRangePx>=e.enabledThreshold*e.radius);if(!1!==e.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++){var h=a[d];var q=(g=h.graphic)?"animate":"attr";var n=h.marker||{};var u=!!h.marker;if((l&&"undefined"===typeof n.enabled||n.enabled)&&!h.isNull&&!1!==h.visible){var r=
M(n.symbol,this.symbol);var m=this.markerAttribs(h,h.selected&&"select");this.enabledDataSorting&&(h.startXPos=p.reversed?-m.width:p.width);var w=!1!==h.isInside;g?g[w?"show":"hide"](w).animate(m):w&&(0<m.width||h.hasImage)&&(h.graphic=g=c.renderer.symbol(r,m.x,m.y,m.width,m.height,u?n:e).add(f),this.enabledDataSorting&&c.hasRendered&&(g.attr({x:h.startXPos}),q="animate"));g&&"animate"===q&&g[w?"show":"hide"](w).animate(m);if(g&&!c.styledMode)g[q](this.pointAttribs(h,h.selected&&"select"));g&&g.addClass(h.getClassName(),
!0)}else g&&(h.graphic=g.destroy())}},markerAttribs:function(a,c){var b=this.options,d=b.marker,g=a.marker||{},e=g.symbol||d.symbol,k=M(g.radius,d.radius);c&&(d=d.states[c],c=g.states&&g.states[c],k=M(c&&c.radius,d&&d.radius,k+(d&&d.radiusPlus||0)));a.hasImage=e&&0===e.indexOf("url");a.hasImage&&(k=0);a={x:b.crisp?Math.floor(a.plotX)-k:a.plotX-k,y:a.plotY-k};k&&(a.width=a.height=2*k);return a},pointAttribs:function(a,c){var b=this.options.marker,d=a&&a.options,g=d&&d.marker||{},e=this.color,k=d&&
d.color,f=a&&a.color;d=M(g.lineWidth,b.lineWidth);var p=a&&a.zone&&a.zone.color;a=1;e=k||p||f||e;k=g.fillColor||b.fillColor||e;e=g.lineColor||b.lineColor||e;c=c||"normal";b=b.states[c];c=g.states&&g.states[c]||{};d=M(c.lineWidth,b.lineWidth,d+M(c.lineWidthPlus,b.lineWidthPlus,0));k=c.fillColor||b.fillColor||k;e=c.lineColor||b.lineColor||e;a=M(c.opacity,b.opacity,a);return{stroke:e,"stroke-width":d,fill:k,opacity:a}},destroy:function(a){var b=this,c=b.chart,d=/AppleWebKit\/533/.test(u.navigator.userAgent),
e,f,p=b.data||[],h,l;g(b,"destroy");this.removeEvents(a);(b.axisTypes||[]).forEach(function(a){(l=b[a])&&l.series&&(J(l.series,b),l.isDirty=l.forceRedraw=!0)});b.legendItem&&b.chart.legend.destroyItem(b);for(f=p.length;f--;)(h=p[f])&&h.destroy&&h.destroy();b.points=null;C.clearTimeout(b.animationTimeout);G(b,function(a,b){a instanceof K&&!a.survive&&(e=d&&"group"===b?"hide":"destroy",a[e]())});c.hoverSeries===b&&(c.hoverSeries=null);J(c.series,b);c.orderSeries();G(b,function(c,d){a&&"hcEvents"===
d||delete b[d]})},getGraphPath:function(a,c,d){var b=this,g=b.options,e=g.step,k,f=[],p=[],h;a=a||b.points;(k=a.reversed)&&a.reverse();(e={right:1,center:2}[e]||e&&3)&&k&&(e=4-e);a=this.getValidPoints(a,!1,!(g.connectNulls&&!c&&!d));a.forEach(function(k,q){var t=k.plotX,n=k.plotY,u=a[q-1];(k.leftCliff||u&&u.rightCliff)&&!d&&(h=!0);k.isNull&&!l(c)&&0<q?h=!g.connectNulls:k.isNull&&!c?h=!0:(0===q||h?q=[["M",k.plotX,k.plotY]]:b.getPointSpline?q=[b.getPointSpline(a,k,q)]:e?(q=1===e?[["L",u.plotX,n]]:2===
e?[["L",(u.plotX+t)/2,u.plotY],["L",(u.plotX+t)/2,n]]:[["L",t,u.plotY]],q.push(["L",t,n])):q=[["L",t,n]],p.push(k.x),e&&(p.push(k.x),2===e&&p.push(k.x)),f.push.apply(f,q),h=!1)});f.xMap=p;return b.graphPath=f},drawGraph:function(){var a=this,c=this.options,d=(this.gappedPath||this.getGraphPath).call(this),g=this.chart.styledMode,e=[["graph","highcharts-graph"]];g||e[0].push(c.lineColor||this.color||"#cccccc",c.dashStyle);e=a.getZonesGraphs(e);e.forEach(function(b,e){var k=b[0],f=a[k],p=f?"animate":
"attr";f?(f.endX=a.preventGraphAnimation?null:d.xMap,f.animate({d:d})):d.length&&(a[k]=f=a.chart.renderer.path(d).addClass(b[1]).attr({zIndex:1}).add(a.group));f&&!g&&(k={stroke:b[2],"stroke-width":c.lineWidth,fill:a.fillGraph&&a.color||"none"},b[3]?k.dashstyle=b[3]:"square"!==c.linecap&&(k["stroke-linecap"]=k["stroke-linejoin"]="round"),f[p](k).shadow(2>e&&c.shadow));f&&(f.startX=d.xMap,f.isArea=d.isArea)})},getZonesGraphs:function(a){this.zones.forEach(function(b,c){c=["zone-graph-"+c,"highcharts-graph highcharts-zone-graph-"+
c+" "+(b.className||"")];this.chart.styledMode||c.push(b.color||this.color,b.dashStyle||this.options.dashStyle);a.push(c)},this);return a},applyZones:function(){var a=this,c=this.chart,d=c.renderer,g=this.zones,e,f,p=this.clips||[],h,l=this.graph,q=this.area,n=Math.max(c.chartWidth,c.chartHeight),u=this[(this.zoneAxis||"y")+"Axis"],r=c.inverted,m,w,v,A=!1,B,E;if(g.length&&(l||q)&&u&&"undefined"!==typeof u.min){var O=u.reversed;var G=u.horiz;l&&!this.showLine&&l.hide();q&&q.hide();var x=u.getExtremes();
g.forEach(function(b,g){e=O?G?c.plotWidth:0:G?0:u.toPixels(x.min)||0;e=D(M(f,e),0,n);f=D(Math.round(u.toPixels(M(b.value,x.max),!0)||0),0,n);A&&(e=f=u.toPixels(x.max));m=Math.abs(e-f);w=Math.min(e,f);v=Math.max(e,f);u.isXAxis?(h={x:r?v:w,y:0,width:m,height:n},G||(h.x=c.plotHeight-h.x)):(h={x:0,y:r?v:w,width:n,height:m},G&&(h.y=c.plotWidth-h.y));r&&d.isVML&&(h=u.isXAxis?{x:0,y:O?w:v,height:h.width,width:c.chartWidth}:{x:h.y-c.plotLeft-c.spacingBox.x,y:0,width:h.height,height:c.chartHeight});p[g]?p[g].animate(h):
p[g]=d.clipRect(h);B=a["zone-area-"+g];E=a["zone-graph-"+g];l&&E&&E.clip(p[g]);q&&B&&B.clip(p[g]);A=b.value>x.max;a.resetZones&&0===f&&(f=void 0)});this.clips=p}else a.visible&&(l&&l.show(!0),q&&q.show(!0))},invertGroups:function(a){function b(){["group","markerGroup"].forEach(function(b){c[b]&&(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(c.isRadialSeries?!1:a))})}var c=this,d=c.chart;c.xAxis&&(c.eventsToUnbind.push(I(d,
"resize",b)),b(),c.invertGroups=b)},plotGroup:function(a,c,d,g,e){var b=this[a],k=!b;d={visibility:d,zIndex:g||.1};"undefined"===typeof this.opacity||this.chart.styledMode||"inactive"===this.state||(d.opacity=this.opacity);k&&(this[a]=b=this.chart.renderer.g().add(e));b.addClass("highcharts-"+c+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(l(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(b.hasClass("highcharts-tracker")?" highcharts-tracker":
""),!0);b.attr(d)[k?"attr":"animate"](this.getPlotBox());return b},getPlotBox:function(){var a=this.chart,c=this.xAxis,d=this.yAxis;a.inverted&&(c=d,d=this.xAxis);return{translateX:c?c.left:a.plotLeft,translateY:d?d.top:a.plotTop,scaleX:1,scaleY:1}},removeEvents:function(a){a?this.eventsToUnbind.length&&(this.eventsToUnbind.forEach(function(a){a()}),this.eventsToUnbind.length=0):T(this)},render:function(){var a=this,c=a.chart,d=a.options,e=y(d.animation),f=!a.finishedAnimating&&c.renderer.isSVG&&
e.duration,p=a.visible?"inherit":"hidden",h=d.zIndex,l=a.hasRendered,q=c.seriesGroup,n=c.inverted;g(this,"render");var u=a.plotGroup("group","series",p,h,q);a.markerGroup=a.plotGroup("markerGroup","markers",p,h,q);f&&a.animate&&a.animate(!0);u.inverted=a.isCartesian||a.invertable?n:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.visible&&a.drawPoints();a.drawDataLabels&&a.drawDataLabels();a.redrawPoints&&a.redrawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(n);
!1===d.clip||a.sharedClipKey||l||u.clip(c.clipRect);f&&a.animate&&a.animate();l||(f&&e.defer&&(f+=e.defer),a.animationTimeout=O(function(){a.afterAnimate()},f||0));a.isDirty=!1;a.hasRendered=!0;g(a,"afterRender")},redraw:function(){var a=this.chart,c=this.isDirty||this.isDirtyData,d=this.group,g=this.xAxis,e=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:M(g&&g.left,a.plotLeft),translateY:M(e&&e.top,a.plotTop)}));this.translate();this.render();c&&
delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,c){var b=this.xAxis,d=this.yAxis,g=this.chart.inverted;return this.searchKDTree({clientX:g?b.len-a.chartY+b.pos:a.chartX-b.pos,plotY:g?d.len-a.chartX+d.pos:a.chartY-d.pos},c,a)},buildKDTree:function(a){function b(a,d,g){var e;if(e=a&&a.length){var f=c.kdAxisArray[d%g];a.sort(function(a,b){return a[f]-b[f]});e=Math.floor(e/2);return{point:a[e],left:b(a.slice(0,e),d+1,g),right:b(a.slice(e+1),d+1,g)}}}this.buildingKdTree=!0;var c=
this,d=-1<c.options.findNearestPointBy.indexOf("y")?2:1;delete c.kdTree;O(function(){c.kdTree=b(c.getValidPoints(null,!c.directTouch),d,d);c.buildingKdTree=!1},c.options.kdNow||a&&"touchstart"===a.type?0:1)},searchKDTree:function(a,c,d){function b(a,c,d,p){var h=c.point,q=g.kdAxisArray[d%p],n=h;var u=l(a[e])&&l(h[e])?Math.pow(a[e]-h[e],2):null;var t=l(a[f])&&l(h[f])?Math.pow(a[f]-h[f],2):null;t=(u||0)+(t||0);h.dist=l(t)?Math.sqrt(t):Number.MAX_VALUE;h.distX=l(u)?Math.sqrt(u):Number.MAX_VALUE;q=a[q]-
h[q];t=0>q?"left":"right";u=0>q?"right":"left";c[t]&&(t=b(a,c[t],d+1,p),n=t[k]<n[k]?t:h);c[u]&&Math.sqrt(q*q)<n[k]&&(a=b(a,c[u],d+1,p),n=a[k]<n[k]?a:n);return n}var g=this,e=this.kdAxisArray[0],f=this.kdAxisArray[1],k=c?"distX":"dist";c=-1<g.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree(d);if(this.kdTree)return b(a,this.kdTree,c,c)},pointPlacementToXValue:function(){var a=this.options,c=a.pointRange,d=this.xAxis;a=a.pointPlacement;"between"===a&&(a=
d.reversed?-.5:.5);return p(a)?a*M(c,d.pointRange):0},isPointInside:function(a){return"undefined"!==typeof a.plotY&&"undefined"!==typeof a.plotX&&0<=a.plotY&&a.plotY<=this.yAxis.len&&0<=a.plotX&&a.plotX<=this.xAxis.len}});"";return f});N(m,"Series/LineSeries.js",[m["Core/Series/CartesianSeries.js"],m["Core/Globals.js"]],function(f,h){h.Series=f;return h.Series});N(m,"Extensions/Stacking.js",[m["Core/Axis/Axis.js"],m["Core/Chart/Chart.js"],m["Core/Globals.js"],m["Core/Axis/StackingAxis.js"],m["Core/Utilities.js"]],
function(f,h,m,z,F){var L=F.correctFloat,K=F.defined,C=F.destroyObjectProperties,y=F.format,e=F.isNumber,I=F.pick;"";var v=m.Series,x=function(){function f(e,f,h,m,r){var d=e.chart.inverted;this.axis=e;this.isNegative=h;this.options=f=f||{};this.x=m;this.total=null;this.points={};this.hasValidPoints=!1;this.stack=r;this.rightCliff=this.leftCliff=0;this.alignOptions={align:f.align||(d?h?"left":"right":"center"),verticalAlign:f.verticalAlign||(d?"middle":h?"bottom":"top"),y:f.y,x:f.x};this.textAlign=
f.textAlign||(d?h?"right":"left":"center")}f.prototype.destroy=function(){C(this,this.axis)};f.prototype.render=function(e){var f=this.axis.chart,h=this.options,n=h.format;n=n?y(n,this,f):h.formatter.call(this);this.label?this.label.attr({text:n,visibility:"hidden"}):(this.label=f.renderer.label(n,null,null,h.shape,null,null,h.useHTML,!1,"stack-labels"),n={r:h.borderRadius||0,text:n,rotation:h.rotation,padding:I(h.padding,5),visibility:"hidden"},f.styledMode||(n.fill=h.backgroundColor,n.stroke=h.borderColor,
n["stroke-width"]=h.borderWidth,this.label.css(h.style)),this.label.attr(n),this.label.added||this.label.add(e));this.label.labelrank=f.plotHeight};f.prototype.setOffset=function(f,h,m,w,r){var d=this.axis,g=d.chart;w=d.translate(d.stacking.usePercentage?100:w?w:this.total,0,0,0,1);m=d.translate(m?m:0);m=K(w)&&Math.abs(w-m);f=I(r,g.xAxis[0].translate(this.x))+f;d=K(w)&&this.getStackBox(g,this,f,w,h,m,d);h=this.label;m=this.isNegative;f="justify"===I(this.options.overflow,"justify");var c=this.textAlign;
h&&d&&(r=h.getBBox(),w=h.padding,c="left"===c?g.inverted?-w:w:"right"===c?r.width:g.inverted&&"center"===c?r.width/2:g.inverted?m?r.width+w:-w:r.width/2,m=g.inverted?r.height/2:m?-w:r.height,this.alignOptions.x=I(this.options.x,0),this.alignOptions.y=I(this.options.y,0),d.x-=c,d.y-=m,h.align(this.alignOptions,null,d),g.isInsidePlot(h.alignAttr.x+c-this.alignOptions.x,h.alignAttr.y+m-this.alignOptions.y)?h.show():(h.alignAttr.y=-9999,f=!1),f&&v.prototype.justifyDataLabel.call(this.axis,h,this.alignOptions,
h.alignAttr,r,d),h.attr({x:h.alignAttr.x,y:h.alignAttr.y}),I(!f&&this.options.crop,!0)&&((g=e(h.x)&&e(h.y)&&g.isInsidePlot(h.x-w+h.width,h.y)&&g.isInsidePlot(h.x+w,h.y))||h.hide()))};f.prototype.getStackBox=function(e,f,h,m,r,d,g){var c=f.axis.reversed,a=e.inverted,q=g.height+g.pos-(a?e.plotLeft:e.plotTop);f=f.isNegative&&!c||!f.isNegative&&c;return{x:a?f?m-g.right:m-d+g.pos-e.plotLeft:h+e.xAxis[0].transB-e.plotLeft,y:a?g.height-h-r:f?q-m-d:q-m,width:a?d:r,height:a?r:d}};return f}();h.prototype.getStacks=
function(){var e=this,f=e.inverted;e.yAxis.forEach(function(e){e.stacking&&e.stacking.stacks&&e.hasVisibleSeries&&(e.stacking.oldStacks=e.stacking.stacks)});e.series.forEach(function(h){var l=h.xAxis&&h.xAxis.options||{};!h.options.stacking||!0!==h.visible&&!1!==e.options.chart.ignoreHiddenSeries||(h.stackKey=[h.type,I(h.options.stack,""),f?l.top:l.left,f?l.height:l.width].join())})};z.compose(f);v.prototype.setGroupedPoints=function(){this.options.centerInCategory&&(this.is("column")||this.is("columnrange"))&&
!this.options.stacking&&1<this.chart.series.length&&v.prototype.setStackedPoints.call(this,"group")};v.prototype.setStackedPoints=function(e){var f=e||this.options.stacking;if(f&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var h=this.processedXData,m=this.processedYData,w=[],r=m.length,d=this.options,g=d.threshold,c=I(d.startFromThreshold&&g,0);d=d.stack;e=e?this.type+","+f:this.stackKey;var a="-"+e,q=this.negStacks,p=this.yAxis,v=p.stacking.stacks,A=p.stacking.oldStacks,
G,D;p.stacking.stacksTouched+=1;for(D=0;D<r;D++){var y=h[D];var z=m[D];var O=this.getStackIndicator(O,y,this.index);var E=O.key;var u=(G=q&&z<(c?0:g))?a:e;v[u]||(v[u]={});v[u][y]||(A[u]&&A[u][y]?(v[u][y]=A[u][y],v[u][y].total=null):v[u][y]=new x(p,p.options.stackLabels,G,y,d));u=v[u][y];null!==z?(u.points[E]=u.points[this.index]=[I(u.cumulative,c)],K(u.cumulative)||(u.base=E),u.touched=p.stacking.stacksTouched,0<O.index&&!1===this.singleStacks&&(u.points[E][0]=u.points[this.index+","+y+",0"][0])):
u.points[E]=u.points[this.index]=null;"percent"===f?(G=G?e:a,q&&v[G]&&v[G][y]?(G=v[G][y],u.total=G.total=Math.max(G.total,u.total)+Math.abs(z)||0):u.total=L(u.total+(Math.abs(z)||0))):"group"===f?null!==z&&(u.total=(u.total||0)+1):u.total=L(u.total+(z||0));u.cumulative="group"===f?(u.total||1)-1:I(u.cumulative,c)+(z||0);null!==z&&(u.points[E].push(u.cumulative),w[D]=u.cumulative,u.hasValidPoints=!0)}"percent"===f&&(p.stacking.usePercentage=!0);"group"!==f&&(this.stackedYData=w);p.stacking.oldStacks=
{}}};v.prototype.modifyStacks=function(){var e=this,f=e.stackKey,h=e.yAxis.stacking.stacks,m=e.processedXData,w,r=e.options.stacking;e[r+"Stacker"]&&[f,"-"+f].forEach(function(d){for(var g=m.length,c,a;g--;)if(c=m[g],w=e.getStackIndicator(w,c,e.index,d),a=(c=h[d]&&h[d][c])&&c.points[w.key])e[r+"Stacker"](a,c,g)})};v.prototype.percentStacker=function(e,f,h){f=f.total?100/f.total:0;e[0]=L(e[0]*f);e[1]=L(e[1]*f);this.stackedYData[h]=e[1]};v.prototype.getStackIndicator=function(e,f,h,m){!K(e)||e.x!==
f||m&&e.key!==m?e={x:f,index:0,key:m}:e.index++;e.key=[h,f,e.index].join();return e};m.StackItem=x;return m.StackItem});N(m,"Core/Dynamics.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Axis/Axis.js"],m["Core/Series/Series.js"],m["Core/Chart/Chart.js"],m["Core/Globals.js"],m["Series/LineSeries.js"],m["Core/Options.js"],m["Core/Series/Point.js"],m["Core/Time.js"],m["Core/Utilities.js"]],function(f,h,m,z,F,L,K,C,y,e){var I=f.animate,v=f.setAnimation,x=m.seriesTypes,D=K.time,n=e.addEvent,l=e.createElement,
J=e.css,w=e.defined,r=e.erase,d=e.error,g=e.extend,c=e.fireEvent,a=e.isArray,q=e.isNumber,p=e.isObject,B=e.isString,A=e.merge,G=e.objectEach,M=e.pick,T=e.relativeLength,Q=e.splat;F.cleanRecursively=function(a,c){var d={};G(a,function(b,g){if(p(a[g],!0)&&!a.nodeType&&c[g])b=F.cleanRecursively(a[g],c[g]),Object.keys(b).length&&(d[g]=b);else if(p(a[g])||a[g]!==c[g])d[g]=a[g]});return d};g(z.prototype,{addSeries:function(a,d,g){var b,e=this;a&&(d=M(d,!0),c(e,"addSeries",{options:a},function(){b=e.initSeries(a);
e.isDirtyLegend=!0;e.linkSeries();b.enabledDataSorting&&b.setData(a.data,!1);c(e,"afterAddSeries",{series:b});d&&e.redraw(g)}));return b},addAxis:function(a,c,d,b){return this.createAxis(c?"xAxis":"yAxis",{axis:a,redraw:d,animation:b})},addColorAxis:function(a,c,d){return this.createAxis("colorAxis",{axis:a,redraw:c,animation:d})},createAxis:function(a,c){var d=this.options,b="colorAxis"===a,g=c.redraw,e=c.animation;c=A(c.axis,{index:this[a].length,isX:"xAxis"===a});var f=b?new F.ColorAxis(this,c):
new h(this,c);d[a]=Q(d[a]||{});d[a].push(c);b&&(this.isDirtyLegend=!0,this.axes.forEach(function(a){a.series=[]}),this.series.forEach(function(a){a.bindAxes();a.isDirtyData=!0}));M(g,!0)&&this.redraw(e);return f},showLoading:function(a){var c=this,d=c.options,b=c.loadingDiv,e=d.loading,f=function(){b&&J(b,{left:c.plotLeft+"px",top:c.plotTop+"px",width:c.plotWidth+"px",height:c.plotHeight+"px"})};b||(c.loadingDiv=b=l("div",{className:"highcharts-loading highcharts-loading-hidden"},null,c.container),
c.loadingSpan=l("span",{className:"highcharts-loading-inner"},null,b),n(c,"redraw",f));b.className="highcharts-loading";c.loadingSpan.innerHTML=M(a,d.lang.loading,"");c.styledMode||(J(b,g(e.style,{zIndex:10})),J(c.loadingSpan,e.labelStyle),c.loadingShown||(J(b,{opacity:0,display:""}),I(b,{opacity:e.style.opacity||.5},{duration:e.showDuration||0})));c.loadingShown=!0;f()},hideLoading:function(){var a=this.options,c=this.loadingDiv;c&&(c.className="highcharts-loading highcharts-loading-hidden",this.styledMode||
I(c,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){J(c,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireReflow:"margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
collectionsWithUpdate:["xAxis","yAxis","zAxis","series"],update:function(a,d,g,b){var e=this,f={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"},p,h,l,n=a.isResponsiveOptions,u=[];c(e,"update",{options:a});n||e.setResponsive(!1,!0);a=F.cleanRecursively(a,e.options);A(!0,e.userOptions,a);if(p=a.chart){A(!0,e.options.chart,p);"className"in p&&e.setClassName(p.className);"reflow"in p&&e.setReflow(p.reflow);if("inverted"in p||"polar"in p||"type"in p){e.propFromSeries();
var m=!0}"alignTicks"in p&&(m=!0);G(p,function(a,b){-1!==e.propsRequireUpdateSeries.indexOf("chart."+b)&&(h=!0);-1!==e.propsRequireDirtyBox.indexOf(b)&&(e.isDirtyBox=!0);-1!==e.propsRequireReflow.indexOf(b)&&(n?e.isDirtyBox=!0:l=!0)});!e.styledMode&&"style"in p&&e.renderer.setStyle(p.style)}!e.styledMode&&a.colors&&(this.options.colors=a.colors);a.time&&(this.time===D&&(this.time=new y(a.time)),A(!0,e.options.time,a.time));G(a,function(b,c){if(e[c]&&"function"===typeof e[c].update)e[c].update(b,!1);
else if("function"===typeof e[f[c]])e[f[c]](b);else"color"!==c&&-1===e.collectionsWithUpdate.indexOf(c)&&A(!0,e.options[c],a[c]);"chart"!==c&&-1!==e.propsRequireUpdateSeries.indexOf(c)&&(h=!0)});this.collectionsWithUpdate.forEach(function(b){if(a[b]){if("series"===b){var c=[];e[b].forEach(function(a,b){a.options.isInternal||c.push(M(a.options.index,b))})}Q(a[b]).forEach(function(a,d){var f=w(a.id),k;f&&(k=e.get(a.id));k||(k=e[b][c?c[d]:d])&&f&&w(k.options.id)&&(k=void 0);k&&k.coll===b&&(k.update(a,
!1),g&&(k.touched=!0));!k&&g&&e.collectionsWithInit[b]&&(e.collectionsWithInit[b][0].apply(e,[a].concat(e.collectionsWithInit[b][1]||[]).concat([!1])).touched=!0)});g&&e[b].forEach(function(a){a.touched||a.options.isInternal?delete a.touched:u.push(a)})}});u.forEach(function(a){a.remove&&a.remove(!1)});m&&e.axes.forEach(function(a){a.update({},!1)});h&&e.getSeriesOrderByLinks().forEach(function(a){a.chart&&a.update({},!1)},this);m=p&&p.width;p=p&&p.height;B(p)&&(p=T(p,m||e.chartWidth));l||q(m)&&m!==
e.chartWidth||q(p)&&p!==e.chartHeight?e.setSize(m,p,b):M(d,!0)&&e.redraw(b);c(e,"afterUpdate",{options:a,redraw:d,animation:b})},setSubtitle:function(a,c){this.applyDescription("subtitle",a);this.layOutTitles(c)},setCaption:function(a,c){this.applyDescription("caption",a);this.layOutTitles(c)}});z.prototype.collectionsWithInit={xAxis:[z.prototype.addAxis,[!0]],yAxis:[z.prototype.addAxis,[!1]],series:[z.prototype.addSeries]};g(C.prototype,{update:function(a,c,d,b){function g(){e.applyOptions(a);var b=
h&&e.hasDummyGraphic;b=null===e.y?!b:b;h&&b&&(e.graphic=h.destroy(),delete e.hasDummyGraphic);p(a,!0)&&(h&&h.element&&a&&a.marker&&"undefined"!==typeof a.marker.symbol&&(e.graphic=h.destroy()),a&&a.dataLabels&&e.dataLabel&&(e.dataLabel=e.dataLabel.destroy()),e.connector&&(e.connector=e.connector.destroy()));q=e.index;f.updateParallelArrays(e,q);n.data[q]=p(n.data[q],!0)||p(a,!0)?e.options:M(a,n.data[q]);f.isDirty=f.isDirtyData=!0;!f.fixedBox&&f.hasCartesianSeries&&(l.isDirtyBox=!0);"point"===n.legendType&&
(l.isDirtyLegend=!0);c&&l.redraw(d)}var e=this,f=e.series,h=e.graphic,q,l=f.chart,n=f.options;c=M(c,!0);!1===b?g():e.firePointEvent("update",{options:a},g)},remove:function(a,c){this.series.removePoint(this.series.data.indexOf(this),a,c)}});g(L.prototype,{addPoint:function(a,d,g,b,e){var f=this.options,k=this.data,p=this.chart,h=this.xAxis;h=h&&h.hasNames&&h.names;var q=f.data,l=this.xData,n;d=M(d,!0);var u={series:this};this.pointClass.prototype.applyOptions.apply(u,[a]);var m=u.x;var r=l.length;
if(this.requireSorting&&m<l[r-1])for(n=!0;r&&l[r-1]>m;)r--;this.updateParallelArrays(u,"splice",r,0,0);this.updateParallelArrays(u,r);h&&u.name&&(h[m]=u.name);q.splice(r,0,a);n&&(this.data.splice(r,0,null),this.processData());"point"===f.legendType&&this.generatePoints();g&&(k[0]&&k[0].remove?k[0].remove(!1):(k.shift(),this.updateParallelArrays(u,"shift"),q.shift()));!1!==e&&c(this,"addPoint",{point:u});this.isDirtyData=this.isDirty=!0;d&&p.redraw(b)},removePoint:function(a,c,d){var b=this,g=b.data,
e=g[a],f=b.points,p=b.chart,h=function(){f&&f.length===g.length&&f.splice(a,1);g.splice(a,1);b.options.data.splice(a,1);b.updateParallelArrays(e||{series:b},"splice",a,1);e&&e.destroy();b.isDirty=!0;b.isDirtyData=!0;c&&p.redraw()};v(d,p);c=M(c,!0);e?e.firePointEvent("remove",null,h):h()},remove:function(a,d,g,b){function e(){f.destroy(b);f.remove=null;p.isDirtyLegend=p.isDirtyBox=!0;p.linkSeries();M(a,!0)&&p.redraw(d)}var f=this,p=f.chart;!1!==g?c(f,"remove",null,e):e()},update:function(a,e){a=F.cleanRecursively(a,
this.userOptions);c(this,"update",{options:a});var f=this,b=f.chart,k=f.userOptions,p=f.initialType||f.type,h=b.options.plotOptions,q=a.type||k.type||b.options.chart.type,l=!(this.hasDerivedData||q&&q!==this.type||"undefined"!==typeof a.pointStart||"undefined"!==typeof a.pointInterval||f.hasOptionChanged("dataGrouping")||f.hasOptionChanged("pointStart")||f.hasOptionChanged("pointInterval")||f.hasOptionChanged("pointIntervalUnit")||f.hasOptionChanged("keys")),n=x[p].prototype,m,r=["eventOptions","navigatorSeries",
"baseSeries"],w=f.finishedAnimating&&{animation:!1},v={};l&&(r.push("data","isDirtyData","points","processedXData","processedYData","xIncrement","cropped","_hasPointMarkers","_hasPointLabels","mapMap","mapData","minY","maxY","minX","maxX"),!1!==a.visible&&r.push("area","graph"),f.parallelArrays.forEach(function(a){r.push(a+"Data")}),a.data&&(a.dataSorting&&g(f.options.dataSorting,a.dataSorting),this.setData(a.data,!1)));a=A(k,w,{index:"undefined"===typeof k.index?f.index:k.index,pointStart:M(h&&h.series&&
h.series.pointStart,k.pointStart,f.xData[0])},!l&&{data:f.options.data},a);l&&a.data&&(a.data=f.options.data);r=["group","markerGroup","dataLabelsGroup","transformGroup"].concat(r);r.forEach(function(a){r[a]=f[a];delete f[a]});f.remove(!1,null,!1,!0);for(m in n)f[m]=void 0;x[q||p]?g(f,x[q||p].prototype):d(17,!0,b,{missingModuleFor:q||p});r.forEach(function(a){f[a]=r[a]});f.init(b,a);if(l&&this.points){var B=f.options;!1===B.visible?(v.graphic=1,v.dataLabel=1):f._hasPointLabels||(a=B.marker,k=B.dataLabels,
a&&(!1===a.enabled||"symbol"in a)&&(v.graphic=1),k&&!1===k.enabled&&(v.dataLabel=1));this.points.forEach(function(a){a&&a.series&&(a.resolveColor(),Object.keys(v).length&&a.destroyElements(v),!1===B.showInLegend&&a.legendItem&&b.legend.destroyItem(a))},this)}f.initialType=p;b.linkSeries();c(this,"afterUpdate");M(e,!0)&&b.redraw(l?void 0:!1)},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0},hasOptionChanged:function(a){var c=this.options[a],d=this.chart.options.plotOptions,
b=this.userOptions[a];return b?c!==b:c!==M(d&&d[this.type]&&d[this.type][a],d&&d.series&&d.series[a],c)}});g(h.prototype,{update:function(a,c){var d=this.chart,b=a&&a.events||{};a=A(this.userOptions,a);d.options[this.coll].indexOf&&(d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)]=a);G(d.options[this.coll].events,function(a,c){"undefined"===typeof b[c]&&(b[c]=void 0)});this.destroy(!0);this.init(d,g(a,{events:b}));d.isDirtyBox=!0;M(c,!0)&&d.redraw()},remove:function(c){for(var d=
this.chart,g=this.coll,b=this.series,e=b.length;e--;)b[e]&&b[e].remove(!1);r(d.axes,this);r(d[g],this);a(d.options[g])?d.options[g].splice(this.options.index,1):delete d.options[g];d[g].forEach(function(a,b){a.options.index=a.userOptions.index=b});this.destroy();d.isDirtyBox=!0;M(c,!0)&&d.redraw()},setTitle:function(a,c){this.update({title:a},c)},setCategories:function(a,c){this.update({categories:a},c)}})});N(m,"Series/AreaSeries.js",[m["Core/Series/Series.js"],m["Core/Color/Color.js"],m["Core/Globals.js"],
m["Mixins/LegendSymbol.js"],m["Core/Utilities.js"]],function(f,h,m,z,F){var L=h.parse,K=F.objectEach,C=F.pick,y=m.Series;f.seriesType("area","line",{threshold:0},{singleStacks:!1,getStackPoints:function(e){var f=[],h=[],m=this.xAxis,D=this.yAxis,n=D.stacking.stacks[this.stackKey],l={},y=this.index,w=D.series,r=w.length,d=C(D.options.reversedStacks,!0)?1:-1,g;e=e||this.points;if(this.options.stacking){for(g=0;g<e.length;g++)e[g].leftNull=e[g].rightNull=void 0,l[e[g].x]=e[g];K(n,function(a,c){null!==
a.total&&h.push(c)});h.sort(function(a,c){return a-c});var c=w.map(function(a){return a.visible});h.forEach(function(a,e){var p=0,q,w;if(l[a]&&!l[a].isNull)f.push(l[a]),[-1,1].forEach(function(f){var p=1===f?"rightNull":"leftNull",m=0,v=n[h[e+f]];if(v)for(g=y;0<=g&&g<r;)q=v.points[g],q||(g===y?l[a][p]=!0:c[g]&&(w=n[a].points[g])&&(m-=w[1]-w[0])),g+=d;l[a][1===f?"rightCliff":"leftCliff"]=m});else{for(g=y;0<=g&&g<r;){if(q=n[a].points[g]){p=q[1];break}g+=d}p=D.translate(p,0,1,0,1);f.push({isNull:!0,
plotX:m.translate(a,0,0,0,1),x:a,plotY:p,yBottom:p})}})}return f},getGraphPath:function(e){var f=y.prototype.getGraphPath,h=this.options,m=h.stacking,D=this.yAxis,n,l=[],z=[],w=this.index,r=D.stacking.stacks[this.stackKey],d=h.threshold,g=Math.round(D.getThreshold(h.threshold));h=C(h.connectNulls,"percent"===m);var c=function(a,c,f){var p=e[a];a=m&&r[p.x].points[w];var h=p[f+"Null"]||0;f=p[f+"Cliff"]||0;p=!0;if(f||h){var n=(h?a[0]:a[1])+f;var v=a[0]+f;p=!!h}else!m&&e[c]&&e[c].isNull&&(n=v=d);"undefined"!==
typeof n&&(z.push({plotX:q,plotY:null===n?g:D.getThreshold(n),isNull:p,isCliff:!0}),l.push({plotX:q,plotY:null===v?g:D.getThreshold(v),doCurve:!1}))};e=e||this.points;m&&(e=this.getStackPoints(e));for(n=0;n<e.length;n++){m||(e[n].leftCliff=e[n].rightCliff=e[n].leftNull=e[n].rightNull=void 0);var a=e[n].isNull;var q=C(e[n].rectPlotX,e[n].plotX);var p=m?e[n].yBottom:g;if(!a||h)h||c(n,n-1,"left"),a&&!m&&h||(z.push(e[n]),l.push({x:n,plotX:q,plotY:p})),h||c(n,n+1,"right")}n=f.call(this,z,!0,!0);l.reversed=
!0;a=f.call(this,l,!0,!0);(p=a[0])&&"M"===p[0]&&(a[0]=["L",p[1],p[2]]);a=n.concat(a);f=f.call(this,z,!1,h);a.xMap=n.xMap;this.areaPath=a;return f},drawGraph:function(){this.areaPath=[];y.prototype.drawGraph.apply(this);var e=this,f=this.areaPath,h=this.options,m=[["area","highcharts-area",this.color,h.fillColor]];this.zones.forEach(function(f,n){m.push(["zone-area-"+n,"highcharts-area highcharts-zone-area-"+n+" "+f.className,f.color||e.color,f.fillColor||h.fillColor])});m.forEach(function(m){var n=
m[0],l=e[n],v=l?"animate":"attr",w={};l?(l.endX=e.preventGraphAnimation?null:f.xMap,l.animate({d:f})):(w.zIndex=0,l=e[n]=e.chart.renderer.path(f).addClass(m[1]).add(e.group),l.isArea=!0);e.chart.styledMode||(w.fill=C(m[3],L(m[2]).setOpacity(C(h.fillOpacity,.75)).get()));l[v](w);l.startX=f.xMap;l.shiftUnit=h.step?2:1})},drawLegendSymbol:z.drawRectangle});""});N(m,"Series/SplineSeries.js",[m["Core/Series/Series.js"],m["Core/Utilities.js"]],function(f,h){var m=h.pick;f.seriesType("spline","line",{},
{getPointSpline:function(f,h,L){var z=h.plotX||0,C=h.plotY||0,y=f[L-1];L=f[L+1];if(y&&!y.isNull&&!1!==y.doCurve&&!h.isCliff&&L&&!L.isNull&&!1!==L.doCurve&&!h.isCliff){f=y.plotY||0;var e=L.plotX||0;L=L.plotY||0;var F=0;var v=(1.5*z+(y.plotX||0))/2.5;var x=(1.5*C+f)/2.5;e=(1.5*z+e)/2.5;var D=(1.5*C+L)/2.5;e!==v&&(F=(D-x)*(e-z)/(e-v)+C-D);x+=F;D+=F;x>f&&x>C?(x=Math.max(f,C),D=2*C-x):x<f&&x<C&&(x=Math.min(f,C),D=2*C-x);D>L&&D>C?(D=Math.max(L,C),x=2*C-D):D<L&&D<C&&(D=Math.min(L,C),x=2*C-D);h.rightContX=
e;h.rightContY=D}h=["C",m(y.rightContX,y.plotX,0),m(y.rightContY,y.plotY,0),m(v,z,0),m(x,C,0),z,C];y.rightContX=y.rightContY=void 0;return h}});""});N(m,"Series/AreaSplineSeries.js",[m["Core/Series/Series.js"],m["Mixins/LegendSymbol.js"],m["Core/Options.js"]],function(f,h,m){var z=f.seriesTypes.area.prototype;f.seriesType("areaspline","spline",m.defaultOptions.plotOptions.area,{getStackPoints:z.getStackPoints,getGraphPath:z.getGraphPath,drawGraph:z.drawGraph,drawLegendSymbol:h.drawRectangle});""});
N(m,"Series/ColumnSeries.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Series/Series.js"],m["Core/Color/Color.js"],m["Core/Globals.js"],m["Mixins/LegendSymbol.js"],m["Series/LineSeries.js"],m["Core/Utilities.js"]],function(f,h,m,z,F,L,K){var C=f.animObject,y=m.parse;f=z.noop;var e=K.clamp,I=K.defined,v=K.extend,x=K.isArray,D=K.isNumber,n=K.merge,l=K.pick,J=K.objectEach;"";h=h.seriesType("column","line",{borderRadius:0,centerInCategory:!1,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,
cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:void 0,verticalAlign:void 0,y:void 0},startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){L.prototype.init.apply(this,arguments);var e=this,f=e.chart;f.hasRendered&&f.series.forEach(function(d){d.type===e.type&&(d.isDirty=
!0)})},getColumnMetrics:function(){var e=this,f=e.options,d=e.xAxis,g=e.yAxis,c=d.options.reversedStacks;c=d.reversed&&!c||!d.reversed&&c;var a,h={},p=0;!1===f.grouping?p=1:e.chart.series.forEach(function(c){var d=c.yAxis,f=c.options;if(c.type===e.type&&(c.visible||!e.chart.options.chart.ignoreHiddenSeries)&&g.len===d.len&&g.pos===d.pos){if(f.stacking&&"group"!==f.stacking){a=c.stackKey;"undefined"===typeof h[a]&&(h[a]=p++);var q=h[a]}else!1!==f.grouping&&(q=p++);c.columnIndex=q}});var n=Math.min(Math.abs(d.transA)*
(d.ordinal&&d.ordinal.slope||f.pointRange||d.closestPointRange||d.tickInterval||1),d.len),m=n*f.groupPadding,v=(n-2*m)/(p||1);f=Math.min(f.maxPointWidth||d.len,l(f.pointWidth,v*(1-2*f.pointPadding)));e.columnMetrics={width:f,offset:(v-f)/2+(m+((e.columnIndex||0)+(c?1:0))*v-n/2)*(c?-1:1),paddedWidth:v,columnCount:p};return e.columnMetrics},crispCol:function(e,f,d,g){var c=this.chart,a=this.borderWidth,h=-(a%2?.5:0);a=a%2?.5:1;c.inverted&&c.renderer.isVML&&(a+=1);this.options.crisp&&(d=Math.round(e+
d)+h,e=Math.round(e)+h,d-=e);g=Math.round(f+g)+a;h=.5>=Math.abs(f)&&.5<g;f=Math.round(f)+a;g-=f;h&&g&&(--f,g+=1);return{x:e,y:f,width:d,height:g}},adjustForMissingColumns:function(e,f,d,g){var c=this,a=this.options.stacking;if(!d.isNull&&1<g.columnCount){var h=0,p=0;J(this.yAxis.stacking&&this.yAxis.stacking.stacks,function(g){if("number"===typeof d.x&&(g=g[d.x.toString()])){var e=g.points[c.index],f=g.total;a?(e&&(h=p),g.hasValidPoints&&p++):x(e)&&(h=e[1],p=f||0)}});e=(d.plotX||0)+((p-1)*g.paddedWidth+
f)/2-f-h*g.paddedWidth}return e},translate:function(){var f=this,h=f.chart,d=f.options,g=f.dense=2>f.closestPointRange*f.xAxis.transA;g=f.borderWidth=l(d.borderWidth,g?0:1);var c=f.xAxis,a=f.yAxis,q=d.threshold,p=f.translatedThreshold=a.getThreshold(q),n=l(d.minPointLength,5),m=f.getColumnMetrics(),v=m.width,x=f.barW=Math.max(v,1+2*g),y=f.pointXOffset=m.offset,z=f.dataMin,C=f.dataMax;h.inverted&&(p-=.5);d.pointPadding&&(x=Math.ceil(x));L.prototype.translate.apply(f);f.points.forEach(function(g){var u=
l(g.yBottom,p),b=999+Math.abs(u),k=v,t=g.plotX||0;b=e(g.plotY,-b,a.len+b);var r=t+y,w=x,A=Math.min(b,u),B=Math.max(b,u)-A;if(n&&Math.abs(B)<n){B=n;var E=!a.reversed&&!g.negative||a.reversed&&g.negative;D(q)&&D(C)&&g.y===q&&C<=q&&(a.min||0)<q&&z!==C&&(E=!E);A=Math.abs(A-p)>n?u-n:p-(E?n:0)}I(g.options.pointWidth)&&(k=w=Math.ceil(g.options.pointWidth),r-=Math.round((k-v)/2));d.centerInCategory&&(r=f.adjustForMissingColumns(r,k,g,m));g.barX=r;g.pointWidth=k;g.tooltipPos=h.inverted?[a.len+a.pos-h.plotLeft-
b,c.len+c.pos-h.plotTop-(t||0)-y-w/2,B]:[r+w/2,b+a.pos-h.plotTop,B];g.shapeType=f.pointClass.prototype.shapeType||"rect";g.shapeArgs=f.crispCol.apply(f,g.isNull?[r,p,w,0]:[r,A,w,B])})},getSymbol:f,drawLegendSymbol:F.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(e,f){var d=this.options,g=this.pointAttrToOptions||{};var c=g.stroke||"borderColor";var a=g["stroke-width"]||"borderWidth",h=e&&e.color||this.color,p=e&&e[c]||
d[c]||this.color||h,m=e&&e[a]||d[a]||this[a]||0;g=e&&e.options.dashStyle||d.dashStyle;var r=l(e&&e.opacity,d.opacity,1);if(e&&this.zones.length){var v=e.getZone();h=e.options.color||v&&(v.color||e.nonZonedColor)||this.color;v&&(p=v.borderColor||p,g=v.dashStyle||g,m=v.borderWidth||m)}f&&e&&(e=n(d.states[f],e.options.states&&e.options.states[f]||{}),f=e.brightness,h=e.color||"undefined"!==typeof f&&y(h).brighten(e.brightness).get()||h,p=e[c]||p,m=e[a]||m,g=e.dashStyle||g,r=l(e.opacity,r));c={fill:h,
stroke:p,"stroke-width":m,opacity:r};g&&(c.dashstyle=g);return c},drawPoints:function(){var e=this,f=this.chart,d=e.options,g=f.renderer,c=d.animationLimit||250,a;e.points.forEach(function(h){var p=h.graphic,l=!!p,q=p&&f.pointCount<c?"animate":"attr";if(D(h.plotY)&&null!==h.y){a=h.shapeArgs;p&&h.hasNewShapeType()&&(p=p.destroy());e.enabledDataSorting&&(h.startXPos=e.xAxis.reversed?-(a?a.width:0):e.xAxis.width);p||(h.graphic=p=g[h.shapeType](a).add(h.group||e.group))&&e.enabledDataSorting&&f.hasRendered&&
f.pointCount<c&&(p.attr({x:h.startXPos}),l=!0,q="animate");if(p&&l)p[q](n(a));if(d.borderRadius)p[q]({r:d.borderRadius});f.styledMode||p[q](e.pointAttribs(h,h.selected&&"select")).shadow(!1!==h.allowShadow&&d.shadow,null,d.stacking&&!d.borderRadius);p.addClass(h.getClassName(),!0)}else p&&(h.graphic=p.destroy())})},animate:function(f){var h=this,d=this.yAxis,g=h.options,c=this.chart.inverted,a={},l=c?"translateX":"translateY";if(f)a.scaleY=.001,f=e(d.toPixels(g.threshold),d.pos,d.pos+d.len),c?a.translateX=
f-d.len:a.translateY=f,h.clipBox&&h.setClip(),h.group.attr(a);else{var p=h.group.attr(l);h.group.animate({scaleY:1},v(C(h.options.animation),{step:function(c,g){h.group&&(a[l]=p+g.pos*(d.pos-p),h.group.attr(a))}}))}},remove:function(){var e=this,f=e.chart;f.hasRendered&&f.series.forEach(function(d){d.type===e.type&&(d.isDirty=!0)});L.prototype.remove.apply(e,arguments)}});"";return h});N(m,"Series/BarSeries.js",[m["Core/Series/Series.js"]],function(f){f.seriesType("bar","column",null,{inverted:!0});
""});N(m,"Series/ScatterSeries.js",[m["Core/Series/Series.js"],m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h,m){m=m.addEvent;var z=h.Series;f.seriesType("scatter","line",{lineWidth:0,findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group",
"markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){(this.options.lineWidth||0===this.options.lineWidth&&this.graph&&this.graph.strokeWidth())&&z.prototype.drawGraph.call(this)},applyJitter:function(){var f=this,h=this.options.jitter,m=this.points.length;h&&this.points.forEach(function(z,y){["x","y"].forEach(function(e,C){var v="plot"+e.toUpperCase();if(h[e]&&!z.isNull){var x=f[e+"Axis"];var D=h[e]*x.transA;if(x&&!x.isLog){var n=Math.max(0,z[v]-D);x=Math.min(x.len,z[v]+D);
C=1E4*Math.sin(y+C*m);z[v]=n+(x-n)*(C-Math.floor(C));"x"===e&&(z.clientX=z.plotX)}}})})}});m(z,"afterTranslate",function(){this.applyJitter&&this.applyJitter()});""});N(m,"Mixins/CenteredSeries.js",[m["Core/Globals.js"],m["Core/Utilities.js"]],function(f,h){var m=h.isNumber,z=h.pick,F=h.relativeLength,L=f.deg2rad;return f.CenteredSeriesMixin={getCenter:function(){var h=this.options,m=this.chart,y=2*(h.slicedOffset||0),e=m.plotWidth-2*y,I=m.plotHeight-2*y,v=h.center,x=Math.min(e,I),D=h.size,n=h.innerSize||
0;"string"===typeof D&&(D=parseFloat(D));"string"===typeof n&&(n=parseFloat(n));h=[z(v[0],"50%"),z(v[1],"50%"),z(D&&0>D?void 0:h.size,"100%"),z(n&&0>n?void 0:h.innerSize||0,"0%")];!m.angular||this instanceof f.Series||(h[3]=0);for(v=0;4>v;++v)D=h[v],m=2>v||2===v&&/%$/.test(D),h[v]=F(D,[e,I,x,h[2]][v])+(m?y:0);h[3]>h[2]&&(h[3]=h[2]);return h},getStartAndEndRadians:function(f,h){f=m(f)?f:0;h=m(h)&&h>f&&360>h-f?h:f+360;return{start:L*(f+-90),end:L*(h+-90)}}}});N(m,"Series/PieSeries.js",[m["Core/Animation/AnimationUtilities.js"],
m["Core/Series/Series.js"],m["Mixins/CenteredSeries.js"],m["Core/Globals.js"],m["Mixins/LegendSymbol.js"],m["Series/LineSeries.js"],m["Core/Series/Point.js"],m["Core/Renderer/SVG/SVGRenderer.js"],m["Core/Utilities.js"]],function(f,h,m,z,F,L,K,C,y){var e=f.setAnimation,I=m.getStartAndEndRadians;f=z.noop;var v=y.addEvent,x=y.clamp,D=y.defined,n=y.fireEvent,l=y.isNumber,J=y.merge,w=y.pick,r=y.relativeLength;h.seriesType("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,
connectorPadding:5,connectorShape:"fixedOffset",crookDistance:"70%",distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},softConnector:!0,x:0},fillColor:void 0,ignoreHiddenPoint:!0,inactiveOtherPoints:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,lineWidth:void 0,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,
trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:h.seriesTypes.column.prototype.pointAttribs,animate:function(d){var g=this,c=g.points,a=g.startAngleRad;d||c.forEach(function(c){var d=c.graphic,e=c.shapeArgs;d&&e&&(d.attr({r:w(c.startR,g.center&&g.center[3]/2),start:a,end:a}),d.animate({r:e.r,start:e.start,end:e.end},g.options.animation))})},hasData:function(){return!!this.processedXData.length},updateTotals:function(){var d,g=0,c=this.points,a=c.length,e=this.options.ignoreHiddenPoint;
for(d=0;d<a;d++){var f=c[d];g+=e&&!f.visible?0:f.isNull?0:f.y}this.total=g;for(d=0;d<a;d++)f=c[d],f.percentage=0<g&&(f.visible||!e)?f.y/g*100:0,f.total=g},generatePoints:function(){L.prototype.generatePoints.call(this);this.updateTotals()},getX:function(d,g,c){var a=this.center,e=this.radii?this.radii[c.index]:a[2]/2;d=Math.asin(x((d-a[1])/(e+c.labelDistance),-1,1));return a[0]+(g?-1:1)*Math.cos(d)*(e+c.labelDistance)+(0<c.labelDistance?(g?-1:1)*this.options.dataLabels.padding:0)},translate:function(d){this.generatePoints();
var g=0,c=this.options,a=c.slicedOffset,e=a+(c.borderWidth||0),f=I(c.startAngle,c.endAngle),h=this.startAngleRad=f.start;f=(this.endAngleRad=f.end)-h;var l=this.points,m=c.dataLabels.distance;c=c.ignoreHiddenPoint;var v,x=l.length;d||(this.center=d=this.getCenter());for(v=0;v<x;v++){var y=l[v];var z=h+g*f;if(!c||y.visible)g+=y.percentage/100;var E=h+g*f;y.shapeType="arc";y.shapeArgs={x:d[0],y:d[1],r:d[2]/2,innerR:d[3]/2,start:Math.round(1E3*z)/1E3,end:Math.round(1E3*E)/1E3};y.labelDistance=w(y.options.dataLabels&&
y.options.dataLabels.distance,m);y.labelDistance=r(y.labelDistance,y.shapeArgs.r);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,y.labelDistance);E=(E+z)/2;E>1.5*Math.PI?E-=2*Math.PI:E<-Math.PI/2&&(E+=2*Math.PI);y.slicedTranslation={translateX:Math.round(Math.cos(E)*a),translateY:Math.round(Math.sin(E)*a)};var u=Math.cos(E)*d[2]/2;var b=Math.sin(E)*d[2]/2;y.tooltipPos=[d[0]+.7*u,d[1]+.7*b];y.half=E<-Math.PI/2||E>Math.PI/2?1:0;y.angle=E;z=Math.min(e,y.labelDistance/5);y.labelPosition={natural:{x:d[0]+
u+Math.cos(E)*y.labelDistance,y:d[1]+b+Math.sin(E)*y.labelDistance},"final":{},alignment:0>y.labelDistance?"center":y.half?"right":"left",connectorPosition:{breakAt:{x:d[0]+u+Math.cos(E)*z,y:d[1]+b+Math.sin(E)*z},touchingSliceAt:{x:d[0]+u,y:d[1]+b}}}}n(this,"afterTranslate")},drawEmpty:function(){var d=this.startAngleRad,g=this.endAngleRad,c=this.options;if(0===this.total&&this.center){var a=this.center[0];var e=this.center[1];this.graph||(this.graph=this.chart.renderer.arc(a,e,this.center[1]/2,0,
d,g).addClass("highcharts-empty-series").add(this.group));this.graph.attr({d:C.prototype.symbols.arc(a,e,this.center[2]/2,0,{start:d,end:g,innerR:this.center[3]/2})});this.chart.styledMode||this.graph.attr({"stroke-width":c.borderWidth,fill:c.fillColor||"none",stroke:c.color||"#cccccc"})}else this.graph&&(this.graph=this.graph.destroy())},redrawPoints:function(){var d=this,e=d.chart,c=e.renderer,a,f,h,l,n=d.options.shadow;this.drawEmpty();!n||d.shadowGroup||e.styledMode||(d.shadowGroup=c.g("shadow").attr({zIndex:-1}).add(d.group));
d.points.forEach(function(g){var p={};f=g.graphic;if(!g.isNull&&f){l=g.shapeArgs;a=g.getTranslate();if(!e.styledMode){var q=g.shadowGroup;n&&!q&&(q=g.shadowGroup=c.g("shadow").add(d.shadowGroup));q&&q.attr(a);h=d.pointAttribs(g,g.selected&&"select")}g.delayedRendering?(f.setRadialReference(d.center).attr(l).attr(a),e.styledMode||f.attr(h).attr({"stroke-linejoin":"round"}).shadow(n,q),g.delayedRendering=!1):(f.setRadialReference(d.center),e.styledMode||J(!0,p,h),J(!0,p,l,a),f.animate(p));f.attr({visibility:g.visible?
"inherit":"hidden"});f.addClass(g.getClassName())}else f&&(g.graphic=f.destroy())})},drawPoints:function(){var d=this.chart.renderer;this.points.forEach(function(e){e.graphic&&e.hasNewShapeType()&&(e.graphic=e.graphic.destroy());e.graphic||(e.graphic=d[e.shapeType](e.shapeArgs).add(e.series.group),e.delayedRendering=!0)})},searchPoint:f,sortByAngle:function(d,e){d.sort(function(c,a){return"undefined"!==typeof c.angle&&(a.angle-c.angle)*e})},drawLegendSymbol:F.drawRectangle,getCenter:m.getCenter,getSymbol:f,
drawGraph:null},{init:function(){K.prototype.init.apply(this,arguments);var d=this;d.name=w(d.name,"Slice");var e=function(c){d.slice("select"===c.type)};v(d,"select",e);v(d,"unselect",e);return d},isValid:function(){return l(this.y)&&0<=this.y},setVisible:function(d,e){var c=this,a=c.series,g=a.chart,f=a.options.ignoreHiddenPoint;e=w(e,f);d!==c.visible&&(c.visible=c.options.visible=d="undefined"===typeof d?!c.visible:d,a.options.data[a.data.indexOf(c)]=c.options,["graphic","dataLabel","connector",
"shadowGroup"].forEach(function(a){if(c[a])c[a][d?"show":"hide"](!0)}),c.legendItem&&g.legend.colorizeItem(c,d),d||"hover"!==c.state||c.setState(""),f&&(a.isDirty=!0),e&&g.redraw())},slice:function(d,g,c){var a=this.series;e(c,a.chart);w(g,!0);this.sliced=this.options.sliced=D(d)?d:!this.sliced;a.options.data[a.data.indexOf(this)]=this.options;this.graphic&&this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?
this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(d){var e=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(e.x,e.y,e.r+d,e.r+d,{innerR:e.r-1,start:e.start,end:e.end})},connectorShapes:{fixedOffset:function(d,e,c){var a=e.breakAt;e=e.touchingSliceAt;return[["M",d.x,d.y],c.softConnector?["C",d.x+("left"===d.alignment?-5:5),d.y,2*a.x-e.x,2*a.y-e.y,a.x,a.y]:["L",a.x,a.y],["L",e.x,e.y]]},straight:function(d,e){e=e.touchingSliceAt;return[["M",
d.x,d.y],["L",e.x,e.y]]},crookedLine:function(d,e,c){e=e.touchingSliceAt;var a=this.series,g=a.center[0],f=a.chart.plotWidth,h=a.chart.plotLeft;a=d.alignment;var l=this.shapeArgs.r;c=r(c.crookDistance,1);f="left"===a?g+l+(f+h-g-l)*(1-c):h+(g-l)*c;c=["L",f,d.y];g=!0;if("left"===a?f>d.x||f<e.x:f<d.x||f>e.x)g=!1;d=[["M",d.x,d.y]];g&&d.push(c);d.push(["L",e.x,e.y]);return d}},getConnectorPath:function(){var d=this.labelPosition,e=this.series.options.dataLabels,c=e.connectorShape,a=this.connectorShapes;
a[c]&&(c=a[c]);return c.call(this,{x:d.final.x,y:d.final.y,alignment:d.alignment},d.connectorPosition,e)}});""});N(m,"Core/Series/DataLabels.js",[m["Core/Animation/AnimationUtilities.js"],m["Core/Globals.js"],m["Core/Series/CartesianSeries.js"],m["Core/Utilities.js"]],function(f,h,m,z){var F=f.getDeferredAnimation;f=h.noop;var L=h.seriesTypes,K=z.arrayMax,C=z.clamp,y=z.defined,e=z.extend,I=z.fireEvent,v=z.format,x=z.isArray,D=z.merge,n=z.objectEach,l=z.pick,J=z.relativeLength,w=z.splat,r=z.stableSort;
"";h.distribute=function(d,e,c){function a(a,c){return a.target-c.target}var f,g=!0,n=d,m=[];var v=0;var w=n.reducedLen||e;for(f=d.length;f--;)v+=d[f].size;if(v>w){r(d,function(a,c){return(c.rank||0)-(a.rank||0)});for(v=f=0;v<=w;)v+=d[f].size,f++;m=d.splice(f-1,d.length)}r(d,a);for(d=d.map(function(a){return{size:a.size,targets:[a.target],align:l(a.align,.5)}});g;){for(f=d.length;f--;)g=d[f],v=(Math.min.apply(0,g.targets)+Math.max.apply(0,g.targets))/2,g.pos=C(v-g.size*g.align,0,e-g.size);f=d.length;
for(g=!1;f--;)0<f&&d[f-1].pos+d[f-1].size>d[f].pos&&(d[f-1].size+=d[f].size,d[f-1].targets=d[f-1].targets.concat(d[f].targets),d[f-1].align=.5,d[f-1].pos+d[f-1].size>e&&(d[f-1].pos=e-d[f-1].size),d.splice(f,1),g=!0)}n.push.apply(n,m);f=0;d.some(function(a){var d=0;if(a.targets.some(function(){n[f].pos=a.pos+d;if("undefined"!==typeof c&&Math.abs(n[f].pos-n[f].target)>c)return n.slice(0,f+1).forEach(function(a){delete a.pos}),n.reducedLen=(n.reducedLen||e)-.1*e,n.reducedLen>.1*e&&h.distribute(n,e,c),
!0;d+=n[f].size;f++}))return!0});r(n,a)};m.prototype.drawDataLabels=function(){function d(a,c){var d=c.filter;return d?(c=d.operator,a=a[d.property],d=d.value,">"===c&&a>d||"<"===c&&a<d||">="===c&&a>=d||"<="===c&&a<=d||"=="===c&&a==d||"==="===c&&a===d?!0:!1):!0}function e(a,c){var d=[],b;if(x(a)&&!x(c))d=a.map(function(a){return D(a,c)});else if(x(c)&&!x(a))d=c.map(function(b){return D(a,b)});else if(x(a)||x(c))for(b=Math.max(a.length,c.length);b--;)d[b]=D(a[b],c[b]);else d=D(a,c);return d}var c=
this,a=c.chart,f=c.options,h=f.dataLabels,m=c.points,r,G=c.hasRendered||0,z=h.animation;z=h.defer?F(a,z,c):{defer:0,duration:0};var C=a.renderer;h=e(e(a.options.plotOptions&&a.options.plotOptions.series&&a.options.plotOptions.series.dataLabels,a.options.plotOptions&&a.options.plotOptions[c.type]&&a.options.plotOptions[c.type].dataLabels),h);I(this,"drawDataLabels");if(x(h)||h.enabled||c._hasPointLabels){var J=c.plotGroup("dataLabelsGroup","data-labels",G?"inherit":"hidden",h.zIndex||6);J.attr({opacity:+G});
!G&&(G=c.dataLabelsGroup)&&(c.visible&&J.show(!0),G[f.animation?"animate":"attr"]({opacity:1},z));m.forEach(function(g){r=w(e(h,g.dlOptions||g.options&&g.options.dataLabels));r.forEach(function(e,h){var b=e.enabled&&(!g.isNull||g.dataLabelOnNull)&&d(g,e),k=g.dataLabels?g.dataLabels[h]:g.dataLabel,p=g.connectors?g.connectors[h]:g.connector,m=l(e.distance,g.labelDistance),q=!k;if(b){var u=g.getLabelConfig();var r=l(e[g.formatPrefix+"Format"],e.format);u=y(r)?v(r,u,a):(e[g.formatPrefix+"Formatter"]||
e.formatter).call(u,e);r=e.style;var A=e.rotation;a.styledMode||(r.color=l(e.color,r.color,c.color,"#000000"),"contrast"===r.color?(g.contrastColor=C.getContrast(g.color||c.color),r.color=!y(m)&&e.inside||0>m||f.stacking?g.contrastColor:"#000000"):delete g.contrastColor,f.cursor&&(r.cursor=f.cursor));var w={r:e.borderRadius||0,rotation:A,padding:e.padding,zIndex:1};a.styledMode||(w.fill=e.backgroundColor,w.stroke=e.borderColor,w["stroke-width"]=e.borderWidth);n(w,function(a,b){"undefined"===typeof a&&
delete w[b]})}!k||b&&y(u)?b&&y(u)&&(k?w.text=u:(g.dataLabels=g.dataLabels||[],k=g.dataLabels[h]=A?C.text(u,0,-9999,e.useHTML).addClass("highcharts-data-label"):C.label(u,0,-9999,e.shape,null,null,e.useHTML,null,"data-label"),h||(g.dataLabel=k),k.addClass(" highcharts-data-label-color-"+g.colorIndex+" "+(e.className||"")+(e.useHTML?" highcharts-tracker":""))),k.options=e,k.attr(w),a.styledMode||k.css(r).shadow(e.shadow),k.added||k.add(J),e.textPath&&!e.useHTML&&(k.setTextPath(g.getDataLabelPath&&g.getDataLabelPath(k)||
g.graphic,e.textPath),g.dataLabelPath&&!e.textPath.enabled&&(g.dataLabelPath=g.dataLabelPath.destroy())),c.alignDataLabel(g,k,e,null,q)):(g.dataLabel=g.dataLabel&&g.dataLabel.destroy(),g.dataLabels&&(1===g.dataLabels.length?delete g.dataLabels:delete g.dataLabels[h]),h||delete g.dataLabel,p&&(g.connector=g.connector.destroy(),g.connectors&&(1===g.connectors.length?delete g.connectors:delete g.connectors[h])))})})}I(this,"afterDrawDataLabels")};m.prototype.alignDataLabel=function(d,g,c,a,f){var h=
this,n=this.chart,m=this.isCartesian&&n.inverted,q=this.enabledDataSorting,r=l(d.dlBox&&d.dlBox.centerX,d.plotX,-9999),v=l(d.plotY,-9999),w=g.getBBox(),x=c.rotation,y=c.align,u=n.isInsidePlot(r,Math.round(v),m),b="justify"===l(c.overflow,q?"none":"justify"),k=this.visible&&!1!==d.visible&&(d.series.forceDL||q&&!b||u||c.inside&&a&&n.isInsidePlot(r,m?a.x+1:a.y+a.height-1,m));var t=function(a){q&&h.xAxis&&!b&&h.setDataLabelStartPos(d,g,f,u,a)};if(k){var z=n.renderer.fontMetrics(n.styledMode?void 0:c.style.fontSize,
g).b;a=e({x:m?this.yAxis.len-v:r,y:Math.round(m?this.xAxis.len-r:v),width:0,height:0},a);e(c,{width:w.width,height:w.height});x?(b=!1,r=n.renderer.rotCorr(z,x),r={x:a.x+(c.x||0)+a.width/2+r.x,y:a.y+(c.y||0)+{top:0,middle:.5,bottom:1}[c.verticalAlign]*a.height},t(r),g[f?"attr":"animate"](r).attr({align:y}),t=(x+720)%360,t=180<t&&360>t,"left"===y?r.y-=t?w.height:0:"center"===y?(r.x-=w.width/2,r.y-=w.height/2):"right"===y&&(r.x-=w.width,r.y-=t?0:w.height),g.placed=!0,g.alignAttr=r):(t(a),g.align(c,null,
a),r=g.alignAttr);b&&0<=a.height?this.justifyDataLabel(g,c,r,w,a,f):l(c.crop,!0)&&(k=n.isInsidePlot(r.x,r.y)&&n.isInsidePlot(r.x+w.width,r.y+w.height));if(c.shape&&!x)g[f?"attr":"animate"]({anchorX:m?n.plotWidth-d.plotY:d.plotX,anchorY:m?n.plotHeight-d.plotX:d.plotY})}f&&q&&(g.placed=!1);k||q&&!b||(g.hide(!0),g.placed=!1)};m.prototype.setDataLabelStartPos=function(d,e,c,a,f){var g=this.chart,h=g.inverted,l=this.xAxis,n=l.reversed,m=h?e.height/2:e.width/2;d=(d=d.pointWidth)?d/2:0;l=h?f.x:n?-m-d:l.width-
m+d;f=h?n?this.yAxis.height-m+d:-m-d:f.y;e.startXPos=l;e.startYPos=f;a?"hidden"===e.visibility&&(e.show(),e.attr({opacity:0}).animate({opacity:1})):e.attr({opacity:1}).animate({opacity:0},void 0,e.hide);g.hasRendered&&(c&&e.attr({x:e.startXPos,y:e.startYPos}),e.placed=!0)};m.prototype.justifyDataLabel=function(d,e,c,a,f,h){var g=this.chart,p=e.align,l=e.verticalAlign,n=d.box?0:d.padding||0,m=e.x;m=void 0===m?0:m;var q=e.y;var r=void 0===q?0:q;q=c.x+n;if(0>q){"right"===p&&0<=m?(e.align="left",e.inside=
!0):m-=q;var v=!0}q=c.x+a.width-n;q>g.plotWidth&&("left"===p&&0>=m?(e.align="right",e.inside=!0):m+=g.plotWidth-q,v=!0);q=c.y+n;0>q&&("bottom"===l&&0<=r?(e.verticalAlign="top",e.inside=!0):r-=q,v=!0);q=c.y+a.height-n;q>g.plotHeight&&("top"===l&&0>=r?(e.verticalAlign="bottom",e.inside=!0):r+=g.plotHeight-q,v=!0);v&&(e.x=m,e.y=r,d.placed=!h,d.align(e,void 0,f));return v};L.pie&&(L.pie.prototype.dataLabelPositioners={radialDistributionY:function(d){return d.top+d.distributeBox.pos},radialDistributionX:function(d,
e,c,a){return d.getX(c<e.top+2||c>e.bottom-2?a:c,e.half,e)},justify:function(d,e,c){return c[0]+(d.half?-1:1)*(e+d.labelDistance)},alignToPlotEdges:function(d,e,c,a){d=d.getBBox().width;return e?d+a:c-d-a},alignToConnectors:function(d,e,c,a){var f=0,g;d.forEach(function(a){g=a.dataLabel.getBBox().width;g>f&&(f=g)});return e?f+a:c-f-a}},L.pie.prototype.drawDataLabels=function(){var d=this,e=d.data,c,a=d.chart,f=d.options.dataLabels||{},p=f.connectorPadding,n,r=a.plotWidth,v=a.plotHeight,w=a.plotLeft,
x=Math.round(a.chartWidth/3),z,C=d.center,E=C[2]/2,u=C[1],b,k,t,F,I=[[],[]],J,L,N,P,S=[0,0,0,0],Y=d.dataLabelPositioners,W;d.visible&&(f.enabled||d._hasPointLabels)&&(e.forEach(function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),m.prototype.drawDataLabels.apply(d),e.forEach(function(a){a.dataLabel&&(a.visible?(I[a.half].push(a),a.dataLabel._pos=null,!y(f.style.width)&&!y(a.options.dataLabels&&
a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>x&&(a.dataLabel.css({width:Math.round(.7*x)+"px"}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&1===a.dataLabels.length&&delete a.dataLabels))}),I.forEach(function(e,g){var n=e.length,m=[],q;if(n){d.sortByAngle(e,g-.5);if(0<d.maxLabelDistance){var A=Math.max(0,u-E-d.maxLabelDistance);var B=Math.min(u+E+d.maxLabelDistance,a.plotHeight);e.forEach(function(b){0<b.labelDistance&&b.dataLabel&&
(b.top=Math.max(0,u-E-b.labelDistance),b.bottom=Math.min(u+E+b.labelDistance,a.plotHeight),q=b.dataLabel.getBBox().height||21,b.distributeBox={target:b.labelPosition.natural.y-b.top+q/2,size:q,rank:b.y},m.push(b.distributeBox))});A=B+q-A;h.distribute(m,A,A/5)}for(P=0;P<n;P++){c=e[P];t=c.labelPosition;b=c.dataLabel;N=!1===c.visible?"hidden":"inherit";L=A=t.natural.y;m&&y(c.distributeBox)&&("undefined"===typeof c.distributeBox.pos?N="hidden":(F=c.distributeBox.size,L=Y.radialDistributionY(c)));delete c.positionIndex;
if(f.justify)J=Y.justify(c,E,C);else switch(f.alignTo){case "connectors":J=Y.alignToConnectors(e,g,r,w);break;case "plotEdges":J=Y.alignToPlotEdges(b,g,r,w);break;default:J=Y.radialDistributionX(d,c,L,A)}b._attr={visibility:N,align:t.alignment};W=c.options.dataLabels||{};b._pos={x:J+l(W.x,f.x)+({left:p,right:-p}[t.alignment]||0),y:L+l(W.y,f.y)-10};t.final.x=J;t.final.y=L;l(f.crop,!0)&&(k=b.getBBox().width,A=null,J-k<p&&1===g?(A=Math.round(k-J+p),S[3]=Math.max(A,S[3])):J+k>r-p&&0===g&&(A=Math.round(J+
k-r+p),S[1]=Math.max(A,S[1])),0>L-F/2?S[0]=Math.max(Math.round(-L+F/2),S[0]):L+F/2>v&&(S[2]=Math.max(Math.round(L+F/2-v),S[2])),b.sideOverflow=A)}}}),0===K(S)||this.verifyDataLabelOverflow(S))&&(this.placeDataLabels(),this.points.forEach(function(c){W=D(f,c.options.dataLabels);if(n=l(W.connectorWidth,1)){var e;z=c.connector;if((b=c.dataLabel)&&b._pos&&c.visible&&0<c.labelDistance){N=b._attr.visibility;if(e=!z)c.connector=z=a.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+
c.colorIndex+(c.className?" "+c.className:"")).add(d.dataLabelsGroup),a.styledMode||z.attr({"stroke-width":n,stroke:W.connectorColor||c.color||"#666666"});z[e?"attr":"animate"]({d:c.getConnectorPath()});z.attr("visibility",N)}else z&&(c.connector=z.destroy())}}))},L.pie.prototype.placeDataLabels=function(){this.points.forEach(function(d){var e=d.dataLabel,c;e&&d.visible&&((c=e._pos)?(e.sideOverflow&&(e._attr.width=Math.max(e.getBBox().width-e.sideOverflow,0),e.css({width:e._attr.width+"px",textOverflow:(this.options.dataLabels.style||
{}).textOverflow||"ellipsis"}),e.shortened=!0),e.attr(e._attr),e[e.moved?"animate":"attr"](c),e.moved=!0):e&&e.attr({y:-9999}));delete d.distributeBox},this)},L.pie.prototype.alignDataLabel=f,L.pie.prototype.verifyDataLabelOverflow=function(d){var e=this.center,c=this.options,a=c.center,f=c.minSize||80,h=null!==c.size;if(!h){if(null!==a[0])var l=Math.max(e[2]-Math.max(d[1],d[3]),f);else l=Math.max(e[2]-d[1]-d[3],f),e[0]+=(d[3]-d[1])/2;null!==a[1]?l=C(l,f,e[2]-Math.max(d[0],d[2])):(l=C(l,f,e[2]-d[0]-
d[2]),e[1]+=(d[0]-d[2])/2);l<e[2]?(e[2]=l,e[3]=Math.min(J(c.innerSize||0,l),l),this.translate(e),this.drawDataLabels&&this.drawDataLabels()):h=!0}return h});L.column&&(L.column.prototype.alignDataLabel=function(d,e,c,a,f){var g=this.chart.inverted,h=d.series,n=d.dlBox||d.shapeArgs,q=l(d.below,d.plotY>l(this.translatedThreshold,h.yAxis.len)),r=l(c.inside,!!this.options.stacking);n&&(a=D(n),0>a.y&&(a.height+=a.y,a.y=0),n=a.y+a.height-h.yAxis.len,0<n&&n<a.height&&(a.height-=n),g&&(a={x:h.yAxis.len-a.y-
a.height,y:h.xAxis.len-a.x-a.width,width:a.height,height:a.width}),r||(g?(a.x+=q?0:a.width,a.width=0):(a.y+=q?a.height:0,a.height=0)));c.align=l(c.align,!g||r?"center":q?"right":"left");c.verticalAlign=l(c.verticalAlign,g||r?"middle":q?"top":"bottom");m.prototype.alignDataLabel.call(this,d,e,c,a,f);c.inside&&d.contrastColor&&e.css({color:d.contrastColor})})});N(m,"Extensions/OverlappingDataLabels.js",[m["Core/Chart/Chart.js"],m["Core/Utilities.js"]],function(f,h){var m=h.addEvent,z=h.fireEvent,F=
h.isArray,L=h.isNumber,K=h.objectEach,C=h.pick;m(f,"render",function(){var f=[];(this.labelCollectors||[]).forEach(function(e){f=f.concat(e())});(this.yAxis||[]).forEach(function(e){e.stacking&&e.options.stackLabels&&!e.options.stackLabels.allowOverlap&&K(e.stacking.stacks,function(e){K(e,function(e){f.push(e.label)})})});(this.series||[]).forEach(function(e){var h=e.options.dataLabels;e.visible&&(!1!==h.enabled||e._hasPointLabels)&&(e.nodes||e.points).forEach(function(e){e.visible&&(F(e.dataLabels)?
e.dataLabels:e.dataLabel?[e.dataLabel]:[]).forEach(function(h){var m=h.options;h.labelrank=C(m.labelrank,e.labelrank,e.shapeArgs&&e.shapeArgs.height);m.allowOverlap||f.push(h)})})});this.hideOverlappingLabels(f)});f.prototype.hideOverlappingLabels=function(f){var e=this,h=f.length,m=e.renderer,x,y,n,l=!1;var C=function(d){var e,c=d.box?0:d.padding||0,a=e=0,f;if(d&&(!d.alignAttr||d.placed)){var h=d.alignAttr||{x:d.attr("x"),y:d.attr("y")};var l=d.parentGroup;d.width||(e=d.getBBox(),d.width=e.width,
d.height=e.height,e=m.fontMetrics(null,d.element).h);var n=d.width-2*c;(f={left:"0",center:"0.5",right:"1"}[d.alignValue])?a=+f*n:L(d.x)&&Math.round(d.x)!==d.translateX&&(a=d.x-d.translateX);return{x:h.x+(l.translateX||0)+c-(a||0),y:h.y+(l.translateY||0)+c-e,width:d.width-2*c,height:d.height-2*c}}};for(y=0;y<h;y++)if(x=f[y])x.oldOpacity=x.opacity,x.newOpacity=1,x.absoluteBox=C(x);f.sort(function(d,e){return(e.labelrank||0)-(d.labelrank||0)});for(y=0;y<h;y++){var w=(C=f[y])&&C.absoluteBox;for(x=y+
1;x<h;++x){var r=(n=f[x])&&n.absoluteBox;!w||!r||C===n||0===C.newOpacity||0===n.newOpacity||r.x>=w.x+w.width||r.x+r.width<=w.x||r.y>=w.y+w.height||r.y+r.height<=w.y||((C.labelrank<n.labelrank?C:n).newOpacity=0)}}f.forEach(function(d){if(d){var f=d.newOpacity;d.oldOpacity!==f&&(d.alignAttr&&d.placed?(d[f?"removeClass":"addClass"]("highcharts-data-label-hidden"),l=!0,d.alignAttr.opacity=f,d[d.isOld?"animate":"attr"](d.alignAttr,null,function(){e.styledMode||d.css({pointerEvents:f?"auto":"none"});d.visibility=
f?"inherit":"hidden"}),z(e,"afterHideOverlappingLabel")):d.attr({opacity:f}));d.isOld=!0}});l&&z(e,"afterHideAllOverlappingLabels")}});N(m,"Core/Interaction.js",[m["Core/Series/Series.js"],m["Core/Chart/Chart.js"],m["Core/Globals.js"],m["Core/Legend.js"],m["Series/LineSeries.js"],m["Core/Options.js"],m["Core/Series/Point.js"],m["Core/Utilities.js"]],function(f,h,m,z,F,L,K,C){f=f.seriesTypes;var y=m.hasTouch,e=m.svg,I=L.defaultOptions,v=C.addEvent,x=C.createElement,D=C.css,n=C.defined,l=C.extend,J=
C.fireEvent,w=C.isArray,r=C.isFunction,d=C.isNumber,g=C.isObject,c=C.merge,a=C.objectEach,q=C.pick;"";m=m.TrackerMixin={drawTrackerPoint:function(){var a=this,c=a.chart,d=c.pointer,e=function(a){var c=d.getPointFromEvent(a);"undefined"!==typeof c&&(d.isDirectTouch=!0,c.onMouseOver(a))},f;a.points.forEach(function(a){f=w(a.dataLabels)?a.dataLabels:a.dataLabel?[a.dataLabel]:[];a.graphic&&(a.graphic.element.point=a);f.forEach(function(c){c.div?c.div.point=a:c.element.point=a})});a._hasTracking||(a.trackerGroups.forEach(function(f){if(a[f]){a[f].addClass("highcharts-tracker").on("mouseover",
e).on("mouseout",function(a){d.onTrackerMouseOut(a)});if(y)a[f].on("touchstart",e);!c.styledMode&&a.options.cursor&&a[f].css(D).css({cursor:a.options.cursor})}}),a._hasTracking=!0);J(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,c=a.options,d=c.trackByArea,f=[].concat(d?a.areaPath:a.graphPath),g=a.chart,h=g.pointer,l=g.renderer,n=g.options.tooltip.snap,m=a.tracker,q=function(b){if(g.hoverSeries!==a)a.onMouseOver()},b="rgba(192,192,192,"+(e?.0001:.002)+")";m?m.attr({d:f}):a.graph&&
(a.tracker=l.path(f).attr({visibility:a.visible?"visible":"hidden",zIndex:2}).addClass(d?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),g.styledMode||a.tracker.attr({"stroke-linecap":"round","stroke-linejoin":"round",stroke:b,fill:d?b:"none","stroke-width":a.graph.strokeWidth()+(d?0:2*n)}),[a.tracker,a.markerGroup].forEach(function(a){a.addClass("highcharts-tracker").on("mouseover",q).on("mouseout",function(a){h.onTrackerMouseOut(a)});c.cursor&&!g.styledMode&&a.css({cursor:c.cursor});
if(y)a.on("touchstart",q)}));J(this,"afterDrawTracker")}};f.column&&(f.column.prototype.drawTracker=m.drawTrackerPoint);f.pie&&(f.pie.prototype.drawTracker=m.drawTrackerPoint);f.scatter&&(f.scatter.prototype.drawTracker=m.drawTrackerPoint);l(z.prototype,{setItemEvents:function(a,d,e){var f=this,g=f.chart.renderer.boxWrapper,h=a instanceof K,p="highcharts-legend-"+(h?"point":"series")+"-active",l=f.chart.styledMode;(e?[d,a.legendSymbol]:[a.legendGroup]).forEach(function(e){if(e)e.on("mouseover",function(){a.visible&&
f.allItems.forEach(function(c){a!==c&&c.setState("inactive",!h)});a.setState("hover");a.visible&&g.addClass(p);l||d.css(f.options.itemHoverStyle)}).on("mouseout",function(){f.chart.styledMode||d.css(c(a.visible?f.itemStyle:f.itemHiddenStyle));f.allItems.forEach(function(c){a!==c&&c.setState("",!h)});g.removeClass(p);a.setState()}).on("click",function(c){var b=function(){a.setVisible&&a.setVisible();f.allItems.forEach(function(b){a!==b&&b.setState(a.visible?"inactive":"",!h)})};g.removeClass(p);c=
{browserEvent:c};a.firePointEvent?a.firePointEvent("legendItemClick",c,b):J(a,"legendItemClick",c,b)})})},createCheckboxForItem:function(a){a.checkbox=x("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);v(a.checkbox,"click",function(c){J(a.series||a,"checkboxClick",{checked:c.target.checked,item:a},function(){a.select()})})}});l(h.prototype,{showResetZoom:function(){function a(){c.zoomOut()}
var c=this,d=I.lang,e=c.options.chart.resetZoomButton,f=e.theme,g=f.states,h="chart"===e.relativeTo||"spaceBox"===e.relativeTo?null:"plotBox";J(this,"beforeShowResetZoom",null,function(){c.resetZoomButton=c.renderer.button(d.resetZoom,null,null,a,f,g&&g.hover).attr({align:e.position.align,title:d.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(e.position,!1,h)});J(this,"afterShowResetZoom")},zoomOut:function(){J(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(a){var c=
this,d,e=c.pointer,f=!1,h=c.inverted?e.mouseDownX:e.mouseDownY;!a||a.resetSelection?(c.axes.forEach(function(a){d=a.zoom()}),e.initiated=!1):a.xAxis.concat(a.yAxis).forEach(function(a){var g=a.axis,p=c.inverted?g.left:g.top,b=c.inverted?p+g.width:p+g.height,k=g.isXAxis,l=!1;if(!k&&h>=p&&h<=b||k||!n(h))l=!0;e[k?"zoomX":"zoomY"]&&l&&(d=g.zoom(a.min,a.max),g.displayBtn&&(f=!0))});var p=c.resetZoomButton;f&&!p?c.showResetZoom():!f&&g(p)&&(c.resetZoomButton=p.destroy());d&&c.redraw(q(c.options.chart.animation,
a&&a.animation,100>c.pointCount))},pan:function(a,c){var e=this,f=e.hoverPoints,g=e.options.chart,h=e.options.mapNavigation&&e.options.mapNavigation.enabled,p;c="object"===typeof c?c:{enabled:c,type:"x"};g&&g.panning&&(g.panning=c);var l=c.type;J(this,"pan",{originalEvent:a},function(){f&&f.forEach(function(a){a.setState()});var c=[1];"xy"===l?c=[1,0]:"y"===l&&(c=[0]);c.forEach(function(c){var b=e[c?"xAxis":"yAxis"][0],f=b.horiz,g=a[f?"chartX":"chartY"];f=f?"mouseDownX":"mouseDownY";var n=e[f],m=
(b.pointRange||0)/2,r=b.reversed&&!e.inverted||!b.reversed&&e.inverted?-1:1,u=b.getExtremes(),v=b.toValue(n-g,!0)+m*r;r=b.toValue(n+b.len-g,!0)-m*r;var w=r<v;n=w?r:v;v=w?v:r;var A=b.hasVerticalPanning(),x=b.panningState;b.series.forEach(function(a){if(A&&!c&&(!x||x.isDirty)){var b=a.getProcessedData(!0);a=a.getExtremes(b.yData,!0);x||(x={startMin:Number.MAX_VALUE,startMax:-Number.MAX_VALUE});d(a.dataMin)&&d(a.dataMax)&&(x.startMin=Math.min(a.dataMin,x.startMin),x.startMax=Math.max(a.dataMax,x.startMax))}});
r=Math.min(q(null===x||void 0===x?void 0:x.startMin,u.dataMin),m?u.min:b.toValue(b.toPixels(u.min)-b.minPixelPadding));m=Math.max(q(null===x||void 0===x?void 0:x.startMax,u.dataMax),m?u.max:b.toValue(b.toPixels(u.max)+b.minPixelPadding));b.panningState=x;b.isOrdinal||(w=r-n,0<w&&(v+=w,n=r),w=v-m,0<w&&(v=m,n-=w),b.series.length&&n!==u.min&&v!==u.max&&n>=r&&v<=m&&(b.setExtremes(n,v,!1,!1,{trigger:"pan"}),e.resetZoomButton||h||n===r||v===m||!l.match("y")||(e.showResetZoom(),b.displayBtn=!1),p=!0),e[f]=
g)});p&&e.redraw(!1);D(e.container,{cursor:"move"})})}});l(K.prototype,{select:function(a,c){var d=this,e=d.series,f=e.chart;this.selectedStaging=a=q(a,!d.selected);d.firePointEvent(a?"select":"unselect",{accumulate:c},function(){d.selected=d.options.selected=a;e.options.data[e.data.indexOf(d)]=d.options;d.setState(a&&"select");c||f.getSelectedPoints().forEach(function(a){var c=a.series;a.selected&&a!==d&&(a.selected=a.options.selected=!1,c.options.data[c.data.indexOf(a)]=a.options,a.setState(f.hoverPoints&&
c.options.inactiveOtherPoints?"inactive":""),a.firePointEvent("unselect"))})});delete this.selectedStaging},onMouseOver:function(a){var c=this.series.chart,d=c.pointer;a=a?d.normalize(a):d.getChartCoordinatesFromPoint(this,c.inverted);d.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");this.series.options.inactiveOtherPoints||(a.hoverPoints||[]).forEach(function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var d=
this,e=c(d.series.options.point,d.options).events;d.events=e;a(e,function(a,c){r(a)&&v(d,c,a)});this.hasImportedEvents=!0}},setState:function(a,c){var d=this.series,e=this.state,f=d.options.states[a||"normal"]||{},g=I.plotOptions[d.type].marker&&d.options.marker,h=g&&!1===g.enabled,p=g&&g.states&&g.states[a||"normal"]||{},n=!1===p.enabled,m=d.stateMarkerGraphic,b=this.marker||{},k=d.chart,r=d.halo,v,w=g&&d.markerAttribs;a=a||"";if(!(a===this.state&&!c||this.selected&&"select"!==a||!1===f.enabled||
a&&(n||h&&!1===p.enabled)||a&&b.states&&b.states[a]&&!1===b.states[a].enabled)){this.state=a;w&&(v=d.markerAttribs(this,a));if(this.graphic){e&&this.graphic.removeClass("highcharts-point-"+e);a&&this.graphic.addClass("highcharts-point-"+a);if(!k.styledMode){var x=d.pointAttribs(this,a);var y=q(k.options.chart.animation,f.animation);d.options.inactiveOtherPoints&&x.opacity&&((this.dataLabels||[]).forEach(function(a){a&&a.animate({opacity:x.opacity},y)}),this.connector&&this.connector.animate({opacity:x.opacity},
y));this.graphic.animate(x,y)}v&&this.graphic.animate(v,q(k.options.chart.animation,p.animation,g.animation));m&&m.hide()}else{if(a&&p){e=b.symbol||d.symbol;m&&m.currentSymbol!==e&&(m=m.destroy());if(v)if(m)m[c?"animate":"attr"]({x:v.x,y:v.y});else e&&(d.stateMarkerGraphic=m=k.renderer.symbol(e,v.x,v.y,v.width,v.height).add(d.markerGroup),m.currentSymbol=e);!k.styledMode&&m&&m.attr(d.pointAttribs(this,a))}m&&(m[a&&this.isInside?"show":"hide"](),m.element.point=this)}a=f.halo;f=(m=this.graphic||m)&&
m.visibility||"inherit";a&&a.size&&m&&"hidden"!==f&&!this.isCluster?(r||(d.halo=r=k.renderer.path().add(m.parentGroup)),r.show()[c?"animate":"attr"]({d:this.haloPath(a.size)}),r.attr({"class":"highcharts-halo highcharts-color-"+q(this.colorIndex,d.colorIndex)+(this.className?" "+this.className:""),visibility:f,zIndex:-1}),r.point=this,k.styledMode||r.attr(l({fill:this.color||d.color,"fill-opacity":a.opacity},a.attributes))):r&&r.point&&r.point.haloPath&&r.animate({d:r.point.haloPath(0)},null,r.hide);
J(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});l(F.prototype,{onMouseOver:function(){var a=this.chart,c=a.hoverSeries;a.pointer.setHoverChartIndex();if(c&&c!==this)c.onMouseOut();this.options.events.mouseOver&&J(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,c=this.chart,d=c.tooltip,e=c.hoverPoint;c.hoverSeries=null;if(e)e.onMouseOut();this&&a.events.mouseOut&&
J(this,"mouseOut");!d||this.stickyTracking||d.shared&&!this.noSharedTooltip||d.hide();c.series.forEach(function(a){a.setState("",!0)})},setState:function(a,c){var d=this,e=d.options,f=d.graph,g=e.inactiveOtherPoints,h=e.states,l=e.lineWidth,m=e.opacity,n=q(h[a||"normal"]&&h[a||"normal"].animation,d.chart.options.chart.animation);e=0;a=a||"";if(d.state!==a&&([d.group,d.markerGroup,d.dataLabelsGroup].forEach(function(b){b&&(d.state&&b.removeClass("highcharts-series-"+d.state),a&&b.addClass("highcharts-series-"+
a))}),d.state=a,!d.chart.styledMode)){if(h[a]&&!1===h[a].enabled)return;a&&(l=h[a].lineWidth||l+(h[a].lineWidthPlus||0),m=q(h[a].opacity,m));if(f&&!f.dashstyle)for(h={"stroke-width":l},f.animate(h,n);d["zone-graph-"+e];)d["zone-graph-"+e].attr(h),e+=1;g||[d.group,d.markerGroup,d.dataLabelsGroup,d.labelBySeries].forEach(function(a){a&&a.animate({opacity:m},n)})}c&&g&&d.points&&d.setAllPointsToState(a)},setAllPointsToState:function(a){this.points.forEach(function(c){c.setState&&c.setState(a)})},setVisible:function(a,
c){var d=this,e=d.chart,f=d.legendItem,g=e.options.chart.ignoreHiddenSeries,h=d.visible;var l=(d.visible=a=d.options.visible=d.userOptions.visible="undefined"===typeof a?!h:a)?"show":"hide";["group","dataLabelsGroup","markerGroup","tracker","tt"].forEach(function(a){if(d[a])d[a][l]()});if(e.hoverSeries===d||(e.hoverPoint&&e.hoverPoint.series)===d)d.onMouseOut();f&&e.legend.colorizeItem(d,a);d.isDirty=!0;d.options.stacking&&e.series.forEach(function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});
d.linkedSeries.forEach(function(c){c.setVisible(a,!1)});g&&(e.isDirtyBox=!0);J(d,l);!1!==c&&e.redraw()},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=this.options.selected="undefined"===typeof a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);J(this,a?"select":"unselect")},drawTracker:m.drawTrackerGraph})});N(m,"Core/Responsive.js",[m["Core/Chart/Chart.js"],m["Core/Utilities.js"]],function(f,h){var m=h.find,z=h.isArray,F=h.isObject,
L=h.merge,K=h.objectEach,C=h.pick,y=h.splat,e=h.uniqueKey;f.prototype.setResponsive=function(f,h){var v=this.options.responsive,y=[],n=this.currentResponsive;!h&&v&&v.rules&&v.rules.forEach(function(f){"undefined"===typeof f._id&&(f._id=e());this.matchResponsiveRule(f,y)},this);h=L.apply(0,y.map(function(e){return m(v.rules,function(f){return f._id===e}).chartOptions}));h.isResponsiveOptions=!0;y=y.toString()||void 0;y!==(n&&n.ruleIds)&&(n&&this.update(n.undoOptions,f,!0),y?(n=this.currentOptions(h),
n.isResponsiveOptions=!0,this.currentResponsive={ruleIds:y,mergedOptions:h,undoOptions:n},this.update(h,f,!0)):this.currentResponsive=void 0)};f.prototype.matchResponsiveRule=function(e,f){var h=e.condition;(h.callback||function(){return this.chartWidth<=C(h.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=C(h.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=C(h.minWidth,0)&&this.chartHeight>=C(h.minHeight,0)}).call(this)&&f.push(e._id)};f.prototype.currentOptions=function(e){function f(e,l,m,v){var n;
K(e,function(d,e){if(!v&&-1<h.collectionsWithUpdate.indexOf(e))for(d=y(d),m[e]=[],n=0;n<Math.max(d.length,l[e].length);n++)l[e][n]&&(void 0===d[n]?m[e][n]=l[e][n]:(m[e][n]={},f(d[n],l[e][n],m[e][n],v+1)));else F(d)?(m[e]=z(d)?[]:{},f(d,l[e]||{},m[e],v+1)):m[e]="undefined"===typeof l[e]?null:l[e]})}var h=this,m={};f(e,this.options,m,0);return m}});N(m,"masters/highcharts.src.js",[m["Core/Globals.js"]],function(f){return f});m["masters/highcharts.src.js"]._modules=m;return m["masters/highcharts.src.js"]});
//# sourceMappingURL=highcharts.js.map

/***/ }),

/***/ "./node_modules/laravel-vue-pagination/dist/laravel-vue-pagination.common.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/laravel-vue-pagination/dist/laravel-vue-pagination.common.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"604a59b1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/LaravelVuePagination.vue?vue&type=template&id=7f71b5a7&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('renderless-laravel-vue-pagination',{attrs:{"data":_vm.data,"limit":_vm.limit,"show-disabled":_vm.showDisabled,"size":_vm.size,"align":_vm.align},on:{"pagination-change-page":_vm.onPaginationChangePage},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var data = ref.data;
var limit = ref.limit;
var showDisabled = ref.showDisabled;
var size = ref.size;
var align = ref.align;
var computed = ref.computed;
var prevButtonEvents = ref.prevButtonEvents;
var nextButtonEvents = ref.nextButtonEvents;
var pageButtonEvents = ref.pageButtonEvents;
return (computed.total > computed.perPage)?_c('ul',{staticClass:"pagination",class:{
            'pagination-sm': size == 'small',
            'pagination-lg': size == 'large',
            'justify-content-center': align == 'center',
            'justify-content-end': align == 'right'
        }},[(computed.prevPageUrl || showDisabled)?_c('li',{staticClass:"page-item pagination-prev-nav",class:{'disabled': !computed.prevPageUrl}},[_c('a',_vm._g({staticClass:"page-link",attrs:{"href":"#","aria-label":"Previous","tabindex":!computed.prevPageUrl && -1}},prevButtonEvents),[_vm._t("prev-nav",[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("«")]),_c('span',{staticClass:"sr-only"},[_vm._v("Previous")])])],2)]):_vm._e(),_vm._l((computed.pageRange),function(page,key){return _c('li',{key:key,staticClass:"page-item pagination-page-nav",class:{ 'active': page == computed.currentPage }},[_c('a',_vm._g({staticClass:"page-link",attrs:{"href":"#"}},pageButtonEvents(page)),[_vm._v("\n                "+_vm._s(page)+"\n                "),(page == computed.currentPage)?_c('span',{staticClass:"sr-only"},[_vm._v("(current)")]):_vm._e()])])}),(computed.nextPageUrl || showDisabled)?_c('li',{staticClass:"page-item pagination-next-nav",class:{'disabled': !computed.nextPageUrl}},[_c('a',_vm._g({staticClass:"page-link",attrs:{"href":"#","aria-label":"Next","tabindex":!computed.nextPageUrl && -1}},nextButtonEvents),[_vm._t("next-nav",[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("»")]),_c('span',{staticClass:"sr-only"},[_vm._v("Next")])])],2)]):_vm._e()],2):_vm._e()}}],null,true)})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/LaravelVuePagination.vue?vue&type=template&id=7f71b5a7&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/RenderlessLaravelVuePagination.vue?vue&type=script&lang=js&
/* harmony default export */ var RenderlessLaravelVuePaginationvue_type_script_lang_js_ = ({
  props: {
    data: {
      type: Object,
      default: function _default() {}
    },
    limit: {
      type: Number,
      default: 0
    },
    showDisabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default',
      validator: function validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1;
      }
    },
    align: {
      type: String,
      default: 'left',
      validator: function validator(value) {
        return ['left', 'center', 'right'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    isApiResource: function isApiResource() {
      return !!this.data.meta;
    },
    currentPage: function currentPage() {
      return this.isApiResource ? this.data.meta.current_page : this.data.current_page;
    },
    firstPageUrl: function firstPageUrl() {
      return this.isApiResource ? this.data.links.first : null;
    },
    from: function from() {
      return this.isApiResource ? this.data.meta.from : this.data.from;
    },
    lastPage: function lastPage() {
      return this.isApiResource ? this.data.meta.last_page : this.data.last_page;
    },
    lastPageUrl: function lastPageUrl() {
      return this.isApiResource ? this.data.links.last : null;
    },
    nextPageUrl: function nextPageUrl() {
      return this.isApiResource ? this.data.links.next : this.data.next_page_url;
    },
    perPage: function perPage() {
      return this.isApiResource ? this.data.meta.per_page : this.data.per_page;
    },
    prevPageUrl: function prevPageUrl() {
      return this.isApiResource ? this.data.links.prev : this.data.prev_page_url;
    },
    to: function to() {
      return this.isApiResource ? this.data.meta.to : this.data.to;
    },
    total: function total() {
      return this.isApiResource ? this.data.meta.total : this.data.total;
    },
    pageRange: function pageRange() {
      if (this.limit === -1) {
        return 0;
      }

      if (this.limit === 0) {
        return this.lastPage;
      }

      var current = this.currentPage;
      var last = this.lastPage;
      var delta = this.limit;
      var left = current - delta;
      var right = current + delta + 1;
      var range = [];
      var pages = [];
      var l;

      for (var i = 1; i <= last; i++) {
        if (i === 1 || i === last || i >= left && i < right) {
          range.push(i);
        }
      }

      range.forEach(function (i) {
        if (l) {
          if (i - l === 2) {
            pages.push(l + 1);
          } else if (i - l !== 1) {
            pages.push('...');
          }
        }

        pages.push(i);
        l = i;
      });
      return pages;
    }
  },
  methods: {
    previousPage: function previousPage() {
      this.selectPage(this.currentPage - 1);
    },
    nextPage: function nextPage() {
      this.selectPage(this.currentPage + 1);
    },
    selectPage: function selectPage(page) {
      if (page === '...') {
        return;
      }

      this.$emit('pagination-change-page', page);
    }
  },
  render: function render() {
    var _this = this;

    return this.$scopedSlots.default({
      data: this.data,
      limit: this.limit,
      showDisabled: this.showDisabled,
      size: this.size,
      align: this.align,
      computed: {
        isApiResource: this.isApiResource,
        currentPage: this.currentPage,
        firstPageUrl: this.firstPageUrl,
        from: this.from,
        lastPage: this.lastPage,
        lastPageUrl: this.lastPageUrl,
        nextPageUrl: this.nextPageUrl,
        perPage: this.perPage,
        prevPageUrl: this.prevPageUrl,
        to: this.to,
        total: this.total,
        pageRange: this.pageRange
      },
      prevButtonEvents: {
        click: function click(e) {
          e.preventDefault();

          _this.previousPage();
        }
      },
      nextButtonEvents: {
        click: function click(e) {
          e.preventDefault();

          _this.nextPage();
        }
      },
      pageButtonEvents: function pageButtonEvents(page) {
        return {
          click: function click(e) {
            e.preventDefault();

            _this.selectPage(page);
          }
        };
      }
    });
  }
});
// CONCATENATED MODULE: ./src/RenderlessLaravelVuePagination.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_RenderlessLaravelVuePaginationvue_type_script_lang_js_ = (RenderlessLaravelVuePaginationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/RenderlessLaravelVuePagination.vue
var RenderlessLaravelVuePagination_render, RenderlessLaravelVuePagination_staticRenderFns




/* normalize component */

var component = normalizeComponent(
  src_RenderlessLaravelVuePaginationvue_type_script_lang_js_,
  RenderlessLaravelVuePagination_render,
  RenderlessLaravelVuePagination_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RenderlessLaravelVuePagination = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/LaravelVuePagination.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var LaravelVuePaginationvue_type_script_lang_js_ = ({
  props: {
    data: {
      type: Object,
      default: function _default() {}
    },
    limit: {
      type: Number,
      default: 0
    },
    showDisabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default',
      validator: function validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1;
      }
    },
    align: {
      type: String,
      default: 'left',
      validator: function validator(value) {
        return ['left', 'center', 'right'].indexOf(value) !== -1;
      }
    }
  },
  methods: {
    onPaginationChangePage: function onPaginationChangePage(page) {
      this.$emit('pagination-change-page', page);
    }
  },
  components: {
    RenderlessLaravelVuePagination: RenderlessLaravelVuePagination
  }
});
// CONCATENATED MODULE: ./src/LaravelVuePagination.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_LaravelVuePaginationvue_type_script_lang_js_ = (LaravelVuePaginationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/LaravelVuePagination.vue





/* normalize component */

var LaravelVuePagination_component = normalizeComponent(
  src_LaravelVuePaginationvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LaravelVuePagination = (LaravelVuePagination_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (LaravelVuePagination);



/***/ })

/******/ })["default"];
//# sourceMappingURL=laravel-vue-pagination.common.js.map

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-axios/dist/vue-axios.min.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-axios/dist/vue-axios.min.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o};!function(){function o(e,t){if(!o.installed){if(o.installed=!0,!t)return void console.error("You have to install axios");e.axios=t,Object.defineProperties(e.prototype,{axios:{get:function(){return t}},$http:{get:function(){return t}}})}}"object"==( false?undefined:_typeof(exports))?module.exports=o: true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){return o}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined}();

/***/ }),

/***/ "./node_modules/vue-cleave-component/dist/vue-cleave.min.js":
/*!******************************************************************!*\
  !*** ./node_modules/vue-cleave-component/dist/vue-cleave.min.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! cleave.js */ "./node_modules/cleave.js/dist/cleave-esm.js")):undefined}("undefined"!=typeof self?self:this,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(t,n){t.exports=e},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var a={name:"cleave",render:function(e){return e("input",{attrs:{type:"text",value:this.value},on:{blur:this.onBlur}})},props:{value:{default:null,required:!0,validator:function(e){return null===e||"string"==typeof e||e instanceof String||"number"==typeof e}},options:{type:Object,default:function(){return{}}},raw:{type:Boolean,default:!0}},data:function(){return{cleave:null,onValueChangedFn:null}},mounted:function(){this.cleave||(this.cleave=new o.a(this.$el,this.getOptions(this.options)))},methods:{getOptions:function(e){return this.onValueChangedFn=e.onValueChanged,u({},e,{onValueChanged:this.onValueChanged})},onValueChanged:function(e){var t=this.raw?e.target.rawValue:e.target.value;this.$emit("input",t),"function"==typeof this.onValueChangedFn&&this.onValueChangedFn.call(this,e)},onBlur:function(e){this.$emit("blur",this.value)}},watch:{options:{deep:!0,handler:function(e){this.cleave.destroy(),this.cleave=new o.a(this.$el,this.getOptions(e)),this.cleave.setRawValue(this.value)}},value:function(e){this.cleave&&(this.raw&&e===this.cleave.getRawValue()||(this.raw||e!==this.$el.value)&&this.cleave.setRawValue(e))}},beforeDestroy:function(){this.cleave&&(this.cleave.destroy(),this.cleave=null,this.onValueChangedFn=null)}};n.d(t,"plugin",function(){return i}),n.d(t,"component",function(){return a});var i=function(e,t){var n="cleave";"string"==typeof t&&(n=t),e.component(n,a)};a.install=i;t.default=a}]).default});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "input-group col-sm-6 mb-3 p-0" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.search_value,
              expression: "search_value"
            }
          ],
          staticClass: "form-control search_inp",
          attrs: { type: "text", placeholder: "نام محصول ..." },
          domProps: { value: _vm.search_value },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.search_value = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn digi_btn_blue search_btn",
            on: {
              click: function($event) {
                return _vm.get_product_warranty(1)
              }
            }
          },
          [_vm._v("جستجو")]
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm"
        },
        [
          _c("table", { staticClass: "table table-bordered  table-hover" }, [
            _vm._m(0),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.productWarranty.data, function(item, key) {
                return _c("tr", [
                  _c("td", [_vm._v(_vm._s(key))]),
                  _vm._v(" "),
                  _c("td", [
                    _c("img", {
                      staticClass: "table_item_image",
                      attrs: {
                        src:
                          _vm.$siteUrl +
                          "files/thumbnails/" +
                          item.get_product.image_url
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "td_210" }, [
                    _vm._v(_vm._s(item.get_product.title))
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "td_210" }, [
                    _vm._v(_vm._s(item.get_warranty.name))
                  ]),
                  _vm._v(" "),
                  item.get_color.id > 0
                    ? _c("td", [
                        _c(
                          "span",
                          {
                            staticClass: "color_show",
                            style: [{ background: item.get_color.code }]
                          },
                          [
                            _vm._v(
                              "\n            " +
                                _vm._s(item.get_color.name) +
                                "\n        "
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("td", { staticClass: "td_150" }, [_vm._v("دیجی کالا")]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex justify-content-between align-items-center"
                      },
                      [
                        _c(
                          "button",
                          {
                            staticClass: "btn digi_btn_outline_blue ml-2",
                            on: {
                              click: function($event) {
                                return _vm.show_select_product_modal(
                                  item.id,
                                  key
                                )
                              }
                            }
                          },
                          [_vm._v("انتخاب\n                        ")]
                        ),
                        _vm._v(" "),
                        item.is_offer
                          ? _c(
                              "button",
                              {
                                staticClass: "btn digi_btn",
                                on: {
                                  click: function($event) {
                                    return _vm.delete_offer(item.id, key)
                                  }
                                }
                              },
                              [_vm._v("حذف\n                        ")]
                            )
                          : _vm._e()
                      ]
                    )
                  ])
                ])
              }),
              0
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c("Pagination", {
        staticClass: "mt-3",
        attrs: { data: _vm.productWarranty },
        on: { "pagination-change-page": _vm.get_product_warranty }
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "modal fade",
          attrs: {
            id: "show_product_modal",
            tabindex: "-1",
            role: "dialog",
            "aria-labelledby": "exampleModalCenterTitle",
            "aria-hidden": "true"
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "modal-dialog modal-dialog-centered",
              attrs: { role: "document" }
            },
            [
              _c("div", { staticClass: "modal-content" }, [
                _vm._m(1),
                _vm._v(" "),
                _c("div", { staticClass: "modal-body" }, [
                  _c("div", { staticClass: "row" }, [
                    _vm.server_validation_error
                      ? _c("div", { staticClass: "col-10 m-auto" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "alert alert-danger alert-dismissible fade show ",
                              attrs: { role: "alert" }
                            },
                            [
                              _c(
                                "ul",
                                { staticClass: "list-unstyled mb-0 pr-0" },
                                _vm._l(_vm.server_validation_error, function(
                                  error,
                                  key
                                ) {
                                  return _c("li", { key: key }, [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(error[0]) +
                                        "\n                                    "
                                    )
                                  ])
                                }),
                                0
                              ),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "close",
                                  attrs: {
                                    type: "button",
                                    "data-dismiss": "alert",
                                    "aria-label": "Close"
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.server_validation_error = false
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    { attrs: { "aria-hidden": "true" } },
                                    [_vm._v("×")]
                                  )
                                ]
                              )
                            ]
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-10 m-auto" },
                      [
                        _c("label", { staticClass: "mt-2" }, [
                          _vm._v("هزینه محصول")
                        ]),
                        _vm._v(" "),
                        _c("Cleave", {
                          staticClass: "form-control",
                          attrs: { options: _vm.options },
                          model: {
                            value: _vm.formValue.price1,
                            callback: function($$v) {
                              _vm.$set(_vm.formValue, "price1", $$v)
                            },
                            expression: "formValue.price1"
                          }
                        }),
                        _vm._v(" "),
                        this.validation_errors.price1
                          ? _c("span", { staticClass: "input_error" }, [
                              _vm._v(_vm._s(this.validation_errors.price1))
                            ])
                          : _vm._e()
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-10 m-auto" },
                      [
                        _c("label", { staticClass: "mt-2" }, [
                          _vm._v("هزینه محصول برای فروش")
                        ]),
                        _vm._v(" "),
                        _c("Cleave", {
                          staticClass: "form-control",
                          attrs: { options: _vm.options },
                          model: {
                            value: _vm.formValue.price2,
                            callback: function($$v) {
                              _vm.$set(_vm.formValue, "price2", $$v)
                            },
                            expression: "formValue.price2"
                          }
                        }),
                        _vm._v(" "),
                        this.validation_errors.price2
                          ? _c("span", { staticClass: "input_error" }, [
                              _vm._v(_vm._s(this.validation_errors.price2))
                            ])
                          : _vm._e()
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-10 m-auto" },
                      [
                        _c("label", { staticClass: "mt-2" }, [
                          _vm._v("تعداد موجودی محصول")
                        ]),
                        _vm._v(" "),
                        _c("Cleave", {
                          staticClass: "form-control",
                          attrs: { options: _vm.options },
                          model: {
                            value: _vm.formValue.product_number,
                            callback: function($$v) {
                              _vm.$set(_vm.formValue, "product_number", $$v)
                            },
                            expression: "formValue.product_number"
                          }
                        }),
                        _vm._v(" "),
                        this.validation_errors.product_number
                          ? _c("span", { staticClass: "input_error" }, [
                              _vm._v(
                                _vm._s(this.validation_errors.product_number)
                              )
                            ])
                          : _vm._e()
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-10 m-auto" },
                      [
                        _c("label", { staticClass: "mt-2" }, [
                          _vm._v("تعداد قابل سفارش در سبد خرید")
                        ]),
                        _vm._v(" "),
                        _c("Cleave", {
                          staticClass: "form-control ",
                          attrs: { options: _vm.options },
                          model: {
                            value: _vm.formValue.product_number_cart,
                            callback: function($$v) {
                              _vm.$set(
                                _vm.formValue,
                                "product_number_cart",
                                $$v
                              )
                            },
                            expression: "formValue.product_number_cart"
                          }
                        }),
                        _vm._v(" "),
                        this.validation_errors.product_number_cart
                          ? _c("span", { staticClass: "input_error" }, [
                              _vm._v(
                                _vm._s(
                                  this.validation_errors.product_number_cart
                                )
                              )
                            ])
                          : _vm._e()
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-10 m-auto" }, [
                      _c("label", { staticClass: "mt-2" }, [
                        _vm._v("زمان شروع تخفیف")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.date1,
                              expression: "date1"
                            }
                          ],
                          staticClass: "form-control ml-2 ",
                          attrs: {
                            type: "text",
                            id: "pcal1",
                            autocomplete: "off"
                          },
                          domProps: { value: _vm.date1 },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.date1 = $event.target.value
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      this.validation_errors.date1
                        ? _c("span", { staticClass: "input_error" }, [
                            _vm._v(_vm._s(this.validation_errors.date1))
                          ])
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-10 m-auto" }, [
                      _c("label", { staticClass: "mt-2" }, [
                        _vm._v("زمان پایان تخفیف")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.date2,
                              expression: "date2"
                            }
                          ],
                          staticClass: "form-control ml-2 ",
                          attrs: {
                            type: "text",
                            id: "pcal2",
                            autocomplete: "off"
                          },
                          domProps: { value: _vm.date2 },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.date2 = $event.target.value
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      this.validation_errors.date2
                        ? _c("span", { staticClass: "input_error" }, [
                            _vm._v(_vm._s(this.validation_errors.date2))
                          ])
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-10 m-auto" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn digi_btn mt-5 float-left",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              return _vm.add()
                            }
                          }
                        },
                        [_vm._v("افزودن به لیست\n                            ")]
                      )
                    ])
                  ])
                ])
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "modal fade bd-example-modal-sm",
          attrs: {
            id: "delete_ofer_confirm",
            tabindex: "-1",
            role: "dialog",
            "aria-labelledby": "exampleModalCenterTitle",
            "aria-hidden": "true"
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "modal-dialog modal-sm modal-dialog-centered",
              attrs: { role: "document" }
            },
            [
              _c("div", { staticClass: "modal-content" }, [
                _c("div", { staticClass: "modal-body" }, [
                  _vm._m(2),
                  _vm._v(" "),
                  _c("div", { staticClass: "p-2 mt-4 mb-3" }, [
                    _vm._v(
                      " آیا از حذف این محصول از لیست پیشنهاد های شگفت انگیز مطمئن هستی؟\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "d-flex justify-content-end" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-light delete_modal_btn ml-1",
                        attrs: { type: "button", "data-dismiss": "modal" }
                      },
                      [_vm._v("بستن\n                        ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn digi_btn_blue delete_modal_btn",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.delete_offer_request()
                          }
                        }
                      },
                      [_vm._v("تایید\n                        ")]
                    )
                  ])
                ])
              ])
            ]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("ردیف")]),
        _vm._v(" "),
        _c("th", [_vm._v("عکس محصول")]),
        _vm._v(" "),
        _c("th", [_vm._v("نام محصول")]),
        _vm._v(" "),
        _c("th", [_vm._v("گارانتی")]),
        _vm._v(" "),
        _c("th", [_vm._v("رنگ محصول")]),
        _vm._v(" "),
        _c("th", [_vm._v("فروشنده")]),
        _vm._v(" "),
        _c("th", [_vm._v("عملیات")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h6",
        { staticClass: "modal-title", attrs: { id: "exampleModalLongTitle" } },
        [_vm._v("افزودن به لیست محصولات شگفت انگیز")]
      ),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "close_modal",
          attrs: {
            "aria-hidden": "true",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_vm._v("×")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OrderSteps.vue?vue&type=template&id=022184a4&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/OrderSteps.vue?vue&type=template&id=022184a4&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "order_verify_steps" }, [
      _c("h6", { staticClass: "order_verify_title" }, [
        _vm._v("مراحل ارسال سفارش:")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "order_steps_slider", attrs: { dir: "rtl" } },
        _vm._l(_vm.order_statuses, function(step, key) {
          return key >= 0
            ? _c(
                "div",
                {
                  key: key,
                  staticClass: "order_step_item",
                  on: {
                    click: function($event) {
                      return _vm.changeOrderStatus(key)
                    }
                  }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "order_step_circle",
                      class: [key <= _vm.sendStatus ? "step_active" : ""]
                    },
                    [
                      key > _vm.sendStatus
                        ? _c("span", [_vm._v(_vm._s(key))])
                        : _vm._e(),
                      _vm._v(" "),
                      key <= _vm.sendStatus
                        ? _c("span", { staticClass: "fa fa-check" })
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "order_step_text" }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(step) +
                        "\n                "
                    )
                  ])
                ]
              )
            : _vm._e()
        }),
        0
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade bd-example-modal-sm",
        attrs: {
          id: "changeStep",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "exampleModalCenterTitle",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-sm modal-dialog-centered",
            attrs: { role: "document" }
          },
          [
            _c("div", { staticClass: "modal-content" }, [
              _c("div", { staticClass: "modal-body" }, [
                _vm._m(0),
                _vm._v(" "),
                _c("div", { staticClass: "p-2 mt-4 mb-3" }, [
                  _vm._v(
                    "\n                        آیا می خواهید وضعیت محصول را به "
                  ),
                  _c("b", [
                    _vm._v(_vm._s(_vm.order_statuses[_vm.changeToStatus]))
                  ]),
                  _vm._v(" تغییر دهید؟\n                    ")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex justify-content-end" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-light delete_modal_btn ml-1",
                      attrs: { type: "button", "data-dismiss": "modal" }
                    },
                    [_vm._v("بستن\n                        ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn digi_btn_blue delete_modal_btn",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.confirmChangeStatus()
                        }
                      }
                    },
                    [_vm._v("تایید\n                        ")]
                  )
                ])
              ])
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c("div", { staticClass: "c_wrapper" }, [
          _vm._v("\n                مشاهده آمار سال\n                "),
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.selected_year,
                  expression: "selected_year"
                }
              ],
              ref: "yearList",
              staticClass: "selectpicker select_report_year",
              on: {
                change: [
                  function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.selected_year = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  },
                  function($event) {
                    return _vm.getChartData()
                  }
                ]
              }
            },
            _vm._l(_vm.yearList, function(year, key) {
              return _c("option", { key: key, domProps: { value: year } }, [
                _vm._v(_vm._s(year))
              ])
            }),
            0
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-6 col-lg-3" }, [
        _c("div", { staticClass: "c_wrapper report_item" }, [
          _c("p", { staticClass: "report_item_title" }, [_vm._v("فروش کل")]),
          _vm._v(" "),
          _c("span", { staticClass: "report_item_value" }, [
            _vm._v(_vm._s(_vm.number_format(_vm.total_sale)))
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "tooman" }, [_vm._v("تومان")])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6 col-lg-3" }, [
        _c("div", { staticClass: "c_wrapper report_item" }, [
          _c("p", { staticClass: "report_item_title" }, [
            _vm._v("کمیسیون دریافتی کل")
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "report_item_value" }, [
            _vm._v(_vm._s(_vm.number_format(_vm.total_commission)))
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "tooman" }, [_vm._v("تومان")])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6 col-lg-3" }, [
        _c("div", { staticClass: "c_wrapper report_item" }, [
          _c("p", { staticClass: "report_item_title" }, [
            _vm._v("فروش سال منتخب")
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "report_item_value" }, [
            _vm._v(_vm._s(_vm.number_format(_vm.selected_sale)))
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "tooman" }, [_vm._v("تومان")])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6 col-lg-3" }, [
        _c("div", { staticClass: "c_wrapper report_item" }, [
          _c("p", { staticClass: "report_item_title" }, [
            _vm._v("کمیسیون سال منتخب")
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "report_item_value" }, [
            _vm._v(_vm._s(_vm.number_format(_vm.selected_commission)))
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "tooman" }, [_vm._v("تومان")])
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c(
          "div",
          { staticClass: "c_wrapper" },
          [
            _c("h6", { staticClass: "c_chart_header" }, [
              _vm._v("نمودار میزان فروش ")
            ]),
            _vm._v(" "),
            _c("highcharts", { attrs: { options: _vm.chartOptions } })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-12" }, [
        _c(
          "div",
          { staticClass: "c_wrapper" },
          [
            _c("h6", { staticClass: "c_chart_header" }, [
              _vm._v("نمودار میزان کمیسیون دریافتی ")
            ]),
            _vm._v(" "),
            _c("highcharts", { attrs: { options: _vm.commissionOptions } })
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomInput.vue?vue&type=template&id=1a261ff8&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StockroomInput.vue?vue&type=template&id=1a261ff8&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "stockroom_box" }, [
    _vm.errors.length
      ? _c(
          "div",
          { staticClass: "alert alert-danger", attrs: { role: "alert" } },
          [
            _c(
              "ul",
              { staticClass: "errors_list" },
              _vm._l(_vm.errors, function(e, key3) {
                return _c("li", { key: key3 }, [
                  _vm._v("\n                " + _vm._s(e) + "\n            ")
                ])
              }),
              0
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.serverError
      ? _c(
          "div",
          { staticClass: "alert alert-danger", attrs: { role: "alert" } },
          [_vm._v("\n        " + _vm._s(_vm.serverError) + "\n    ")]
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-6 form-group" }, [
        _c("label", { attrs: { for: "stockroom" } }, [_vm._v("انبار")]),
        _vm._v(" "),
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.stockroomId,
                expression: "stockroomId"
              }
            ],
            staticClass: "selectpicker",
            attrs: { id: "stockroom" },
            on: {
              change: function($event) {
                var $$selectedVal = Array.prototype.filter
                  .call($event.target.options, function(o) {
                    return o.selected
                  })
                  .map(function(o) {
                    var val = "_value" in o ? o._value : o.value
                    return val
                  })
                _vm.stockroomId = $event.target.multiple
                  ? $$selectedVal
                  : $$selectedVal[0]
              }
            }
          },
          [
            _c("option", { attrs: { value: "0" } }, [_vm._v("انتخاب انبار")]),
            _vm._v(" "),
            _vm._l(_vm.stockrooms, function(op, key) {
              return _c("option", { key: key, domProps: { value: op.id } }, [
                _vm._v(_vm._s(op.name))
              ])
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6 form-group" }, [
        _c("label", { attrs: { for: "description" } }, [_vm._v("توضیحات")]),
        _vm._v(" "),
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.description,
              expression: "description"
            }
          ],
          staticClass: "admin_textarea form-control",
          attrs: { id: "description" },
          domProps: { value: _vm.description },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.description = $event.target.value
            }
          }
        })
      ]),
      _vm._v(" "),
      _vm._m(0)
    ]),
    _vm._v(" "),
    this.selectedProducts.length > 0
      ? _c("div", { staticClass: "selected-products" }, [
          _c("h6", [_vm._v("محصولات انتخاب شده:")]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm"
            },
            [
              _c("table", { staticClass: "table table-hover" }, [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.selectedProducts, function(item, key2) {
                    return _c("tr", { key: key2 }, [
                      _c("td", [
                        _c("img", {
                          staticClass: "table_item_image",
                          attrs: {
                            src:
                              _vm.$siteUrl +
                              "files/thumbnails/" +
                              item.get_product.image_url
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(item.get_product.title) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(item.get_seller.brand_name) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(item.get_warranty.name) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      item.get_color.id > 0
                        ? _c("td", [
                            _c(
                              "span",
                              {
                                staticClass: "color_show",
                                style: [{ background: item.get_color.code }]
                              },
                              [
                                _vm._v(
                                  "\n                                          " +
                                    _vm._s(item.get_color.name) +
                                    "\n                                       "
                                )
                              ]
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("td", [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.selectedProducts[key2].product_number,
                              expression:
                                "selectedProducts[key2].product_number"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: {
                            value: _vm.selectedProducts[key2].product_number
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.selectedProducts[key2],
                                "product_number",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-outline-danger",
                            on: {
                              click: function($event) {
                                return _vm.removeFromSelectedList(key2)
                              }
                            }
                          },
                          [_vm._v("حذف\n\n                        ")]
                        )
                      ])
                    ])
                  }),
                  0
                )
              ])
            ]
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "btn btn-primary mt-3",
        on: {
          click: function($event) {
            return _vm.sendData()
          }
        }
      },
      [_vm._v("افزودن به انبار")]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "productsModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myLargeModalLabel",
          "aria-hidden": "true"
        }
      },
      [
        _c("div", { staticClass: "modal-dialog modal-lg" }, [
          _c("div", { staticClass: "modal-content" }, [
            _vm._m(2),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _c("div", { staticClass: "input-group col-sm-6 mb-3 p-0" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.searchText,
                      expression: "searchText"
                    }
                  ],
                  staticClass: "form-control search_inp",
                  attrs: { type: "text", placeholder: "نام محصول ..." },
                  domProps: { value: _vm.searchText },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.searchText = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn digi_btn_blue search_btn",
                    on: {
                      click: function($event) {
                        return _vm.getProductWarranty(1)
                      }
                    }
                  },
                  [_vm._v("جستجو\n                        ")]
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm"
                },
                [
                  _c(
                    "table",
                    { staticClass: "table  table-hover" },
                    _vm._l(_vm.productList.data, function(item, key) {
                      return _c("tr", { key: key }, [
                        _c("td", [
                          _c("img", {
                            staticClass: "table_item_image",
                            attrs: {
                              src:
                                _vm.$siteUrl +
                                "files/thumbnails/" +
                                item.get_product.image_url
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(item.get_product.title) +
                              "\n                                "
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(item.get_seller.brand_name) +
                              "\n                                "
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(item.get_warranty.name) +
                              "\n                                "
                          )
                        ]),
                        _vm._v(" "),
                        item.get_color.id > 0
                          ? _c("td", [
                              _c(
                                "span",
                                {
                                  staticClass: "color_show",
                                  style: [{ background: item.get_color.code }]
                                },
                                [
                                  _vm._v(
                                    "\n                                          " +
                                      _vm._s(item.get_color.name) +
                                      "\n                                       "
                                  )
                                ]
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("td", [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.productCount[key],
                                expression: "productCount[key]"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { type: "text" },
                            domProps: { value: _vm.productCount[key] },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.productCount,
                                  key,
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm.checkInList(item.id)
                            ? _c("span", { staticClass: "digi_color_blue" }, [
                                _vm._v("افزوده شده")
                              ])
                            : _c(
                                "button",
                                {
                                  staticClass: "btn btn-outline-secondary",
                                  on: {
                                    click: function($event) {
                                      return _vm.addToSelectedProduct(
                                        item.id,
                                        key
                                      )
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "افزودن\n                                    "
                                  )
                                ]
                              )
                        ])
                      ])
                    }),
                    0
                  ),
                  _vm._v(" "),
                  _c("Pagination", {
                    staticClass: "mt-3",
                    attrs: { data: _vm.productList },
                    on: { "pagination-change-page": _vm.getProductWarranty }
                  })
                ],
                1
              )
            ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-sm-6 form-group" }, [
      _c("label", { attrs: { for: "description" } }, [
        _vm._v("انتخاب محصولات")
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-outline-primary w-100",
          attrs: { "data-toggle": "modal", "data-target": "#productsModal" }
        },
        [_vm._v("لیست\n                محصولات\n            ")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("td", [_vm._v("تصویر")]),
        _vm._v(" "),
        _c("td", [_vm._v("نام")]),
        _vm._v(" "),
        _c("td", [_vm._v("فروشنده")]),
        _vm._v(" "),
        _c("td", [_vm._v("گارانتی")]),
        _vm._v(" "),
        _c("td", [_vm._v("رنگ")]),
        _vm._v(" "),
        _c("td", [_vm._v("تعداد")]),
        _vm._v(" "),
        _c("td", [_vm._v("عملیات")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h5",
        { staticClass: "modal-title", attrs: { id: "exampleModalLabel" } },
        [_vm._v("لیست محصولات")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomOutput.vue?vue&type=template&id=62864692&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StockroomOutput.vue?vue&type=template&id=62864692&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "stockroom_box" }, [
    _vm.errors.length
      ? _c(
          "div",
          { staticClass: "alert alert-danger", attrs: { role: "alert" } },
          [
            _c(
              "ul",
              { staticClass: "errors_list" },
              _vm._l(_vm.errors, function(e, key3) {
                return _c("li", { key: key3 }, [
                  _vm._v("\n                " + _vm._s(e) + "\n            ")
                ])
              }),
              0
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.serverError
      ? _c(
          "div",
          { staticClass: "alert alert-danger", attrs: { role: "alert" } },
          [_vm._v("\n        " + _vm._s(_vm.serverError) + "\n    ")]
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-6 form-group" }, [
        _c("label", { attrs: { for: "stockroom" } }, [_vm._v("انبار")]),
        _vm._v(" "),
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.stockroomId,
                expression: "stockroomId"
              }
            ],
            staticClass: "selectpicker",
            attrs: { id: "stockroom" },
            on: {
              change: function($event) {
                var $$selectedVal = Array.prototype.filter
                  .call($event.target.options, function(o) {
                    return o.selected
                  })
                  .map(function(o) {
                    var val = "_value" in o ? o._value : o.value
                    return val
                  })
                _vm.stockroomId = $event.target.multiple
                  ? $$selectedVal
                  : $$selectedVal[0]
              }
            }
          },
          [
            _c("option", { attrs: { value: "0" } }, [_vm._v("انتخاب انبار")]),
            _vm._v(" "),
            _vm._l(_vm.stockrooms, function(op, key) {
              return _c("option", { key: key, domProps: { value: op.id } }, [
                _vm._v(_vm._s(op.name))
              ])
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6 form-group" }, [
        _c("label", { attrs: { for: "description" } }, [_vm._v("توضیحات")]),
        _vm._v(" "),
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.description,
              expression: "description"
            }
          ],
          staticClass: "admin_textarea form-control",
          attrs: { id: "description" },
          domProps: { value: _vm.description },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.description = $event.target.value
            }
          }
        })
      ]),
      _vm._v(" "),
      _vm._m(0)
    ]),
    _vm._v(" "),
    this.selectedProducts.length > 0
      ? _c("div", { staticClass: "selected-products" }, [
          _c("h6", [_vm._v("محصولات انتخاب شده:")]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm"
            },
            [
              _c("table", { staticClass: "table table-hover" }, [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.selectedProducts, function(item, key2) {
                    return _c("tr", { key: key2 }, [
                      _c("td", [
                        _c("img", {
                          staticClass: "table_item_image",
                          attrs: {
                            src:
                              _vm.$siteUrl +
                              "files/thumbnails/" +
                              item.get_product_warranty.get_product.image_url
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(
                              item.get_product_warranty.get_product.title
                            ) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(
                              item.get_product_warranty.get_seller.brand_name
                            ) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                        " +
                            _vm._s(
                              item.get_product_warranty.get_warranty.name
                            ) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      item.get_product_warranty.get_color.id > 0
                        ? _c("td", [
                            _c(
                              "span",
                              {
                                staticClass: "color_show",
                                style: [
                                  {
                                    background:
                                      item.get_product_warranty.get_color.code
                                  }
                                ]
                              },
                              [
                                _vm._v(
                                  "\n                                          " +
                                    _vm._s(
                                      item.get_product_warranty.get_color.name
                                    ) +
                                    "\n                                       "
                                )
                              ]
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("td", [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.selectedProducts[key2].product_number,
                              expression:
                                "selectedProducts[key2].product_number"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: {
                            value: _vm.selectedProducts[key2].product_number
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.selectedProducts[key2],
                                "product_number",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-outline-danger",
                            on: {
                              click: function($event) {
                                return _vm.removeFromSelectedList(key2)
                              }
                            }
                          },
                          [_vm._v("حذف\n\n                        ")]
                        )
                      ])
                    ])
                  }),
                  0
                )
              ])
            ]
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "btn btn-primary mt-3",
        on: {
          click: function($event) {
            return _vm.sendData()
          }
        }
      },
      [_vm._v("افزودن به انبار")]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "productsModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myLargeModalLabel",
          "aria-hidden": "true"
        }
      },
      [
        _c("div", { staticClass: "modal-dialog modal-lg" }, [
          _c("div", { staticClass: "modal-content" }, [
            _vm._m(2),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _c("div", { staticClass: "input-group col-sm-6 mb-3 p-0" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.searchText,
                      expression: "searchText"
                    }
                  ],
                  staticClass: "form-control search_inp",
                  attrs: { type: "text", placeholder: "نام محصول ..." },
                  domProps: { value: _vm.searchText },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.searchText = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn digi_btn_blue search_btn",
                    on: {
                      click: function($event) {
                        return _vm.getProductWarranty(1)
                      }
                    }
                  },
                  [_vm._v("جستجو\n                        ")]
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "table-responsive-md table-responsive-lg table-responsive-xl table-responsive-sm"
                },
                [
                  _c(
                    "table",
                    { staticClass: "table  table-hover" },
                    _vm._l(_vm.productList.data, function(item, key) {
                      return _c("tr", { key: key }, [
                        _c("td", [
                          _c("img", {
                            staticClass: "table_item_image",
                            attrs: {
                              src:
                                _vm.$siteUrl +
                                "files/thumbnails/" +
                                item.get_product_warranty.get_product.image_url
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(
                                item.get_product_warranty.get_product.title
                              ) +
                              "\n                                "
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(
                                item.get_product_warranty.get_seller.brand_name
                              ) +
                              "\n                                "
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(
                                item.get_product_warranty.get_warranty.name
                              ) +
                              "\n                                "
                          )
                        ]),
                        _vm._v(" "),
                        item.get_product_warranty.get_color.id > 0
                          ? _c("td", [
                              _c(
                                "span",
                                {
                                  staticClass: "color_show",
                                  style: [
                                    {
                                      background:
                                        item.get_product_warranty.get_color.code
                                    }
                                  ]
                                },
                                [
                                  _vm._v(
                                    "\n                                          " +
                                      _vm._s(
                                        item.get_product_warranty.get_color.name
                                      ) +
                                      "\n                                       "
                                  )
                                ]
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("td", [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.productCount[key],
                                expression: "productCount[key]"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { type: "text" },
                            domProps: { value: _vm.productCount[key] },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.productCount,
                                  key,
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm.checkInList(item.id)
                            ? _c("span", { staticClass: "digi_color_blue" }, [
                                _vm._v("افزوده شده")
                              ])
                            : _c(
                                "button",
                                {
                                  staticClass: "btn btn-outline-secondary",
                                  on: {
                                    click: function($event) {
                                      return _vm.addToSelectedProduct(
                                        item.id,
                                        key
                                      )
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "افزودن\n                                    "
                                  )
                                ]
                              )
                        ])
                      ])
                    }),
                    0
                  ),
                  _vm._v(" "),
                  _c("Pagination", {
                    staticClass: "mt-3",
                    attrs: { data: _vm.productList },
                    on: { "pagination-change-page": _vm.getProductWarranty }
                  })
                ],
                1
              )
            ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-sm-6 form-group" }, [
      _c("label", { attrs: { for: "description" } }, [
        _vm._v("انتخاب محصولات")
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-outline-primary w-100",
          attrs: { "data-toggle": "modal", "data-target": "#productsModal" }
        },
        [_vm._v("لیست\n                محصولات\n            ")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("td", [_vm._v("تصویر")]),
        _vm._v(" "),
        _c("td", [_vm._v("نام")]),
        _vm._v(" "),
        _c("td", [_vm._v("فروشنده")]),
        _vm._v(" "),
        _c("td", [_vm._v("گارانتی")]),
        _vm._v(" "),
        _c("td", [_vm._v("رنگ")]),
        _vm._v(" "),
        _c("td", [_vm._v("تعداد")]),
        _vm._v(" "),
        _c("td", [_vm._v("عملیات")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h5",
        { staticClass: "modal-title", attrs: { id: "exampleModalLabel" } },
        [_vm._v("لیست محصولات")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue/dist/vue.common.dev.js":
/*!*************************************************!*\
  !*** ./node_modules/vue/dist/vue.common.dev.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.12
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (!config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (!isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (!config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.12';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecessary `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anything as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (slotScope) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (el.attrsMap['v-for']) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (name === 'v-slot' || name[0] === '#') {
            checkFunctionParameterExpression(value, (name + "=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stripped = exp.replace(stripStringRE, '');
  var keywordMatch = stripped.match(unaryOperatorsRE);
  if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

function checkFunctionParameterExpression (exp, text, warn, range) {
  try {
    new Function(exp, '');
  } catch (e) {
    warn(
      "invalid function parameter expression: " + (e.message) + " in\n\n" +
      "    " + exp + "\n\n" +
      "  Raw expression: " + (text.trim()) + "\n",
      range
    );
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/vue/dist/vue.common.js":
/*!*********************************************!*\
  !*** ./node_modules/vue/dist/vue.common.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./vue.common.dev.js */ "./node_modules/vue/dist/vue.common.dev.js")
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./resources/js/adminVue.js":
/*!**********************************!*\
  !*** ./resources/js/adminVue.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_IncredibleOffers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/IncredibleOffers */ "./resources/js/components/IncredibleOffers.vue");
/* harmony import */ var _components_OrderSteps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/OrderSteps */ "./resources/js/components/OrderSteps.vue");
/* harmony import */ var _components_StockroomInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/StockroomInput */ "./resources/js/components/StockroomInput.vue");
/* harmony import */ var _components_StockroomOutput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/StockroomOutput */ "./resources/js/components/StockroomOutput.vue");
/* harmony import */ var _components_SaleReport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/SaleReport */ "./resources/js/components/SaleReport.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vue_axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-axios */ "./node_modules/vue-axios/dist/vue-axios.min.js");
/* harmony import */ var vue_axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue_axios__WEBPACK_IMPORTED_MODULE_6__);
window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");





Vue.component('Pagination', __webpack_require__(/*! laravel-vue-pagination */ "./node_modules/laravel-vue-pagination/dist/laravel-vue-pagination.common.js"));
Vue.component('Cleave', __webpack_require__(/*! vue-cleave-component */ "./node_modules/vue-cleave-component/dist/vue-cleave.min.js"));
Vue.component('Cleave', __webpack_require__(/*! vue-cleave-component */ "./node_modules/vue-cleave-component/dist/vue-cleave.min.js"));


Vue.use(vue_axios__WEBPACK_IMPORTED_MODULE_6___default.a, axios__WEBPACK_IMPORTED_MODULE_5___default.a);
Vue.prototype.$siteUrl = 'http://digikala.test/';
var app = new Vue({
  el: '#app',
  components: {
    IncredibleOffers: _components_IncredibleOffers__WEBPACK_IMPORTED_MODULE_0__["default"],
    OrderSteps: _components_OrderSteps__WEBPACK_IMPORTED_MODULE_1__["default"],
    StockroomInput: _components_StockroomInput__WEBPACK_IMPORTED_MODULE_2__["default"],
    StockroomOutput: _components_StockroomOutput__WEBPACK_IMPORTED_MODULE_3__["default"],
    SaleReport: _components_SaleReport__WEBPACK_IMPORTED_MODULE_4__["default"]
  }
});

/***/ }),

/***/ "./resources/js/components/IncredibleOffers.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/IncredibleOffers.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true& */ "./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true&");
/* harmony import */ var _IncredibleOffers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IncredibleOffers.vue?vue&type=script&lang=js& */ "./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IncredibleOffers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1ac9bd27",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/IncredibleOffers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./IncredibleOffers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/OrderSteps.vue":
/*!************************************************!*\
  !*** ./resources/js/components/OrderSteps.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderSteps_vue_vue_type_template_id_022184a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderSteps.vue?vue&type=template&id=022184a4&scoped=true& */ "./resources/js/components/OrderSteps.vue?vue&type=template&id=022184a4&scoped=true&");
/* harmony import */ var _OrderSteps_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderSteps.vue?vue&type=script&lang=js& */ "./resources/js/components/OrderSteps.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderSteps_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderSteps_vue_vue_type_template_id_022184a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OrderSteps_vue_vue_type_template_id_022184a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "022184a4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/OrderSteps.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/OrderSteps.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/OrderSteps.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSteps_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./OrderSteps.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OrderSteps.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSteps_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/OrderSteps.vue?vue&type=template&id=022184a4&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/OrderSteps.vue?vue&type=template&id=022184a4&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSteps_vue_vue_type_template_id_022184a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./OrderSteps.vue?vue&type=template&id=022184a4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OrderSteps.vue?vue&type=template&id=022184a4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSteps_vue_vue_type_template_id_022184a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderSteps_vue_vue_type_template_id_022184a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/SaleReport.vue":
/*!************************************************!*\
  !*** ./resources/js/components/SaleReport.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SaleReport.vue?vue&type=template&id=49057786&scoped=true& */ "./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true&");
/* harmony import */ var _SaleReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SaleReport.vue?vue&type=script&lang=js& */ "./resources/js/components/SaleReport.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SaleReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "49057786",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/SaleReport.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/SaleReport.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/SaleReport.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SaleReport.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SaleReport.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./SaleReport.vue?vue&type=template&id=49057786&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/StockroomInput.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/StockroomInput.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StockroomInput_vue_vue_type_template_id_1a261ff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StockroomInput.vue?vue&type=template&id=1a261ff8&scoped=true& */ "./resources/js/components/StockroomInput.vue?vue&type=template&id=1a261ff8&scoped=true&");
/* harmony import */ var _StockroomInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StockroomInput.vue?vue&type=script&lang=js& */ "./resources/js/components/StockroomInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StockroomInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StockroomInput_vue_vue_type_template_id_1a261ff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StockroomInput_vue_vue_type_template_id_1a261ff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1a261ff8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/StockroomInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/StockroomInput.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/StockroomInput.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./StockroomInput.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/StockroomInput.vue?vue&type=template&id=1a261ff8&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/StockroomInput.vue?vue&type=template&id=1a261ff8&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomInput_vue_vue_type_template_id_1a261ff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./StockroomInput.vue?vue&type=template&id=1a261ff8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomInput.vue?vue&type=template&id=1a261ff8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomInput_vue_vue_type_template_id_1a261ff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomInput_vue_vue_type_template_id_1a261ff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/StockroomOutput.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/StockroomOutput.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StockroomOutput_vue_vue_type_template_id_62864692_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StockroomOutput.vue?vue&type=template&id=62864692&scoped=true& */ "./resources/js/components/StockroomOutput.vue?vue&type=template&id=62864692&scoped=true&");
/* harmony import */ var _StockroomOutput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StockroomOutput.vue?vue&type=script&lang=js& */ "./resources/js/components/StockroomOutput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StockroomOutput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StockroomOutput_vue_vue_type_template_id_62864692_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StockroomOutput_vue_vue_type_template_id_62864692_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "62864692",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/StockroomOutput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/StockroomOutput.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/StockroomOutput.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./StockroomOutput.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomOutput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/StockroomOutput.vue?vue&type=template&id=62864692&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/StockroomOutput.vue?vue&type=template&id=62864692&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutput_vue_vue_type_template_id_62864692_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./StockroomOutput.vue?vue&type=template&id=62864692&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomOutput.vue?vue&type=template&id=62864692&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutput_vue_vue_type_template_id_62864692_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutput_vue_vue_type_template_id_62864692_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./resources/js/adminVue.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\web projects\digikala\resources\js\adminVue.js */"./resources/js/adminVue.js");


/***/ })

/******/ });