<?php

namespace Drupal\ike_teacher_collections\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * The TeacherCollection configuration form.
 */
class TeacherCollectionConfigForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'ike_teacher_collections.teachercollectionconfig',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'teacher_collection_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('ike_teacher_collections.teachercollectionconfig');
    $form['teacher_lesson_page_title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Teacher Lesson Page Title'),
      '#description' => $this->t('The Page Title after the User&#039;s name. (&#039;s Classroom)'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('teacher_lesson_page_title'),
    ];
    $form['classroom_body'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Classroom Body'),
      '#description' => $this->t('The main body text under the title and before the Collections'),
      '#default_value' => $config->get('classroom_body'),
    ];
    $form['teacher_lesson_hero_image'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Hero Image'),
      '#target_type' => 'media',
      '#description' => $this->t('The image to show on the top of the page.'),
      // '#default_value' => $config->get('teacher_lesson_hero_image'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('ike_teacher_collections.teachercollectionconfig')
      ->set('teacher_lesson_page_title', $form_state->getValue('teacher_lesson_page_title'))
      ->set('classroom_body', $form_state->getValue('classroom_body'))
      ->set('teacher_lesson_hero_image', $form_state->getValue('teacher_lesson_hero_image'))
      ->save();
  }

}
