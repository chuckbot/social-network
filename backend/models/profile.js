"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: { name: "userId", allowNull: false },
      });
      Profile.hasMany(models.Post, {
        foreignKey: { name: "profileId", as: "posts" },
      });
      Profile.hasMany(models.Comment, {
        foreignKey: { name: "profileId", as: "comments" },
      });
    }
  }
  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      position: {
        type: DataTypes.STRING,
        defaultValue: "Works at Teleperformance",
      },
      description: { type: DataTypes.STRING, defaultValue: "✌️" },
      profilePictureURL: {
        type: DataTypes.STRING,
        defaultValue:
          "http://localhost:3000/images_default/profile_pic_placeholder.svg",
      },
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "profiles",
    }
  );
  return Profile;
};
