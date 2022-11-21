<?php

use Server\Controllers\CmsController;

$app->post('/api/contact', CmsController::class . ':create');

// $app->post('/api/subscribe', CmsController::class . ':subscribe');

$app->get('/[{path:.*}]', CmsController::class . ':renderApp');