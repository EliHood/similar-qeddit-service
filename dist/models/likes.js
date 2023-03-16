"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    var Likes = sequelize.define("Likes", {
        userId: sequelize_1.DataTypes.INTEGER,
        resourceId: sequelize_1.DataTypes.INTEGER
    });
    Likes.associate = function (models) {
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
exports["default"] = default_1;
//# sourceMappingURL=likes.js.map