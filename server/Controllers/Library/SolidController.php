<?php

namespace Server\Controllers\Library;

use Server\Controllers\Library\Traits\UtilsTrait;

class SolidController
{
    use UtilsTrait;

    public $model;

    public $validator;

    public $data = [
        'data' => [],
        'errors' => [],
        'message' => '',
    ];


    public function read($request, $response)
    {
        $attr = $request->getAttribute('attr');

        $errors = $this->validator->apiRead($attr);

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $data = $this->model->apiRead($attr);

        $this->data['data'] = $data;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function search($request, $response)
    {

        $body = $request->getParsedBody();

        $errors = $this->validator->apiSearch($body);

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $data = $this->model->apiSearch($body);

        $this->data['data'] = $data;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');

    }

    public function create($request, $response)
    {
        $body = $request->getParsedBody();

        $errors = $this->validator->apiCreate($body);

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $data = $this->model->apiCreate($body);

        $this->data['data'] = $data;
        
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }



    public function update($request, $response)
    {
        $body = $request->getParsedBody();

        $errors = $this->validator->apiUpdate($body);

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $data = $this->model->apiUpdate($body);

        $this->data['data'] = $data;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete($request, $response)
    {
        $body = $request->getParsedBody();

        $errors = $this->validator->apiDelete($body);

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $data = $this->model->apiDelete($body);

        $this->data['data'] = $data;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function list($request, $response)
    {
        $data = $this->model->apiList();
        $this->data['data'] = $data;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }


}