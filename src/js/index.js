import { $, $$ } from "@js/modules/utils.js";
import { RecentEventViewer } from "@js/modules/events.js";
import Tabber from "@js/modules/tabber.js";

import '@css/index.scss';

function closeMenu(btn, target) {
  const oldAltTitle = btn.title;

  document.body.classList.remove('menu-open--' + btn.getAttribute('aria-controls'));

  if (document.body.className.indexOf('menu-open--') == -1) {
    // this is the only menu that was open
    document.body.classList.remove('menu-open');
  }

  target.classList.remove('menu-open');

  btn.classList.remove('menu-open');
  btn.setAttribute('title', btn.dataset.altTitle);
  btn.setAttribute('aria-label', btn.dataset.altTitle);
  btn.dataset.altTitle = oldAltTitle;
}

function openMenu(btn, target) {
  const oldAltTitle = btn.title;

  document.body.classList.add('menu-open', 'menu-open--' + btn.getAttribute('aria-controls'));
  target.classList.add('menu-open');

  btn.classList.add('menu-open');
  btn.setAttribute('title', btn.dataset.altTitle);
  btn.setAttribute('aria-label', btn.dataset.altTitle);
  btn.dataset.altTitle = oldAltTitle;
}

$('#change-lang').addEventListener('click', function() {
  if (this.classList.contains('menu-open')) {
    closeMenu(this, $('#change-lang-menu'));
  } else {
    openMenu(this, $('#change-lang-menu'));
  }
});

$('#close-change-lang-menu').addEventListener('click', (e) => {
  e.preventDefault();
  closeMenu($('#change-lang'), $('#change-lang-menu'));
  $('#change-lang').focus();
});

$('#close-change-lang-menu').addEventListener('blur', () => {
  if (document.body.classList.contains('menu-open')) {
    $('#change-lang-menu a').focus();
  }
});

$('#change-lang-menu').addEventListener('click', function(e) {
  if (this.classList.contains('menu-open') && e.target.classList.contains('Menu_background')) {
    closeMenu($('#change-lang'), this);
  }
});

$('#toggle-main-nav').addEventListener('click', function() {
  if (this.classList.contains('menu-open')) {
    closeMenu(this, $('#main-nav'));
  } else {
    openMenu(this, $('#main-nav'));
  }
});

$('#close-main-nav').addEventListener('click', (e) => {
  e.preventDefault();
  closeMenu($('#toggle-main-nav'), $('#main-nav'));
  $('#toggle-main-nav').focus();
});

$('#close-main-nav').addEventListener('blur', () => {
  if (document.body.classList.contains('menu-open')) {
    $('#main-nav a').focus();
  }
});

$('#main-nav').addEventListener('click', function(e) {
  if (this.classList.contains('menu-open') && e.target.classList.contains('Menu_background')) {
    closeMenu($('#toggle-main-nav'), $('#main-nav'));
  }
});

for (const tabber of $$('.tabber')) {
  new Tabber(tabber);
}

