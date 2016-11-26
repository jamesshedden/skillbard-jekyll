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

function openSidebar() {
  sidebar.classList.add('is-open');
  site.classList.add('is-open');
  main.classList.add('is-open');

  [].forEach.call(sidebarToggle, (element) => {
    element.classList.add('is-open');
  });

  site.addEventListener('click', () => closeSidebar());
}

function closeSidebar() {
  sidebar.classList.remove('is-open');
  site.classList.remove('is-open');
  main.classList.remove('is-open');

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

//
// function getTransitionEvent(){
//   let fakeElement = document.createElement('fakeelement');
//
//   let TRANSITIONS = {
//     'transition': 'transitionend',
//     'OTransition': 'oTransitionEnd',
//     'MozTransition': 'transitionend',
//     'WebkitTransition': 'webkitTransitionEnd',
//   }
//
//   for (let t in TRANSITIONS) {
//     if (fakeElement.style[t] !== undefined) return TRANSITIONS[t];
//   }
// }
//
// let transitionEvent = getTransitionEvent();
//
// function addTransitionEndListener(element, property, callback) {
//   element.addEventListener(transitionEvent, (event) => {
//     if (event.propertyName === property) callback();
//   });
// }
//
// function removeTransitionEndListener(element, callback) {
//   // Cloning & replacing element with itself removes all listeners
//   // http://stackoverflow.com/a/19470348
//   element.parentNode.replaceChild(element.cloneNode(true), element);
//   if (callback) callback();
// };
//
// function listenForTileClick() {
//   [].forEach.call(find('.tile'), (tile) => {
//     tile.addEventListener('click', () => expandContent({
//       url: tile.getAttribute('data-url'),
//       title: tile.getAttribute('data-title'),
//     }));
//   });
// }
//
// function listenForSidebarClick() {
//   find('#sidebar').addEventListener('click', collapseContent);
// }
//
// function expandContent(options) {
//   addTransitionEndListener(find('#content'), 'transform', () => {
//     find('#tiles-container').classList.add('u-hidden');
//
//     function onResponse () {
//       let parser = new DOMParser();
//       let wrapper = parser.parseFromString(this.response, "text/html");
//
//       let postContainer = find('#post-container');
//       postContainer.appendChild(find('#post-content', wrapper));
//       postContainer.classList.remove('u-hidden');
//       postContainer.classList.add('is-visible');
//       window.history.pushState({}, `Skillbard - ${options.title}`, options.url)
//       window.addEventListener('popstate', collapseContent);
//     }
//
//     var request = new XMLHttpRequest();
//     request.addEventListener("load", onResponse);
//     request.open("GET", options.url);
//     request.send();
//     removeTransitionEndListener(find('#content'));
//   });
//
//   addTransitionEndListener(find('#tiles-container'), 'opacity', () => {
//     find('#sidebar').classList.add('is-collapsed');
//     find('#content').classList.add('is-expanded');
//     removeTransitionEndListener(find('#tiles-container'), listenForSidebarClick);
//   });
//
//   find('#tiles-container').classList.remove('is-visible');
//   find('#content').classList.add('is-active');
// }
//
// function expandListener(event) {
//   expandContent({
//     url: event.target.location.href,
//     title: 'foo',
//   });
// }
//
// function collapseContent() {
//   let postContainer = find('#post-container');
//
//   addTransitionEndListener(postContainer, 'opacity', () => {
//     postContainer.classList.add('u-is-hidden');
//     postContainer.innerHTML = '';
//     removeTransitionEndListener(postContainer);
//
//     addTransitionEndListener(find('#sidebar'), 'opacity', () => {
//       find('#tiles-container').classList.add('is-visible');
//       find('#content').classList.remove('is-active');
//       removeTransitionEndListener(find('#sidebar'), listenForTileClick);
//       window.removeEventListener('popstate', collapseContent);
//       window.addEventListener('popstate', expandListener);
//       window.history.replaceState({}, 'Skillbard', '/')
//     });
//
//     find('#sidebar').classList.remove('is-collapsed');
//     find('#content').classList.remove('is-expanded');
//     find('#tiles-container').classList.remove('u-hidden');
//   });
//
//   postContainer.classList.remove('is-visible');
// }
//
// listenForTileClick();
// listenForSidebarClick();
