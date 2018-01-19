export default class Color {
  constructor (r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  get Red () {
    return this.r;
  }

  get Green () {
    return this.g;
  }

  get Blue () {
    return this.b;
  }

  get Alpha () {
    return this.a;
  }

  set Red (val) {
    this.r = val;
  }

  set Green (val) {
    this.g = val;
  }

  set Blue (val) {
    this.b = val;
  }

  set Alpha (val) {
    this.a = val;
  }
}
