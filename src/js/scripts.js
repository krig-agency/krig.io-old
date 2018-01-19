import menu from '../components/menu'; // eslint-disable-line
import Background from './Background';
import $ from 'jquery';
require('jquery-scrollify');

document.addEventListener('DOMContentLoaded', function () {
  let bg = new Background(document.getElementById('nokey'));
  bg.startAnimation();
});

$(function () {
  $.scrollify({
    section: '.panel',
    setHeights: true
  });
});
