import modernizer from '../components/modernizr'; // eslint-disable-line
import anime from '../components/anime.min.js'; // eslint-disable-line

import jQuery from 'jquery';

(function ($) {
  'use strict';
  var bouncingBall = anime({
    targets: '.work-panel__bar',
    translateY: '50vh',
    duration: 300,
    loop: true,
    direction: 'alternate',
    easing: 'easeInCubic',
    scaleX: {
      value: 1.05,
      duration: 150,
      delay: 268
    }
  });
});
(jQuery);
