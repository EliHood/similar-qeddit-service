"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};
const dotenv = require("dotenv");
dotenv.config();
if (process.env.NODE_ENV === "production") {
    var sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    });
}
else {
    console.log(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.PSQL_HOST);
    var sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, "", {
        host: process.env.POSTGRES_HOST || "localhost",
        dialect: "postgres",
        pool: {
            max: 100000000,
            min: 0,
            idle: 20000000,
            // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
            acquire: 100000000,
        },
    });
}
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
exports.default = db;
//# sourceMappingURL=index.js.map