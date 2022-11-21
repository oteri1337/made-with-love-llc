<?php

namespace Server\Controllers\Library;

use Server\Controllers\Library\Traits\UtilsTrait;

class ApiController extends ServicesController
{
    use UtilsTrait;

    public $model;

    public $perPage = 150;

    public $readBy = "id";

    public $searchBy = "id";

    public function __construct()
    {
        parent::__construct();

        $this->data = [
            'errors' => [],
            'message' => '',
            'data' => (object) [],
        ];
    }

    public function create($request, $response)
    {
        $body = $request->getParsedBody();

        $createRules = $this->createRules($body);

        $this->validator->validate($createRules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $body = $this->createBody($body);

        $row = $this->model->create($body);

        $row = $this->model->where('id', $row->id)->first();

        $row = $this->relationships($row);

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function read($request, $response)
    {
        $attr = $request->getAttribute('attr');

        $row = $this->model->where($this->readBy, $attr)->first();
        if (!$row) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->relationships($row);

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update($request, $response)
    {
        $body = $request->getParsedBody();
        $attr = $body["id"];
        $rules = $this->updateRules($body) ?? [];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->where("id", $attr)->first();
        if (!$row) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $cleanBody = $this->updateBody($body, $row);
        $row = $row->update($cleanBody);

        $row = $this->model->where("id", $attr)->first();
        $this->data['data'] = $row;
        $this->data['message'] = 'Update Successful';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete($request, $response)
    {
        $body = $request->getParsedBody();

        $attr = $body["id"];

        $row = $this->model->where("id", $attr)->first();

        if (!$row) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row->delete();

        $optimized = $this->getOptimizedList();
        $this->data['data'] = $optimized;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function list($request, $response)
    {
        $optimized = $this->getOptimizedList();

        $this->data['data'] = $optimized;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function search($request, $response)
    {
        $body = $request->getParsedBody();
        $attr = $body['search'] ?? '';

        $row = $this->model->where($this->searchBy, 'LIKE', "%{$attr}%");
        $collection = $row->get();
        $paginator = $row->paginate("12");
        $row = $this->optimize($paginator, $collection);

        $this->data['data'] = $row;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}