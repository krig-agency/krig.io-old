import Background from './Background';
import $ from 'jquery';
import { CookieConsent } from 'cookie-sanction';
import scrollify from 'jquery-scrollify';
import FormValidation from './FormValidation';
import Texts from './texts';
import 'whatwg-fetch';

$(() => {
  scrollify({
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

  cookieConsent
    .active()
    .then(accepted => {
      if (accepted) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = './assets/js/postcookie.js';
        document.querySelector('body').appendChild(script);
      }
    })
    .catch(error => {
      if (window.console) {
        console.error(error);
      }
      document.querySelector('div.cookies').classList.add('hidden');
    });

  let formValidation = new FormValidation(
    document.querySelector('form.pitch-form__form'),
    {
      'textarea[name="Description"]': ['not-empty'],
      'input[name="Budget"]': ['not-empty'],
      'input[name="Email"]': ['not-empty', 'email']
    }
  );

  formValidation.on('change', e => {
    e.classList.remove('error');
  });

  formValidation.on('success', form => {
    const description = document.getElementsByName('Description')[0];
    const budget = document.getElementsByName('Budget')[0];
    const email = document.getElementsByName('Email')[0];
    const params = {
      to: 'webmaster@krig.io',
      body:
        'Beskrivning:\n' +
        description.value +
        '\n\nBudget:\n' +
        budget.value +
        '\n\nE-post:\n' +
        email.value,
      subject: 'Pitch'
    };

    fetch('https://mailer.krig.cloud/api/v1/KRIG/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: Object.keys(params)
        .map(key => {
          return (
            encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
          );
        })
        .join('&')
    })
      .then(res => {
        description.value = '';
        budget.value = '';
        email.value = '';
        menu.classList.toggle('open');
      })
      .catch(err => {
        if (window.console) {
          console.log(err);
        }
      });
  });

  formValidation.on('failure', validationErrors => {
    let button = document.querySelector('.btn--form');

    validationErrors.forEach(error => {
      error.element.classList.add('error');
    });

    button.classList.add('shake');

    setTimeout(() => {
      button.classList.remove('shake');
    }, 1000);
  });

  // Load texts.
  let container;
  for (let text in Texts) {
    text = Texts[text];

    container = document.querySelector(text.selector);
    container.querySelector('.headline').innerHTML = text.header;
    container.querySelector('p').innerHTML = text.text;
  }
});
