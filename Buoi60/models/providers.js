"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    static associate(models) {
      Provider.hasOne(models.User, {
        foreignKey: "provider_id",
      });
    }
  }
  Provider.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Provider",
      tableName: "providers",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Provider;
};
