const userModel = require("../models/users");
const authModel = require("../models/auth");
const responseHelper = require("../helpers/response");

const login = (req, res) => {
  const { body } = req;
  // validasi
  authModel
    .login(body)
    .then((result) => responseHelper.success(res, 200, { token: result }))
    .catch((err) => responseHelper.error(res, 500, err));
};

/** Body
 * {
 *  name: string,
 *  username: string,
 *  password: string
 * }
 */
const register = (req, res) => {
  // CREATE NEW USER
  const { body } = req;
  // HASH PASSWORD
  userModel
    .createNewUser(body)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => responseHelper.error(res, 500, err.message));
};

const logout = (req, res) => {};

module.exports = {
  login,
  register,
  logout,
};
