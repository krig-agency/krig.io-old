import CookieParser from './CookieParser';

/**
 * Class to handle the cookie consent message.
 */
export default class CookieConsent {
  constructor () {
    this.element = document.querySelector('div.cookies');
  }

  /**
   * Show the cookie consent dialog.
   */
  async show () {
    return new Promise((resolve) => {
      if (CookieParser.getValue('accept-cookies')) {
        resolve();
      } else {
        this.element.classList.remove('hidden');
        this.element.addEventListener('click', () => {
          this.element.classList.add('hidden');
          document.cookie = 'accept-cookies=true';
          resolve();
        });
      }
    });
  }
}
