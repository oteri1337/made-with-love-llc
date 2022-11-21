<?php

namespace Server\Controllers;

use Server\Controllers\Library\SolidController;

use Server\Database\Models\Product;

class ProductsController extends SolidController
{

    public function __construct()
    {
        $this->model = new Product;
    }

}