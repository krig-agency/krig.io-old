import menu from '../components/menu'; // eslint-disable-line
import Background from './Background';
import $ from 'jquery';
require('jquery-scrollify');

$(function () {
  $.scrollify({
    section: '.panel',
    setHeights: true
  });

  let bg = new Background(document.getElementById('nokey'));
  bg.startAnimation();
});
