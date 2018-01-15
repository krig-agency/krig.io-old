import goMovie from '../components/canvas-ball';
import menu from '../components/menu'; // eslint-disable-line
let scrollSnap = require('../components/scroll'); // eslint-disable-line

goMovie();

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
