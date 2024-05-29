!((document, Drupal, $) => {
  'use strict';

  Drupal.behaviors.social = {
    attach: function() {
      /**
       * Change social YouTube link on a couple Memorial specific pages.
       */
      if (
        window.location.pathname === '/donors' ||
        window.location.pathname === '/eisenhower-memorial' ||
        window.location.pathname === '/gallery' ||
        window.location.pathname === '/audio-tour'
      ) {
        $('.social-grid .social-youtube a')
          .attr('href' , 'https://www.youtube.com/channel/UCyUrdZCkmvEcRobP2NQKe0g');
        $('body').css({'background' : 'unset', 'background-color' : '#1c1c1e'});
      }
    }
  };
})(document, Drupal, jQuery);
