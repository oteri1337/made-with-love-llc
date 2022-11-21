<?php


use Phinx\Seed\AbstractSeed;
use Server\Database\Models\User;

class UserSeeder extends AbstractSeed
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

        $environment = getenv("NODE_ENV");

        if ($environment === "development") {

            $faker = Faker\Factory::create();

            $user = [
                'email' => "test@gmail.com",
                'password' => "password",
                'currency' => 'GBP',
                'message' => 'this is a test message',
                'pin' => rand(11111, 99999),
                'city' => $faker->city,
                'state' => $faker->state,
                'post_code' => $faker->postcode,
                'last_name' => $faker->lastName,
                'first_name' => $faker->firstName,
                'street_address' => $faker->streetAddress,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];

            User::create($user);

            

            $user = [
                'email' => "test2@gmail.com",
                'password' => "password",
                'currency' => 'EUR',
                'message' => 'this is a test message',
                'pin' => rand(11111, 99999),
                'city' => $faker->city,
                'state' => $faker->state,
                'post_code' => $faker->postcode,
                'last_name' => $faker->lastName,
                'first_name' => $faker->firstName,
                'street_address' => $faker->streetAddress,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];

            User::create($user);

        }
    }
}