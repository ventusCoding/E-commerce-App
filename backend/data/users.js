const bcrypt = require("bcryptjs");

const password = bcrypt.hashSync("pass1234", 12);

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: password,
    passwordConfirm: password,
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: password,
    passwordConfirm: password,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: password,
    passwordConfirm: password,
  },
];

module.exports = users;
