"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    var User = sequelize.define("User", {
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [6, 50],
                    msg: "The username needs to be between 6 and 25 characteres long"
                }
            }
        },
        bio: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        gravatar: {
            type: sequelize_1.DataTypes.STRING
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            validate: {
                min: 6
            }
        },
        email_verified: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        email_confirmation_token: {
            type: sequelize_1.DataTypes.STRING
        },
        googleId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        email: sequelize_1.DataTypes.STRING,
        forget_password: sequelize_1.DataTypes.STRING
    }, {});
    User.associate = function (models) {
        User.hasMany(models.Post, {
            foreignKey: "userId",
            as: "author",
            onDelete: "CASCADE"
        });
        User.hasMany(models.Followers, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            as: "UserFollowers"
        });
        User.hasMany(models.Followers, {
            foreignKey: "followerId",
            onDelete: "CASCADE",
            as: "followerDetails"
        });
        User.hasMany(models.Notification, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
        User.hasMany(models.Following, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            as: "UserFollowings"
        });
        User.hasMany(models.Following, {
            foreignKey: "following",
            onDelete: "CASCADE",
            as: "followingDetails"
        });
    };
    return User;
}
exports["default"] = default_1;
//# sourceMappingURL=user.js.map