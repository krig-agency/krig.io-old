export default class Rect {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor (x, y, width, height) {
    // TopLeft is actual coordinates of the top-left position.
    // BotRight is the actual coordinates to the bottom-right position.
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get X () {
    return this.x;
  }

  get Y () {
    return this.y;
  }

  get Width () {
    return this.width;
  }

  get Height () {
    return this.height;
  }

  set X (val) {
    this.x = val;
  }

  set Y (val) {
    this.y = val;
  }

  set Width (val) {
    this.width = val;
  }

  set Height (val) {
    this.height = val;
  }

  /**
   * Test if a given point is inside the rect.
   * @param {Point} p
   * @param {number} pad
   * @return boolean
   */
  inside (p, pad) {
    return (p.X > this.x - pad && p.X < this.x + this.width + pad && p.Y > this.y - pad && p.Y < this.y + this.height + pad);
  }
}
