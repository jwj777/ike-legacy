<?php

namespace Drupal\ike_teacher_collections\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\node\NodeInterface;

/**
 * Provides a 'AddToClassroomBlock' block.
 *
 * @Block(
 *  id = "add_to_classroom_block",
 *  admin_label = @Translation("Add To Classroom Block"),
 * )
 */
class AddToClassroomBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $flags = $this->getUsersFlags();

    // Get current node
    // used to know if it's flagged already
    // also to pass to frontend what node we possibly need to flag.
    $node = \Drupal::routeMatch()->getParameter('node');
    $nid = NULL;
    if ($node instanceof NodeInterface) {
      $nid = $node->id();
    }
    if (array_key_exists('nid', $this->configuration)) {
      $nid = $this->configuration['nid'];
    }

    $flag_storage = \Drupal::entityTypeManager()->getStorage('flag');
    $flag_service = \Drupal::service('flag');

    $render_flags = [];
    foreach ($flags as $flag) {
      // Load the current flag and see if this entity is
      // flagged already with this flag.
      $loaded_flag = $flag_storage->load($flag->relatedflag->target_id);
      if ($loaded_flag) {
        $entity = $flag_service->getFlaggableById($loaded_flag, $nid);
        if (!is_null($entity)) {
          $is_flagged = $flag_service->getFlagging($loaded_flag, $entity, \Drupal::currentUser());
        }

        if ($is_flagged !== NULL) {
          $is_flagged = TRUE;
        }
      }

      if (isset($nid) && isset($flag)) {
        // Create array of options that will be passed to frontend
        // to show flag info to users.
        $render_flags[$flag->id()] = [
          'name' => $flag->name->value,
          'id' => $flag->id(),
          'target_flag' => $flag->relatedflag->target_id,
          'node_id' => $nid,
          'is_flagged' => $is_flagged,
        ];
      }
    }
    $build = [];
    $build['#theme'] = 'add_to_classroom_block';
    $build['add_to_classroom_block']['#markup'] = 'Implement AddToClassroomBlock.';
    $build['#flags'] = $render_flags;

    return $build;
  }

  /**
   * Get cache max age.
   */
  public function getCacheMaxAge() {
    return 0;
  }

  /**
   * Based on current user get all flags they have access to.
   *
   * @return array
   *   Array of flagging collections.
   */
  private function getUsersFlags() {
    $user_id = \Drupal::currentUser()->id();
    $flag_collection_storage = \Drupal::entityTypeManager()->getStorage('flagging_collection');
    $flag_collections = $flag_collection_storage->loadByProperties([
      'user_id' => $user_id,
    ]);
    return $flag_collections;
  }

}
