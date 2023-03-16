"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    var Following = sequelize.define("Following", {
        userId: sequelize_1.DataTypes.INTEGER,
        following: sequelize_1.DataTypes.INTEGER
    });
    Following.associate = function (models) {
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
exports["default"] = default_1;
//# sourceMappingURL=following.js.map