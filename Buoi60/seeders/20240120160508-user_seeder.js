"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    const salt = bcrypt.genSaltSync(saltRounds);
    data.push({
      name: "Phạm Tuấn",
      email: "tnpham@gmail.com",
      password: bcrypt.hashSync("Hoilamgi1", salt),
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await queryInterface.bulkInsert("users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
