<?php

namespace Server\Controllers\Library\Services;

use Twig\Loader\FilesystemLoader;
use Twig\Environment;

class Renderer
{

    private $lib;

    public function __construct()
    {

        $loader = new FilesystemLoader(__DIR__ . "/../../../../public_html");

        $this->lib = new Environment($loader, ['cache' => false]);
    }


    public function render($view, $data = [])
    {

        $data['NODE_NAME'] = getenv("NODE_NAME");

        return $this->lib->render($view, $data);
    }
}