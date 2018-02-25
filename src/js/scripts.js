import Background from './Background';
import $ from 'jquery';
import CookieParser from './CookieParser';
import CookieConsent from './CookieConsent';
import 'jquery-scrollify';

$(function () {
  $.scrollify({
    section: '.panel',
    setHeights: true
  });

  let bg = new Background(document.querySelector('#nokey'));
  let consent = new CookieConsent();
  bg.startAnimation();

  let menu = document.querySelector('#work-panel');
  document.querySelector('#panel-toggle').addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Check if user have already accepted cookie.
  if (CookieParser.getValue('cookieaccept') !== null) {
    // Load scripts.
  } else {
    consent.show();
  }
});
