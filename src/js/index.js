import { $, $$ } from "@js/modules/utils.js";

import '@css/index.scss';

function closeMenu() {
  document.body.classList.remove('overflow-disabled');
  $('#main-nav').classList.remove('menu-open');
  $('#toggle-main-nav').classList.remove('menu-open');
  $('#toggle-main-nav').setAttribute('title', 'Open navigation');
  $('#toggle-main-nav').setAttribute('aria-label', 'Open navigation');
}

function openMenu() {
  document.body.classList.add('overflow-disabled');
  $('#main-nav').classList.add('menu-open');
  $('#toggle-main-nav').classList.add('menu-open');
  $('#toggle-main-nav').setAttribute('title', 'Close navigation');
  $('#toggle-main-nav').setAttribute('aria-label', 'Close navigation');
}

$('#toggle-main-nav').addEventListener('click', (e) => {
  e.preventDefault();

  if ($('#main-nav').classList.contains('menu-open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

$('#main-nav').addEventListener('click', function(e) {
  if ($('#main-nav').classList.contains('menu-open') && e.target === this) {
    closeMenu();
  }
})
