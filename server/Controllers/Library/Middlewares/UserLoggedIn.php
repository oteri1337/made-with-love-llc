<?php

namespace Server\Controllers\Library\Middlewares;

use GuzzleHttp\Psr7\Response;
use Server\Database\Models\User;

class UserLoggedIn
{

    public function __invoke($request, $handler)
    {
        $id = $_SESSION['user']['id'] ?? false;


        if (!$id) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['please sign out then sign in']]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
            return;
        }

        $user = User::where('id', $id)->first();

        if (!$user) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['please sign out then sign in']]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }

        $request = $request->withAttribute('user', $user);

        $response = $handler->handle($request);

        return $response;
    }
}