import { $, $$ } from "@js/modules/utils.js";
import { RecentEventViewer } from "@js/modules/events.js";
import Tabber from "@js/modules/tabber.js";

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
    <a href="${window.eventsURLs[e.id]}"><em>${e.Title}</em> <span class="slash-sep">//</span> ${e.Location || e.Locations.join(', ')} <span class="slash-sep">//</span> ${e.Time}</a>
  </li>`).join('')}
</ul>`);
    } else if (events.upcoming.length) {
      if (events.upcoming.length > 1) {
        toast.classList.add('animated');
      }
      $(toast, '.container').insertAdjacentHTML('beforeend',
        `<strong>Next Event:</strong>
<ul id="home-events-toast-marquee">
  ${events.upcoming.map((e, i) => `<li style="-webkit-animation-duration:${6*events.upcoming.length}s;animation-duration:${6*events.upcoming.length}s;-webkit-animation-delay:${6*i}s;animation-delay:${6*i}s;">
    <a href="${window.eventsURLs[e.id]}"><em>${e.Title}</em> <span class="slash-sep">//</span> ${e.formattedShortDate} ${e.Time} <span class="slash-sep">//</span> ${e.Location || e.Locations.join(', ')}</a>
  </li>`).join('')}
</ul>`)
    } else {
      toast.classList.add('text-center');
      $(toast, '.container').innerHTML = '<em>Thanks for being a part of Jesus Week 2019!</em>';
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
}</style>`)
  }

  if ($('.layout-home #events')) {
    const container = $('.layout-home #events .events-container');

    if (events.ongoing.length) {
      $(container, '.ongoing-events').insertAdjacentHTML('beforeend', `${events.ongoing.map((e, i) => `<div>
  <p><strong><a href="${window.eventsURLs[e.id]}">${e.Title}</a></strong></p>
  <p class="font-24">${e.Time} <span class="slash-sep">//</span> ${e.Location || e.Locations.join(', ')}</p>
</div>`).join('')}`)
    } else {
      $(container, '.ongoing-events').insertAdjacentHTML('beforeend', '<em>No ongoing events.</em>');
    }

    if (events.upcoming.length) {
      $(container, '.upcoming-events').insertAdjacentHTML('beforeend', `${events.upcoming.map((e, i) => `<div>
  <p><strong><a href="${window.eventsURLs[e.id]}">${e.Title}</a></strong></p>
  <p class="font-24">${e.formattedShortDate} ${e.Time} <span class="slash-sep">//</span> ${e.Location || e.Locations.join(', ')}</p>
</div>`).join('')}`)
    } else {
      $(container, '.upcoming-events').insertAdjacentHTML('beforeend', '<em>No upcoming events.</em>');
    }
  }
}

if ($('.gospel-tract')) {
  for (const gospel of $$('.gospel-tract')) {
    for (const reveal of $$(gospel, '.gospel-tract-reveal')) {
      reveal.addEventListener('click', (e) => {
        e.preventDefault();

        gospel.classList.toggle('revealed');
      });
    }
  }
}

console.log(atob("ICAgICAgICAgICAgICAgICAgICAgICBfXwogICAgICAgIC9cICAgICAgICAgICAgfCAgfCAgICAgICAgICAgfCAgfCAgICAgfCB8ICAgICAgICAgICAgICAgICAgICAgIHwKICAgICAgIC8gIFwgICAgICAgICAgIHwgIHwgICAgICAgICAgIHxfX3wgIF8gIHwgfCAgICogIF8gICAgLF8gIF8gICBfICB8CiAgICAgIC8gICAgXCAgICAgICAgICB8ICB8ICAgICAgICAgICB8ICB8IC9fXCB8IHwgICB8IC9fYCAgIHwgIC9fXCAvIHwgfAogICAgIC8gICAgICBcICAgICAgICAgfCAgfCAgICAgICAgICAgfCAgfCBcXyAgXCBcICAgfCAuXy8gICB8ICBcXyAgXF98IFwgIwogICAgLyAgICAgICAgXCAgICAgICAgfCAgfCAgICAgCiAgIHwgIC98ICB8XCAgfCAgICAgICB8ICB8ICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwKICAgfCAvIHwgIHwgXCB8ICAgICAgIHwgIHwgICAgICAgICAgIHxfX3wgIF8gICBfICAgICAgICBfICAsXyAgICAqICBfICAgICxfICBfICAgXyAgfAogICB8LyAgfCAgfCAgXHwgICAgICAgfCAgfCAgICAgICAgICAgfCAgfCAvX1wgLyB8IFwgIC8gL19cIHwgfCAgIHwgL19gICAgfCAgL19cIC8gfCB8CiAgICAgICB8ICB8ICAgICAgICAgICB8ICB8ICAgICAgICAgICB8ICB8IFxfICBcX3wgIFwvICBcXyAgfCB8ICAgfCAuXy8gICB8ICBcXyAgXF98IFwgIwogICAgICAgfCAgfCAgICAgICAgICAgfCAgfCAgICAgICAgICAgX19fXwogICAgICAgfCAgfCAgICAgICB8XCAgfCAgfCAgL3wgICAgICAgIHx8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgIHwKICAgICAgIHwgIHwgICAgICAgfCBcIHwgIHwgLyB8ICAgICAgICB8fCAgKiAsXyBfICAgXyAgICAqICBfICAgICBfICB8XyAgIF8gICxfIF98XwogICAgICAgfCAgfCAgICAgICB8ICBcfCAgfC8gIHwgICAgICAgIHx8ICB8IHwgfCB8IC9fXCAgIHwgL19gICAgL19gIHwgfCAvIFwgfCAgIHwKICAgICAgIHwgIHwgICAgICAgXCAgICAgICAgICAvICAgICAgICB8fCAgfCB8IHwgfCBcXyAgICB8IC5fLyAgIC5fLyB8IHwgXF8vIHwgICBcICMKICAgICAgIHwgIHwgICAgICAgIFwgICAgICAgIC8gICAgICAgICBfXwogICAgICAgfCAgfCAgICAgICAgIFwgICAgICAvICAgICAgICAgLyAgIHwKICAgICAgIHwgIHwgICAgICAgICAgXCAgICAvICAgICAgICAgIHwgICB8XyAgIF8gICBfICAgXyAgIF8KICAgICAgIHwgIHwgICAgICAgICAgIFwgIC8gICAgICAgICAgIHwgICB8IHwgLyBcIC8gXCAvX2AgL19cCiAgICAgICB8X198ICAgICAgICAgICAgXC8gICAgICAgICAgICBcX18gfCB8IFxfLyBcXy8gLl8vIFxfICAj"))
