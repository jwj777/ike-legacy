<?php

namespace Drupal\ike_soldiers_generate_pdf\Controller;

use Dompdf\Dompdf;
use Drupal\Core\Controller\ControllerBase;
use Drupal\image\Entity\ImageStyle;
use Drupal\node\NodeInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * A controller for generating PDFs.
 */
class GeneratePDFController extends ControllerBase {

  /**
   * Method for generating a PDF and returning a PDF response.
   */
  public function generate(NodeInterface $soldier) {

    $renderable = [
      '#theme' => 'soldier__pdf',
      '#variables' => [
        'host' => \Drupal::request()->getSchemeAndHttpHost(),
        'module_path' => $this->getModulePath(),
        'soldier_first_name' => $soldier->field_ikes_soldiers_first_name->value,
        'soldier_last_name' => $soldier->field_ikes_soldiers_last_name->value,
        'soldier_image' => $this->getSoldierImage($soldier),
        "date_of_birth" => $soldier->field_ikes_soldiers_birth_date->value,
        "date_of_death" => $soldier->field_ikes_soldiers_death_date->value,
        "birthplace" => $soldier->field_ikes_soldiers_birthplace->value,
        "highest_rank" => $soldier->field_ikes_soldiers_highest_rank->value,
        "branch_of_service" => $this->getBranch($soldier),
        "unit" => $soldier->field_ikes_soldiers_unit->value,
        "theater_of_operation" => $this->getTheatre($soldier),
        "enlisted_date" => $soldier->field_ikes_soldiers_enlistment->value,
        "enlisted_approx" => $soldier->field_ikes_soldiers_approx_enlis->value,
        "discharge_date" => $soldier->field_ikes_soldiers_discharge->value,
        "discharge_approx" => $soldier->field_ikes_soldiers_approx_disch->value,
        "battle" => $soldier->field_ikes_soldiers_battle->value,
        "military_honors" => $soldier->field_ikes_soldiers_mil_honors->value,
        "honored_by" => $soldier->field_ikes_soldiers_honored_by->value,
        "pow" => $soldier->field_ikes_soldiers_p_o_w->value,
        "kia" => $soldier->field_ikes_soldiers_k_i_a->value,
        "biographical_information" => $soldier->field_ikes_soldiers_biography->value,
      ],

    ];

    $rendered = \Drupal::service('renderer')->render($renderable);

    // Need this to load images.
    $options = ['enable_remote' => TRUE];
    $dompdf = new Dompdf($options);

    $dompdf->loadHtml($rendered);
    $dompdf->render();
    $pdf = $dompdf->output();

    $response = new Response();
    $response->headers->set('Content-Type', 'application/pdf');
    $response->setContent($pdf);
    return $response;

  }

  /**
   * Get the module path for this module.
   */
  public function getModulePath() {
    $module_handler = \Drupal::service('module_handler');
    return $module_handler->getModule('ike_soldiers_generate_pdf')->getPath();
  }

  /**
   * Need to get either the actual soldier image or the placeholder ones.
   *
   * Returns a full URL path.
   *
   * @param Entity $soldier
   *   The solider entity.
   *
   * @return string
   *   The full URL path to the image.
   */
  private function getSoldierImage($soldier) {

    $media = $soldier->field_ikes_soldiers_image->entity;
    $file = $media->field_media_image->entity;
    $file_url = isset($file) ? \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri()) : NULL;

    $handle = curl_init($file_url);
    // Dont print to the screen.
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($handle);
    $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
    curl_close($handle);
    if ($httpCode == 404 || $file_url == NULL) {
      $path = ($soldier->field_ikes_soldiers_gender->value == "Female") ? $this->getModulePath() . '/src/assets/female-soldier.jpeg' : $this->getModulePath() . '/src/assets/male-soldier.jpeg';
      return \Drupal::request()->getSchemeAndHttpHost() . '/' . $path;
    }
    curl_close($handle);

    // Use the soldiers image style in the PDF.
    $url = ImageStyle::load('ikes_soldiers_portrait')->buildUrl($file->getFileUri());
    return $url;
  }

  /**
   * Check if the branch is set.
   */
  private function getBranch($soldier) {
    return isset($soldier->field_ikes_soldiers_serv_branch->entity) ? $soldier->field_ikes_soldiers_serv_branch->entity->getName() : NULL;
  }

  /**
   * Check if the theatre is set.
   */
  private function getTheatre($soldier) {
    return isset($soldier->field_ikes_soldiers_theater_op->entity) ? $soldier->field_ikes_soldiers_theater_op->entity->getName() : NULL;
  }

}
