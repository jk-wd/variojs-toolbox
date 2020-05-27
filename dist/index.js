(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lib.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../variojs/lib/breakpoints.js":
/*!*************************************!*\
  !*** ../variojs/lib/breakpoints.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.getActiveBreakPoint = exports.sortBreakpoints = void 0;\nvar comparisonStrings = {\n  greaterThenOrEqual: \">=\",\n  greaterThen: \">\",\n  smallerThenOrEqual: \"<=\",\n  smallerThen: \"<\"\n};\n\nexports.sortBreakpoints = function (breakpointA, breakpointB) {\n  if (breakpointA.order < breakpointB.order) {\n    return -1;\n  }\n\n  return 1;\n};\n\nexports.getActiveBreakPoint = function (options, animationData) {\n  var result = 'default';\n\n  if (!animationData || !animationData.breakpoints) {\n    return result;\n  }\n\n  for (var _i = 0, _a = animationData.breakpoints.sort(exports.sortBreakpoints); _i < _a.length; _i++) {\n    var breakPointDefinition = _a[_i];\n    var numberRegex = /[0-9]*/g;\n    var notNumberRegex = /[^0-9]*/g;\n    var comparisonString = breakPointDefinition.definition.replace(numberRegex, \"\");\n    var breakpoint = parseInt(breakPointDefinition.definition.replace(notNumberRegex, \"\"), 10);\n\n    if (breakpoint && comparisonString) {\n      switch (comparisonString) {\n        case comparisonStrings.greaterThen:\n          if (window.matchMedia(\"(min-width: \" + (breakpoint + 1) + \"px)\").matches) {\n            result = breakPointDefinition.id;\n          }\n\n          break;\n\n        case comparisonStrings.greaterThenOrEqual:\n          if (window.matchMedia(\"(min-width: \" + breakpoint + \"px)\").matches) {\n            result = breakPointDefinition.id;\n          }\n\n          break;\n\n        case comparisonStrings.smallerThen:\n          if (window.matchMedia(\"(max-width: \" + (breakpoint - 1) + \"px)\").matches) {\n            result = breakPointDefinition.id;\n          }\n\n          break;\n\n        case comparisonStrings.smallerThenOrEqual:\n          if (window.matchMedia(\"(max-width: \" + breakpoint + \"px)\").matches) {\n            result = breakPointDefinition.id;\n          }\n\n          break;\n      }\n    }\n  }\n\n  return result;\n};\n\n//# sourceURL=webpack:///../variojs/lib/breakpoints.js?");

/***/ }),

/***/ "../variojs/lib/easing-functions.js":
/*!******************************************!*\
  !*** ../variojs/lib/easing-functions.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.EasingFunctions = void 0;\nexports.EasingFunctions = {\n  linear: function linear(t) {\n    return t;\n  },\n  easeInQuad: function easeInQuad(t) {\n    return t * t;\n  },\n  // @ts-ignore:\n  easeOutQuad: function easeOutQuad(t) {\n    return t * (2 - t);\n  },\n  // @ts-ignore:\n  easeInOutQuad: function easeInOutQuad(t) {\n    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;\n  },\n  // @ts-ignore:\n  easeInCubic: function easeInCubic(t) {\n    return t * t * t;\n  },\n  // @ts-ignore:\n  easeOutCubic: function easeOutCubic(t) {\n    return --t * t * t + 1;\n  },\n  // @ts-ignore:\n  easeInOutCubic: function easeInOutCubic(t) {\n    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;\n  },\n  // @ts-ignore:\n  easeInQuart: function easeInQuart(t) {\n    return t * t * t * t;\n  },\n  // @ts-ignore:\n  easeOutQuart: function easeOutQuart(t) {\n    return 1 - --t * t * t * t;\n  },\n  // @ts-ignore:\n  easeInOutQuart: function easeInOutQuart(t) {\n    return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;\n  },\n  // @ts-ignore:\n  easeInQuint: function easeInQuint(t) {\n    return t * t * t * t * t;\n  },\n  // @ts-ignore:\n  easeOutQuint: function easeOutQuint(t) {\n    return 1 + --t * t * t * t * t;\n  },\n  // @ts-ignore:\n  easeInOutQuint: function easeInOutQuint(t) {\n    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;\n  },\n  // @ts-ignore:\n  easeOutElastic: function easeOutElastic(t) {\n    return (.04 - .04 / t) * Math.sin(25 * t) + 1;\n  },\n  // @ts-ignore:\n  easeInElastic: function easeInElastic(t) {\n    return .04 * t / --t * Math.sin(25 * t);\n  },\n  // @ts-ignore:\n  easeInOutElastic: function easeInOutElastic(t) {\n    return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1;\n  }\n};\n\n//# sourceURL=webpack:///../variojs/lib/easing-functions.js?");

/***/ }),

