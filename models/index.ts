"use strict";
import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";

const basename = path.basename(__filename);
interface Db {
  Likes: any;
  Comments: any;
  CommentReplies: any;
  RePosts: any;
  Post: any;
  Following: any;
  Followers: any;
  Notification: any;
  User: any;
  sequelize: any;
  Sequelize: object;
}

const db = {} as Db;

const {
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

const sequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASS}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
  {
    pool: {
      max: 100000000,
      min: 0,

      idle: 20000000,
      // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
      acquire: 100000000,
    },
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
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

db.sequelize.sync();

export default db;
