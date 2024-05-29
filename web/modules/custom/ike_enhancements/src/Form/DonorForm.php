<?php

namespace Drupal\ike_enhancements\Form;

use Drupal\Core\Database\Database;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;

/**
 * Class FilesForm.
 */
class DonorForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'donor_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    foreach ($form_state->getValues() as $key => $value) {
      // @todo Validate fields.
    }
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $d7_db = Database::getConnection('default', 'drupal7');
    $donation_query = $d7_db->select('node', 'n');
    $donation_query->condition('n.type', 'donation_levels');
    $donation_query->fields('n', ['nid', 'title']);
    $donation_query = $donation_query->execute()->accessCheck(false)->fetchAllAssoc('nid');

    $donors_query = $d7_db->select('node', 'n');
    $donors_query->leftJoin('field_data_field_donation_level', 'dl', 'n.nid = dl.entity_id');
    $donors_query->condition('n.type', 'donors');
    $donors_query->fields('n', ['nid', 'title'])
      ->fields('dl', ['field_donation_level_target_id']);
    $donors_query = $donors_query->accessCheck(false)->execute()->fetchAll();

    foreach ($donors_query as $donor) {
      $donation_level_id = !empty($donor->field_donation_level_target_id) ? $donor->field_donation_level_target_id : NULL;

      if ($donation_level_id) {
        $donation_level = $donation_query[$donation_level_id];
        $donation_level_title = $donation_level->title;

        $d8_tid = $this->getTidByName($donation_level_title);
        if ($d8_tid) {

          // Remove stupid break tag which is in some titles.
          $title = str_replace("<br>", " ", $donor->title);

          $node = Node::create([
            'type' => 'sponsors',
            'title' => $title,
            'field_sponsor_donation_level' => [
              'target_id' => $d8_tid,
            ],
          ]);
          $node->save();
        }
      }
    }
    \Drupal::messenger()->addStatus('Donors imported successfully');
  }

  /**
   * Get taxonomy ID by name.
   */
  public function getTidByName($name = NULL) {
    if (empty($name)) {
      return 0;
    }
    $properties = [
      'name' => $name,
    ];
    $terms = \Drupal::service('entity_type.manager')->getStorage('taxonomy_term')->loadByProperties($properties);
    $term = reset($terms);
    return !empty($term) ? $term->id() : 0;
  }

}
