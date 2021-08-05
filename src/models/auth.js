const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../database/mysql");

const login = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    const getPassQs = "SELECT name, password FROM users WHERE username = ?";
    db.query(getPassQs, username, (err, result) => {
      if (err) return reject(err);
      // cek apakah username nya ada
      if (!result.length) return reject("Username tidak ditemukan");
      bcrypt.compare(password, result[0].password, (err, isPasswordValid) => {
        if (err) return reject(err);
        if (!isPasswordValid) return reject("Login Gagal");
        // password benar => login
        // login => generate token => jwt.sign
        const payload = {
          name: result[0].name,
          username,
        };
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: "3m",
            issuer: "Arkademy",
          },
          (err, token) => {
            if (err) return reject(err);
            return resolve(token);
          }
        );
      });
    });
  });
};

module.exports = { login };