/***/ "../variojs/lib/helpers/animationData.js":
/*!***********************************************!*\
  !*** ../variojs/lib/helpers/animationData.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.calculateStartValue = exports.getAnimationDefinitionsByIds = exports.getAnimationDefinitionById = exports.getAnimationEntryById = exports.getParallaxTimelineById = exports.getTimelineById = void 0;\n\nexports.getTimelineById = function (animationData, id) {\n  return animationData.timelines.find(function (timeline) {\n    return timeline.id === id;\n  });\n};\n\nexports.getParallaxTimelineById = function (animationData, id) {\n  return animationData.parallaxTimelines.find(function (timeline) {\n    return timeline.id === id;\n  });\n};\n\nexports.getAnimationEntryById = function (animationData, id) {\n  return animationData.animationEntries ? animationData.animationEntries.find(function (entry) {\n    return entry.id === id;\n  }) : undefined;\n};\n\nexports.getAnimationDefinitionById = function (animationData, id) {\n  var animationDefinitions = animationData.animationDefinitions ? animationData.animationDefinitions : [];\n  return animationDefinitions.find(function (animationDefinition) {\n    return id && animationDefinition.id === id ? true : false;\n  });\n};\n\nexports.getAnimationDefinitionsByIds = function (animationData, ids) {\n  if (!ids) {\n    return [];\n  }\n\n  var animationDefinitions = animationData.animationDefinitions ? animationData.animationDefinitions : [];\n  return ids.reduce(function (result, id) {\n    var animationDefinition = animationDefinitions.find(function (animationDefinition) {\n      return id === animationDefinition.id;\n    });\n\n    if (animationDefinition) {\n      result.push(animationDefinition);\n    }\n\n    return result;\n  }, []);\n};\n\nexports.calculateStartValue = function (animationData, startSum) {\n  var startSumValue = startSum;\n  var numberVarMatches = startSumValue.match(/\\[([a-zA-Z]*)\\]/g);\n\n  if (numberVarMatches && numberVarMatches.length > 0) {\n    for (var _i = 0, numberVarMatches_1 = numberVarMatches; _i < numberVarMatches_1.length; _i++) {\n      var numberVarIndex = numberVarMatches_1[_i];\n      var index = numberVarIndex.replace('[', '').replace(']', '');\n\n      if (numberVarIndex && animationData.numbers && animationData.numbers[index]) {\n        var value = animationData.numbers[index];\n        startSumValue = startSumValue.replace(new RegExp(\"\\\\[\" + index + \"\\\\]\", 'g'), '' + value);\n      }\n    }\n  }\n\n  var result = 0;\n\n  try {\n    result = eval(startSumValue) || 0;\n  } catch (_a) {\n    result = 0;\n  }\n\n  return result;\n};\n\n//# sourceURL=webpack:///../variojs/lib/helpers/animationData.js?");

/***/ }),

/***/ "../variojs/lib/helpers/animationProps.js":
/*!************************************************!*\
  !*** ../variojs/lib/helpers/animationProps.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __assign = this && this.__assign || function () {\n  __assign = Object.assign || function (t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n      s = arguments[i];\n\n      for (var p in s) {\n        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n      }\n    }\n\n    return t;\n  };\n\n  return __assign.apply(this, arguments);\n};\n\nexports.__esModule = true;\nexports.mergeAnimations = exports.getClosestFrames = exports.getClosestFramesForTimeline = exports.isFrameDefined = void 0;\n\nexports.isFrameDefined = function (frames, frame, parallax) {\n  if (parallax === void 0) {\n    parallax = false;\n  }\n\n  var index = parallax ? 'offsetPixels' : 'ms';\n  return frames.some(function (frameToCompare) {\n    return frameToCompare[index] === frame[index];\n  });\n};\n\nexports.getClosestFramesForTimeline = function (animation, timeline, key) {\n  var frames = animation.animationProps[key];\n  var frameUnitId = animation.parallax ? 'offsetPixels' : 'ms';\n  var goal = timeline.progress || 0;\n  var closestsFrames = exports.getClosestFrames(frames, goal, frameUnitId);\n  return {\n    closestsFrames: closestsFrames,\n    goal: goal,\n    frameUnitId: frameUnitId\n  };\n};\n\nexports.getClosestFrames = function (frames, goal, frameUnitId) {\n  var result = [];\n\n  for (var _i = 0, frames_1 = frames; _i < frames_1.length; _i++) {\n    var frame = frames_1[_i];\n\n    if (frame[frameUnitId] <= goal) {\n      result[0] = frame;\n    }\n  }\n\n  for (var i = frames.length - 1; i >= 0; i--) {\n    if (frames[i][frameUnitId] > goal) {\n      result[1] = frames[i];\n    }\n  }\n\n  if (!result[0]) {\n    result[0] = frames[0];\n  }\n\n  if (!result[1]) {\n    result[1] = result[0];\n  }\n\n  return result;\n};\n\nexports.mergeAnimations = function (animation, animationToMerge, parallax) {\n  if (animationToMerge === void 0) {\n    animationToMerge = {};\n  }\n\n  if (parallax === void 0) {\n    parallax = false;\n  }\n\n  var result = __assign({}, animation);\n\n  for (var propKey in animationToMerge) {\n    if (!result[propKey]) {\n      result[propKey] = [];\n    }\n\n    var propToMerge = animationToMerge[propKey] ? animationToMerge[propKey] : [];\n\n    for (var _i = 0, propToMerge_1 = propToMerge; _i < propToMerge_1.length; _i++) {\n      var frame = propToMerge_1[_i];\n\n      if (!exports.isFrameDefined(result[propKey], frame, parallax)) {\n        result[propKey].push(frame);\n      }\n    }\n  }\n\n  return result;\n};\n\n//# sourceURL=webpack:///../variojs/lib/helpers/animationProps.js?");

/***/ }),

