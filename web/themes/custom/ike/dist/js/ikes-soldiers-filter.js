// eslint-disable-line no-undef
!((document, Drupal, $) => {
  'use strict';

  /**
   * Attach 'open' attribute to class so that filters by default are not collapsed.
   * Set even/odd class for alternating left border
   */
  const mobileBreakPoint = 768;
  let scrollPosition = '';
  Drupal.behaviors.soldiersViewFilter = {
    attach: function(context) {
      $(document, context).once('soldiersViewFilter').each(function () {
        $('details.form-item').each(function (i) {
          let evenodd = (i % 2  === 0) ? 'even' : 'odd';
          if (window.innerWidth < mobileBreakPoint) {
            $(this).attr('open', false);
          }
          else {
            $(this).attr('open', true);
          }
          $(this).addClass(evenodd);
        });
      });
    }
  };

  let $resetLink = $('.views-exposed-form input[data-drupal-selector="edit-reset"]');
  $resetLink.click(function() {
    if (location.protocol === 'https:') {
      window.location
        .replace('https://' + window.location.hostname + window.location.pathname);
    }
    else if (location.protocol === 'http:') {
      window.location
        .replace('http://' + window.location.hostname + window.location.pathname);
    }
    return false;
  });

  // Show/Hide the correct block when searching
  $('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view')
    .append('<input type="hidden" name="filtered" id="filtered" value="0" />');
  $('.soldiers-search-results').hide();
  $('#edit-submit-ike-s-soldiers').unbind('click').click(function() {
    $('.soldiers-search-results').show();
    $('.featured-soldiers').hide();
    $('#filtered').val(1);
    setTimeout(function() {
      document.querySelector('.soldiers-search-results')
        .scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    }, 2000);
    scrollPosition = 'results';
  });

  // Do the same for ther See All Soldiers view
  $('#see-all-soldiers').unbind('click').click(function() {
    $('.soldiers-search-results').show();
    $('.featured-soldiers').hide();
    $('#filtered').val(1);
    setTimeout(function() {
      document.querySelector('.soldiers-search-results')
        .scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    }, 2000);
    scrollPosition = 'results';
  });

  // All of the above but in movile view also show/hide/scroll toggles and menus
  if (window.innerWidth < mobileBreakPoint) {
    $('.filter-mobile-toggle').unbind('click').click(function() {
      if($('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view').not(':hidden')
      && scrollPosition === '') {
        $('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view').toggle();
        document.querySelector('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view')
          .scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        $('.filter-mobile-toggle').css('background-image',
          'url("/themes/custom/ike/images/close.png")')
          .css('background-position', '50% 50%');
        scrollPosition = 'search';
      }
      else if($('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view').not(':hidden')
      && scrollPosition === 'search') {
        $('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view').toggle();
        document.querySelector('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view')
          .scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        $('.filter-mobile-toggle').css('background-image',
          'url(/themes/custom/ike/images/filter.png)')
          .css('background-position', '50% 55%');
        scrollPosition = '';
      }
      else if($('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view').not(':hidden')
      && scrollPosition === 'results') {
        document.querySelector('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view')
          .scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        $('.filter-mobile-toggle').css('background-image',
          'url("/themes/custom/ike/images/close.png")')
          .css('background-position', '50% 50%');
        scrollPosition = 'search';
      }
      else {
        $('#views-exposed-form-ike-s-soldiers-ikes-soldiers-view').toggle();
        document.querySelector('.soldiers-search-results')
          .scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        scrollPosition = '';
      }
    });

    $('#edit-submit-ike-s-soldiers').unbind('click').click(function() {
      $('.soldiers-search-results').show();
      $('.featured-soldiers').hide();
      $('#filtered').val(1);
      setTimeout(function() {
        $('.filter-mobile-toggle').css('background-image',
          'url(/themes/custom/ike/images/scrollup.png)')
          .css('background-position', '50% 42%');
        document.querySelector('.soldiers-search-results')
          .scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
      }, 2000);
      scrollPosition = 'results';
    });
  }
})(document, Drupal, jQuery);
