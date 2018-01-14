// import modernizer from '../components/modernizr'; // eslint-disable-line
// import anime from '../components/anime.js'; // eslint-disable-line
import menu from '../components/menu.js'; // eslint-disable-line
import scrollSnap from '../components/scroll.js'; // eslint-disable-line

import jQuery from 'jquery';

// (function ($) {
//   'use strict';
//   var bouncingBall = anime({
//     targets: '.work-panel__bar',
//     translateY: '50vh',
//     duration: 300,
//     loop: true,
//     direction: 'alternate',
//     easing: 'easeInCubic',
//     scaleX: {
//       value: 1.05,
//       duration: 150,
//       delay: 268
//     }
//   });
// });
// (jQuery);

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
