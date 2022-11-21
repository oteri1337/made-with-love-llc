<?php

use Slim\Factory\AppFactory;

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$container = $app->getContainer();

require_once("errors.php");
require_once("database.php");
require_once("routes.php");
