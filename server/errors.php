<?php

$customErrorHandler = function ($request, $exception, $displayErrorDetails, $logErrors, $logErrorDetails, ?LoggerInterface $logger = null) use ($app) {

   $error_message = $exception->getMessage();

   if (getenv("NODE_ENV") == "production") {
      $error_message = "web server error";
   }

   $payload = ['errors' => [$error_message], 'data' => [], 'message' => ''];

   $response = $app->getResponseFactory()->createResponse();
   
   $response->getBody()->write(json_encode($payload, JSON_UNESCAPED_UNICODE));

   return $response;
};

// Add Error Middleware
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$errorMiddleware->setDefaultErrorHandler($customErrorHandler);