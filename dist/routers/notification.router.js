"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var router = express_1["default"].Router();
router.get("/:userId", controllers_1.notificationController.getAllNotifications);
router.post("/markAsRead/:notificationId", controllers_1.notificationController.markAsRead);
exports["default"] = router;
//# sourceMappingURL=notification.router.js.map