/***/ "../variojs/lib/helpers/scroll.js":
/*!****************************************!*\
  !*** ../variojs/lib/helpers/scroll.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.calculatePageScroll = void 0;\n\nexports.calculatePageScroll = function (startPos) {\n  if (startPos === void 0) {\n    startPos = 0;\n  }\n\n  var documentElement = document.documentElement || document.body;\n  var scrollHeight = documentElement.scrollHeight;\n  var scrollOffset = window.pageYOffset || documentElement.scrollTop;\n  var scrollOffsetMinStart = Math.max(scrollOffset - startPos, 0);\n  var percentage = scrollOffsetMinStart / (scrollHeight - documentElement.clientHeight);\n  var scrollPercentage = Math.min(Math.max(percentage, 0), 1) * 100;\n  return {\n    scrollOffset: scrollOffsetMinStart,\n    scrollPercentage: scrollPercentage\n  };\n};\n\n//# sourceURL=webpack:///../variojs/lib/helpers/scroll.js?");

/***/ }),

/***/ "../variojs/lib/index.js":
/*!*******************************!*\
  !*** ../variojs/lib/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __assign = this && this.__assign || function () {\n  __assign = Object.assign || function (t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n      s = arguments[i];\n\n      for (var p in s) {\n        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n      }\n    }\n\n    return t;\n  };\n\n  return __assign.apply(this, arguments);\n};\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function get() {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nvar __generator = this && this.__generator || function (thisArg, body) {\n  var _ = {\n    label: 0,\n    sent: function sent() {\n      if (t[0] & 1) throw t[1];\n      return t[1];\n    },\n    trys: [],\n    ops: []\n  },\n      f,\n      y,\n      t,\n      g;\n  return g = {\n    next: verb(0),\n    \"throw\": verb(1),\n    \"return\": verb(2)\n  }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function () {\n    return this;\n  }), g;\n\n  function verb(n) {\n    return function (v) {\n      return step([n, v]);\n    };\n  }\n\n  function step(op) {\n    if (f) throw new TypeError(\"Generator is already executing.\");\n\n    while (_) {\n      try {\n        if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n        if (y = 0, t) op = [op[0] & 2, t.value];\n\n        switch (op[0]) {\n          case 0:\n          case 1:\n            t = op;\n            break;\n\n          case 4:\n            _.label++;\n            return {\n              value: op[1],\n              done: false\n            };\n\n          case 5:\n            _.label++;\n            y = op[1];\n            op = [0];\n            continue;\n\n          case 7:\n            op = _.ops.pop();\n\n            _.trys.pop();\n\n            continue;\n\n          default:\n            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {\n              _ = 0;\n              continue;\n            }\n\n            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {\n              _.label = op[1];\n              break;\n            }\n\n            if (op[0] === 6 && _.label < t[1]) {\n              _.label = t[1];\n              t = op;\n              break;\n            }\n\n            if (t && _.label < t[2]) {\n              _.label = t[2];\n\n              _.ops.push(op);\n\n              break;\n            }\n\n            if (t[2]) _.ops.pop();\n\n            _.trys.pop();\n\n            continue;\n        }\n\n        op = body.call(thisArg, _);\n      } catch (e) {\n        op = [6, e];\n        y = 0;\n      } finally {\n        f = t = 0;\n      }\n    }\n\n    if (op[0] & 5) throw op[1];\n    return {\n      value: op[0] ? op[1] : void 0,\n      done: true\n    };\n  }\n};\n\nvar __spreadArrays = this && this.__spreadArrays || function () {\n  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {\n    s += arguments[i].length;\n  }\n\n  for (var r = Array(s), k = 0, i = 0; i < il; i++) {\n    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {\n      r[k] = a[j];\n    }\n  }\n\n  return r;\n};\n\nexports.__esModule = true;\n\nvar scroll_1 = __webpack_require__(/*! ./helpers/scroll */ \"../variojs/lib/helpers/scroll.js\");\n\nvar styling_parsers_1 = __webpack_require__(/*! ./styling-parsers */ \"../variojs/lib/styling-parsers.js\");\n\nvar breakpoints_1 = __webpack_require__(/*! ./breakpoints */ \"../variojs/lib/breakpoints.js\");\n\nvar value_parsers_1 = __webpack_require__(/*! ./value-parsers */ \"../variojs/lib/value-parsers.js\");\n\nvar animationData_1 = __webpack_require__(/*! ./helpers/animationData */ \"../variojs/lib/helpers/animationData.js\");\n\nvar animationProps_1 = __webpack_require__(/*! ./helpers/animationProps */ \"../variojs/lib/helpers/animationProps.js\");\n\nvar breakpoints_2 = __webpack_require__(/*! ./breakpoints */ \"../variojs/lib/breakpoints.js\");\n\n__createBinding(exports, breakpoints_2, \"sortBreakpoints\");\n\nvar easing_functions_1 = __webpack_require__(/*! ./easing-functions */ \"../variojs/lib/easing-functions.js\");\n\n__createBinding(exports, easing_functions_1, \"EasingFunctions\");\n\nvar scroll_2 = __webpack_require__(/*! ./helpers/scroll */ \"../variojs/lib/helpers/scroll.js\");\n\n__createBinding(exports, scroll_2, \"calculatePageScroll\");\n\nvar types_interfaces_1 = __webpack_require__(/*! ./types-interfaces */ \"../variojs/lib/types-interfaces.js\");\n\n__createBinding(exports, types_interfaces_1, \"PropTypes\");\n\nvar animationData_2 = __webpack_require__(/*! ./helpers/animationData */ \"../variojs/lib/helpers/animationData.js\");\n\n__createBinding(exports, animationData_2, \"getAnimationEntryById\");\n\n__createBinding(exports, animationData_2, \"getAnimationDefinitionById\");\n\nvar animations = [];\nvar elements = {};\nvar options;\nvar timelineStates = {};\nvar parallaxTimelineStates = {};\nvar animationData;\nvar activeBreakpoint = 'default';\n\nvar updateTimelines = function updateTimelines(timestamp) {\n  for (var _i = 0, _a = animationData.timelines; _i < _a.length; _i++) {\n    var timeline = _a[_i];\n    timelineStates[timeline.id] = timelineStates[timeline.id] ? timelineStates[timeline.id] : {\n      id: timeline.id\n    };\n    var timelineState = timelineStates[timeline.id];\n\n    if (timelineState.isRunning && !timelineState.pause) {\n      if (!timelineState.start) timelineState.start = timestamp;\n      var pauseTime = timelineState.pauseTime ? timelineState.pauseTime : 0;\n      timelineState.progress = timestamp - timelineState.start - pauseTime;\n\n      if (timelineState.end && timelineState.progress >= timelineState.end) {\n        timelineState.start = timestamp - pauseTime;\n\n        if (!timeline.loop) {\n          timelineState.isRunning = false;\n        }\n      }\n    } else if (timelineState.isRunning && timelineState.pause && timelineState.progress) {\n      if (!timelineState.start) timelineState.start = timestamp;\n      timelineState.pauseTime = timestamp - timelineState.start - timelineState.progress;\n    }\n  }\n};\n\nvar updateParallaxTimelines = function updateParallaxTimelines() {\n  var scrollOffset = scroll_1.calculatePageScroll().scrollOffset;\n\n  for (var _i = 0, _a = animationData.parallaxTimelines; _i < _a.length; _i++) {\n    var timeline = _a[_i];\n    parallaxTimelineStates[timeline.id] = parallaxTimelineStates[timeline.id] ? parallaxTimelineStates[timeline.id] : {\n      id: timeline.id\n    };\n    var timelineState = parallaxTimelineStates[timeline.id];\n    timelineState.progress = scrollOffset;\n  }\n};\n\nvar updateAnimations = function updateAnimations(animations) {\n  if (animations === void 0) {\n    animations = [];\n  }\n\n  for (var i = 0; i < animations.length; i++) {\n    var animation = animations[i];\n\n    for (var _i = 0, _a = Object.keys(animation.animationProps); _i < _a.length; _i++) {\n      var animationKey = _a[_i];\n      var parser = value_parsers_1[\"default\"][animationKey];\n      var timeline = animation.parallax ? getActiveParallaxTimelineState() : timelineStates[animation.timeline];\n\n      if (parser && timeline && elements[animation.domReference]) {\n        elements[animation.domReference].stylingValues[animationKey] = parser({\n          animation: animation,\n          key: animationKey,\n          timeline: timeline\n        });\n      }\n    }\n  }\n};\n\nvar updateElements = function updateElements() {\n  for (var _i = 0, _a = Object.keys(elements); _i < _a.length; _i++) {\n    var elementKey = _a[_i];\n    var element = elements[elementKey];\n\n    if (typeof window !== 'undefined') {\n      styling_parsers_1.domStylingParser(element);\n    }\n  }\n};\n\nvar getActiveParallaxTimelineState = function getActiveParallaxTimelineState() {\n  return parallaxTimelineStates[animationData.activeParallaxTimeline];\n};\n\nvar processFrameStart = function processFrameStart(animationDefinition, start, parallax) {\n  if (parallax === void 0) {\n    parallax = false;\n  }\n\n  if (!animationDefinition) {\n    return {};\n  }\n\n  if (!start) {\n    return animationDefinition.props;\n  }\n\n  var startIndex = parallax ? 'offsetPixels' : 'ms';\n  var startTime = animationData_1.calculateStartValue(animationData, start);\n  var result = JSON.parse(JSON.stringify(animationDefinition.props));\n\n  for (var propKey in result) {\n    for (var _i = 0, _a = result[propKey]; _i < _a.length; _i++) {\n      var frame = _a[_i];\n      frame[startIndex] = frame[startIndex] + startTime;\n    }\n  }\n\n  return result;\n};\n\nvar processAnimation = function processAnimation(animationDefinitions, start, parallax) {\n  if (parallax === void 0) {\n    parallax = false;\n  }\n\n  if (!animationData) {\n    return {};\n  }\n\n  var animation = {};\n\n  for (var _i = 0, _a = animationDefinitions || []; _i < _a.length; _i++) {\n    var animationDefinition = _a[_i];\n    var animationProcessedFrameStart = start ? processFrameStart(animationDefinition, start, parallax) : animationDefinition.props;\n    animation = animationProps_1.mergeAnimations(animationProcessedFrameStart, animation);\n  }\n\n  return animation;\n};\n\nvar defineAnimationProps = function defineAnimationProps(animationDefinitionIds, animationDefinitionIdsBreakpoint, parallax, start) {\n  if (parallax === void 0) {\n    parallax = false;\n  }\n\n  var animationProps = {};\n  var animationDefinitions = animationData_1.getAnimationDefinitionsByIds(animationData, animationDefinitionIds);\n  animationProps = animationProps_1.mergeAnimations(processAnimation(animationDefinitions, start, parallax), animationProps, parallax);\n  var animationDefinitionsBreakpoint = animationData_1.getAnimationDefinitionsByIds(animationData, animationDefinitionIdsBreakpoint);\n  animationProps = animationProps_1.mergeAnimations(processAnimation(animationDefinitionsBreakpoint, start, parallax), animationProps, parallax);\n  return animationProps;\n};\n\nvar getEndTimeFromAnimationProps = function getEndTimeFromAnimationProps(animationProps, parallax) {\n  if (parallax === void 0) {\n    parallax = false;\n  }\n\n  var result = 0;\n  var unitIndex = parallax ? 'offsetPixels' : 'ms';\n\n  for (var _i = 0, _a = Object.keys(animationProps); _i < _a.length; _i++) {\n    var propKey = _a[_i];\n    var prop = animationProps[propKey];\n\n    if (prop && prop.constructor === Array) {\n      for (var _b = 0, prop_1 = prop; _b < prop_1.length; _b++) {\n        var frame = prop_1[_b];\n\n        if (frame[unitIndex]) {\n          result = Math.max(frame[unitIndex], result);\n        }\n      }\n    } else if (prop && prop[unitIndex]) {\n      result = Math.max(prop[unitIndex], result);\n    }\n  }\n\n  return result;\n};\n\nvar fillElementsArray = function fillElementsArray(timeline) {\n  for (var _i = 0, _a = timeline.animationEntries || []; _i < _a.length; _i++) {\n    var animationEntryId = _a[_i];\n    var animationEntry = animationData_1.getAnimationEntryById(animationData, animationEntryId);\n\n    if (!animationEntry) {\n      continue;\n    }\n\n    var domElement = document.querySelector(\"[data-v=\" + animationEntry.domReference + \"]\");\n\n    if (!domElement) {\n      continue;\n    }\n\n    elements[animationEntry.domReference] = {\n      domElement: domElement,\n      stylingValues: {}\n    };\n  }\n};\n\nvar prepareTimelinState = function prepareTimelinState(animation, parallax) {\n  if (parallax === void 0) {\n    parallax = false;\n  }\n\n  var timeline = !parallax ? animationData_1.getTimelineById(animationData, animation.timeline) : animationData_1.getParallaxTimelineById(animationData, animation.timeline);\n\n  if (!timeline) {\n    return;\n  }\n\n  if (!parallax) {\n    timelineStates[timeline.id] = timelineStates[timeline.id] ? timelineStates[timeline.id] : {\n      id: timeline.id\n    };\n  }\n\n  var timelineState = parallax ? getActiveParallaxTimelineState() : timelineStates[timeline.id];\n\n  if (timelineState) {\n    var end = timelineState.end ? timelineState.end : 0;\n    timelineState.end = Math.max(getEndTimeFromAnimationProps(animation.animationProps), end);\n  }\n};\n\nvar processTimelineEntries = function processTimelineEntries(timeline, parallax) {\n  if (parallax === void 0) {\n    parallax = false;\n  }\n\n  for (var _i = 0, _a = timeline.animationEntries || []; _i < _a.length; _i++) {\n    var animationEntryId = _a[_i];\n    var animationEntry = animationData_1.getAnimationEntryById(animationData, animationEntryId);\n\n    if (!animationEntry) {\n      continue;\n    }\n\n    var animationProps = {};\n    animationEntry.animationDefinitions = animationEntry.animationDefinitions ? animationEntry.animationDefinitions : {};\n    var startIndex = parallax ? 'startOffsetPixels' : 'startMs';\n    var start = animationEntry[startIndex];\n    animationProps = defineAnimationProps(animationEntry.animationDefinitions['default'], animationEntry.animationDefinitions[activeBreakpoint], parallax, start);\n    var entry = {\n      domReference: animationEntry.domReference,\n      timeline: timeline.id,\n      parallax: parallax,\n      animationProps: animationProps\n    };\n    prepareTimelinState(entry, parallax);\n    animations.push(entry);\n  }\n};\n\nvar processTimelines = function processTimelines() {\n  if (!animationData) {\n    return;\n  }\n\n  for (var _i = 0, _a = animationData.timelines; _i < _a.length; _i++) {\n    var timeline = _a[_i];\n    processTimelineEntries(timeline);\n    fillElementsArray(timeline);\n  }\n\n  var paralaxTimeline = animationData_1.getParallaxTimelineById(animationData, animationData.activeParallaxTimeline);\n\n  if (paralaxTimeline) {\n    processTimelineEntries(paralaxTimeline, true);\n    fillElementsArray(paralaxTimeline);\n  }\n};\n\nvar loopUpdateAnimations = function loopUpdateAnimations(timestamp) {\n  updateAnimations(animations);\n  updateTimelines(timestamp);\n  updateElements();\n  updateParallaxTimelines();\n  requestAnimationFrame(loopUpdateAnimations);\n};\n\nvar fetchAnimationJSON = function fetchAnimationJSON() {\n  return __awaiter(void 0, void 0, void 0, function () {\n    var result;\n    return __generator(this, function (_a) {\n      switch (_a.label) {\n        case 0:\n          if (!options.url) {\n            return [2\n            /*return*/\n            ];\n          }\n\n          return [4\n          /*yield*/\n          , window.fetch(options.url)];\n\n        case 1:\n          result = _a.sent();\n          return [4\n          /*yield*/\n          , result.json()];\n\n        case 2:\n          return [2\n          /*return*/\n          , _a.sent()];\n      }\n    });\n  });\n};\n\nvar setupBreakpointHandler = function setupBreakpointHandler() {\n  activeBreakpoint = breakpoints_1.getActiveBreakPoint(options, animationData);\n  window.addEventListener(\"resize\", function () {\n    var newActiveBreakpoint = breakpoints_1.getActiveBreakPoint(options, animationData);\n\n    if (newActiveBreakpoint !== activeBreakpoint) {\n      activeBreakpoint = newActiveBreakpoint;\n      init();\n    }\n  });\n};\n\nvar play = function play(timelineId) {\n  var timelineTarget = timelineId ? timelineId : 'main';\n  var timeline = timelineStates[timelineTarget];\n\n  if (timeline) {\n    timeline.pause = false;\n    timeline.isRunning = true;\n  }\n};\n\nvar pause = function pause(timelineId) {\n  var timelineTarget = timelineId ? timelineId : 'main';\n  var timeline = timelineStates[timelineTarget];\n\n  if (timeline) {\n    timeline.pause = true;\n  }\n};\n\nvar prepareMainTimelines = function prepareMainTimelines() {\n  animationData.timelines = animationData.timelines ? animationData.timelines : [];\n\n  if (!animationData_1.getTimelineById(animationData, 'main')) {\n    animationData.timelines = __spreadArrays(animationData.timelines, [{\n      id: 'main'\n    }]);\n  }\n\n  animationData.parallaxTimelines = animationData.parallaxTimelines ? animationData.parallaxTimelines : [];\n\n  if (!animationData_1.getParallaxTimelineById(animationData, 'main')) {\n    animationData.parallaxTimelines = __spreadArrays(animationData.parallaxTimelines, [{\n      id: 'main'\n    }]);\n  }\n};\n\nvar init = function init(optionsParam) {\n  return __awaiter(void 0, void 0, void 0, function () {\n    var animationDataFetch;\n    return __generator(this, function (_a) {\n      switch (_a.label) {\n        case 0:\n          options = __assign({}, optionsParam);\n          return [4\n          /*yield*/\n          , fetchAnimationJSON()];\n\n        case 1:\n          animationDataFetch = _a.sent();\n\n          if (animationDataFetch) {\n            animationData = animationDataFetch;\n          }\n\n          prepareMainTimelines();\n          setupBreakpointHandler();\n          processTimelines();\n          requestAnimationFrame(loopUpdateAnimations);\n          return [2\n          /*return*/\n          ];\n      }\n    });\n  });\n};\n\nexports[\"default\"] = {\n  init: init,\n  play: play,\n  pause: pause,\n  getAnimationData: function getAnimationData() {\n    return animationData;\n  },\n  getOptions: function getOptions() {\n    return options;\n  },\n  setAnimationData: function setAnimationData(animationDataValue) {\n    animationData = animationDataValue;\n    animations = [];\n    processTimelines();\n  }\n};\n\n//# sourceURL=webpack:///../variojs/lib/index.js?");

