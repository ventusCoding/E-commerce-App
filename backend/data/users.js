const bcrypt = require("bcryptjs");

const password = bcrypt.hashSync("pass1234", 12);

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    verified: true,
    password: password,
    passwordConfirm: password,
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    verified: true,
    password: password,
    passwordConfirm: password,
    role: "user",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    verified: true,
    password: password,
    passwordConfirm: password,
    role: "user",
  },
];

module.exports = users;
