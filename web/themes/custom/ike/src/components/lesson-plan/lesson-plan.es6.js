!((document, Drupal) => {
  'use strict';

  /**
   * Tie into Drupal's BEF fileter of tags and use that to hide/show whole categories of
   */
  Drupal.behaviors.lessonPlanFilters = {
    attach: function (context) {
      const lessonPlanGrouping = context
        .querySelectorAll('.view--lesson-plans-full--grouping');
      const termFilters = document.querySelectorAll(
        '#views-exposed-form-lesson-plan-full-full-view [id^=edit-resource-topic-] input'
      );
      let filtered = false;
      let tidsToShow = [];

      termFilters.forEach(function (el) {
        if (el.checked) {
          filtered = true;
          tidsToShow.push(el.value);
        }
      });

      if (filtered) {
        lessonPlanGrouping.forEach(function (el) {
          if (tidsToShow.indexOf(el.dataset.groupTitle)) {
            el.classList.add('hidden');
          }
          else {
            el.classList.remove('hidden');
          }
        });
      }
    }
  };

})(document, Drupal);
