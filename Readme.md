# CRUD API

- run: 'git clone git@github.com:Tatyana404/node-crud-api.git';

- run: 'npm install';

- run: 'npm run start:dev' to start the server in development mode;

- run: 'npm run start:prod' to build and run the app in production mode;

### Use Postman or similar client ###

- send a 'http://localhost:${port}/api/users' request with the GET method to get a list of all users;

- send a 'http://localhost:${port}/api/users' request with a POST method and an object of the form 
{
  "username": string,
  "age": number ,
  "hobbies": array of strings
} to create a new user;

- send a 'http://localhost:${port}/api/users/${userId}' request with the GET method to get a single user;
 
- send a 'http://localhost:${port}/api/users/${userId}' request with a PUT method and an object of the form {
   "username": string,
   "age": number ,
   "hobbies": array of strings
} to update an existing user;

- send a 'http://localhost:${port}/api/users/${userId}' request with the DELETE method to delete an existing user;

###### To check for a server error, use 'throw new Error();' in the try {} block in file ./controller/user.ts or ./handler/user.ts ######