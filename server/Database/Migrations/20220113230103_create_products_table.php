<?php 

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductsTable extends ParentMigration {

    public function up() {
        $this->schema->create('products', function(Blueprint $table) {
            $table->increments('id');

            $table->string('title');
            $table->string('slug')->unique();

            $table->double('price', 11, 2);

            $table->string('image_one')->default("logo.png");

            $table->text('description');

            $table->timestamps();
        });
    }

    public function down() {
        $this->schema->drop('products'); 
    }
}