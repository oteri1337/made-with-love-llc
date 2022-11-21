<?php


use Phinx\Seed\AbstractSeed;

class AdminSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        $data = [];

        $environment = getenv("NODE_ENV");

        $data[] = [
            'email'         => "admin@admin.com",
            'password'      => "adminpassword1337",
            'first_name' => $faker->firstName,
            'last_name' => $faker->lastName,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $this->table('admins')->insert($data)->save();
    }
}
