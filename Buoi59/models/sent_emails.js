"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SentEmail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  SentEmail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      recipient_email: DataTypes.STRING,
      sender_email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SentEmail",
      tableName: "sent_emails",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return SentEmail;
};
