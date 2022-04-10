module.exports = {
  name: "groupomania-cookie",
  secret: "COOKIE_SECRET",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
  domain: "http://localhost:8080",
};
