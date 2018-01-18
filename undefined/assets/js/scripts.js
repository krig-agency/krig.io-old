/*!
 * Krig.io
 * Krig.io webpage, using the fastshell boilerplate.
 * https://krig.io
 * @author Krig.io
 * @version 0.0.1
 * Copyright 2018. UNLICENSED licensed.
 */
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _canvasBall = __webpack_require__(1);

var _canvasBall2 = _interopRequireDefault(_canvasBall);

var _menu = __webpack_require__(2);

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line
var scrollSnap = __webpack_require__(3); // eslint-disable-line

(0, _canvasBall2.default)();

document.addEventListener('DOMContentLoaded', function () {
  scrollSnap.init({

    // NodeList of snap-elements (required)
    // scrollSnap always snaps to the nearest element
    elements: document.querySelectorAll('section'),

    // Integer - Set a minimum window-size (required)
    // scrollSnap will be deactivated when the window is smaller than the given dimensions
    minWidth: 600,
    minHeight: 400,

    // Boolean - Deactivate scrollSnap on mobile devices (optional)
    detectMobile: true,

    // Boolean - Keyboard-navigation (optional)
    keyboard: true,

    // Integer - Snap-animation-speed (optional)
    // Higher = slower
    duration: 20,

    // Function - Set a custom timing-function for the snap-animation (optional)
    timing: scrollSnap._timing

  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvas = document.getElementById('nokey'),
    can_w = parseInt(canvas.getAttribute('width')),
    can_h = parseInt(canvas.getAttribute('height')),
    ctx = canvas.getContext('2d');

// console.log(typeof can_w);

var ball = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  r: 0,
  alpha: 1,
  phase: 0
},
    ball_color = {
  r: 230,
  g: 230,
  b: 230
},
    R = 2,
    balls = [],
    alpha_f = 0.03,
    alpha_phase = 0,


// Line
link_line_width = 0.8,
    dis_limit = 260,
    add_mouse_point = true,
    mouse_in = false,
    mouse_ball = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  r: 0,
  type: 'mouse'
};

// Random speed
function getRandomSpeed(pos) {
  var min = -1,
      max = 1;
  switch (pos) {
    case 'top':
      return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
      break;
    case 'right':
      return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
      break;
    case 'bottom':
      return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
      break;
    case 'left':
      return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
      break;
    default:
      return;
      break;
  }
}
function randomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min, max) {
  return Math.random() * (max - min) + min;
}
console.log(randomNumFrom(0, 10));
// Random Ball
function getRandomBall() {
  var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
  switch (pos) {
    case 'top':
      return {
        x: randomSidePos(can_w),
        y: -R,
        vx: getRandomSpeed('top')[0],
        vy: getRandomSpeed('top')[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10)
      };
      break;
    case 'right':
      return {
        x: can_w + R,
        y: randomSidePos(can_h),
        vx: getRandomSpeed('right')[0],
        vy: getRandomSpeed('right')[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10)
      };
      break;
    case 'bottom':
      return {
        x: randomSidePos(can_w),
        y: can_h + R,
        vx: getRandomSpeed('bottom')[0],
        vy: getRandomSpeed('bottom')[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10)
      };
      break;
    case 'left':
      return {
        x: -R,
        y: randomSidePos(can_h),
        vx: getRandomSpeed('left')[0],
        vy: getRandomSpeed('left')[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10)
      };
      break;
  }
}
function randomSidePos(length) {
  return Math.ceil(Math.random() * length);
}

// Draw Ball
function renderBalls() {
  Array.prototype.forEach.call(balls, function (b) {
    if (!b.hasOwnProperty('type')) {
      ctx.fillStyle = 'rgba(' + ball_color.r + ',' + ball_color.g + ',' + ball_color.b + ',' + b.alpha + ')';
      ctx.beginPath();
      ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }
  });
}

// Update balls
function updateBalls() {
  var new_balls = [];
  Array.prototype.forEach.call(balls, function (b) {
    b.x += b.vx;
    b.y += b.vy;

    if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50) {
      new_balls.push(b);
    }

    // alpha change
    b.phase += alpha_f;
    b.alpha = Math.abs(Math.cos(b.phase));
    // console.log(b.alpha);
  });

  balls = new_balls.slice(0);
}

