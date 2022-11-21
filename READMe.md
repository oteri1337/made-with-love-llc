### Steps to run PHP backend

Upload code to server

Enter database info into .env

Run Database Migrations

    vendor/bin/phinx migrate

Run Database Seeds

    vendor/bin/phinx seed:run





### Steps to build react for development

Open client folder


Run webpack dev server

    npm run start



### Steps to build react for production

Rum webpack build script
  
    npm run build



### Control Panel Link

Development => http://localhost:1027/control/signin.html

    password
        
        adminpassword1337


    email
    
        admin@admin.com


Production => http://domain.com/control/signin.html




### Notes

    Do not commit database.json to a public repo