# Setting Up a Project

1) Install Dependencies
The first step is to install the dependencies. Depending on your preference, you can use either yarn or npm. Here are the commands you need to run:

### `yarn install`

2) Install JSON Server Globally
The next step is to install JSON Server. This will allow you to simulate a REST API that you can use to develop your project. To install JSON Server, run the following command:

### `npm install -g json-server`

3) Start JSON Server
Once you have installed JSON Server, you need to start it. To start JSON Server, run the following command:

### `json-server --watch db.json`

This command will start the server and watch the db.json file for any changes. If you want to run JSON Server on a different port other than the default 3000 port, then you need to change the baseURL in your api.ts file accordingly.

4) Start Frontend Project
Now that you have JSON Server running, you can start your project. To start the project, run the following command:

### `yarn start`

This will start the React app on port 3001.


