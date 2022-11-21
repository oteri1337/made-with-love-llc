<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('users', function (Blueprint $table) {

            // auth
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('password');

            // codes
            $table->integer('pin')->nullable();
            $table->string('email_token')->nullable();
            $table->string('password_token')->nullable();

            // verifications
            // $table->boolean('device_verified')->default(0);
            // $table->enum('identity_verified',['Pending','Skipped','Verifying','Verified'])->default('Pending');
            $table->enum('id_verification',['Pending','Skipped','In Progress','Completed'])->default('Pending');
            $table->enum('email_verification',['Pending','Skipped','In Progress','Completed'])->default('Pending');
            $table->enum('address_verification',['Pending','Skipped','In Progress','Completed'])->default('Pending');

            // profile
            $table->string('dob')->default('');
            $table->string('city')->default('');
            $table->string('state')->default('');
            $table->string('country')->default('');
            $table->string('last_name')->default('');
            $table->string('post_code')->default('');
            $table->string('created_ip')->default(''); 
            $table->string('first_name')->default('');
            $table->string('currency')->default("USD");
            $table->string('mobile_number')->default('');
            $table->text('push_subscription')->nullable();
            $table->string('street_address')->default('');
            $table->string('photo_back_view')->default('');
            $table->string('photo_front_view')->default('');
            $table->integer('pending_deposits')->default(0);
            $table->string('photo_utility_bill')->default('');
            $table->integer('pending_withdrawals')->default(0);
            $table->string('photo_profile')->default("camera.png");

            $table->string('created_at_month')->default('');
            $table->string('created_at_day')->default('');

            // $table->string('plan')->default("");
            // $table->string('withdrawal_code')->default("");

            // referrals 
            $table->string('referral_link')->nullable();
            $table->integer('referral_count')->nullable();
            $table->integer('referral_rank')->default(0);
            $table->integer('user_id')->nullable();

            // balance
            $table->float('trading_balance', 11, 2)->default(0);
            $table->float('trading_profit', 11, 2)->default(0);
            $table->float('trading_deposit', 11, 2)->default(0);
            $table->integer('signal_strength')->default(1);

            $table->string("message")->default("");
            $table->enum("message_type", ['Normal', 'Popup'])->default("Normal");
            $table->enum('account_status',['Active','Locked','Review'])->default('Active');

            $has_mining = getenv("NODE_MINING");
            if ($has_mining === "yes") {

                // mining balance
                $table->float('mining_balance_bnb', 11, 5)->default(0.00000);
                $table->float('mining_balance_bitcoin', 11, 5)->default(0.00000);
                $table->float('mining_balance_ethereum', 11, 5)->default(0.00000);
                $table->float('mining_balance_dogecoin', 11, 2)->default(0.00000);
                $table->float('mining_balance_cosmos', 11, 5)->default(0.00000);

                // mining hashrate
                $table->integer('mining_hashrate_bnb')->default(0);
                $table->integer('mining_hashrate_bitcoin')->default(0);
                $table->integer('mining_hashrate_ethereum')->default(0);
                $table->integer('mining_hashrate_dogecoin')->default(0);
                $table->integer('mining_hashrate_cosmos')->default(0);

                // mining speed
                $table->float('mining_speed_ps_bnb', 11, 8)->nullable();
                $table->float('mining_speed_ps_bitcoin', 11, 8)->nullable();
                $table->float('mining_speed_ps_ethereum', 11, 8)->nullable();
                $table->float('mining_speed_ps_dogecoin', 11, 8)->nullable();
                $table->float('mining_speed_ps_cosmos', 11, 8)->nullable();



            }

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('users');
    }
}