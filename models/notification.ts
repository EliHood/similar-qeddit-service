import { DataTypes, Sequelize } from "sequelize";

export interface NotificationAttributes {
  body?: string;
  userId?: number;
  status?: string; // replace with 'validValue1' | 'validValue2', ...
}

export interface NotificationInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  body: string;
  userId: number;
  status: string; // replace with 'validValue1' | 'validValue2', ...
}

export default function(sequelize: Sequelize) {
  const Notification = sequelize.define("Notification", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["read", "unread"]
    }
  }) as any;

  Notification.associate = function(models) {
    Notification.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };

  return Notification;
}
