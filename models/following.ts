import { DataTypes, Sequelize } from "sequelize";

export interface FollowingAttributes {
  userId?: number;
  following?: number;
}

export interface FollowingInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  userId: number;
  following: number;
}

export default function(sequelize: Sequelize) {
  const Following = sequelize.define("Following", {
    userId: DataTypes.INTEGER,
    following: DataTypes.INTEGER
  }) as any;

  Following.associate = function(models) {
    Following.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Following.belongsTo(models.User, {
      foreignKey: "following",
      onDelete: "CASCADE",
      as: "followingDetails"
    });
  };
  return Following;
}
