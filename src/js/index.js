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
});

console.log(atob("ICAgICAgICAgICAgICAgICAgICAgICBfXwogICAgICAgIC9cICAgICAgICAgICAgfCAgfCAgICAgICAgICAgfCAgfCAgICAgfCB8ICAgICAgICAgICAgICAgICAgICAgIHwKICAgICAgIC8gIFwgICAgICAgICAgIHwgIHwgICAgICAgICAgIHxfX3wgIF8gIHwgfCAgICogIF8gICAgLF8gIF8gICBfICB8CiAgICAgIC8gICAgXCAgICAgICAgICB8ICB8ICAgICAgICAgICB8ICB8IC9fXCB8IHwgICB8IC9fYCAgIHwgIC9fXCAvIHwgfAogICAgIC8gICAgICBcICAgICAgICAgfCAgfCAgICAgICAgICAgfCAgfCBcXyAgXCBcICAgfCAuXy8gICB8ICBcXyAgXF98IFwgIwogICAgLyAgICAgICAgXCAgICAgICAgfCAgfCAgICAgCiAgIHwgIC98ICB8XCAgfCAgICAgICB8ICB8ICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwKICAgfCAvIHwgIHwgXCB8ICAgICAgIHwgIHwgICAgICAgICAgIHxfX3wgIF8gICBfICAgICAgICBfICAsXyAgICAqICBfICAgICxfICBfICAgXyAgfAogICB8LyAgfCAgfCAgXHwgICAgICAgfCAgfCAgICAgICAgICAgfCAgfCAvX1wgLyB8IFwgIC8gL19cIHwgfCAgIHwgL19gICAgfCAgL19cIC8gfCB8CiAgICAgICB8ICB8ICAgICAgICAgICB8ICB8ICAgICAgICAgICB8ICB8IFxfICBcX3wgIFwvICBcXyAgfCB8ICAgfCAuXy8gICB8ICBcXyAgXF98IFwgIwogICAgICAgfCAgfCAgICAgICAgICAgfCAgfCAgICAgICAgICAgX19fXwogICAgICAgfCAgfCAgICAgICB8XCAgfCAgfCAgL3wgICAgICAgIHx8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgIHwKICAgICAgIHwgIHwgICAgICAgfCBcIHwgIHwgLyB8ICAgICAgICB8fCAgKiAsXyBfICAgXyAgICAqICBfICAgICBfICB8XyAgIF8gICxfIF98XwogICAgICAgfCAgfCAgICAgICB8ICBcfCAgfC8gIHwgICAgICAgIHx8ICB8IHwgfCB8IC9fXCAgIHwgL19gICAgL19gIHwgfCAvIFwgfCAgIHwKICAgICAgIHwgIHwgICAgICAgXCAgICAgICAgICAvICAgICAgICB8fCAgfCB8IHwgfCBcXyAgICB8IC5fLyAgIC5fLyB8IHwgXF8vIHwgICBcICMKICAgICAgIHwgIHwgICAgICAgIFwgICAgICAgIC8gICAgICAgICBfXwogICAgICAgfCAgfCAgICAgICAgIFwgICAgICAvICAgICAgICAgLyAgIHwKICAgICAgIHwgIHwgICAgICAgICAgXCAgICAvICAgICAgICAgIHwgICB8XyAgIF8gICBfICAgXyAgIF8KICAgICAgIHwgIHwgICAgICAgICAgIFwgIC8gICAgICAgICAgIHwgICB8IHwgLyBcIC8gXCAvX2AgL19cCiAgICAgICB8X198ICAgICAgICAgICAgXC8gICAgICAgICAgICBcX18gfCB8IFxfLyBcXy8gLl8vIFxfICAj"))
