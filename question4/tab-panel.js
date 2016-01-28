var tabDemo = function() {
  for(var i = 0; i < document.body.children.length; i++) {
    child = document.body.children[i];
    if(child.tagName.toLowerCase() != 'section') continue;

    t = new TabPanel();
    t.init(child);
    window.panels.push(t);
  }
};
var panels = [];
window.onload = tabDemo;
