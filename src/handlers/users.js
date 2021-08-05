const userModel = require("../models/users");
const responseHelper = require("../helpers/response");
const db = require("../database/mysql");

const updatePassword = (req, res) => {
  const { body, params } = req;
  userModel
    .updatePassword(body, params.id)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};

const editUser = (req, res) => {
  const { file, params } = req;
  const host = "http://localhost:8000";
  const imageUrl = `/images/${file.filename}`;
  const input = {
    profile: host + imageUrl,
  };
  const editUser = (input, id) => {
    return new Promise((resolve, reject) => {
      const updateQs = "UPDATE users SET ? WHERE id = ?";
      db.query(updateQs, [input, id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  };
  editUser(input, params.id)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  updatePassword,
  editUser,
};
