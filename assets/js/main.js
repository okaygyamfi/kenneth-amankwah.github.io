// THE LEDGER: main.js (theme toggle, landing card, collapsible tabs, image lightbox)
document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;

  // Light / dark toggle
  var toggle = document.querySelector('.theme-toggle');
  function setIcon() { if (toggle) toggle.textContent = root.getAttribute('data-theme') === 'dark' ? '\u2600' : '\u263E'; }
  if (toggle) {
    setIcon();
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      setIcon();
    });
  }

  // Collapsible tabs (one open at a time)
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var wasOpen = tab.getAttribute('aria-expanded') === 'true';
      tabs.forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
        document.getElementById(t.getAttribute('aria-controls')).hidden = true;
      });
      if (!wasOpen) {
        tab.setAttribute('aria-expanded', 'true');
        document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
      }
    });
  });

  // Landing card (index.html only)
  var overlay = document.getElementById('overlay');
  if (overlay) {
    var seen = false;
    try { seen = sessionStorage.getItem('entered') === '1'; } catch (e) {}
    if (seen || location.hash) { overlay.classList.add('gone'); }
    else { document.body.style.overflow = 'hidden'; }
    document.getElementById('enter').addEventListener('click', function () {
      overlay.classList.add('gone');
      document.body.style.overflow = '';
      try { sessionStorage.setItem('entered', '1'); } catch (e) {}
    });
    document.getElementById('returntocard').addEventListener('click', function () {
      overlay.classList.remove('gone');
      document.body.style.overflow = 'hidden';
    });
  }

  // Click-to-enlarge images (projects.html)
  var zoomable = document.querySelectorAll('img[data-zoom]');
  if (zoomable.length) {
    var box = document.createElement('div');
    box.id = 'lightbox'; box.hidden = true;
    box.innerHTML = '<img alt="">';
    document.body.appendChild(box);
    zoomable.forEach(function (img) {
      img.addEventListener('click', function () {
        box.firstChild.src = img.src; box.firstChild.alt = img.alt; box.hidden = false;
      });
    });
    box.addEventListener('click', function () { box.hidden = true; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') box.hidden = true; });
  }
});