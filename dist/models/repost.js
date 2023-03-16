"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    var RePosts = sequelize.define("RePosts", {
        userId: sequelize_1.DataTypes.INTEGER,
        postId: sequelize_1.DataTypes.INTEGER
    });
    RePosts.associate = function (models) {
        RePosts.belongsTo(models.User, {
            as: "author",
            foreignKey: "userId",
            timestamps: false,
            onDelete: "CASCADE"
        });
        RePosts.belongsTo(models.Post, {
            foreignKey: "postId",
            timestamps: false,
            onDelete: "CASCADE",
            targetKey: "id"
        });
    };
    return RePosts;
}
exports["default"] = default_1;
//# sourceMappingURL=repost.js.map