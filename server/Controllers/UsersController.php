<?php

namespace Server\Controllers;

use Server\Database\Models\User;
use Server\Controllers\Library\SolidController; 
use Server\Controllers\Library\Traits\AuthTrait;


class UsersController extends SolidController
{
    use AuthTrait;

    public function __construct() 
    {
        $this->model = new User;
    }

}