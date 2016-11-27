'use strict';

function getElementsByTagName(context, selector) {
  var results = context.getElementsByTagName(selector);
  return results.length > 1 ? results : results[0];
}

function querySelectorAll(context, selector) {
  var results = context.querySelectorAll(selector);
  return results.length > 1 ? results : results[0];
}

function $(selector, context) {
  context = context || document;

  return (/^\.[\w-]*$/.test(selector) ? // Matches class?
    context.getElementsByClassName(selector.slice(1)) : /^\w+$/.test(selector) ? // Matches tag?
    getElementsByTagName(context, selector) : querySelectorAll(context, selector)
  );
}

var sidebar = $('#sidebar');
var sidebarToggle = $('[sidebar-toggle]');
var site = $('#site');
var main = $('#main');
var postLogo = $('#post-logo');

function openElements(elements) {
  elements.map(function (el) {
    el ? el.classList.add('is-open') : null;
  });
}

function closeElements(elements) {
  elements.map(function (el) {
    el ? el.classList.remove('is-open') : null;
  });
}

function addClickToCloseSidebar(elements) {
  elements.map(function (el) {
    el ? el.addEventListener('click', function () {
      return closeSidebar();
    }) : null;
  });
}

function removeClickToCloseSidebar(elements) {
  elements.map(function (el) {
    el ? el.removeEventListener('click', function () {
      return closeSidebar();
    }) : null;
  });
}

function openSidebar() {
  openElements([sidebar, site, main, postLogo]);

  [].forEach.call(sidebarToggle, function (element) {
    element.classList.add('is-open');
  });

  addClickToCloseSidebar([site, main]);
}

function closeSidebar() {
  closeElements([sidebar, site, main, postLogo]);

  [].forEach.call(sidebarToggle, function (element) {
    element.classList.remove('is-open');
  });

  removeClickToCloseSidebar([site, main]);
}

[].forEach.call(sidebarToggle, function (element) {
  element.addEventListener('click', function () {
    sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
  });
});