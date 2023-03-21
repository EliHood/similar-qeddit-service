import * as express from "express";

const router: express.Router = express.Router();

router.use("/", (_, res) => {
  const statusInfo = {
	status: "ready",
    buildBranch: process.env.BUILD_BRANCH || "unknown",
    buildRev: process.env.BUILD_REV || "unknown",
    buildTime: process.env.BUILD_TIME || "unknown",
	systemTime: new Date().toISOString(),
  };

  return res.status(200).send(JSON.stringify(statusInfo, null, 4));
});

export default router;
