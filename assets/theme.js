document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('[data-mobile-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('is-open');
    });
  }
});
