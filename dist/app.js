"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
require("./config/passport");
const middlewares_1 = require("./middlewares");
const models_1 = __importDefault(require("./models/"));
const routers_1 = __importDefault(require("./routers"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
    // to simulate latency of 50ms - 1000ms
    // app.use(simulateLatency(50, 1000));
}
app.set("port", PORT);
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: "5mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "5mb", extended: true }));
app.use((0, middlewares_1.useSession)());
app.use((0, middlewares_1.checkSession)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    origin: process.env.ALLOW_ORIGIN,
    preflightContinue: false,
    credentials: true,
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS",
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
}));
app.use("/api/v1", routers_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// // whenever a user connects on port 3000 via
// // a websocket, log that a user has connected
// io.on("connection", function(socket: any) {
//   console.log("a user connected");
// });
/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
// if (process.env.NODE_ENV === "production") {
//   app.use(logger("dev"));
//   app.use("*", (req, res: Response) => {
//     console.log(path.join(__dirname, "../../client", "build", "index.html"));
//     res.sendFile(path.join(__dirname, "../../client", "build", "index.html"));
//   });
// }
models_1.default.sequelize.sync().then(() => {
    httpServer.listen(PORT, () => {
        console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
        console.log("  Press CTRL-C to stop\n");
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map