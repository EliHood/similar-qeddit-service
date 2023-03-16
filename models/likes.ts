import { DataTypes, Sequelize } from "sequelize";

export interface LikesAttributes {
  resourceId?: number;
  userId?: number;
}

export interface LikesInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  resourceId: number;
  userId: number;
}

export default function(sequelize: Sequelize) {
  const Likes = sequelize.define("Likes", {
    userId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER
  }) as any;

  Likes.associate = function(models) {
    // associations can be defined here
    Likes.belongsTo(models.User, {
      foreignKey: "userId",
      timestamps: false,
      onDelete: "CASCADE"
    });
    Likes.belongsTo(models.Post, {
      foreignKey: "resourceId",
      timestamps: false,
      onDelete: "CASCADE",
      targetKey: "id"
    });
  };

  return Likes;
}
