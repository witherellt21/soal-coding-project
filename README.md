# Soal Coding Project

Start by cloning the project to your local directory.


## Setting up the environment
From the command line, navigate to the client directory and run the following command to make an example .env file:

```
cp .env.example .env
```
Or just copy the .env.example file and rename the copy to .env.

Now fill out the .env fields accordingly. It is recommended to use port 3000 for the frontend client. Next you will do the same process in the server directory to create the environment for the backend. Make sure the PORT variable matches the SERVER_PORT variable on the client side .env file. For the JWT_SECRET_KEY, you can use any valid string. The longer the string, the better the encryption.

You will also need to install the dependecies for the frontend and backend independently. Use the following command in both the "client" and "server" directories:

```
npm install
```


## Starting the application

From the root directory run the following two commands on separate terminals.

```
npm start --prefix client
npm start --prefix server
```

Now open your browser to http://localhost:{PORT} where the PORT is the port you specified in the client .env file.