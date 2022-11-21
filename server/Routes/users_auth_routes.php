<?php

use Server\Controllers\UsersController;



// Users Verification

$app->patch('/api/users/auth/verify/id', UsersController::class . ':updateIDState');

$app->post('/api/users/auth/verify/id', UsersController::class . ':uploadID')->add($user_logged_in); 

$app->post('/api/users/auth/verify/device', UsersController::class . ':verifyDevice')->add($user_logged_in);

$app->post('/api/users/auth/verify/address', UsersController::class . ':uploadAddress')->add($user_logged_in); 






// Users Auth

$app->get('/api/users/auth/status', UsersController::class . ':status');

$app->post('/api/users/auth/signin', UsersController::class . ':signin');

$app->get('/api/users/auth/signout', UsersController::class . ':signout')->add($user_logged_in);



// Tokens

$app->post('/api/users/auth/token/device/verify', UsersController::class . ':tokenForDeviceVerify')->add($user_logged_in);

$app->post('/api/users/auth/token/password/update', UsersController::class . ':tokenForPasswordUpdate');

$app->get('/api/users/auth/token/email/update', UsersController::class . ':tokenForEmailUpdate')->add($user_logged_in);





// Updates

$app->patch('/api/users/auth/update/details', UsersController::class . ':update')->add($user_logged_in);

$app->patch('/api/users/auth/update/password', UsersController::class . ':updatePassword'); 

$app->patch('/api/users/auth/update/changepassword', UsersController::class . ':changePassword')->add($user_logged_in);

$app->patch('/api/users/auth/update/email', UsersController::class . ':updateEmail')->add($user_logged_in);

$app->patch('/api/users/auth/update/phone', UsersController::class . ':updatePhone')->add($user_logged_in);

$app->patch('/api/users/auth/update/address', UsersController::class . ':updateAddress')->add($user_logged_in);

$app->post('/api/users/auth/update/photo', UsersController::class . ':updatePhoto')->add($user_logged_in);