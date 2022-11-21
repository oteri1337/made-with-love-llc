<?php

namespace Server\Controllers;

use Server\Controllers\Library\AuthController;
use Server\Database\Models\Admin;

class AdminsController extends AuthController
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Admin;
        $this->authKey = 'admin';
    }
}