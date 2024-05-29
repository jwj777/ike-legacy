!((document, Drupal) => {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */
  Drupal.behaviors.ikeEmailSignup = {
    attach: function (context) {
      const emailSignupTrigger = context.querySelector('#block-email-signup__trigger');
      const emailFormWrapper = context.querySelector('.block-main-email-signup__form');
      const emailOverlay = context.querySelector('.block-main-email-signup__overlay');

      if (emailSignupTrigger) {
        emailSignupTrigger.addEventListener('click', function (e) {
          e.preventDefault();
          emailFormWrapper.classList.toggle('hidden');
        });
      }

      if (emailOverlay) {
        emailOverlay.addEventListener('click', function (e) {
          e.preventDefault();
          emailFormWrapper.classList.toggle('hidden');
        });
      }
    }
  };

  Drupal.behaviors.ikeEducationEmailSignup = {
    attach: function (context) {
      const emailSignupTrigger = context
        .querySelector('#block-ike-education-email-signup__trigger');
      const emailFormWrapper = context
        .querySelector('.block-ike-education-email-signup__form');
      const emailOverlay = context
        .querySelector('.block-ike-education-email-signup__overlay');

      if (emailSignupTrigger) {
        emailSignupTrigger.addEventListener('click', function (e) {
          e.preventDefault();
          emailFormWrapper.classList.toggle('hidden');
        });
      }

      if (emailOverlay) {
        emailOverlay.addEventListener('click', function (e) {
          e.preventDefault();
          emailFormWrapper.classList.toggle('hidden');
        });
      }
    }
  };
})(document, Drupal);
