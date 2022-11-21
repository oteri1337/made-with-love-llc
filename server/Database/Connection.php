<?php

namespace Server\Database;

class Connection
{
    public $capsule;

    public function __construct()
    {
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../..");
        $dotenv->load();

        $settings = [
            'driver' => 'mysql',
            'port' => '8889',
            'host' => getenv("DB_HOST"),
            'database' => getenv("DB_NAME"),
            'username' => getenv("DB_USERNAME"),
            'password' => getenv("DB_PASSWORD"),
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'strict' => false,
            'engine' => null
        ];

        $capsule = new \Illuminate\Database\Capsule\Manager;
        $capsule->addConnection($settings);
        $capsule->setEventDispatcher(new \Illuminate\Events\Dispatcher);
        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        \Illuminate\Pagination\Paginator::currentPathResolver(function () {
            return strtok($_SERVER['REQUEST_URI'] ?? "", '?') ?? '/';
        });

        \Illuminate\Pagination\Paginator::currentPageResolver(function () {
            return $_GET['page'] ?? 1;
        });

        $this->capsule = $capsule;
    }
}
