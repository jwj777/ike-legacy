<?php

namespace Drupal\ike_timeline\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class TimelineSearchController extends ControllerBase {

  public function search() {
    $result = [];

    $term = $_GET['term'];
    $json = json_decode(file_get_contents($this->siteURL() . '/modules/custom/ike_timeline/src/static/api/milestones.json'), true);

    foreach ($json['data'] as $milestone) {
      $title = $milestone['title'];

      if(preg_match("/{$term}/i", $title)) {
        $result[] = [
          'collection' => 'milestones',
          'oid' => $milestone['oid'],
          'title' => $title
        ];
      }
    }

    $results_container = array('results' => $result);
    return new JsonResponse($results_container);
  }

  public function siteURL() {
    $protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ||
      $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $domainName = $_SERVER['HTTP_HOST'];
    return $protocol.$domainName;
  }
}
