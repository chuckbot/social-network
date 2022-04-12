const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

exports.decodeToken = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_PHRASE);
    const credentials = {
      userId: decodedToken.userId,
      isModerator: decodedToken.isModerator,
    };
    return credentials;
  } catch {
    return undefined;
  }
};

exports.createToken = (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET_PHRASE, { expiresIn: "1h" });
};
