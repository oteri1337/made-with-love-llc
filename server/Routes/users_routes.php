<?php

use Server\Controllers\UsersController;


$app->post('/api/users/trader', UsersController::class . ':copyTrader');



// Users API

$app->post('/api/users', UsersController::class . ':create');

$app->delete('/api/users', UsersController::class . ':delete')->add($admin_logged_in);

$app->get('/api/users', UsersController::class . ':list')->add($admin_logged_in);

$app->get('/api/users/leaderboard', UsersController::class . ':leaderboard');

$app->get('/api/users/{attr}', UsersController::class . ':read');


$app->post('/api/users/withdrawals', UsersController::class . ':createWithdrawal')->add($user_logged_in);

$app->post('/api/users/send/email', UsersController::class . ':sendEmail')->add($admin_logged_in);

$app->post('/api/users/send/push', UsersController::class . ':sendPush')->add($admin_logged_in);

$app->post('/api/users/search', UsersController::class . ':search');


// For Fast Access To User Data

$app->post('/api/users/deposits', UsersController::class . ':createDeposit');

$app->patch('/api/users/deposits', UsersController::class . ':updateDeposit')->add($admin_logged_in);

$app->delete('/api/users/deposits', UsersController::class . ':deleteDeposit')->add($admin_logged_in);


$app->post('/api/users/trades', UsersController::class . ':createTrade')->add($admin_logged_in);

$app->patch('/api/users/trades', UsersController::class . ':updateTrade')->add($admin_logged_in);

$app->patch('/api/users/trades/date', UsersController::class . ':updateTradeDate')->add($admin_logged_in);


$app->patch('/api/users/message', UsersController::class . ':updateMessage')->add($admin_logged_in);