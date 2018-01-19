import menu from '../components/menu'; // eslint-disable-line
import Background from './Background';
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', function () {
  let bg = new Background(document.getElementById('nokey'));
  bg.startAnimation();
});
