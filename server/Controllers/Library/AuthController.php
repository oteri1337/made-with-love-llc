<?php

namespace Server\Controllers\Library;

class AuthController extends ApiController
{
    protected $authKey;


        //  Verification

        public function uploadID($request, $response)
        {
    
            $user = $request->getAttribute('user');
    
            $front_name = $_FILES['front']['name'] ?? '';
            $front_size = $_FILES['front']['size'] ?? 0;
    
            $back_name = $_FILES['back']['name'] ?? '';
            $back_size = $_FILES['back']['size'] ?? 0;
    
            $rules = [
                'front view' => [$front_name, 'required|imageformat'],
                'front view' => [$front_size, 'imagesize'],
                'back view' => [$back_name, 'required|imageformat'],
                'back view' => [$back_size, 'imagesize'],
            ];
    
            $this->validator->validate($rules);
            $errors = $this->validator->errors()->all();
            if ($errors) {
                $this->data['errors'] = $errors;
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }

            $backid_file_name = $user->id ."-". strtolower($user->first_name) ."-back-". time();
            $frontid_file_name = $user->id ."-". strtolower($user->first_name) ."-front-". time();
    
            $back = $this->uploadImage($_FILES['back'], $backid_file_name);
            $front = $this->uploadImage($_FILES['front'], $frontid_file_name); 
     
            $user->update([
                'photo_back_view' => $back,
                'photo_front_view' => $front,
                'id_verification' => 'In Progress'
            ]);
    
            $user = $this->model->where('id', $user->id)->first();
            $user = $this->relationships($user);
    
            $this->data['data'] = $user;
            $this->data['message'] = "Upload Successful. Your identification card is currently being reviewed, if successful your account will be approved within 24 hours.";
    
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        public function uploadAddress($request, $response)
        {
    
            $user = $request->getAttribute('user'); 
    
            $bill = $_FILES['bill']['name'] ?? '';
            $bill = $_FILES['bill']['size'] ?? 0;
        
            $rules = [
                'bill view' => [$bill, 'required|imageformat'],
                'bill view' => [$bill, 'imagesize'],
            ];
    
            $this->validator->validate($rules);
            $errors = $this->validator->errors()->all();
            if ($errors) {
                $this->data['errors'] = $errors;
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
    
            $bill = $this->uploadImage($_FILES['bill']);
     
            $user->update([
                'photo_utility_bill' => $bill,
                'address_verification' => 'In Progress'
            ]);
    
            $user = $this->model->where('id', $user->id)->first();
            $user = $this->relationships($user);
    
            $this->data['data'] = $user;
            $this->data['message'] = "Upload Successful";
    
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        public function updateIDState($request, $response)
        {
    
            // Body Validation
            $body = $request->getParsedBody();
            $id = $body['id'] ?? '';
            $action = $body['action'] ?? '';
    
            $rules = [
                'id' => [$id, 'required'],
                'action' => [$action, 'required']
            ];
    
            $this->validator->validate($rules);
            $errors = $this->validator->errors()->all();
            if ($errors) {
                $this->data['errors'] = $errors;
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
    
            // Database Validation
            $row = $this->model->where('id', $id)->first();

            if (!$row) {
                $this->data['errors'] = ['not found'];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
    
    
            // send approved mail    
            if ($action == "Verified") {

                $data = "Hello " . $row->first_name . ",  
    
                <p>Thank you for choosing us as your brokeage service provider. We are delighted to inform you that your account has been verified. We will do our best to provide you with the most convenient experience and best condiitions possible.</p>
        
                <p>Warm Regards.</p>
        
                ";

                $title = "Verification Completed";
                $data = ['title' => $title, 'body' => $data];
                $data = $this->renderer->render('email2.html', $data);
                $this->sender->sendEmail([$row->email], $data, $title);
            }
    
            if ($action == "Pending") {
                $data = '<p>Your ID has been rejected, please login to re-upload your valid government issued Identification Card.</p>';

                $title = "Pending Verification";
                $data = ['title' => $title, 'body' => $data];
                $data = $this->renderer->render('email2.html', $data);
                $this->sender->sendEmail([$row->email], $data, $title);
            }
    



            // Processing
            $row->update(['id_verification' => $action]);
            $row = $this->model->where('id', $id)->first();
            $row = $this->relationships($row);
    
            $this->data['data'] = $row;
    
            $response->getBody()->write(json_encode($this->data));
    
            return $response->withHeader('Content-Type', 'application/json');
        }

        public function verifyDevice($request, $response)
        {
            $body = $request->getParsedBody();
            $email = $body['email'] ?? '';
            $pin = $body["pin"] ?? ""; 
    
            $row = $this->model->where('email', $email)->first();
    
            if (!$row) {
                $this->data['errors'] = ['Verification Failed'];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
    
            if ($pin != $row->pin) {
                $this->data['errors'] = ['Incorrect PIN'];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
    
            $row->update([
                // 'device_verified' => 1,
                'email_verification' => "Completed",
                'pin' => rand(11111, 99999)
            ]);
    
            // $_SESSION[$this->authKey]['id'] = $row->id;
    
            $row = $this->model->where('email', $email)->first();
            $row = $this->relationships($row);
            $this->data['data'] = $row;
            $this->data['message'] = 'Verification Successful';
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }
    

    

    
    
    



    // Basic Auth

    public function signIn($request, $response)
    {

        $body = $request->getParsedBody();

        $email = $body['email'] ?? '';
        $password = $body['password'] ?? '';

        $rules = [
            'email' => [$email, 'required|email'],
            'password' => [$password, 'required']
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] =  $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $password = $this->encryptPassword($password);
        $row = $this->model->where('email', $email)->where('password', $password)->first();

        if (!$row) {
            $this->data['errors'] =  ['invalid email or password'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->relationships($row);

        $_SESSION[$this->authKey]['id'] = $row->id;

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function status($request, $response)
    {
        $hasSession = isset($_SESSION[$this->authKey]['id']);

        if (!$hasSession) {
            $this->data['data'] = false;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->where('id', $_SESSION[$this->authKey]['id'])->first();
        if (!$row) {
            $this->data['data'] = false;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model::relationships($row);

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function signOut($request, $response)
    {
        unset($_SESSION[$this->authKey]);

        // update csrf token in database

        $this->data['data'] = "Success";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function encryptPassword($password)
    {
        return $password;
    }

    // Tokens 

    public function tokenForDeviceVerify($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');

        $email = $body['email'] ?? '';
        $mobile_number = $body['mobile_number'] ?? '';

        if ($mobile_number != '') {

            $row = $this->model->where('mobile_number', $mobile_number)->where('id', '!=', $user->id)->exists();
            if ($row) {
                $this->data['errors'] = ['mobile number already in use'];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }

            $rules = ['mobile number' => [$mobile_number, 'number']];
        } else {
            $rules = ['email' => [$email, 'email']];
        }

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();
        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }


        $pin = rand(11111, 99999);

        if ($mobile_number != '') {
            $user->update(['pin' => $pin, 'mobile_number' => $mobile_number]);
        } else {
            $user->update(['pin' => $pin]);
        }

        $message = "Your verification PIN is " . $pin;

        if ($mobile_number != '') {
            $sent = $this->sender->sendSms([$mobile_number], $message);

            if (!$sent) {
                $this->data['errors'] = ['Failed to send PIN. Make sure your mobile number is in international format or click below to get PIN via email'];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
        } else {
            $sent = $this->sender->sendEmail([$user->email], $message, "Verification Pin");

            if (!$sent) {
                $this->data['errors'] = ['Failed to send PIN. contact ' . getenv("MAIL_USERNAME")];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
        }


        $this->data['message'] = 'PIN sent.';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function tokenForPasswordUpdate($request, $response)
    {
        $body = $request->getParsedBody();

        $email = $body['email'] ?? '';

        $rules = [
            'email' => [$email, 'required|email'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->where('email', $email);

        if (!$row->exists()) {
            $this->data['errors'] = ['email not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $row->first();

        $token = rand(0, 999999);

        $row->update([
            'password_token' => $token
        ]);

        $data = ['title' => 'Password Reset Token', 'body' => 'Your password token is ' . $token];

        $body = $this->renderer->render('email.html', $data);

        $sent = $this->sender->sendEmail([$row->email], $body, "Reset Password");

        if (!$sent) {
            $this->data['errors'] = ['Failed to send token, please contact ' . getenv("MAIL_USERNAME") . ' or try again later.'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['message'] = 'Password reset token sent successfully';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function tokenForEmailUpdate($request, $response)
    {
        $row = $request->getAttribute('user');

        $token = rand(0, 999999);

        $row->update([
            'email_token' => $token
        ]);


        $data = ['title' => 'Email Token', 'body' => ' Your email token is ' . $row->email_token];

        $body = $this->renderer->render('email.html', $data);

        $sent = $this->sender->sendEmail([$row->email], $body, "Email Update");

        if (!$sent) {
            $this->data['errors'] = ['Failed to send token, please contact ' . getenv("MAIL_USERNAME") . ' or try again later.'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['message'] = 'Email update link sent successfully, please check your mail box.';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }







    // Updates

    public function changePassword($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute("user") ?? $request->getAttribute("admin");

        $password = $body['password'] ?? '';
        $new_password = $body['new_password'] ?? '';
        $confirm_new_password = $body['confirm_new_password'] ?? '';

        $rules = [
            'password' => [$password, 'required'],
            'new_password' => [$new_password, 'required|min(7)'],
            'new password confirmation' => [$confirm_new_password, 'required|matches(new_password)'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $password = $this->encryptPassword($password);
        $new_password = $this->encryptPassword($new_password);

        $user = $this->model->where("password", $password)->where("id", $user->id)->first();
        if (!$user) {
            $this->data['errors'] = ['Password is incorrect'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user->update(['password' => $new_password]);

        $this->data['message'] = "Password Updated";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }


    public function updatePassword($request, $response)
    {
        $body = $request->getParsedBody();

        $email = $body['email'] ?? '';
        $token = $body['password_token'] ?? '';
        $password = $body['new_password'] ?? '';
        $confirm_password = $body['confirm_new_password'] ?? '';

        $rules = [
            'email' => [$email, 'required'],
            'token' => [$token, 'required'],
            'password' => [$password, 'required|min(7)'],
            'password confirmation' => [$confirm_password, 'required|matches(password)'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->where('email', $email)->where('password_token', $token);

        if (!$row->exists()) {
            $this->data['errors'] =  ['invalid/expired token'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $row->first();

        $row->update([
            'password' => $password,
            'password_token' => rand(0, 999999)
        ]);

        $row = $this->relationships($row);

        $this->data['data'] = $row;
        $this->data['message'] = "Password Updated Successfully";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateEmail($request, $response)
    {
        $user = $request->getAttribute("user");
        $body = $request->getParsedBody();

        $token = $body['email_token'] ?? '';
        $email = $body['new_email'] ?? '';
        $email_confirmation = $body['confirm_new_email'] ?? '';

        $rules = [
            'token' => [$token, 'required'],
            'email' => [$email, 'required|email'],
            'confirmation' => [$email_confirmation, 'required|email|matches(email)'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();
        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user->update([
            'email' => $email,
            'email_verified' => 0
        ]);

        $id = $_SESSION[$this->authKey]['id'];
        $user = $this->model->where('id', $id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updatePhone($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');

        $phone_number = $body['phone_number'] ?? '';

        $rules = [
            'new phone number' => [$phone_number, 'required|number'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user->update([
            'phone_number' => $phone_number
        ]);

        $id = $_SESSION[$this->authKey]['id'];
        $user = $this->model->where('id', $id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = 'Phone Number Updated Successfully';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateAddress($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');

        $street_address = $body['street_address'] ?? '';
        $city = $body['city'] ?? '';
        $state = $body['state'] ?? '';
        $post_code = $body['post_code'] ?? '';
        $country = $body['country'] ?? '';

        $rules = [
            'street address' => [$street_address, 'required'],
            'city' => [$city, 'required'],
            'state' => [$state, 'required'],
            'post code' => [$post_code, 'required'],
            'country' => [$country, 'required']
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $body = $this->filter($body, [
            'street_address',
            'city',
            'state',
            'post_code',
            'country'
        ]);

        $user->update($body);

        $id = $_SESSION[$this->authKey]['id'];
        $user = $this->model->where('id', $id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = 'Update Successful';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updatePhoto($request, $response)
    {

        $user = $request->getAttribute('user');

        $photo = $_FILES['photo']['name'] ?? '';

        $rules = [
            'photo' => [$photo, 'required|imageformat'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $photo = $this->uploadImage($_FILES['photo']);

        $user->update([
            'photo_profile' => $photo,
        ]);

        $user = $this->model->where('id', $user->id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = "Photo Updated";

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}