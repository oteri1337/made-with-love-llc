<?php

namespace Server\Controllers\Validators; 

use Violin\Violin;
use Server\Controllers\Library\Services\Validator;

class ApiValidator extends Validator
{

    public $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function apiCreate($body)
    {
        return [];
    }

    public function apiRead($attr)
    {
        $exits = $this->model->where("id", $attr)->exists();

        if (!$exits) {
            return ['not found'];
        }

        return [];
    }

    public function apiUpdate($body)
    {
        $exits = $this->model->where("id", $body["id"])->exists();

        if (!$exits) {
            return ['not found'];
        }

        return [];
    }

    public function apiDelete($body)
    {
        $exits = $this->model->where("id", $body["id"])->exists();

        if (!$exits) {
            return ['not found'];
        }

        return [];
    }

    public function apiSearch($body)
    {

        if (!isset($body['search'])) {
            return ['search term is required'];
        }

        return [];
    }
}