"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var express_session_1 = __importDefault(require("express-session"));
var sequelize_1 = require("sequelize");
dotenv_1["default"].config();
var SequelizeStore = require("connect-session-sequelize")(express_session_1["default"].Store);
var sequelize;
if (process.env.NODE_ENV === "development") {
    sequelize = new sequelize_1.Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.PSQL_HOST, {
        dialect: "sqlite",
        storage: "./session.sqlite"
    });
}
else {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect: "sqlite",
        storage: "./session.sqlite",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}
var myStore = new SequelizeStore({
    db: sequelize
});
var sessionConfig = {
    store: myStore,
    secret: "nodetoken",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        path: "/",
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
};
myStore.sync();
exports["default"] = sessionConfig;
//# sourceMappingURL=sessionConfig.js.map