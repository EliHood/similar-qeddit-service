import { DataTypes, Sequelize } from "sequelize";
import models from "./";
export interface PostAttributes {
  title?: string;
  postContent?: string;
  likeCounts: number;
  userId?: number;
}

export interface PostInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  postContent: string;
  likedByMe: boolean;
  likeCounts: number;
  userId: number;
}

export default function(sequelize: Sequelize) {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      postContent: DataTypes.STRING,
      likedByMe: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      likeCounts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      },
      userId: DataTypes.INTEGER
    },
    {}
  ) as any;

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      as: "author",
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.Likes, {
      foreignKey: "resourceId",
      timestamps: false,
      targetKey: "id",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.RePosts, {
      foreignKey: "postId",
      timestamps: false,
      targetKey: "id",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.Comments, {
      foreignKey: "postId",
      timestamps: false,
      targetKey: "id",
      onDelete: "CASCADE"
    });
  };

  return Post;
}