/***/ }),

/***/ "../variojs/lib/styling-parsers.js":
/*!*****************************************!*\
  !*** ../variojs/lib/styling-parsers.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.domStylingParser = void 0;\n\nexports.domStylingParser = function (element) {\n  var transforms = [];\n\n  if (!element) {\n    return;\n  }\n\n  var stylingValues = element.stylingValues;\n\n  if (stylingValues.translateX || stylingValues.translateY) {\n    transforms.push(\"translate3d(\" + (stylingValues.translateX || 0) + \"px, \" + (stylingValues.translateY || 0) + \"px, 0)\");\n  }\n\n  if (stylingValues.scaleX || stylingValues.scaleY) {\n    transforms.push(\"scale3d(\" + (stylingValues.scaleX || 1) + \", \" + (stylingValues.scaleY || 1) + \", 1)\");\n  }\n\n  if (stylingValues.opacity) {\n    element.domElement.style.opacity = \"\" + stylingValues.opacity;\n  }\n\n  if (stylingValues.display) {\n    element.domElement.style.display = \"\" + stylingValues.display;\n  }\n\n  if (stylingValues.width) {\n    element.domElement.style.width = stylingValues.width + \"px\";\n  }\n\n  if (stylingValues.height) {\n    element.domElement.style.height = stylingValues.height + \"px\";\n  }\n\n  if (stylingValues.textAdd) {\n    element.domElement.innerHTML = \"\" + stylingValues.textAdd;\n  }\n\n  if (stylingValues.rotate) {\n    element.domElement.style.display = \"\" + stylingValues.display;\n    transforms.push(\"rotate(\" + (stylingValues.rotate || 0) + \"deg)\");\n  }\n\n  if (transforms.length > 0) {\n    element.domElement.style.transform = transforms.join(\" \");\n  }\n};\n\n//# sourceURL=webpack:///../variojs/lib/styling-parsers.js?");

/***/ }),

