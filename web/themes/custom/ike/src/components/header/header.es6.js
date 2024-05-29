!((document, Drupal, $) => {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */
  Drupal.behaviors.ikeHeader = {
    attach: function (context) {
      const mobileBreakPoint = 768;

      // mobile menu trigger
      const menuTrigger = context.querySelector('#main-menu-trigger');
      const mainMenu = context.querySelector('.site-main-menu');
      const body = context.querySelector('body');

      if (menuTrigger) {
        menuTrigger.addEventListener('click', function () {
          this.classList.toggle('open');
          body.classList.toggle('open');
          mainMenu.classList.toggle('open');
        });
      }

      // block parent menu items on mobile
      if (window.innerWidth < mobileBreakPoint) {
        $('#block-mainnavigation > ul.menu-level-0 > li > a').click(function (e) {
          if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
          }
          else {
            $(this).addClass('clicked');
            e.stopPropagation();
            e.preventDefault();
          }
        });
      }

      // search
      const searchButton = context.querySelector('.search-button');
      const siteHeader = context.querySelector('.site-header');
      $(`<div class="search-form">
          <form action="/search/node">
            <input type="text" placeholder="Search" name="keys" />
          </form>
        </div>`).appendTo($('.search-button').parent().parent());

      if (searchButton) {
        searchButton.addEventListener('click', function (e) {
          e.preventDefault();
          const searchForm = context.querySelector('.search-form');

          body.classList.toggle('search-open');
          searchButton.classList.toggle('search-open');
          searchForm.classList.toggle('search-open');

          if (window.innerWidth >= mobileBreakPoint) {
            searchForm.setAttribute('style', `top: ${searchButton.offsetHeight}px`);
          }
          else {
            searchForm.setAttribute('style', `top: ${siteHeader.offsetHeight}px`);
          }
        });
      }
    }
  };
})(document, Drupal, jQuery);
