const jwt = require("jsonwebtoken");

const responseHelper = require("../helpers/response");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (!bearerToken)
    return responseHelper.error(res, 401, "Silahkan Login Terlebih Dahulu");
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2FuZHJhIiwidXNlcm5hbWUiOiJjYW5kcmFzZGsiLCJpYXQiOjE2MjgxNTE0NzMsImV4cCI6MTYyODE1MTY1MywiaXNzIjoiQXJrYWRlbXkifQ.OIeZbsiP1NSCiLy3aNcQNTd78YQW7BYFsuwPog0vW0s
  const token = bearerToken.split(" ")[1];
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    { issuer: "Arkademy" },
    (err, payload) => {
      if (err) return responseHelper.error(res, 401, err);
      req.payload = payload;
      next();
    }
  );
};

module.exports = {
  checkToken,
};
