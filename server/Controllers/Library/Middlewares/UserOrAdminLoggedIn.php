<?php

namespace Server\Controllers\Library\Middlewares;

use GuzzleHttp\Psr7\Response;
use Server\Database\Models\User;
use Server\Database\Models\Admin;

class UserOrAdminLoggedIn
{

    public function __invoke($request, $handler)
    {
        $user_id = $_SESSION['user']['id'] ?? false;
        $admin_id = $_SESSION['admin']['id'] ?? false;

        if ($user_id === false && $admin_id === false) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['please sign in']]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
            return;
        }

        if ($user_id) {
            $user = User::where('id', $user_id)->first();
            if (!$user) {
                $response = new Response;
                $response->getBody()->write(json_encode(['errors' => ['please sign in']]));
                return $response->withHeader('Content-Type', 'application/json');
            }
        } else {
            $admin = Admin::where('id', $admin_id)->first();
            if (!$admin) {
                $response = new Response;
                $response->getBody()->write(json_encode(['errors' => ['please sign in']]));
                return $response->withHeader('Content-Type', 'application/json');
            }
        }

        $response = $handler->handle($request);

        return $response;
    }
}