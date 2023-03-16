"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    var CommentReplies = sequelize.define("CommentReplies", {
        replyBody: sequelize_1.DataTypes.TEXT,
        userId: sequelize_1.DataTypes.INTEGER,
        commentId: sequelize_1.DataTypes.INTEGER,
        postId: sequelize_1.DataTypes.INTEGER
    });
    CommentReplies.associate = function (models) {
        CommentReplies.belongsTo(models.User, {
            as: "author",
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
        CommentReplies.belongsTo(models.Post, {
            foreignKey: "postId",
            timestamps: false,
            onDelete: "CASCADE",
            targetKey: "id"
        });
        CommentReplies.belongsTo(models.Comments, {
            as: "commentReplies",
            foreignKey: "commentId",
            timestamps: false,
            onDelete: "CASCADE",
            targetKey: "id"
        });
    };
    return CommentReplies;
}
exports["default"] = default_1;
//# sourceMappingURL=commentreplies.js.map