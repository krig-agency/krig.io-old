import Background from './Background';
import $ from 'jquery';
import CookieConsent from './CookieConsent';
import 'jquery-scrollify';
import 'babel-polyfill';
import 'babel-core/register';
import FormValidation from './FormValidation';

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

  let formValidation = new FormValidation(
    document.querySelector('form.pitch-form__form'),
    {
      'input[name="Description"]': [ 'not-empty' ],
      'input[name="Budget"]': [ 'not-empty' ],
      'input[name="Email"]': [ 'not-empty', 'email' ]
    }
  );

  formValidation.on('change', (e) => {
    e.classList.remove('error');
  });

  formValidation.on('success', () => true);

  formValidation.on('failure', (validationErrors) => {
    validationErrors.forEach((error) => {
      error.element.classList.add('error');
    });
  });
});
