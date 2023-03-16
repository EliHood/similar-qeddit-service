"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_session_1 = __importDefault(require("express-session"));
var sessionConfig_1 = __importDefault(require("../config/sessionConfig"));
exports["default"] = (function () { return (0, express_session_1["default"])(sessionConfig_1["default"]); });
//# sourceMappingURL=useSession.js.map