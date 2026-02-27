(function () {
  'use strict';

  // Skip if this is the index page
  var path = location.pathname;
  if (path.endsWith('/') || path.endsWith('/index.html')) return;

  // Determine base path
  var inSubdir = /\/(apps|writing|research|creative|experiments)\//.test(path);
  var base = inSubdir ? '../' : '';

  // Page type
  var pageType = document.body.getAttribute('data-page-type') || 'article';

  // Build nav
  var nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML =
    '<a href="' + base + '" class="nav-home">shadow\'s garden</a>' +
    '<div class="nav-links">' +
    '<a href="' + base + '#projects">projects</a>' +
    '<a href="' + base + '#writing">writing</a>' +
    '<a href="' + base + '#journal">journal</a>' +
    '</div>';

  document.body.insertBefore(nav, document.body.firstChild);

  // Show description from meta tag
  var descMeta = document.querySelector('meta[name="description"]');
  if (descMeta && descMeta.content) {
    var about = document.createElement('div');
    about.className = 'page-about';
    about.textContent = descMeta.content;
    nav.insertAdjacentElement('afterend', about);
  }

  // Highlight active section
  if (inSubdir) {
    var match = path.match(/\/(apps|writing|research|creative|experiments)\//);
    if (match) {
      var s = match[1];
      var target = (s === 'writing' || s === 'research') ? 'writing' : 'projects';
      var link = nav.querySelector('a[href*="#' + target + '"]');
      if (link) link.classList.add('active');
    }
  }
})();
