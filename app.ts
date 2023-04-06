import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import logger from "morgan";
import passport from "passport";
import { checkSession, useSession } from "./middlewares";
import models from "./models";
import apiRouter from "./routers";
import "./config/passport";

const PORT = process.env.PORT || 5000;
const app: express.Application = express();
const httpServer = http.createServer(app);

/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));

  // to simulate latency of 50ms - 1000ms
  // app.use(simulateLatency(50, 1000));
}

app.set("port", PORT);

app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN || "http://localhost:3002"
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(useSession());
app.use(checkSession());
app.use(passport.initialize());
app.use(passport.session());
// app.options("*", cors({ credentials: false })); // include before other routes
app.use("/api/v1", apiRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// // whenever a user connects on port 3000 via
// // a websocket, log that a user has connected
// io.on("connection", function(socket: any) {
//   console.log("a user connected");
// });

httpServer.listen(PORT, () => {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default app;
