<?php

use Server\Database\Connection;

use Server\Database\Models\User;

use Server\Controllers\Observers\UserObserver;


new Connection;

User::observe(new UserObserver);