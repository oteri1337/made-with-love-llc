<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class User extends ApiModel 
{

    public $apiSearchBy = "first_name";


    protected $fillable = [
        'dob',
        'pin',
        'city',
        'state',
        'email',
        'user_id',
        'message',
        'country',
        'currency',
        'password',
        'post_code',
        'last_name',
        'created_ip',
        'first_name',
        'email_token',
        'message_type',
        'photo_profile',
        'mobile_number',
        'trading_profit',
        'account_status',
        'street_address',
        'password_token',
        'photo_back_view',
        'id_verification',
        'device_verified',
        'trading_deposit',
        'trading_balance',
        'withdrawal_code',
        'signal_strength',
        'photo_front_view',
        'identity_verified',
        'push_subscription',
        'email_verification',
        'photo_utility_bill',
        'address_verification',
        'deposit_btc_wallet_id',
        'deposit_eth_wallet_id',
    ];


 
}