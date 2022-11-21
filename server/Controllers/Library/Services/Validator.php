<?php

namespace Server\Controllers\Library\Services;

// use Violin\Violin;
use Server\Database\Models\User;
// use Server\Database\Models\Admin;

class Validator 
{

    // public function __construct()
    // {


    //     $max = ini_get('upload_max_filesize');

    //     $this->addRuleMessage('imagesize', 'image is too large, max upload size is ' . $max . 'B. Please upload a smaller file or contact webmaster');

    //     $this->addRuleMessage('imageformat', 'image format not supported, must be jpg or png');

    //     $this->addRuleMessage('emailAlreadyExists', 'email already exists');


    //     // $this->addRuleMessage('exists', 'already exists');

    //     // $this->addRuleMessage('existsUserEmail', 'email not found');

    //     // $this->addRuleMessage('existsAdminEmail', 'email not found');


    //     // $this->addRuleMessage('notExistsAdminEmail', 'email already exists');

    //     // $this->addRuleMessage('passwordMatchesUserEmail', 'invalid email and password combination');

    //     // $this->addRuleMessage('passwordMatchesAdminEmail', 'invalid email and password combination');

    //     // $this->addRuleMessage('filesize', 'file is too large, max upload size is ' . $max . 'B. Please upload a smaller file or contact webmaster');



    //     // $this->addRuleMessage('musicformat', 'music format not supported, must be mp3');

    //     // $this->addRuleMessage('videoformat', 'video format not supported, must be mp4, 3gp or mkv');

    //     // $this->addRuleMessage('gameformat', "game format not supported, must be 'apk','ipa','exe','gba','nes','iso' or 'zip'");
    // }

    // public function validate_emailAlreadyExists($value, $input, $args)
    // {
    //     return !User::where('email', $value)->exists();
    // }


    // public function validate_imagesize($single, $all, $args)
    // {

    //     if ($single == 0) {
    //         return false;
    //     }

    //     return true;
    // }

    // private function checkFormat($filename, $supported)
    // {
    //     $filename = strtolower($filename);
    //     $end = strlen($filename);
    //     $start = $end - 3;
    //     $format = substr($filename, $start, $end);
    //     return in_array($format, $supported);
    // }

    // public function validate_imageformat($single, $all, $args)
    // {
    //     if ($single == '') {
    //         return true;
    //     }

    //     return $this->checkFormat($single, ['jpg', 'png', 'peg', 'mp4', '3gp']);
    // }

    // public function validateRules($rules)
    // {
    //     $this->validate($rules);
    //     return $this->errors()->all();
    // }

    // public function validateExists($model, $column, $field)
    // {
    //     $exists = $model->where($column, $field)->exists();
    //     if ($exists) {
    //         $error = $column . ' already exists';
    //         return [$error];
    //     }

    //     return [];
    // }

    // public function validateExistsForUpdate($model, $column, $field, $otherColumn, $otherField)
    // {
    //     $exists = $model->where($column, $field)->where($otherColumn, '!=', $otherField)->exists();
    //     if ($exists) {
    //         $error = $column . ' already exists';
    //         return [$error];
    //     }

    //     return [];
    // }

    // public function validate_existsUserEmail($value, $input, $args)
    // {
    //     return User::where('email', $value)->exists();
    // }

    // public function validate_existsAdminEmail($value, $input, $args)
    // {
    //     return Admin::where('email', $value)->exists();
    // }



    // public function validate_notExistsAdminEmail($value, $input, $args)
    // {
    //     return !Admin::where('email', $value)->exists();
    // }

    // public function validate_passwordMatchesAdminEmail($value, $input, $args)
    // {
    //     return Admin::where('password', $value)->where('email', $args[0])->exists();
    // }

    // public function validate_passwordMatchesUserEmail($value, $input, $args)
    // {
    //     return User::where('password', $value)->where('email', $args[0])->exists();
    // }

    // public function validate_filesize($single, $all, $args)
    // {

    //     if ($single == 0) {
    //         return false;
    //     }

    //     return true;
    // }



    // public function validate_musicformat($single, $all, $args)
    // {
    //     if ($single == '') {
    //         return true;
    //     }

    //     return $this->checkFormat($single, ['mp3']);
    // }

    // public function validate_videoformat($single, $all, $args)
    // {
    //     if ($single == '') {
    //         return true;
    //     }

    //     return $this->checkFormat($single, ['mp4', '3gp', 'mkv']);
    // }

    // public function validate_gameformat($single, $all, $args)
    // {
    //     if ($single == '') {
    //         return true;
    //     }

    //     return $this->checkFormat($single, ['apk', 'ipa', 'exe', 'gba', 'nes', 'iso', 'zip']);
    // }
}