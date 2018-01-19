export default class Point {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  set X (val) {
    this.x = val;
  }

  set Y (val) {
    this.y = val;
  }

  get X () {
    return this.x;
  }

  get Y () {
    return this.y;
  }
}
