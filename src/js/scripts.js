import menu from '../components/menu'; // eslint-disable-line
import Background from './Background';

//import c from '../components/canvas-ball';

//c();

document.addEventListener('DOMContentLoaded', function () {
  let bg = new Background(document.getElementById('nokey'));
  bg.startAnimation();
});
