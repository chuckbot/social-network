# Social Network

Vue 3 + Node.js + MySQL Social Network

## Prerequisite:

- Have mySQL installed
- Have Node.js installed

## Installing the project:

- In the /backend directory: run the "npm install" command
- In the /frontend directory: run the "npm install" command
- In the directory /backend/config: create a config.json file, copy inside the JSON below and fill in the fields of the development part username, password with your mySQL identifiers, database by the database name of your choice.

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

- In the /backend directory, run the command: "npx sequelize db:create"
- In the /backend directory, run the command: "npx sequelize db:migrate"

- In the /backend directory, create an .env file, paste this line inside: TOKEN_SECRET_PHRASE = "YOUR TOKEN SECURITY SECRET PHRASE"
  Replace the sentence in quotation marks with the sentence of your choice.

- In the /backend directory, run the command: "npm start nodemon"
- In the /frontend directory, run the command: "npm run serve"

- In a browser, open a page at the address: "http://localhost:8080"

Create an administrator profile:

- the administrator's email must be "admin@groupomania.com"

- If installation problem due to innoDB, change the value of the system variable from mysql innodb_default_row to "dynammic"
