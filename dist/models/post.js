"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    var Post = sequelize.define("Post", {
        title: sequelize_1.DataTypes.STRING,
        postContent: sequelize_1.DataTypes.STRING,
        likedByMe: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        likeCounts: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        userId: sequelize_1.DataTypes.INTEGER
    }, {});
    Post.associate = function (models) {
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
exports["default"] = default_1;
//# sourceMappingURL=post.js.map