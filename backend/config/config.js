module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
