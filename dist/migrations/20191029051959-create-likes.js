"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("Likes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            resourceId: {
                type: Sequelize.INTEGER,
                primaryKey: true
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
        return queryInterface.dropTable("Likes");
    }
};
//# sourceMappingURL=20191029051959-create-likes.js.map