const db = require("../database/mysql");
const bcrypt = require("bcrypt");

const createNewUser = (body) => {
  return new Promise((resolve, reject) => {
    const qs = "INSERT INTO users SET ?";
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(body.password, salt, (error, hash) => {
        if (error) return reject(error);
        const userData = {
          ...body,
          password: hash,
        };
        db.query(qs, userData, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      });
    });
  });
};

const updatePassword = (body, id) => {
  return new Promise((resolve, reject) => {
    const { oldPass, newPass } = body;
    const getPassQs = "SELECT password FROM users WHERE id = ?";
    const updateQs = "UPDATE users SET ? WHERE id = ?";
    db.query(getPassQs, id, (err, result) => {
      if (err) return reject(err);
      bcrypt.compare(oldPass, result[0].password, (err, isPasswordValid) => {
        if (err) return reject(err);
        if (!isPasswordValid) return reject("Password Salah");
        bcrypt.hash(newPass, 10, (err, hash) => {
          if (err) return reject(err);
          const newPassword = {
            password: hash,
          };
          db.query(updateQs, [newPassword, id], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
      });
    });
  });
};

module.exports = {
  createNewUser,
  updatePassword,
};
