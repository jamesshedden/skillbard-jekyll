function getElementsByTagName(context, selector) {
  let results = context.getElementsByTagName(selector);
  return results.length > 1 ? results : results[0];
}

function querySelectorAll(context, selector) {
  let results = context.querySelectorAll(selector);
  return results.length > 1 ? results : results[0];
}

function $(selector, context) {
  context = context || document;

  return /^\.[\w-]*$/.test(selector) ? // Matches class?
    context.getElementsByClassName(selector.slice(1)) :
    /^\w+$/.test(selector) ? // Matches tag?
      getElementsByTagName(context, selector) :
      querySelectorAll(context, selector);
}

let sidebar = $('#sidebar');
let sidebarToggle = $('[sidebar-toggle]');
let site = $('#site');
let main = $('#main');
let postLogo = $('#post-logo');

function openElements(elements) {
  elements.map((el) => {
    el ? el.classList.add('is-open') : null;
  });
}

function closeElements(elements) {
  elements.map((el) => {
    el ? el.classList.remove('is-open') : null;
  });
}

function openSidebar() {
  openElements([sidebar, site, main, postLogo]);

  [].forEach.call(sidebarToggle, (element) => {
    element.classList.add('is-open');
  });

  site.addEventListener('click', () => closeSidebar());
}

function closeSidebar() {
  closeElements([sidebar, site, main, postLogo]);

  [].forEach.call(sidebarToggle, (element) => {
    element.classList.remove('is-open');
  });

  site.removeEventListener('click', () => closeSidebar());
}

[].forEach.call(sidebarToggle, (element) => {
  element.addEventListener('click', () => {
    sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
  });
});
