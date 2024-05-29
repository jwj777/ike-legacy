!((document, Drupal, $) => {
  'use strict';

  Drupal.behaviors.galleryBlock = {
    attach: function() {

      $('.block__gallery-block .field--type-entity-reference').slick({
        infinite: true,
        slidesToShow: 1,
        dots: true,
        nextArrow: '<a class="slick-next slick-arrow" type="button"></a>',
        prevArrow: '<a class="slick-prev slick-arrow" type="button"></a>',
        autoplay: false,
        // autoplaySpeed: 4000,
        // speed: 1000
      });

      $('.media-oembed-content').parent().addClass('field--type--gallery-video');

      function makeVideoNice() {
        let addedHeight = $(window).width() < 768 ? 88 : 0;

        let image = $('.field--type-image.field__item').first().height();
        $('.field--type--gallery-video').height(image + addedHeight);
      }

      function positionSlickDots() {
        let imgHeight = $('.block__gallery-block .field--type-image img').height();

        let offsetDots = (imgHeight + 25) + 'px';
        let offsetArrows = ((imgHeight / 2) - 18) + 'px';

        let offsetVideoArrows = (((imgHeight / 2) +88 ) - 58) + 'px';
        let offsetVideoDots = (imgHeight + 25 + 88) + 'px';

        $('.slick-dots').css('top', offsetDots);
        $('.slick-arrow').css('top', offsetArrows);

        if ($(window).width() < 768) {
          $('.field--type--gallery-video')
            .closest('.field--name-field-rendered-gallery-item')
            .find('.slick-arrow').css('top', offsetVideoArrows);
          $('.field--type--gallery-video')
            .closest('.field--name-field-rendered-gallery-item')
            .find('.slick-dots').css('top', offsetVideoDots);
        }

        let containerWidthImageCredits = $('.field--name-field-credits').parent().width();
        let buttonOffsetImage = (containerWidthImageCredits - 75) + 'px';
        $('.field--name-field-credits').css('width', buttonOffsetImage);

        let containerWidthDesignCredits = $('.field--name-field-design-credits')
          .parent().width();
        let buttonOffsetDesign = (containerWidthDesignCredits - 75) + 'px';
        $('.field--name-field-design-credits').css('width', buttonOffsetDesign);

        makeVideoNice();
      }

      $(document).ready(positionSlickDots);
      $(window).on('resize',positionSlickDots);



      $('a[href="#top"]').click(function() {
        $('html, body').animate({ scrollTop: $('#gallery-link-block')
          .offset().top-280}, 'slow');
        return false;
      });
    }
  };
})(document, Drupal, jQuery);