/***/ "../variojs/lib/types-interfaces.js":
/*!******************************************!*\
  !*** ../variojs/lib/types-interfaces.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.PropTypes = void 0;\nvar PropTypes;\n\n(function (PropTypes) {\n  PropTypes[\"posX\"] = \"posX\";\n  PropTypes[\"posY\"] = \"posY\";\n  PropTypes[\"width\"] = \"width\";\n  PropTypes[\"height\"] = \"height\";\n  PropTypes[\"scaleX\"] = \"scaleX\";\n  PropTypes[\"scaleY\"] = \"scaleY\";\n  PropTypes[\"opacity\"] = \"opacity\";\n  PropTypes[\"rotate\"] = \"rotate\";\n  PropTypes[\"display\"] = \"display\";\n  PropTypes[\"playVideo\"] = \"playVideo\";\n})(PropTypes = exports.PropTypes || (exports.PropTypes = {}));\n\n//# sourceURL=webpack:///../variojs/lib/types-interfaces.js?");

/***/ }),

/***/ "../variojs/lib/value-parsers.js":
/*!***************************************!*\
  !*** ../variojs/lib/value-parsers.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.parseNumberFrames = exports.parseStringFrames = void 0;\n\nvar types_interfaces_1 = __webpack_require__(/*! ./types-interfaces */ \"../variojs/lib/types-interfaces.js\");\n\nvar animationProps_1 = __webpack_require__(/*! ./helpers/animationProps */ \"../variojs/lib/helpers/animationProps.js\");\n\nvar easing_functions_1 = __webpack_require__(/*! ./easing-functions */ \"../variojs/lib/easing-functions.js\");\n\nexports.parseStringFrames = function (_a) {\n  var animation = _a.animation,\n      timeline = _a.timeline,\n      key = _a.key;\n  var closestsFrames = animationProps_1.getClosestFramesForTimeline(animation, timeline, key).closestsFrames;\n\n  if (!closestsFrames[0]) {\n    return;\n  }\n\n  return closestsFrames[0].value;\n};\n\nexports.parseNumberFrames = function (_a) {\n  var animation = _a.animation,\n      timeline = _a.timeline,\n      key = _a.key;\n\n  var _b = animationProps_1.getClosestFramesForTimeline(animation, timeline, key),\n      closestsFrames = _b.closestsFrames,\n      goal = _b.goal,\n      frameUnitId = _b.frameUnitId;\n\n  if (!closestsFrames[0]) {\n    return;\n  }\n\n  var startValue = closestsFrames[0].value;\n  var startFrame = closestsFrames[0][frameUnitId];\n  var endValue = closestsFrames[1].value;\n  var endFrame = closestsFrames[1][frameUnitId];\n\n  if (!startValue && startValue != 0 || !startFrame && startFrame != 0 || !endValue && endValue != 0 || !endFrame && endFrame != 0) {\n    return;\n  }\n\n  var easingFunction = closestsFrames[1].easing ? easing_functions_1.EasingFunctions[closestsFrames[1].easing] : easing_functions_1.EasingFunctions.linear;\n  var factor = easingFunction((goal - startFrame) / (endFrame - startFrame));\n  factor = Math.min(Math.max(factor, 0), 1);\n  var value = startValue + (endValue - startValue) * factor;\n  var devideBy = key === types_interfaces_1.PropTypes.scaleX || key === types_interfaces_1.PropTypes.scaleY || key === types_interfaces_1.PropTypes.opacity ? 100 : 1;\n  return \"\" + value / devideBy;\n};\n\nvar parserMap = {\n  translateX: exports.parseNumberFrames,\n  translateY: exports.parseNumberFrames,\n  width: exports.parseNumberFrames,\n  height: exports.parseNumberFrames,\n  scaleX: exports.parseNumberFrames,\n  scaleY: exports.parseNumberFrames,\n  rotate: exports.parseNumberFrames,\n  opacity: exports.parseNumberFrames,\n  display: exports.parseStringFrames\n};\nexports[\"default\"] = parserMap;\n\n//# sourceURL=webpack:///../variojs/lib/value-parsers.js?");

