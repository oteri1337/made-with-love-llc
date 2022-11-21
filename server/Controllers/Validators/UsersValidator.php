<?php

namespace Server\Controllers\Validators;

class UsersValidator extends ApiValidator
{

    public function apiCreate($body) {

        if (!isset($body['email'])) {
            return ['email is required'];
        }

        if (!isset($body['password'])) {
            return ['password is required'];
        }

        if (!isset($body['confirm_password'])) {
            return ['Password Confirmation is required'];
        }

        if (!isset($body['first_name'])) {
            return ['First Name is required'];
        }

        if (!isset($body['last_name'])) {
            return ['Last Name is required'];
        }

        if ($body['password'] != $body['confirm_password']) {
            return ['Passwords Do Not Match'];
        }

        if (str_contains($body['first_name'], "/")) {
            return ["First Name Contains Disallowed Character: /"];
        }

        if (str_contains($body['last_name'], "/")) {
            return ["Last Name Contains Disallowed Character: /"];
        }

        $email_exists = $this->model->where("email", $body['email'])->first();
        if ($email_exists) {
            return ["Email Already In Use"];
        }

        return [];
    }

    // public function createRules($body)
    // {
    //     $email = $body['email'] ?? '';
    //     $password = $body['password'] ?? '';
    //     $last_name = $body['last_name'] ?? '';
    //     $first_name = $body['first_name'] ?? ''; 
    //     $confirm_password = $body['confirm_password'] ?? ''; 

    //     return [
    //         'password' => [$password, 'required|min(8)'],
    //         'last_name' => [$last_name, 'required|alnumDash'],
    //         'first_name' => [$first_name, 'required|alnumDash'],
    //         'email' => [$email, 'email|required|emailAlreadyExists'],
    //         'password confirmation' => [$confirm_password, 'required|matches(password)'],
    //     ];
    // }






}