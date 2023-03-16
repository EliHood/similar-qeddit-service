"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("Comments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            gifUrl: {
                allowNull: true,
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            postId: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            comment_body: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable("Comments");
    }
};
//# sourceMappingURL=20200115021214-create-comment.js.map