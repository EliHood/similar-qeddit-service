"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    var Comment = sequelize.define("Comments", {
        comment_body: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING
        },
        gifUrl: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING
        },
        userId: sequelize_1.DataTypes.INTEGER,
        postId: sequelize_1.DataTypes.INTEGER
    });
    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {
            as: "author",
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
        Comment.belongsTo(models.Post, {
            foreignKey: "postId",
            timestamps: false,
            onDelete: "CASCADE",
            targetKey: "id"
        });
        Comment.hasMany(models.CommentReplies, {
            as: "commentReplies",
            foreignKey: "commentId",
            timestamps: false,
            targetKey: "id",
            onDelete: "CASCADE"
        });
    };
    return Comment;
}
exports["default"] = default_1;
//# sourceMappingURL=comment.js.map