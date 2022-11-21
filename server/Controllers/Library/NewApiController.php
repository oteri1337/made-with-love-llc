<?php

namespace Server\Controllers\Library;

use Server\Controllers\Library\Traits\UtilsTrait;

class NewApiController extends ServicesController
{
    use UtilsTrait;

    public $model;
    public $readBy;
    public $searchBy;
    public $perPage;

    public function __construct($model = [], $readBy = "id", $searchBy = "id", $perPage = 20)
    {
        parent::__construct();

        $this->data = [
            'errors' => [],
            'message' => '',
            'data' => (object) [],
        ];

        $this->model = $model;
        $this->readBy = $readBy;
        $this->perPage = $perPage;
        $this->searchBy = $searchBy;
    }

    public function create($request, $response)
    {
        $body = $request->getParsedBody();

        $createRules = $this->beforeValidateCreate($body);

        $this->validator->validate($createRules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }


        $body = $this->beforeCreate($body);

        $row = $this->model->create($body);

        $row = $this->afterCreate($row);

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function beforeValidateCreate($body)
    {
        return [];
    }

    public function beforeCreate($body)
    {
        return $body;
    }

    public function afterCreate($row)
    {
        return $this->model->where('id', $row->id)->first();
    }
}