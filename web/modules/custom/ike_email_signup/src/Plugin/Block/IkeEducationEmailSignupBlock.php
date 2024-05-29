<?php

namespace Drupal\ike_email_signup\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'IkeEducationEmailSignupBlock' block.
 *
 * @Block(
 *  id = "ike_education_email_signup_block",
 *  admin_label = @Translation("IKE Education Email signup block"),
 * )
 */
class IkeEducationEmailSignupBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 'ike_education_email_signup_block';
    return $build;
  }

}
