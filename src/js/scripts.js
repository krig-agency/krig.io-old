import menu from '../components/menu'; // eslint-disable-line
import Background from './Background';

document.addEventListener('DOMContentLoaded', function () {
  let bg = new Background(document.getElementById('nokey'));
  bg.startAnimation();
});
