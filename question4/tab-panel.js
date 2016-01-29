'use strict';

let panels;

// returns an array from an iterable
let _ = (obj) => Array.prototype.slice.call(obj);

// Tab panel component
class TabPanel {
  constructor(elem) {
    console.log(`called constructor ${elem}`);
    this.articles = elem.getElementsByTagName('article');

    // adds buttons container
    let tabSection = document.createElement('section');
    tabSection.className = 'tabs'
    elem.appendChild(tabSection);
    elem.insertBefore(tabSection, elem.firstChild);


    // create buttons & listens to clicks
    this.tabs = _(this.articles).map((article) => {
      let tab = document.createElement('span');
      tab.innerHTML = article.title;
      tabSection.appendChild(tab);

      // listens to click
      tab.addEventListener('click', () => {
        this.reset();
        this.show(article);
        tab.className = 'active';
      });

      return tab;
    });

    // initial state
    this.reset();
    // show only first article
    this.show(this.articles[0]);
    this.tabs[0].className = 'active';
  }

  reset() {
    _(this.articles).forEach((e) => e.style.display = 'none');
    this.tabs.forEach((e) => e.className = '');
  }

  show(article) {
    article.style.display = ''
  }
};

let tabDemo = function() {
  panels = _(document.body.children)
    .filter((child) => child.tagName.toLowerCase() == 'section')
    .map((child) => new TabPanel(child));
};

window.onload = tabDemo;
