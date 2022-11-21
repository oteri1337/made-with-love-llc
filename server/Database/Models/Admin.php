<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{

    protected $fillable = [
        'email',
        'password',
        'first_name',
        'last_name',
        'other_name',
        'email_token',
        'password_token',
        'email_verified'
    ];

    protected $hidden = ['password'];

    public static function relationships($admin)
    {
        return $admin;
    }
}