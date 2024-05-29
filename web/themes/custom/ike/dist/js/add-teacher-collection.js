!((document, Drupal, $) => {
  'use strict';

  Drupal.behaviors.teacherCollectionAdd = {
    attach: function(context) {

      if (typeof drupalSettings.teacherCollectionAdd === 'undefined') {
        drupalSettings.teacherCollectionAdd = new Array();
      }

      let collections = $('.add-teacher-collection', context);

      $.each(collections, function(index, collection) {
        drupalSettings.teacherCollectionAdd[index] =
          new Vue({ // eslint-disable-line no-undef
            el: collection,
            data: {
              token: null,
              submitting: false,
              showForm: false,
              collectionCount: 0,
              currentResponses: 0,
              isActive: false,
            },
            methods: {
              submit() {
                drupalSettings.teacherCollectionAdd[index].currentResponses = 0;
                if (drupalSettings.teacherCollectionAdd[index].token) {
                  // get flag unput info off the page
                  // if they are now marked as being flagged go ahead and flag them
                  const flagForm = document
                    .querySelector('.teacher-collection__form.active');
                  if (flagForm) {
                    drupalSettings.teacherCollectionAdd[index].submitting = true;
                    const inputs = flagForm.querySelectorAll('input');
                    drupalSettings.teacherCollectionAdd[index]
                      .collectionCount = inputs.length;
                    inputs.forEach(function (el) {
                      if (el.checked) {
                        const data = {
                          'flag': el.value,
                          'entity_id': el.dataset.nodeid,
                          'flag_id': el.name
                        };
                        axios.post('/api/teacher-collection-flag/create?_format=json', data, { // eslint-disable-line no-undef, max-len
                          headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-Token': drupalSettings.teacherCollectionAdd[index]
                              .token
                          }
                        })
                          .then(() => {
                            drupalSettings.teacherCollectionAdd[index].currentResponses++;
                            if (
                              drupalSettings.teacherCollectionAdd[index].currentResponses
                              ===
                              drupalSettings.teacherCollectionAdd[index].collectionCount) {
                              drupalSettings.teacherCollectionAdd[index]
                                .showMessage(drupalSettings.teacherCollectionAdd[index]
                                  .collectionCount);
                            }
                          })
                          .catch(function (error) {
                            drupalSettings.teacherCollectionAdd[index].submitting = false;
                            console.log(error); // eslint-disable-line no-console
                          });
                      }
                      else {
                        const data = {
                          'flag': el.value,
                          'entity_id': el.dataset.nodeid,
                          'flag_id': el.name
                        };
                        axios.post('/api/teacher-collection-flag/delete?_format=json', data, { // eslint-disable-line no-undef, max-len
                          headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-Token': drupalSettings.teacherCollectionAdd[index]
                              .token
                          }
                        })
                          .then(() => {
                            drupalSettings.teacherCollectionAdd[index].currentResponses++;
                            if (
                              drupalSettings.teacherCollectionAdd[index].currentResponses
                              ===
                              drupalSettings.teacherCollectionAdd[index].collectionCount) {
                              drupalSettings.teacherCollectionAdd[index]
                                .showMessage(drupalSettings.teacherCollectionAdd[index]
                                  .collectionCount);
                            }
                          })
                          .catch(function (error) {
                            drupalSettings.teacherCollectionAdd[index].submitting = false;
                            console.log(error); // eslint-disable-line no-console
                          });
                      }
                    });
                  }
                }
              },
              showMessage(message) {
                const messageArea = document
                  .querySelector('.teacher-collection__messages');
                drupalSettings.teacherCollectionAdd[index].submitting = false;
                drupalSettings.teacherCollectionAdd[index].showForm = false;
                messageArea.classList.remove('hidden');
                messageArea.innerHTML = `Successfully updated
                  ${message}
                  collections. <a href="/my-classroom">View it here.</a>`;
                setTimeout(function () {
                  messageArea.classList.add('hidden');
                }, 10000);
              },
              activeForm() {
                drupalSettings.teacherCollectionAdd[index]
                  .isActive = !drupalSettings.teacherCollectionAdd[index].isActive;
                drupalSettings.teacherCollectionAdd[index]
                  .showForm = !drupalSettings.teacherCollectionAdd[index].showForm;
              }
            },
            mounted() {
              axios.get('/session/token') // eslint-disable-line no-undef
                .then((response) => {
                  drupalSettings.teacherCollectionAdd[index].token = response.data;
                });
            },
          });
      });
    }
  };
})(document, Drupal, jQuery);
