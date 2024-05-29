<?php

namespace Drupal\ike_teacher_collections\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Database;
use Drupal\Core\Entity\EntityTypeManager;
use Drupal\flag\Entity\Flag;
use Drupal\user\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * The controller in charge of handling Teacher Collections.
 */
class TeacherCollectionController extends ControllerBase {

  /**
   * The Entity Manager service.
   *
   * @var entityTypeManager EntityTypeManager
   */
  protected $entityTypeManager;

  /**
   * The configuration options.
   *
   * @var array configuration
   */
  protected $configuration;

  /**
   * The create constructor used with the DI style Drupal uses.
   *
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *   The container interface.
   *
   * @return static
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * TeacherCollectionController constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManager $entityTypeManager
   *   The EntityTypeManager.
   */
  public function __construct(EntityTypeManager $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
    $this->configuration = \Drupal::config('ike_teacher_collections.teachercollectionconfig');
  }

  /**
   * Get all flag collections for the user and nodes.
   *
   * Gathers all flag colelctions for the user and then
   * all the nodes the collection has on it and render to page.
   *
   * @var $user \Drupal\user\Entity\User
   */
  public function getCollections(User $user) {
    $content = [];
    $current_user = \Drupal::currentUser();
    $user_id = $current_user->id();
    $content['user_id'] = $user->id();
    $content['current_user_id'] = $user_id;
    $flagging_collection_storage = $this->entityTypeManager->getStorage('flagging_collection');
    $node_storage = $this->entityTypeManager->getStorage('node');
    $media_storage = $this->entityTypeManager->getStorage('media');
    /** @var \Drupal\Core\Entity\EntityViewBuilder $viewBuilder */
    $viewBuilder = \Drupal::entityTypeManager()->getViewBuilder('node');
    $mediaViewBuilder = \Drupal::entityTypeManager()->getViewBuilder('media');
    $renderer = \Drupal::service('renderer');

    /** @var \Drupal\flag\FlagService $flag_service */
    $flag_service = \Drupal::service('flag');

    // Get all collections that belong to this user.
    $collections = $flagging_collection_storage->loadByProperties(
      [
        'user_id' => $user->id(),
      ]
    );

    $teacher_collections = [];

    if ($collections !== NULL) {
      // Foreach collection that this user has get data off it including
      // nodes that are flagged in this collection.
      foreach ($collections as $collection_id => $flagging_collection) {
        $teacher_collections[$collection_id] = [
          'title' => $flagging_collection->label(),
          'subtitle' => $flagging_collection->field_collection_subtitle->value,
          'related_flag' => $flagging_collection->relatedflag->target_id,
          'flagged_nodes' => [],
        ];

        // Get flag on collection, and get all nodes that are flagged with that.
        $flag = $flag_service->getFlagById($flagging_collection->relatedflag->target_id);
        if ($flag) {
          $flagged_nodes = $this->getFlaggedNodes($flag);

          foreach ($flagged_nodes as $result) {
            // Foreach node flagged created teaser view for it.
            $node = $node_storage->load($result->entity_id);
            $nodeView = $viewBuilder->view($node, 'teaser');
            $nodeBuilt = $viewBuilder->build($nodeView);
            $nodeRendered = $renderer->render($nodeBuilt);
            $teacher_collections[$collection_id]['flagged_nodes'][] = $nodeRendered;
          }
        }
      }
    }

    // Build page title with username + title suffix as set in admin form.
    $concat_title = $user->field_first_name->value . ' ' . $user->field_last_name->value . $this->configuration->get('teacher_lesson_page_title');

    // If hero image is set in admin form get it and build a view for it.
    $hero_image = $this->configuration->get('teacher_lesson_hero_image');
    $hero_media = NULL;

    if ($hero_image) {
      $media = $media_storage->load($hero_image);
      $mediaView = $mediaViewBuilder->view($media, 'medium_height_banner_1900x600');
      $mediaBuilt = $mediaViewBuilder->build($mediaView);
      $mediaRendered = $renderer->render($mediaBuilt);
      $hero_media = $mediaRendered;
    }

    $classroom_body = $user->field_classroom_description->value;

    if (is_null($classroom_body)) {
      $classroom_body = $this->configuration->get('classroom_body');
    }

    return [
      '#theme' => 'teacher_collections',
      '#collections' => $teacher_collections,
      '#title' => $concat_title,
      '#body' => $classroom_body,
      '#hero_image' => $hero_media,
      '#content' => $content,
      '#cache' => [
        'max-age' => 0,
      ],
    ];
  }

  /**
   * Redirect from /my-classroom to /user/USERID/classroom.
   */
  public function getClassroomPage() {
    $current_user = \Drupal::currentUser();
    $user_id = $current_user->id();

    // If user is a teacher and logged in then send to classroom.
    // If they dont have the teacher role send to homepage.
    // If not logged in send to login page.
    if (!empty($user_id)) {
      $appropriate_roles = array_intersect(['teacher', 'administrator'], $current_user->getRoles());
      if (!empty($appropriate_roles)) {
        $response = new RedirectResponse('/user/' . $user_id . '/classroom');
      }
      else {
        \Drupal::messenger()->addMessage("You must have the Teacher role to use the Classroom. Please contact an Administrator for help", 'warning');
        $response = new RedirectResponse('/');
      }
    }
    else {
      \Drupal::messenger()->addMessage("You must have the account to use the Classroom", 'warning');
      $response = new RedirectResponse('/user/login');
    }
    // don't send the response yourself inside controller and form.
    $response->send();
  }

  /**
   * Take a Flag Object and get all Entities that are flagged with that flag.
   *
   * @param \Drupal\flag\Entity\Flag $flag
   *   The flag object.
   *
   * @return array
   *   An array of flagged nodes.
   */
  private function getFlaggedNodes(Flag $flag) {
    $drupal8db = Database::getConnection();
    $query = $drupal8db->select('flagging', 'flag');
    $query->fields('flag', [
      'id',
      'flag_id',
      'entity_id',
    ]);
    $query->condition('flag.flag_id', $flag->id());
    return $query->execute()->fetchAll();
  }

}
