/**
 * Class used to parse cookies from the local page.
 * Uses document.cookie to fetch cookies.
 */
export default class CookieParser {
  /**
   * Get value from a cookie.
   * @param {string} name
   * @return {null|string|bool|number}
   */
  static getValue (name) {
    let parsed = CookieParser.parseCookies();
    if (parsed[name] !== undefined) {
      return parsed[name];
    }
    return null;
  }

  /**
   * Parses the pages cookies.
   * @return {{string: name, mixed: value}}
   */
  static parseCookies () {
    let cookies = document.cookie.split(';');
    let fixed = {};
    let spl = [];

    for (let i = 0; i < cookies.length; i++) {
      spl = cookies[i].trim().split('=');
      fixed[spl[0]] = spl[1];
    }

    return fixed;
  }
}
