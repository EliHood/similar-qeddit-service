"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    var Notification = sequelize.define("Notification", {
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        body: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: sequelize_1.DataTypes.ENUM,
            allowNull: false,
            values: ["read", "unread"]
        }
    });
    Notification.associate = function (models) {
        Notification.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
    };
    return Notification;
}
exports["default"] = default_1;
//# sourceMappingURL=notification.js.map