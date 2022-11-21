<?php

namespace Server\Controllers\Validators;

use Server\Database\Models\User;

class WithdrawalsValidator extends ApiValidator
{

    public function apiCreate($body)
    {

        $amount = $body['amount'];
        $user_id = $body['user_id'];

        if (!is_numeric($amount)) {
            return ["amount must be a number"];
        }

        if (!is_numeric($user_id)) {
            return ["user id must be a number"];
        }

        $user = User::where('id', $user_id)->first();

        if (!$user) {
            return ["user not found"];
        }

        // if ($user->address_verification != "Completed") {
        //     return ['Please Complete Your Address Verification To Make Withdrawals'];
        // }

        $user = User::relationships($user);

        // if ($body['withdrawal_code'] != $user->withdrawal_code) {
        //     return ["invalid otp code. contact ".$_ENV['MAIL_USERNAME']." for code recovery"];
        // }

        if ($body['from'] == 1 && $amount > $user->trading_balance) {
            return ["insufficient funds"];
        }

        if ($body['from'] == 2 && $amount > $user->mining_balance_bitcoin) {
            return ["insufficient bitcoin"];
        }

        if ($body['from'] == 3 && $amount > $user->mining_balance_ethereum) {
            return ["insufficient ethereum"];
        }

        if ($body['from'] == 4 && $amount > $user->mining_balance_dogecoin) {
            return ["insufficient dogecoin"];
        }

        if ($body['from'] == 5 && $amount > $user->mining_balance_bnb) {
            return ["insufficient binance coin"];
        }

        return [];
    }
}