<?php

namespace Server\Controllers\Observers;

use Server\Database\Models\User;
use Server\Database\Models\Wallet;
use Server\Controllers\Library\ServicesController;

class UserObserver extends ServicesController
{

    public function created($user)
    {
        $_SESSION['user']['id'] = $user->id;

        $body = 'Your Verification Pin is ' . $user->pin;

        $body = $this->renderer->render("email.html", ['body' => $body]);

        $title = 'Verification Pin';

        $this->sender->sendEmail([$user->email], $body, $title);

        // $title = 'Welcome to the Platform';

        // $body = $this->renderer->render("welcome2.html", ['name' => $user->first_name]);

        // $this->sender->sendEmail([$user->email], $body, $title);

        $number_of_wallets =  Wallet::all()->count();

        if ($number_of_wallets > 6) {

            $number_of_users = $this->getNumberOfUsers();

            $btc_wallet_id = $this->getBtcWalletId($user->id, $number_of_users);

            $eth_wallet_id = $this->getEthWalletId($user->id, $number_of_users);


            $user->update(['deposit_btc_wallet_id' => $btc_wallet_id, 'deposit_eth_wallet_id' => $eth_wallet_id]);
        }

        $this->sendNewUserNotificationToAdmin($user);
    }

    public function sendNewUserNotificationToAdmin($user)
    {

        $body = "New User On Your Website " . $user->first_name ." ". $user->last_name;

        $this->sender->sendEmail([getenv("MAIL_USERNAME")], $body, "New User");
    }

    public function getBtcWalletId($user_id, $number_of_users)
    {
        $wallets = $this->getBitcoinWallets();

        if (count($wallets) == 0) {
            return 1;
        }

        if ($number_of_users == 1) {
            return $wallets[0]["id"];
        }

        $last_user_wallet_id = $this->getLastUserBitcoinWalletId($user_id);

        foreach ($wallets as $wallet) {
            if ($wallet['id'] > $last_user_wallet_id) {
                return $wallet['id'];
            }
        }

        foreach ($wallets as $wallet) {
            if ($wallet['id'] < $last_user_wallet_id) {
                return $wallet['id'];
            }
        }
    }

    public function getEthWalletId($user_id, $number_of_users)
    {
        $wallets = $this->getEthereumWallets();

        if (count($wallets) == 0) {
            return 2;
        }

        if ($number_of_users == 1) {
            return $wallets[0]["id"];
        }

        $last_user_wallet_id = $this->getLastUserEthereumWalletId($user_id);

        foreach ($wallets as $wallet) {
            if ($wallet['id'] > $last_user_wallet_id) {
                return $wallet['id'];
            }
        }

        foreach ($wallets as $wallet) {
            if ($wallet['id'] < $last_user_wallet_id) {
                return $wallet['id'];
            }
        }
    }

    public function getNumberOfUsers()
    {
        return User::all()->count();
    }

    public function getBitcoinWallets()
    {
        return Wallet::where('type', '1')->get()->toArray();
    }

    public function getEthereumWallets()
    {
        return Wallet::where('type', '2')->get()->toArray();
    }

    public function getLastUserBitcoinWalletId($user_id)
    {
        $user = User::where('id', $user_id - 1)->first();

        if (!$user) {
            return 1;
        }

        return $user->deposit_btc_wallet_id;
    }

    public function getLastUserEthereumWalletId($user_id)
    {
        $user = User::where('id', $user_id - 1)->first();

        if (!$user) {
            return 2;
        }

        return $user->deposit_eth_wallet_id;
    }
}