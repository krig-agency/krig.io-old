import Background from './Background';
import $ from 'jquery';
import 'jquery-scrollify';

$(function () {
  $.scrollify({
    section: '.panel',
    setHeights: true
  });

  let bg = new Background(document.querySelector('#nokey'));
  bg.startAnimation();

  let menu = document.querySelector('#work-panel');
  document.querySelector('#panel-toggle').addEventListener('click', () => {
    menu.classList.toggle('open');
  });
});
