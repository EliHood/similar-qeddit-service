import session from "express-session";
import { Sequelize } from "sequelize";

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const {
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

const db = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASS}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`);

const myStore = new SequelizeStore({ db });

export interface sessionInterface {
  store: object;
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: object;
}

const sessionConfig: sessionInterface = {
  store: myStore,
  secret: "nodetoken",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    path: "/",
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
};

myStore.sync();
export default sessionConfig;
