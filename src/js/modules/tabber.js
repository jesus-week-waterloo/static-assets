import { $, $$ } from "@js/modules/utils.js";

export default class Tabber {
  constructor(el) {
    this.root = el;
    this.active = $(this.root, '.tabber-tab[data-active]').getAttribute('aria-controls');

    for (const tab of $$(this.root, '.tabber-section')) {
      tab.setAttribute('aria-hidden', true);
    }

    this.switchTab(this.active);

    $(this.root, '.tabber-tabbar').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.switchTab(e.target.getAttribute('aria-controls'));
    });

    this.root.classList.add('tabber-initialized');
  }

  switchTab(tab) {
    this.active = tab;

    if ($(this.root, '.tabber-section[data-active]')) {
      $(this.root, '.tabber-section[data-active]').setAttribute('aria-hidden', true);
    }

    $$(this.root, '[data-active]').forEach(e => {
      e.removeAttribute('data-active');
    });

    $(this.root, '#' + tab).removeAttribute('aria-hidden');
    $(this.root, '#' + tab).setAttribute('data-active', true);
    $(this.root, '[aria-controls="' + tab + '"]').setAttribute('data-active', true);
  }
}
