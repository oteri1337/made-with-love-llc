<?php

namespace Server\Controllers\Library\Services;

use Twilio\Rest\Client;
use Minishlink\WebPush\WebPush;
use PHPMailer\PHPMailer\PHPMailer;
use Minishlink\WebPush\Subscription;

class Sender
{

    public function sendEmail(array $emails, string $body, string $subject)
    {

        try {

            $mail_type = getenv("MAIL_TYPE");

            $mailer = new PHPMailer;
            $mailer->isHTML(true);
            $mailer->SMTPDebug = getenv("MAIL_ERRORS");

            if ($mail_type == "mail") {
                $name = getenv("MAIL_NAME");
                $email = getenv("MAIL_USERNAME");
                $mailer->isMail();
                $mailer->setFrom($email, $name);
            }

            if ($mail_type == "smtp") {
                $mailer->isSMTP();
                $mailer->SMTPAuth = true;
                $mailer->SMTPAuth = true;
                $mailer->Host = getenv("MAIL_HOST");
                $mailer->Port = getenv("MAIL_PORT");
                $mailer->Username = getenv("MAIL_USERNAME");
                $mailer->Password = getenv("MAIL_PASSWORD");
                $mailer->SMTPSecure = "ssl";

                $name = getenv("MAIL_NAME");
                $email = getenv("MAIL_USERNAME");
                $mailer->setFrom($email, $name);
            }

            foreach ($emails as $email) {
                $mailer->addAddress($email);
            }

            $mailer->Subject = $subject;
            $mailer->Body = $body;
            $sent =  $mailer->send();

            return $sent;
        } catch (\Exception $errors) {
            return false;
        }
    }

    public function sendPush(array $subscriptions, string $body, string $subject)
    {


        $auth = [
            'VAPID' => [
                'subject' => 'mailto:' . getenv("MAIL_USERNAME"),
                'publicKey' => getenv("PUBLIC_VAPID_KEY"),
                'privateKey' => getenv("PRIVATE_VAPID_KEY"),
            ],
        ];

        $notification = ['subject' => $subject, 'body' => $body];

        $webPush = new WebPush($auth);

        try {
            // add push subscriptions
            foreach ($subscriptions as $subscription) {
                $subscription = (array) json_decode($subscription);
                // var_dump($subscription);
                $subscription['keys'] = (array) $subscription['keys'];
                $subscription = Subscription::create($subscription);
                $webPush->sendOneNotification($subscription, json_encode($notification));
            }

            // send push subscriptons
            foreach ($webPush->flush() as $report) {
            }

            return true;
        } catch (\Exception $errors) {
            return false;
        }
    }

    public function sendSms(array $numbers, string $body)
    {
        $sid = getenv('TWILIO_SID');
        $token = getenv('TWILIO_TOKEN');
        $from_number = getenv('TWILIO_NUMBER');

        $client = new Client($sid, $token);
        $sent = [];

        try {
            foreach ($numbers as $number) {
                $sent[] = $client->messages->create($number, [
                    'from' => $from_number,
                    'body' => $body
                ]);
            }
            return $sent;
        } catch (\Exception $errors) {
            return false;
        }
    }
}