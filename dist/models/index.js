"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sequelize_1 = require("sequelize");
var dotenv_1 = __importDefault(require("dotenv"));
var basename = path_1["default"].basename(__filename);
var db = {};
dotenv_1["default"].config();
var sequelize;
if (process.env.NODE_ENV === "production") {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    });
}
else {
    console.log(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.PSQL_HOST);
    sequelize = new sequelize_1.Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, "", {
        host: process.env.POSTGRES_HOST || "localhost",
        dialect: "postgres",
        pool: {
            max: 100000000,
            min: 0,
            idle: 20000000,
            // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
            acquire: 100000000
        }
    });
}
fs_1["default"].readdirSync(__dirname)
    .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
})
    .forEach(function (file) {
    var model = sequelize["import"](path_1["default"].join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports["default"] = db;
//# sourceMappingURL=index.js.map