<?php

namespace Drupal\ike_timeline\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;

/**
 * An example controller.
 */
class TimelineController extends ControllerBase {

  /**
   * Returns a render-able array for a test page.
   */
  public function content() {
    $build = array(
      '#theme' => 'html__timeline',
      '#variables' => [
        'title' => 'Eisenhower Interactive Timeline',
        'path' => $this->getModulePath(),
        'hello' => 'Regular'
      ]
    );

    $html = \Drupal::service('renderer')->renderRoot($build);
    $response = new Response();
    $response->setContent($html);

    return $response;
  }

  public function contentMobile() {
    $build = array(
      '#theme' => 'html__timeline-mobile',
      '#variables' => [
        'title' => 'Eisenhower Interactive Timeline',
        'path' => $this->getModulePath(),
        'hello' => 'Regular'
      ]
    );

    $html = \Drupal::service('renderer')->renderRoot($build);
    $response = new Response();
    $response->setContent($html);

    return $response;
  }

  public function contentInternal($milestone_name) {
    $needs_wrapper = false;
    $referer = '';

    if (array_key_exists('HTTP_REFERER', $_SERVER)) {
      $referer = $_SERVER['HTTP_REFERER'];
    } else {
      $needs_wrapper = true;
    }


    if (is_null($referer) && strpos($referer, $_SERVER['REQUEST_URI']) == false) {
      $needs_wrapper = true;
    }

    // Sets wrapper given parameter in url. See extra.js. Disabled for now.
//    if ($_GET['wrap']) {
//      $needs_wrapper = true;
//    }

    $build = array(
      '#theme' => 'html__timeline_internal',
      '#variables' => [
        'title' => 'Eisenhower Interactive Timeline',
        'path' => $this->getModulePath(),
        'milestone_name' => $milestone_name,
        'needs_wrapper' => $needs_wrapper,
      ]
    );

    $html = \Drupal::service('renderer')->renderRoot($build);
    $response = new Response();
    $response->setContent($html);

    return $response;
  }

  public function contentInternalMobile($milestone_name)
  {
    $needs_wrapper = false;
    $referer = '';

    if (array_key_exists('HTTP_REFERER', $_SERVER)) {
      $referer = $_SERVER['HTTP_REFERER'];
    } else {
      $needs_wrapper = true;
    }


    if (is_null($referer) && strpos($referer, $_SERVER['REQUEST_URI']) == false) {
      $needs_wrapper = true;
    }

    if ($_GET['wrap']) {
      $needs_wrapper = true;
    }

    $build = array(
      '#theme' => 'html__timeline_internal_mobile',
      '#variables' => [
        'title' => 'Eisenhower Interactive Timeline',
        'path' => $this->getModulePath(),
        'milestone_name' => $milestone_name,
        'needs_wrapper' => $needs_wrapper,
      ]
    );

    $html = \Drupal::service('renderer')->renderRoot($build);
    $response = new Response();
    $response->setContent($html);

    return $response;
  }


  public function getModulePath() {
    $module_handler = \Drupal::service('module_handler');
    return $module_handler->getModule('ike_timeline')->getPath();
  }
}
