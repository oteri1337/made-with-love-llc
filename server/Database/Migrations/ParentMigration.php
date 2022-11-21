<?php

namespace Server\Database\Migrations;

use Server\Database\Connection;
use Phinx\Migration\AbstractMigration;
// use Illuminate\Database\Capsule\Manager;

class ParentMigration extends AbstractMigration
{

    protected $schema;

    public function init()
    {
        // $capsule = bootUpEloquent();
        $connection = new Connection;
        $this->schema = $connection->capsule->schema();
    }
}
