const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    const error = new Error("UnAuthorized");
    error.statusCode = 401;
    next(error);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("UnAuthorized");
    error.statusCode = 401;
    next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
    if (err) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      next(error);
    } else {
      req.user = {
        id: result.id,
      };
      next();
    }
  });
};

module.exports = authMiddleware;
