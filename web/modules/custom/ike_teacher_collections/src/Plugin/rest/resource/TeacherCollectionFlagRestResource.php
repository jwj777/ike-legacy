<?php

namespace Drupal\ike_teacher_collections\Plugin\rest\resource;

use Drupal\rest\ModifiedResourceResponse;
use Drupal\rest\Plugin\ResourceBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * Provides a resource to get view modes by entity and bundle.
 *
 * @RestResource(
 *   id = "teacher_collection_flag_rest_resource",
 *   label = @Translation("Teacher collection flag rest resource"),
 *   uri_paths = {
 *     "create" = "/api/teacher-collection-flag/create"
 *   }
 * )
 */
class TeacherCollectionFlagRestResource extends ResourceBase {

  /**
   * A current user instance.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $currentUser;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = parent::create($container, $configuration, $plugin_id, $plugin_definition);
    $instance->logger = $container->get('logger.factory')->get('ike_teacher_collections');
    $instance->currentUser = $container->get('current_user');
    return $instance;
  }

  /**
   * Creates a flag given a flag and entity for a user.
   *
   * @param Symfony\Component\HttpFoundation\Request $request
   *   The request object.
   *
   * @return \Drupal\rest\ModifiedResourceResponse
   *   The HTTP response object.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   *   Throws exception expected.
   */
  public function post(Request $request) {
    $payload = json_decode($request->getContent(), TRUE);
    // You must to implement the logic of your REST Resource here.
    // Use current user after pass authentication to validate access.
    if (!$this->currentUser->hasPermission('access content')) {
      throw new AccessDeniedHttpException();
    }

    $flag_storage = \Drupal::entityTypeManager()->getStorage('flag');
    $flag_service = \Drupal::service('flag');

    $flag = $flag_storage->load($payload['flag']);
    if ($flag) {
      // See if entity is already flagged, if not we flag it.
      $entity = $flag_service->getFlaggableById($flag, $payload['entity_id']);
      $is_flagged = $flag_service->getFlagging($flag, $entity, \Drupal::currentUser());

      if ($is_flagged === NULL) {
        $flag_service->flag($flag, $entity);
      }

    }

    return new ModifiedResourceResponse($payload, 200);
  }

}
