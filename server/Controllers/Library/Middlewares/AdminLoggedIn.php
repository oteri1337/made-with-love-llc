<?php

namespace Server\Controllers\Library\Middlewares;

use GuzzleHttp\Psr7\Response;
use Server\Database\Models\Admin;

class AdminLoggedIn
{

    public function __invoke($request, $handler)
    {
        $id = $_SESSION['admin']['id'] ?? false;

        if (!$id) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['please sign out then sign in']]));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user = Admin::where('id', $id)->first();

        if (!$user) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['please sign out then sign in']]));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $request = $request->withAttribute('admin', $user);

        $response = $handler->handle($request);

        return $response;
    }
}