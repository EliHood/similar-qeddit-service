"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    var Followers = sequelize.define("Followers", {
        userId: sequelize_1.DataTypes.INTEGER,
        followerId: sequelize_1.DataTypes.INTEGER
    });
    Followers.associate = function (models) {
        Followers.belongsTo(models.User, {
            foreignKey: "userId",
            as: "UserFollowers",
            onDelete: "CASCADE"
        });
        Followers.belongsTo(models.User, {
            foreignKey: "followerId",
            as: "followerDetails",
            onDelete: "CASCADE"
        });
    };
    // Followers.follow = (userId, follower_id) => Followers.create({ userId, follower_id});
    return Followers;
}
exports["default"] = default_1;
//# sourceMappingURL=followers.js.map