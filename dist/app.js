"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var morgan_1 = __importDefault(require("morgan"));
var passport_1 = __importDefault(require("passport"));
require("./config/passport");
var middlewares_1 = require("./middlewares");
var routers_1 = __importDefault(require("./routers"));
dotenv_1["default"].config();
var PORT = process.env.PORT || 5000;
console.log("port", PORT);
var app = (0, express_1["default"])();
var httpServer = http_1["default"].createServer(app);
/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1["default"])("dev"));
    // to simulate latency of 50ms - 1000ms
    // app.use(simulateLatency(50, 1000));
}
app.set("port", PORT);
app.use((0, cookie_parser_1["default"])());
app.use(body_parser_1["default"].json({ limit: "5mb" }));
app.use(body_parser_1["default"].urlencoded({ limit: "5mb", extended: true }));
app.use((0, middlewares_1.useSession)());
app.use((0, middlewares_1.checkSession)());
app.use(passport_1["default"].initialize());
app.use(passport_1["default"].session());
app.use((0, cors_1["default"])({
    origin: process.env.ALLOW_ORIGIN,
    preflightContinue: false,
    credentials: true,
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS",
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"]
}));
app.use("/api/v1", routers_1["default"]);
app.get("/", function (req, res) {
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
// models.sequelize.sync().then(() => {
httpServer.listen(PORT, function () {
    console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
// });
exports["default"] = app;
//# sourceMappingURL=app.js.map