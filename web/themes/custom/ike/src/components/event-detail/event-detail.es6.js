!((document, Drupal, $) => {
  'use strict';

  /**
   * Get event data and create Add To Calendar
   */
  Drupal.behaviors.ikeEvents = {
    attach: function (context) {
      setTimeout(function () {
        const eventDetails = context.querySelector('#add-to-cal-info');
        const addToCalButton = context.querySelector('.atcb-list');
        if (eventDetails !== null && addToCalButton !== null) {
          $('li.atcb-item').remove();
          const eventStartDate = eventDetails.dataset.eventStartDate;
          const eventEndDate = eventDetails.dataset.eventEndDate;

          let myCalendar = createCalendar({  // eslint-disable-line no-undef
            data: {
              title: eventDetails.dataset.eventTitle,
              start: new Date(eventStartDate),
              end: new Date(eventEndDate),
              address: eventDetails.dataset.eventAddress,
              description: eventDetails.dataset.eventDetails
            }
          });
          addToCalButton.appendChild(myCalendar);
        }
      }, 500);
    }
  };
})(document, Drupal, jQuery);

