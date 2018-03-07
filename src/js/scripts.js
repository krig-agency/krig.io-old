import Background from './Background';
import $ from 'jquery';
import { CookieConsent } from 'cookie-sanction';
import 'jquery-scrollify';
import 'babel-polyfill';
import 'babel-core/register';
import FormValidation from './FormValidation';
import Texts from './texts';

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

  const cookieConsent = new CookieConsent({
    element: 'div.cookies',
    cookie: 'accept-cookies',
    cookieValue: 'true',
    acceptButton: '.cookies__accept'
  });

  cookieConsent.active().then((accepted) => {
    if (accepted) {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = './assets/js/postcookie.js';
      document.querySelector('body').appendChild(script);
    }
  }).catch((error) => {
    console.error(error);
    document.querySelector('div.cookies').classList.add('hidden');
  });

  let formValidation = new FormValidation(
    document.querySelector('form.pitch-form__form'),
    {
      'textarea[name="Description"]': [ 'not-empty' ],
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

  // Load texts.
  let container;
  for (let text in Texts) {
    text = Texts[text];

    container = document.querySelector(text.selector);
    container.querySelector('.headline').innerHTML = text.header;
    container.querySelector('.intro-text').innerHTML = text.text;
  }
});
