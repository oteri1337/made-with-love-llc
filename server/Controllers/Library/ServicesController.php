<?php

namespace Server\Controllers\Library;

use Server\Controllers\Library\Services\Validator;
use Server\Controllers\Library\Services\Renderer;
use Server\Controllers\Library\Services\Sender;
use Server\Controllers\Library\Services\Logger;

class ServicesController
{

    public $validator;

    public $renderer;

    public $sender;

    public $logger;

    public function __construct()
    {
        $this->validator = new Validator;

        $this->renderer = new Renderer;

        $this->sender = new Sender;

        $this->logger = new Logger;
    }
}