<?php

namespace Server\Controllers;

use Server\Controllers\Library\ServicesController;

class CmsController extends ServicesController
{

    public function renderApp($request, $response)
    {
        $data = $this->renderer->render('index.html');

        $response->getBody()->write($data);

        return $response;
    }

    public function create($request, $response)
    {
        $body = $request->getParsedBody();

        $email = $body['email'] ?? '';
        $subject = $body['subject'] ?? '';
        $content = $body['content'] ?? '';

        $rules = [
            'content' => [$content, 'required'],
            'subject' => [$subject, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $data = $this->renderer->render('email.html', ['content' => nl2br($content)]);

        $sent = $this->sender->sendEmail([getenv("MAIL_USERNAME")], $data, $subject);

        if (!$sent) {
            $this->data['errors'] = ['failed to send'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['message'] = 'Request Sent';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }


}