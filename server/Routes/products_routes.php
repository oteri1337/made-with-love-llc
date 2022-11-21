<?php

use Server\Controllers\ProductsController;

$app->get('/api/products', ProductsController::class . ':list');