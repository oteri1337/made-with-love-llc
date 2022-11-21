<?php

use Server\Controllers\Library\Middlewares\UserLoggedIn;
use Server\Controllers\Library\Middlewares\AdminLoggedIn;
use Server\Controllers\Library\Middlewares\UserOrAdminLoggedIn;

$user_logged_in = new UserLoggedIn;
$admin_logged_in = new AdminLoggedIn;
$user_or_admin_logged_in = new UserOrAdminLoggedIn;

require_once('Routes/admins_auth_routes.php');
require_once('Routes/users_auth_routes.php');
require_once('Routes/users_routes.php');

require_once('Routes/products_routes.php');
require_once('Routes/cms_routes.php');