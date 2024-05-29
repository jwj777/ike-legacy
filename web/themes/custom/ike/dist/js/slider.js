!((document, Drupal, $) => {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */
  Drupal.behaviors.ikeSlider = {
    attach: function(context) {
      const slider = context.getElementsByClassName("ike-slider");
      $(slider).slick({
        infinite: true,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
      });

      // On slide chnage, play a video inside the current slide
      // slider.on('afterChange',
      //   function (event, slick, currentSlide, nextSlide) {
      //     console.log($('.slick-current').find('video').length);
      //     if ($('.slick-current').find('video').length !== 0) {
      //       console.log('video found');
      //       $(".slick-current video")[0].play();
      //     }
      //   }
      // );
    }
  };
})(document, Drupal, jQuery);
