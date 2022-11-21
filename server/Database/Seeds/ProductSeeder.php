<?php


use Phinx\Seed\AbstractSeed;

class ProductSeeder extends AbstractSeed
{

    public function run()
    {

        $data[] = [
            'title' => "Ecommerce Website Script",
            'slug' => "ecommerce",
            'price' => 99,
            'description' => '
Ecommerce website script developed with PHP (Slim Framework), JavaScript(React JS) and MySQL. The same script is used for this website. The script download link will be sent to you after successful payment.

Same day delivery

We deliver via email

100% refund available if requested 

You can only return this product within 30 days of reciept
            ',
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $this->table('products')->insert($data)->save();
    }

}