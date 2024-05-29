// eslint-disable-line no-undef
!((document, Drupal, $) => {
  'use strict';

  /**
   * Attach 'open' attribute to class so that filters by default are not collapsed.
   * Set even/odd class for alternating left border
   */
  const mobileBreakPoint = 768;
  let scrollPosition = '';
  Drupal.behaviors.pslViewFilter = {
    attach: function(context) {
      $(document, context).once('pslViewFilter').each(function () {
        $('details.form-item').each(function (i) {
          let evenodd = (i % 2  === 0) ? 'even' : 'odd';
          if (window.innerWidth < mobileBreakPoint) {
            $(this).attr('open', false);
          }
          else {
            $(this).attr('open', false);
          }
          $(this).addClass(evenodd);
        });
      });
    }
  };

  $('#views-exposed-form-psl-list-view-psl-list-view')
    .append('<input type="hidden" name="filtered" id="filtered" value="0" />');
  $('.psl-search-results').hide();
  $('#edit-submit-psl-list-view').unbind('click').click(function() {
    $('.psl-search-results').show();
    $('.featured-psl').hide();
    $('#filtered').val(1);
    setTimeout(function() {
      document.querySelector('.psl-search-results')
        .scrollIntoView({
          behavior: 'smooth'
        });
    }, 2000);
    scrollPosition = 'results';
  });
  
    // Do the same for ther See All Primary Sources view
    $('#see-all-psls').click(function() {
      jQuery('#edit-submit-psl-list-view').click()
      // $('.psl-search-results').show();
      // $('.featured-psl').hide();
      // $('#see-all-psls').hide();
      $('#filtered').val(1);
      setTimeout(function() {
        document.querySelector('.psl-search-results')
          .scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
      }, 2000);
      scrollPosition = 'results';
    });

  if (window.innerWidth < mobileBreakPoint) {
    $('.filter-mobile-toggle').unbind('click').click(function() {
      if($('#views-exposed-form-psl-list-view-psl-list-view').not(':hidden')
      && scrollPosition === '') {
        $('#views-exposed-form-psl-list-view-psl-list-view').toggle();
        document.querySelector('#views-exposed-form-psl-list-view-psl-list-view')
          .scrollIntoView({
            behavior: 'smooth'
          });
        $('.filter-mobile-toggle').css('background-image',
          'url("/themes/custom/ike/images/close.png")')
          .css('background-position', '50% 50%');
        scrollPosition = 'search';
      }
      else if($('#views-exposed-form-psl-list-view-psl-list-view').not(':hidden')
      && scrollPosition === 'search') {
        $('#views-exposed-form-psl-list-view-psl-list-view').toggle();
        document.querySelector('#views-exposed-form-psl-list-view-psl-list-view')
          .scrollIntoView({
            behavior: 'smooth'
          });
        $('.filter-mobile-toggle').css('background-image',
          'url(/themes/custom/ike/images/filter.png)')
          .css('background-position', '50% 55%');
        scrollPosition = '';
      }
      else if($('#views-exposed-form-psl-list-view-psl-list-view').not(':hidden')
      && scrollPosition === 'results') {
        document.querySelector('#views-exposed-form-psl-list-view-psl-list-view')
          .scrollIntoView({
            behavior: 'smooth'
          });
        $('.filter-mobile-toggle').css('background-image',
          'url("/themes/custom/ike/images/close.png")')
          .css('background-position', '50% 50%');
        scrollPosition = 'search';
      }
      else {
        $('#views-exposed-form-psl-list-view-psl-list-view').toggle();
        document.querySelector('.psl-search-results')
          .scrollIntoView({
            behavior: 'smooth'
          });
        scrollPosition = '';
      }
    });




    $('#edit-submit-psl-list-view').unbind('click').click(function() {
      $('.psl-search-results').show();
      $('.featured-psl').hide();
      $('#see-all-psls').hide();
      $('#filtered').val(1);
      setTimeout(function() {
        $('.filter-mobile-toggle').css('background-image',
          'url(/themes/custom/ike/images/scrollup.png)')
          .css('background-position', '50% 42%');
        document.querySelector('.psl-search-results')
          .scrollIntoView({
            behavior: 'smooth'
          });
      }, 2000);
      scrollPosition = 'results';
    });
  }
})(document, Drupal, jQuery);
