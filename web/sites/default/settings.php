<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

$settings['update_free_access'] = FALSE;
$settings['file_private_path'] = '../private';
$settings['entity_update_batch_size'] = 50;

$settings['hash_salt'] = 'asotenuarchqewsmaoeuSNTH56654+';

$settings['config_sync_directory'] = '../config/default/default';

if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  $site_environment = $_ENV['PANTHEON_ENVIRONMENT'];
}
else {
  $site_environment = 'local';
}
$config['config_split.config_split.local']['status'] = FALSE;
$config['config_split.config_split.dev']['status'] = FALSE;
$config['config_split.config_split.stage']['status'] = FALSE;
$config['config_split.config_split.production']['status'] = FALSE;

switch ($site_environment) {
  case 'local':
    $config['config_split.config_split.local']['status'] = TRUE;
    break;

  case 'dev':
    $config['config_split.config_split.dev']['status'] = TRUE;
    break;

  case 'test':
    $config['config_split.config_split.stage']['status'] = TRUE;
    break;

  case 'live':
    $config['config_split.config_split.production']['status'] = TRUE;
    break;
}

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * Skipping permissions hardening will make scaffolding
 * work better, but will also raise a warning when you
 * install Drupal.
 *
 * https://www.drupal.org/project/drupal/issues/3091285
 */
// $settings['skip_permissions_hardening'] = TRUE;

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

// Automatically generated include for settings managed by ddev.
$ddev_settings = dirname(__FILE__) . '/settings.ddev.php';
if (getenv('IS_DDEV_PROJECT') == 'true' && is_readable($ddev_settings)) {
  require $ddev_settings;
}
