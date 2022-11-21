<?php

use Server\Controllers\AdminsController;

$app->get('/api/admins/auth/status', AdminsController::class.':status'); 

$app->post('/api/admins/auth/signin', AdminsController::class.':signin'); 

$app->get('/api/admins/auth/signout', AdminsController::class.':signout'); 


$app->patch('/api/admins/auth/password/update', AdminsController::class.':updatePassword');

$app->post('/api/admins/auth/password/token', AdminsController::class.':tokenForPasswordUpdate'); 

$app->patch('/api/admins/auth/update/changepassword', AdminsController::class . ':changePassword')->add($admin_logged_in);