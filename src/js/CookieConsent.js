/**
 * Class to handle the cookie consent message.
 */
export default class CookieConsent {
  constructor () {
    this.element = document.querySelector('div.cookies');
    this.element.addEventListener('click', this.acceptCookies.bind(this));
  }

  /**
   * Show the cookie consent dialog.
   */
  show () {
    this.element.classList.remove('hidden');
  }

  /**
   * Sets a cookie consent cookie and hides the cookie consent dialog.
   */
  acceptCookies () {
    document.cookie = 'cookieaccept=true';
    this.element.classList.add('hidden');
  }
}
