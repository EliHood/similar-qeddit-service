"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pusher_1 = __importDefault(require("pusher"));
exports["default"] = new pusher_1["default"]({
    appId: "939397",
    key: "0d45d56558d5bdcbc179",
    secret: "2f956dc7c3db7e6ff355",
    cluster: "us2",
    useTLS: true
});
//# sourceMappingURL=pusherConfig.js.map