// loop alpha
function loopAlphaInf() {}

// Draw lines
function renderLines() {
  var fraction, alpha;
  for (var i = 0; i < balls.length; i++) {
    for (var j = i + 1; j < balls.length; j++) {

      fraction = getDisOf(balls[i], balls[j]) / dis_limit;

      if (fraction < 1) {
        alpha = (1 - fraction).toString();

        ctx.strokeStyle = 'rgba(150,150,150,' + alpha + ')';
        ctx.lineWidth = link_line_width;

        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(balls[j].x, balls[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

// calculate distance between two points
function getDisOf(b1, b2) {
  var delta_x = Math.abs(b1.x - b2.x),
      delta_y = Math.abs(b1.y - b2.y);

  return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

// add balls if there a little balls
function addBallIfy() {
  if (balls.length < 20) {
    balls.push(getRandomBall());
  }
}

// Render
function render() {
  ctx.clearRect(0, 0, can_w, can_h);

  renderBalls();

  renderLines();

  updateBalls();

  addBallIfy();

  window.requestAnimationFrame(render);
}

// Init Balls
function initBalls(num) {
  for (var i = 1; i <= num; i++) {
    balls.push({
      x: randomSidePos(can_w),
      y: randomSidePos(can_h),
      vx: getRandomSpeed('top')[0],
      vy: getRandomSpeed('top')[1],
      r: R,
      alpha: 1,
      phase: randomNumFrom(0, 10)
    });
  }
}
// Init Canvas
function initCanvas() {
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);

  can_w = parseInt(canvas.getAttribute('width'));
  can_h = parseInt(canvas.getAttribute('height'));
}
window.addEventListener('resize', function (e) {
  console.log('Window Resize...');
  initCanvas();
});

function goMovie() {
  initCanvas();
  initBalls(20);
  window.requestAnimationFrame(render);
}
exports.default = goMovie;

// Mouse effect

canvas.addEventListener('mouseenter', function () {
  console.log('mouseenter');
  mouse_in = true;
  balls.push(mouse_ball);
});
canvas.addEventListener('mouseleave', function () {
  console.log('mouseleave');
  mouse_in = false;
  var new_balls = [];
  Array.prototype.forEach.call(balls, function (b) {
    if (!b.hasOwnProperty('type')) {
      new_balls.push(b);
    }
  });
  balls = new_balls.slice(0);
});
canvas.addEventListener('mousemove', function (e) {
  var e = e || window.event;
  mouse_ball.x = e.pageX;
  mouse_ball.y = e.pageY;
  // console.log(mouse_ball);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//@razitazi src: http://codepen.io/razitazi/pen/WbZaOq */

//Exelent little functions to use any time when class modification is needed
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

//Add event from js the keep the markup clean
function init() {
    document.getElementById("panel-toggle").addEventListener("click", toggleMenu);
}

//The actual fuction
function toggleMenu() {
    var ele = document.getElementById("work-panel");
    if (!hasClass(ele, "open")) {
        addClass(ele, "open");
    } else {
        removeClass(ele, "open");
    }
}

//Prevent the function to run before the document is loaded
document.addEventListener('readystatechange', function () {
    if (document.readyState === "complete") {
        init();
    }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var on = null;
var animating = false;

var scrollTimer = null;
var resizeTimer = null;

var computedOpts = null;
var computedWindow = null;
var computedElements = null;

var init = exports.init = function init() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	// Check if opts includes all required properties
	if (valid(opts) === false) return false;

	// Disable on mobile devices
	if (opts.detectMobile === true && isMobile() === true) return false;

	// Save computed options
	computedOpts = opts;

	// Listen to window-size changes
	window.addEventListener('resize', onResize);

	// Start the internal init function
	return _init(computedOpts);
};

var _init = function _init(opts) {

	// Get size of window
	computedWindow = getWindowMetrics();

	// Reset computed elements
	computedElements = [];

	// Update the metrics of each element
	for (var i = 0; i < opts.elements.length; ++i) {

		var element = opts.elements[i];
		var elementMetrics = getElementMetrics(element, computedWindow, i);

		// Save metrics of element
		computedElements.push(elementMetrics);
	}

	var isBig = computedWindow.width >= opts.minWidth && computedWindow.height >= opts.minHeight;
	var isSmall = computedWindow.width < opts.minWidth || computedWindow.height < opts.minHeight;

	if (isBig === true && (on === false || on === null)) return start(opts);else if (isSmall === true && (on === true || on === null)) return stop(opts);
};

var isMobile = function isMobile() {

	return (/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || window.opera)
	);
};

var timing = function timing(t, b, c, d) {

	// t = Current frame
	// b = Start-value
	// c = End-value
	// d = Duration

	t /= d;
	return -c * t * (t - 2) + b;
};

var normalizePosition = function normalizePosition(newPos, maxPos) {

	if (newPos < 0) newPos = 0;
	if (newPos > maxPos - 1) newPos = maxPos - 1;

	return newPos;
};

var valid = function valid() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	// Check required properties

	if (opts.elements == null) {
		console.error('Elements missing: opts.elements');
		return false;
	}

	if (opts.minWidth == null || opts.minWidth < 0) {
		console.error('Property missing or not a number: opts.minWidth');
		return false;
	}

	if (opts.minHeight == null || opts.minHeight < 0) {
		console.error('Property missing or not a number: opts.minHeight');
		return false;
	}

	// Set optional properties

	if (opts.detectMobile !== false) opts.detectMobile = true;
	if (opts.duration == null || opts.duration < 0) opts.duration = 20;
	if (opts.timing == null) opts.timing = timing;
	if (opts.keyboard !== false) opts.keyboard = true;

	return true;
};

var getWindowMetrics = function getWindowMetrics() {

	var boundingClientRect = document.body.getBoundingClientRect();
	var windowSize = { width: window.innerWidth, height: window.innerHeight };

	return {
		top: boundingClientRect.top * -1,
		maxTop: boundingClientRect.height - windowSize.height,
		bottom: boundingClientRect.top * -1 + windowSize.height,
		width: windowSize.width,
		height: windowSize.height
	};
};

var getElementMetrics = function getElementMetrics(elem, windowMetrics, index) {

	if (elem == null) return false;

	var obj = {
		index: index,
		active: false,
		top: elem.offsetTop,
		bottom: elem.offsetTop + elem.offsetHeight,
		height: elem.offsetHeight,
		dom: elem
	};

	obj.visiblePercentage = getElementVisiblePercentage(obj, windowMetrics).vP;

	return obj;
};

var getElementVisiblePercentage = function getElementVisiblePercentage(elementMetrics, windowMetrics) {

	var sP = 0;
	var eP = 0;
	var vH = 0;
	var vP = 0;

	// Calculate start-point (sP)
	sP = windowMetrics.top > elementMetrics.top ? windowMetrics.top : elementMetrics.top;

	// Calculate end-point (eP)
	eP = windowMetrics.bottom > elementMetrics.bottom ? elementMetrics.bottom : windowMetrics.bottom;

	// Calculate visible height in pixels (vH)
	vH = eP - sP;

	// Convert vH from pixels to a percentage value
	// 100 = element completely visible
	// 0 = element not visible at all
	vP = 100 / elementMetrics.height * vH;

	// Normalize output
	if (vH < 0) vH = 0;
	if (vP < 0) vP = 0;

	// Return the visible height in percent
	return { vH: vH, vP: vP };
};

var setElementVisible = function setElementVisible(elementMetrics, windowMetrics) {

	var elem = elementMetrics.dom;

	// Remove all active-states
	for (var i = 0; i < computedElements.length; ++i) {

		var _elementMetrics = computedElements[i];

		_elementMetrics.dom.classList.remove('active');
		_elementMetrics.active = false;
	}

	// Add active-state to the element
	elem.classList.add('active');
	elementMetrics.active = true;

	var currentFrame = 0;
	var startScrollTop = -document.body.getBoundingClientRect().top;
	var difference = startScrollTop - elementMetrics.top;
	var duration = computedOpts.duration;
	var timing = computedOpts.timing;

	function animation() {

		var newScrollTop = startScrollTop - timing(currentFrame, 0, difference, duration);

		// Scroll to element
		document.body.scrollTop = newScrollTop; // Safari, Chrome
		document.documentElement.scrollTop = newScrollTop; // Firefox

		// Stop the animation when ...
		// ... all frames have been shown
		// ... scrollTop reached its maximum after the first frame
		if (currentFrame >= duration || document.body.scrollTop === windowMetrics.maxTop && currentFrame !== 0) {

			// Animation finished
			animating = false;
		} else {

			// Continue with next frame
			currentFrame++;

			// Continue animation
			requestAnimationFrame(animation);
		}
	}

	// Start the animation
	animation();

	return true;
};

var start = function start(opts) {

	on = true;

	window.addEventListener('wheel', onScroll);
	if (opts.keyboard === true) document.body.addEventListener('keydown', onKeydown);

	for (var i = 0; i < computedElements.length; ++i) {
		computedElements[i].dom.classList.remove('active');
	}

	return scrollToNearest();
};

var stop = function stop(opts) {

	on = false;

	window.removeEventListener('wheel', onScroll);
	if (opts.keyboard === true) document.body.removeEventListener('keydown', onKeydown);

	for (var i = 0; i < computedElements.length; ++i) {
		computedElements[i].dom.classList.add('active');
	}

	return true;
};

var onKeydown = function onKeydown(e) {

	var key = e.keyCode;
	var newPos = 0;

	if (key !== 38 && key !== 40) return true;
	if (animating === true) return false;

	animating = true;

	// Get current position
	for (var i = 0; i < computedElements.length; ++i) {
		if (computedElements[i].active === true) newPos = i;
	}

	// 38 = Up
	// 40 = Down
	if (key === 38) newPos += -1;else if (key === 40) newPos += 1;

	// Check if next element exists
	newPos = normalizePosition(newPos, computedElements.length);

	// Show the new element
	setElementVisible(computedElements[newPos], computedWindow);

	e.preventDefault();
	return false;
};

var onResize = function onResize() {

	// Reset timeout
	clearTimeout(resizeTimer);

	// Set new timeout
	resizeTimer = setTimeout(function () {
		return init(computedOpts);
	}, 200);

	return true;
};

var onScroll = function onScroll(e) {

	if (animating === true) return false;

	// Reset timeout
	clearTimeout(scrollTimer);

	// Set new timeout
	scrollTimer = setTimeout(function () {
		return scrollTo(e);
	}, 200);

	return true;
};

var scrollTo = function scrollTo(e) {

	animating = true;

	var direction = 0;
	var topElement = {};
	var nextElementNum = null;
	var nextElement = {};
	var gravitation = 9.807;

	// Get the direction from the event
	if (e.type === 'wheel') direction = e.deltaY;

	// Normalize direction
	if (direction > 0) direction = 1;else direction = -1;

	// Update window metrics
	computedWindow = getWindowMetrics();

	// Reset computed elements
	computedElements = [];

	// Update the metrics of each element
	for (var i = 0; i < computedOpts.elements.length; ++i) {

		var element = computedOpts.elements[i];
		var elementMetrics = getElementMetrics(element, computedWindow, i);

		// Save metrics of element
		computedElements.push(elementMetrics);

		// Get the element which is most visible and save it
		if (topElement.visiblePercentage == null || elementMetrics.visiblePercentage > topElement.visiblePercentage) topElement = elementMetrics;
	}

	// Use the velocity to calculate the next element
	nextElementNum = topElement.index + direction;

	// Check if next element exists
	nextElementNum = normalizePosition(nextElementNum, computedElements.length);

	// Add velocity to next element
	computedElements[nextElementNum].visiblePercentage *= gravitation;

	// Re-check if there is a new most visible element
	for (var _i = 0; _i < computedElements.length; ++_i) {

		var _elementMetrics2 = computedElements[_i];

		if (_elementMetrics2.visiblePercentage > topElement.visiblePercentage) topElement = _elementMetrics2;
	}

	return setElementVisible(topElement, computedWindow);
};

var scrollToNearest = function scrollToNearest() {

	animating = true;

	var nextElementMetrics = null;

	for (var i = 0; i < computedOpts.elements.length; ++i) {

		var elementMetrics = computedElements[i];

		if (computedWindow.top >= elementMetrics.top) nextElementMetrics = elementMetrics;
	}

	return setElementVisible(nextElementMetrics, computedWindow);
};

/***/ })
/******/ ]);