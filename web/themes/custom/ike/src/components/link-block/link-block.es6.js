!((document, Drupal, $) => {
  'use strict';

  Drupal.behaviors.linkBlock = {
    attach: function() {

      $('.link-block-item').once().on('click', function () {
        let id = $(this).attr('reference');
        $('html, body').animate({ scrollTop: $('#'+id).offset().top }, 1000);
      });

    }
  };
})(document, Drupal, jQuery);
