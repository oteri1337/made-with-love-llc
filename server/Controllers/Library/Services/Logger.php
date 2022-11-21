<?php

namespace Server\Controllers\Library\Services;

use Monolog\Handler\StreamHandler;
use Monolog\Logger as Monolog;

class Logger
{


    public function log($log)
    {
        $log = new Monolog('name');
        $log->pushHandler(new StreamHandler(LOG_FILE, Monolog::WARNING));
        $log->warning($log);
    }
}