if (window.events && window.eventsURLs) {
  const viewer = new RecentEventViewer(window.events);
  const events = viewer.getRecentEvents();

  if ($('#home-events-toast')) {
    const toast = $('#home-events-toast');

    if (events.ongoing.length) {
      if (events.ongoing.length > 1) {
        toast.classList.add('animated');
      }
      $(toast, '.container').insertAdjacentHTML('beforeend',
        `<strong><span class="live"></span> Ongoing:</strong>
<ul id="home-events-toast-marquee">
  ${events.ongoing.map((e, i) => `<li style="-webkit-animation-duration:${6*events.ongoing.length}s;animation-duration:${6*events.ongoing.length}s;-webkit-animation-delay:${6*i}s;animation-delay:${6*i}s;">
    <a href="${window.eventsURLs[e.id]}"><em>${e.title}</em> <span class="slash-sep">//</span> ${e.location || e.locations.join(', ')} <span class="slash-sep">//</span> ${e.time}</a>
  </li>`).reverse().join('')}
</ul>`);
    } else if (events.upcoming.length) {
      if (events.upcoming.length > 1) {
        toast.classList.add('animated');
      }
      $(toast, '.container').insertAdjacentHTML('beforeend',
        `<strong>Next Event:</strong>
<ul id="home-events-toast-marquee">
  ${events.upcoming.map((e, i) => `<li style="-webkit-animation-duration:${6*events.upcoming.length}s;animation-duration:${6*events.upcoming.length}s;-webkit-animation-delay:${6*i}s;animation-delay:${6*i}s;">
    <a href="${window.eventsURLs[e.id]}"><em>${e.title}</em> <span class="slash-sep">//</span> ${e.formattedShortDate} ${e.time} <span class="slash-sep">//</span> ${e.location || e.locations.join(', ')}</a>
  </li>`).reverse().join('')}
</ul>`)
    } else {
      toast.classList.add('text-center');
      $(toast, '.container').innerHTML = '<em><strong>What kind of King is this?</strong> Stay tuned for Jesus Week Fall 2019.</em>';
    }

    toast.insertAdjacentHTML('beforeend', `<style>@-webkit-keyframes home-events-marquee {
  from {
    opacity: 0;
    pointer-events: none;
    -webkit-transform: translateY(20%);
  }
  ${30/(6*(events.ongoing.length || events.upcoming.length || 1))}%, ${570/(6*(events.ongoing.length || events.upcoming.length || 1))}% {
    opacity: 1;
    pointer-events: none;
    -webkit-transform: translateY(0);
  }
  ${33/(6*(events.ongoing.length || events.upcoming.length || 1))}%, ${567/(6*(events.ongoing.length || events.upcoming.length || 1))}% {
    pointer-events: all;
  }
  ${600/(6*(events.ongoing.length || events.upcoming.length || 1))}% {
    opacity: 0;
    pointer-events: none;
    -webkit-transform: translateY(-20%);
  }
  to {
    pointer-events: none;
  }
}
@keyframes home-events-marquee {
  from {
    opacity: 0;
    pointer-events: none;
    transform: translateY(20%);
  }
  ${30/(6*(events.ongoing.length || events.upcoming.length || 1))}%, ${570/(6*(events.ongoing.length || events.upcoming.length || 1))}% {
    opacity: 1;
    pointer-events: none;
    transform: translateY(0);
  }
  ${33/(6*(events.ongoing.length || events.upcoming.length || 1))}%, ${567/(6*(events.ongoing.length || events.upcoming.length || 1))}% {
    pointer-events: all;
  }
  ${600/(6*(events.ongoing.length || events.upcoming.length || 1))}% {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-20%);
  }
  to {
    pointer-events: none;
  }
}</style>`)
  }

  if ($('.layout-home #events')) {
    const container = $('.layout-home #events .events-container');

    if (events.ongoing.length) {
      $(container, '.ongoing-events').insertAdjacentHTML('beforeend', `${events.ongoing.map((e, i) => `<div>
  <p><strong><a href="${window.eventsURLs[e.id]}">${e.title}</a></strong></p>
  <p class="font-24">${e.time} <span class="slash-sep">//</span> ${e.location || e.locations.join(', ')}</p>
</div>`).join('')}`)
    } else {
      $(container, '.ongoing-events').insertAdjacentHTML('beforeend', '<em>No ongoing events.</em>');
    }

    if (events.upcoming.length) {
      $(container, '.upcoming-events').insertAdjacentHTML('beforeend', `${events.upcoming.map((e, i) => `<div>
  <p><strong><a href="${window.eventsURLs[e.id]}">${e.title}</a></strong></p>
  <p class="font-24">${e.formattedShortDate} ${e.time} <span class="slash-sep">//</span> ${e.location || e.locations.join(', ')}</p>
</div>`).join('')}`)
    } else {
      $(container, '.upcoming-events').insertAdjacentHTML('beforeend', '<em>No upcoming events.</em>');
    }
  }
}

if (document.documentElement.classList.contains('layout-theme')) {
  const questions = $$('.ThemeTitle_titleQuestion').slice(0, 4);
  const bgContainer = $('.ThemeBackground');
  const mainContent = $('#doc-main-content');
  // WeakMap because we're mapping literal elements to keys --- we want weak references!
  let prevRatios = new WeakMap($$('.ThemeSection, #doc-title').map(k => [ k, 0 ]));

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const ratio = entry.intersectionRect.height / window.innerHeight;
      if (ratio >= .4 && ratio > prevRatios.get(entry.target)) {
        // entering entry
        bgContainer.dataset.target = entry.target.id;
        mainContent.dataset.target = entry.target.id;
      }

      prevRatios.set(entry.target, ratio);
    }
  }, { threshold: Array.from(new Array(11), (_, i) => .1 * i) });

  for (const section of $$('.ThemeSection')) {
    observer.observe(section);
  }

  observer.observe($('#doc-title'));

  // parallax
  const title = $('.ThemeTitle_title')
  window.addEventListener('scroll', () => {
    if (window,scrollY < 1.5 * window.innerHeight) {
      title.style.transform = `translateY(-${window.scrollY / window.innerHeight * 120}px)`;
      title.style.opacity = 1 - Math.max(window.scrollY - 40, 0) / (window.innerHeight * .9);
      title.style.willChange = 'transform, opacity';
    } else {
      title.style.willChange = 'auto';
    }
  });
}

