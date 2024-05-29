document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  drupalSettings.teacherCollectionCreate = new Vue({ // eslint-disable-line no-undef
    el: '#create-teacher-collection',
    data: {
      title: null,
      description: null,
      token: null,
      submitting: false,
      showForm: false
    },
    methods: {
      submit() {
        if (this.token && this.title) {
          this.submitting = true;
          const data = {
            'type': 'flagging_collection_type_1',
            'name': {
              'value': this.title
            },
            'field_collection_subtitle': {
              'value': this.description
            },
            'templateflag': {
              'target_id': 'flag_list_template_1'
            }
          };
          axios.post('/entity/flagging_collection?_format=json', data, { // eslint-disable-line no-undef, max-len
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': this.token
            }
          })
            .then(() => {
              this.submitting = false;
              this.showForm = false;
              window.location.reload();
            })
            .catch(function (error) {
              this.submitting = false;
              console.log(error); // eslint-disable-line no-console
            });
        }
      }
    },
    mounted() {
      axios.get('/session/token') // eslint-disable-line no-undef
        .then((response) => {
          this.token = response.data;
        });
    }
  });
});
