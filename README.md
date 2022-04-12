# social-network

Vue 3 + Node.js + MySQL Social Network

## Prerequisite:

- Have mySQL installed
- Have Node.js installed

## Installing the project:

- In the /back directory: run the "npm install" command
- In the /front directory: run the "npm install" command
- In the directory /back/config: create a config.json file, copy inside the JSON below and fill in the fields of the development part username, password with your mySQL identifiers, database by the database name of your choice.

```
  {
    "development": {
        "username": YOUR_USERNAME,
        "password": YOUR_PASSWORD,
        "database": YOUR_DATABASE,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "db-test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
        "production": {
        "username": "root",
        "password": null,
        "database": "db-production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
  }
```
