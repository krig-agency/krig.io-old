import Background from './Background';
import $ from 'jquery';
import CookieConsent from './CookieConsent';
import 'jquery-scrollify';
import 'babel-polyfill';
import 'babel-core/register';

$(function () {
  $.scrollify({
    section: '.panel',
    setHeights: true
  });

  let bg = new Background(document.querySelector('#nokey'));
  bg.startAnimation();

  let menu = document.querySelector('#work-panel');
  document.querySelector('#panel-toggle').addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  (new CookieConsent()).show().then(() => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = './assets/js/postcookie.js';
    document.querySelector('body').appendChild(script);
  });
});