/***/ }),

/***/ "./node_modules/ws/browser.js":
/*!************************************!*\
  !*** ./node_modules/ws/browser.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function() {\n  throw new Error(\n    'ws does not work in the browser. Browser clients must use the native ' +\n      'WebSocket object'\n  );\n};\n\n\n//# sourceURL=webpack:///./node_modules/ws/browser.js?");

/***/ }),

/***/ "./src/lib.js":
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var variojs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! variojs */ \"../variojs/lib/index.js\");\n/* harmony import */ var variojs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(variojs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _socket_server_client_socket_connect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket-server/client/socket-connect.js */ \"./src/socket-server/client/socket-connect.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar WebSocket = __webpack_require__(/*! ws */ \"./node_modules/ws/browser.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init: function () {\n    var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(variojs) {\n      var ws;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return Object(_socket_server_client_socket_connect_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n            case 2:\n              ws = _context.sent;\n              window.addEventListener('scroll', function () {\n                ws.send(JSON.stringify({\n                  action: 'calculatePageScroll',\n                  payload: Object(variojs__WEBPACK_IMPORTED_MODULE_0__[\"calculatePageScroll\"])()\n                }));\n              });\n              ws.addEventListener('message', function (event) {\n                var data = event.data;\n                var dataParsed = JSON.parse(data);\n\n                if (dataParsed.action === 'getInitialData') {\n                  var domNodes = [].slice.call(document.querySelectorAll('[data-v]'));\n                  ws.send(JSON.stringify({\n                    action: 'initialData',\n                    payload: {\n                      animationData: variojs.getAnimationData(),\n                      placeholders: domNodes.reduce(function (result, domNode) {\n                        var name = domNode.getAttribute('data-v');\n\n                        if (name && name != \"\") {\n                          result.push(name);\n                        }\n\n                        return result;\n                      }, [])\n                    }\n                  }));\n                }\n              });\n              ws.addEventListener('message', function (event) {\n                var data = event.data;\n                var dataParsed = JSON.parse(data);\n\n                if (dataParsed.action === 'setAnimationData') {\n                  console.log(\"HERE\", dataParsed.payload);\n                  variojs.setAnimationData(dataParsed.payload);\n                }\n              });\n              ws.send(JSON.stringify({\n                action: 'pageReady',\n                payload: {}\n              }));\n\n            case 7:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    function init(_x) {\n      return _init.apply(this, arguments);\n    }\n\n    return init;\n  }()\n});\n\n//# sourceURL=webpack:///./src/lib.js?");

/***/ }),

/***/ "./src/socket-server/client/socket-connect.js":
/*!****************************************************!*\
  !*** ./src/socket-server/client/socket-connect.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar ws;\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n  return regeneratorRuntime.wrap(function _callee$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          if (!ws) {\n            _context.next = 2;\n            break;\n          }\n\n          return _context.abrupt(\"return\", ws);\n\n        case 2:\n          return _context.abrupt(\"return\", new Promise(function (resolve) {\n            ws = new WebSocket('ws://localhost:8081');\n            ws.addEventListener('open', function (event) {\n              resolve(ws);\n            });\n          }));\n\n        case 3:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  }, _callee);\n})));\n\n//# sourceURL=webpack:///./src/socket-server/client/socket-connect.js?");

/***/ })

/******/ });
});