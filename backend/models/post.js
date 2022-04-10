"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile, {
        foreignKey: {
          name: "profileId",
          allowNull: false,
          defaultValue: "Old Account",
        },
      });
      Post.hasMany(models.Comment, {
        foreignKey: { name: "postId", as: "comments" },
      });
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      postPictureURL: DataTypes.STRING,
      text: DataTypes.TEXT,
      isImportant: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );
  return Post;
};
