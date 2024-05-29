<?php

namespace Drupal\ike_email_signup\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'EmailSignupBlock' block.
 *
 * @Block(
 *  id = "email_signup_block",
 *  admin_label = @Translation("Email signup block"),
 * )
 */
class EmailSignupBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 'email_signup_block';
    return $build;
  }

}
