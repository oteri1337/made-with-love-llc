<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateAdminsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('admins', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('password');

            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('other_name')->nullable();
            $table->string('photo_profile')->default("human.png");

            $table->string('email_token')->nullable();
            $table->string('password_token')->nullable();
            $table->boolean('email_verified')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('admins');
    }
}