document.documentElement.classList.remove('no-js');

console.log(atob("ICAgICAgICAgICAgICAgICAgICAgICBfXwogICAgICAgIC9cICAgICAgICAgICAgfCAgfCAgICAgICAgICAgfCAgfCAgICAgfCB8ICAgICAgICAgICAgICAgICAgICAgIHwKICAgICAgIC8gIFwgICAgICAgICAgIHwgIHwgICAgICAgICAgIHxfX3wgIF8gIHwgfCAgICogIF8gICAgLF8gIF8gICBfICB8CiAgICAgIC8gICAgXCAgICAgICAgICB8ICB8ICAgICAgICAgICB8ICB8IC9fXCB8IHwgICB8IC9fYCAgIHwgIC9fXCAvIHwgfAogICAgIC8gICAgICBcICAgICAgICAgfCAgfCAgICAgICAgICAgfCAgfCBcXyAgXCBcICAgfCAuXy8gICB8ICBcXyAgXF98IFwgIwogICAgLyAgICAgICAgXCAgICAgICAgfCAgfCAgICAgCiAgIHwgIC98ICB8XCAgfCAgICAgICB8ICB8ICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwKICAgfCAvIHwgIHwgXCB8ICAgICAgIHwgIHwgICAgICAgICAgIHxfX3wgIF8gICBfICAgICAgICBfICAsXyAgICAqICBfICAgICxfICBfICAgXyAgfAogICB8LyAgfCAgfCAgXHwgICAgICAgfCAgfCAgICAgICAgICAgfCAgfCAvX1wgLyB8IFwgIC8gL19cIHwgfCAgIHwgL19gICAgfCAgL19cIC8gfCB8CiAgICAgICB8ICB8ICAgICAgICAgICB8ICB8ICAgICAgICAgICB8ICB8IFxfICBcX3wgIFwvICBcXyAgfCB8ICAgfCAuXy8gICB8ICBcXyAgXF98IFwgIwogICAgICAgfCAgfCAgICAgICAgICAgfCAgfCAgICAgICAgICAgX19fXwogICAgICAgfCAgfCAgICAgICB8XCAgfCAgfCAgL3wgICAgICAgIHx8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgIHwKICAgICAgIHwgIHwgICAgICAgfCBcIHwgIHwgLyB8ICAgICAgICB8fCAgKiAsXyBfICAgXyAgICAqICBfICAgICBfICB8XyAgIF8gICxfIF98XwogICAgICAgfCAgfCAgICAgICB8ICBcfCAgfC8gIHwgICAgICAgIHx8ICB8IHwgfCB8IC9fXCAgIHwgL19gICAgL19gIHwgfCAvIFwgfCAgIHwKICAgICAgIHwgIHwgICAgICAgXCAgICAgICAgICAvICAgICAgICB8fCAgfCB8IHwgfCBcXyAgICB8IC5fLyAgIC5fLyB8IHwgXF8vIHwgICBcICMKICAgICAgIHwgIHwgICAgICAgIFwgICAgICAgIC8gICAgICAgICBfXwogICAgICAgfCAgfCAgICAgICAgIFwgICAgICAvICAgICAgICAgLyAgIHwKICAgICAgIHwgIHwgICAgICAgICAgXCAgICAvICAgICAgICAgIHwgICB8XyAgIF8gICBfICAgXyAgIF8KICAgICAgIHwgIHwgICAgICAgICAgIFwgIC8gICAgICAgICAgIHwgICB8IHwgLyBcIC8gXCAvX2AgL19cCiAgICAgICB8X198ICAgICAgICAgICAgXC8gICAgICAgICAgICBcX18gfCB8IFxfLyBcXy8gLl8vIFxfICAj"))
