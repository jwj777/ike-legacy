<?php

namespace Drupal\ike_teacher_collections\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'CreateTeacherCollectionBlock' block.
 *
 * @Block(
 *  id = "create_teacher_collection_block",
 *  admin_label = @Translation("Create teacher collection block"),
 * )
 */
class CreateTeacherCollectionBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 'create_teacher_collection_block';
    $build['create_teacher_collection_block']['#markup'] = 'Implement CreateTeacherCollectionBlock.';

    return $build;
  }

}
