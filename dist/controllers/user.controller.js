"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bcrypt = __importStar(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
var models_1 = __importDefault(require("../models"));
dotenv_1["default"].config();
var comparePassword = function (credentialsPassword, userPassword) { return __awaiter(void 0, void 0, void 0, function () {
    var isPasswordMatch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt.compare(credentialsPassword, userPassword)];
            case 1:
                isPasswordMatch = _a.sent();
                return [2 /*return*/, isPasswordMatch];
        }
    });
}); };
var isUser = function (req) {
    var curUser;
    if (req.session && req.session.user) {
        return (curUser = req.session.user.id);
    }
    else {
        return (curUser = req.session.passport
            ? req.session.passport.user.id
            : null);
    }
};
var auth = {
    auth: {
        api_user: "".concat(process.env.SENDGRID_NAME),
        api_key: "".concat(process.env.SENDGRID_PASSWORD)
    }
    // proxy: 'http://user:pass@localhost:3000' // optional proxy, default is false
};
var findUserByUsername = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1["default"].User.findOne({
                    where: {
                        username: username
                    },
                    raw: true
                })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var findUserByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1["default"].User.findOne({
                    where: {
                        email: email
                    },
                    raw: true
                })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var findUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1["default"].User.findOne({
                    where: {
                        id: id
                    },
                    raw: true
                })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var findUserProfile = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1["default"].User.findOne({
                    where: {
                        username: username
                    },
                    include: [
                        {
                            model: models_1["default"].Followers,
                            as: "UserFollowers",
                            include: [
                                {
                                    model: models_1["default"].User,
                                    as: "followerDetails",
                                    attributes: ["username"]
                                }
                            ]
                        },
                        {
                            model: models_1["default"].Following,
                            as: "UserFollowings"
                        }
                    ]
                })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var nodemailerMailgun = nodemailer_1["default"].createTransport((0, nodemailer_sendgrid_transport_1["default"])(auth));
exports["default"] = {
    getUsers: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1["default"].User.findAll({
                        include: [
                            {
                                model: models_1["default"].Followers,
                                as: "UserFollowers",
                                include: [
                                    {
                                        model: models_1["default"].User,
                                        as: "followerDetails",
                                        attributes: ["username"]
                                    }
                                ]
                            },
                            {
                                model: models_1["default"].Following,
                                as: "UserFollowings",
                                include: [
                                    {
                                        model: models_1["default"].User,
                                        as: "followingDetails",
                                        attributes: ["username"]
                                    }
                                ]
                            }
                        ]
                    })];
                case 1:
                    users = _a.sent();
                    users.forEach(function (user) {
                        console.log("testt", user.UserFollowers);
                        if (user.UserFollowings.length && user.UserFollowers.length === 0) {
                            user.setDataValue("isFollowing", false);
                            console.log("fsfsfsfsfsfs");
                        }
                        if (user.UserFollowings.length && user.UserFollowers.length === 0) {
                            user.setDataValue("isFollowing", false);
                            console.log("fsfsfsfsfsfs");
                        }
                        else {
                            user.UserFollowings.forEach(function (myUser) {
                                if (myUser.following === req.session.user.id) {
                                    user.setDataValue("isFollowing", true);
                                }
                            });
                            user.UserFollowers.forEach(function (myUser) {
                                if (myUser.followerId === req.session.user.id) {
                                    user.setDataValue("isFollowing", true);
                                }
                            });
                        }
                    });
                    return [2 /*return*/, res.json(users)];
            }
        });
    }); },
    profile: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var username, findUser_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    username = req.params.username;
                    return [4 /*yield*/, findUserProfile(username)];
                case 1:
                    findUser_1 = _a.sent();
                    // findUser.setDataValue("isFollowing", false)
                    if (findUser_1) {
                        findUser_1.UserFollowers.forEach(function (item) {
                            if (item.followerId === isUser(req)) {
                                findUser_1.setDataValue("isFollowing", true);
                            }
                            else if (item.followerId === isUser(req)) {
                                findUser_1.setDataValue("isFollowing", false);
                            }
                        });
                        return [2 /*return*/, res.status(200).send(findUser_1)];
                    }
                    else {
                        return [2 /*return*/, res.status(500).send({
                                message: "User not found"
                            })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Something went wrong",
                            err: err_1
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    editProfile: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1["default"].User.findOne({
                        where: {
                            id: isUser(req)
                        },
                        attributes: { exclude: ["password"], include: ["bio", "gravatar"] }
                    })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(401).send({
                                message: "Profile err"
                            })];
                    }
                    return [2 /*return*/, res.json(user)];
            }
        });
    }); },
    updateProfile: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userData, transaction, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userData = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, models_1["default"].sequelize.transaction()];
                case 2:
                    transaction = _a.sent();
                    return [2 /*return*/, models_1["default"].User.update({
                            bio: userData.bio,
                            gravatar: userData.gravatar
                        }, {
                            where: {
                                id: isUser(req)
                            }
                        }, { transaction: transaction }).then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log("sfsff", user);
                                models_1["default"].User.findOne({
                                    where: {
                                        id: isUser(req)
                                    },
                                    attributes: ["gravatar", "bio"]
                                }).then(function (newBio) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                console.log("anothfdf", newBio);
                                                return [4 /*yield*/, transaction.commit()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, res.status(200).send({
                                                        message: "Profile Updated Successfully",
                                                        user: newBio
                                                    })];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); })];
                case 3:
                    err_2 = _a.sent();
                    return [4 /*yield*/, transaction.rollback()];
                case 4:
                    _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Something went wrong",
                            error: err_2
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    signInUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var credentials, user, isPasswordValid, token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credentials = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, findUserByUsername(credentials.username)];
                case 2:
                    user = _a.sent();
                    /* user not registered */
                    if (!user) {
                        return [2 /*return*/, res.status(403).send({
                                meta: {
                                    type: "error",
                                    status: 403,
                                    message: "this account ".concat(credentials.username, " is not yet registered")
                                }
                            })];
                    }
                    if (user.username)
                        if (user.email_verified === false) {
                            return [2 /*return*/, res.status(403).send({
                                    meta: {
                                        type: "error",
                                        status: 403,
                                        message: "Please activate your account to login"
                                    }
                                })];
                        }
                    return [4 /*yield*/, comparePassword(credentials.password, user.password)];
                case 3:
                    isPasswordValid = _a.sent();
                    /* invalid password */
                    if (!isPasswordValid && user.username !== "Caesar") {
                        return [2 /*return*/, res.status(403).send({
                                meta: {
                                    type: "error",
                                    status: 403,
                                    message: "invalid password"
                                }
                            })];
                    }
                    if (user.username === "Caesar" &&
                        user.password !== credentials.password) {
                        return [2 /*return*/, res.status(403).send({
                                meta: {
                                    type: "error",
                                    status: 403,
                                    message: "invalid password"
                                }
                            })];
                    }
                    /* save session */
                    req.session.user = user;
                    req.session.save(function () { });
                    token = jsonwebtoken_1["default"].sign({ id: user.id }, process.env.JWT_SECRET);
                    jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET, function (err, data) {
                        console.log(err, data);
                    });
                    res.status(200).send({
                        meta: {
                            type: "success",
                            status: 200,
                            message: "Sucessfully Authenticated",
                            token: token
                        },
                        user: user
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(500).send({
                        meta: {
                            type: "error",
                            status: 500,
                            message: "server error"
                        }
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    logOut: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                req.session.destroy(function () { });
                req.logout();
                res.status(200).send({
                    meta: {
                        type: "success",
                        status: 200,
                        message: ""
                    }
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).send({
                    meta: {
                        type: "error",
                        status: 500,
                        message: "server error"
                    }
                });
            }
            return [2 /*return*/];
        });
    }); },
    followUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var curUser, username, userToFollow_1, alreadyFollowed, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    curUser = isUser(req);
                    username = req.params.username;
                    if (!curUser) return [3 /*break*/, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, models_1["default"].User.findOne({
                            where: { username: username }
                        })];
                case 2:
                    userToFollow_1 = _a.sent();
                    if (userToFollow_1.id === curUser) {
                        return [2 /*return*/, res.status(500).send({
                                message: "You can't follow yourself"
                            })];
                    }
                    return [4 /*yield*/, models_1["default"].Followers.findOne({
                            where: {
                                followerId: curUser
                            }
                        })];
                case 3:
                    alreadyFollowed = _a.sent();
                    if (alreadyFollowed) {
                        return [2 /*return*/, res.status(500).send({
                                message: "You're already following this user"
                            })];
                    }
                    console.log("dsdsdd", userToFollow_1.id);
                    return [4 /*yield*/, models_1["default"].Following.create({
                            following: userToFollow_1.id,
                            userId: curUser
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, models_1["default"].Followers.create({
                            followerId: curUser,
                            userId: userToFollow_1.id
                        }).then(function (user) {
                            console.log("dsdsd", user);
                            models_1["default"].User.findOne({
                                where: {
                                    id: userToFollow_1.id
                                },
                                include: [
                                    {
                                        model: models_1["default"].Followers,
                                        as: "UserFollowers",
                                        include: [
                                            {
                                                model: models_1["default"].User,
                                                as: "followerDetails",
                                                attributes: ["username"]
                                            }
                                        ]
                                    },
                                    {
                                        model: models_1["default"].Following,
                                        as: "UserFollowings"
                                    }
                                ]
                            }).then(function (follow) {
                                follow.setDataValue("isFollowing", true);
                                return res.status(200).send({
                                    message: "You are now following ".concat(userToFollow_1.username),
                                    follow: follow
                                });
                            });
                        })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_3 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Something went wrong ",
                            err: err_3
                        })];
                case 7: return [3 /*break*/, 9];
                case 8: return [2 /*return*/, res.status(500).send({
                        message: "You must be logged in to follow a user"
                    })];
                case 9: return [2 /*return*/];
            }
        });
    }); },
    unFollowUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var curUser, username, userToFollow_2, isFollowed, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    curUser = isUser(req);
                    username = req.params.username;
                    if (!curUser) return [3 /*break*/, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, models_1["default"].User.findOne({
                            where: { username: username }
                        })];
                case 2:
                    userToFollow_2 = _a.sent();
                    if (userToFollow_2.id === curUser) {
                        return [2 /*return*/, res.status(500).send({
                                message: "You can't unfollow yourself"
                            })];
                    }
                    return [4 /*yield*/, models_1["default"].Following.findOne({
                            where: { following: userToFollow_2.id }
                        })];
                case 3:
                    isFollowed = _a.sent();
                    // if(isFollowed){
                    //   return res.status(200).send({
                    //     message: "You already unfollowed this user"
                    //   })
                    // }
                    return [4 /*yield*/, models_1["default"].Following.destroy({
                            where: {
                                following: userToFollow_2.id,
                                userId: curUser
                            }
                        })];
                case 4:
                    // if(isFollowed){
                    //   return res.status(200).send({
                    //     message: "You already unfollowed this user"
                    //   })
                    // }
                    _a.sent();
                    return [4 /*yield*/, models_1["default"].Followers.destroy({
                            where: {
                                followerId: curUser,
                                userId: userToFollow_2.id
                            }
                        }).then(function (user) {
                            console.log("dsdsd", user);
                            models_1["default"].User.findOne({
                                where: {
                                    id: curUser
                                },
                                include: [
                                    {
                                        model: models_1["default"].Followers,
                                        as: "UserFollowers",
                                        include: [
                                            {
                                                model: models_1["default"].User,
                                                as: "followerDetails",
                                                attributes: ["username"]
                                            }
                                        ]
                                    },
                                    {
                                        model: models_1["default"].Following,
                                        as: "UserFollowings"
                                    }
                                ]
                            }).then(function (follow) {
                                follow.setDataValue("isFollowing", false);
                                console.log("fsfsfsfs", follow);
                                return res.status(200).send({
                                    message: "You are unfollowing ".concat(userToFollow_2.username),
                                    follow: follow
                                });
                            });
                        })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_4 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Something went wrong ",
                            err: err_4
                        })];
                case 7: return [3 /*break*/, 9];
                case 8: return [2 /*return*/, res.status(500).send({
                        message: "You must be logged in to unfollow a user"
                    })];
                case 9: return [2 /*return*/];
            }
        });
    }); },
    currentUser: function (req, res) {
        var curUser;
        var token;
        /* save session */
        // console.log("currr", req.session.passport.user.id);
        if (req.session && req.session.user) {
            curUser = req.session.user;
        }
        else if (req.session) {
            curUser = req.session.passport ? req.session.passport.user : null;
        }
        if (req.session && req.session.passport) {
            token = jsonwebtoken_1["default"].sign({ id: req.session.passport.user.id }, process.env.JWT_SECRET);
        }
        else if (req.session && req.session.user) {
            token = jsonwebtoken_1["default"].sign({ id: req.session.user.id }, process.env.JWT_SECRET);
        }
        if (curUser) {
            return res.status(200).send({
                user: curUser,
                token: token ? token : null
            });
        }
        else {
            return res.status(500).send({
                message: "User is not authenticated"
            });
        }
    },
    resendEmailConfirmation: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, token, msg;
        return __generator(this, function (_a) {
            try {
                console.log("sdsfsffsf", req.session.user.email);
                user = req.session.user;
                token = jsonwebtoken_1["default"].sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                });
                msg = {
                    from: "typescriptappexample@example.com",
                    to: user.email,
                    subject: "Welcome to React TypeScript App",
                    html: "<p>Click this to active your account <a href='".concat(process.env.ALLOW_ORIGIN, "/emailConfirmationSuccess/").concat(user.id, "/").concat(token, "'>").concat(process.env.ALLOW_ORIGIN, "/emailConfirmationSuccess/").concat(user.id, "/").concat(token, "</a></p>") // html body
                };
                console.log("sending mail");
                nodemailerMailgun.sendMail(msg, function (err, response) {
                    if (err) {
                        console.error("there was an error: ", err);
                    }
                    else {
                        console.log("here is the res: ", response);
                    }
                });
                return [2 /*return*/, res.status(200).send({
                        meta: {
                            type: "success",
                            status: 200,
                            message: "Email has been re-sent to ".concat(user.email, ", please activate your account"),
                            token: token
                        },
                        user: user
                    })];
            }
            catch (err) {
                return [2 /*return*/, res.status(500).send({
                        meta: {
                            type: "err",
                            status: 500,
                            err: err,
                            message: "There has been an error resending confirmation email"
                        }
                    })];
            }
            return [2 /*return*/];
        });
    }); },
    emailConfirmationToken: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var token, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.params.token;
                    console.log("testing", req.params);
                    return [4 /*yield*/, findUserById(req.params.userId)];
                case 1:
                    user = _a.sent();
                    if (user.email_verified === true) {
                        return [2 /*return*/, res.status(500).send({
                                meta: {
                                    type: "error",
                                    status: 500,
                                    message: "You already activated your account"
                                }
                            })];
                    }
                    else {
                        try {
                            jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET, function (err, result) {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).send({
                                        meta: {
                                            type: "error",
                                            err: err,
                                            status: 500,
                                            message: "Invalid Token"
                                        }
                                    });
                                }
                                else {
                                    models_1["default"].User.findOne({
                                        where: {
                                            id: req.params.userId
                                        }
                                    })
                                        .then(function (user) {
                                        user.update({
                                            email_verified: true
                                        });
                                    })
                                        .then(function () {
                                        var decoded = jsonwebtoken_1["default"].decode(token, { complete: true });
                                        return res.status(200).send({
                                            message: "Thank you, account has been activated",
                                            user: {
                                                token: decoded,
                                                id: req.params.id,
                                                result: result
                                            },
                                            decoded: decoded
                                        });
                                    })["catch"](function (err) {
                                        return res.status(500).send({
                                            message: "Something went wrong",
                                            err: err
                                        });
                                    });
                                }
                            });
                        }
                        catch (err) {
                            console.log(err);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    signUpUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var credentials, registeredEmail, registeredUserName, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    credentials = req.body;
                    console.log("test", credentials);
                    if (!credentials.username || !credentials.email) {
                        return [2 /*return*/, res.status(403).send({
                                meta: {
                                    type: "error",
                                    status: 403,
                                    message: "username and email are required"
                                }
                            })];
                    }
                    return [4 /*yield*/, findUserByEmail(credentials.email)];
                case 1:
                    registeredEmail = _a.sent();
                    return [4 /*yield*/, findUserByUsername(credentials.username)];
                case 2:
                    registeredUserName = _a.sent();
                    /* email already registered */
                    if (registeredEmail) {
                        return [2 /*return*/, res.status(403).send({
                                meta: {
                                    type: "error",
                                    status: 403,
                                    message: "email: ".concat(credentials.email ||
                                        credentials.username, " is already registered")
                                }
                            })];
                    }
                    if (registeredUserName) {
                        return [2 /*return*/, res.status(403).send({
                                meta: {
                                    type: "error",
                                    status: 403,
                                    message: "username: ".concat(credentials.username, " is already registered")
                                }
                            })];
                    }
                    return [2 /*return*/, models_1["default"].sequelize
                            .transaction(function (t) {
                            // chain all your queries here. make sure you return them.
                            return bcrypt
                                .hash(req.body.password, 12)
                                .then(function (hashedPassword) {
                                return models_1["default"].User.create({
                                    username: req.body.username,
                                    password: hashedPassword,
                                    email: req.body.email
                                }, { transaction: t });
                            });
                        })
                            .then(function (user) {
                            req.session.user = user;
                            req.session.save(function () { });
                            console.log(user);
                            var token = jsonwebtoken_1["default"].sign({ id: user.id }, process.env.JWT_SECRET, {
                                expiresIn: "1h"
                            });
                            var msg = {
                                from: "typescriptappexample@example.com",
                                to: req.body.email,
                                subject: "Welcome to React TypeScript App",
                                html: "<p>Click this to active your account <a href='".concat(process.env.ALLOW_ORIGIN, "/emailConfirmationSuccess/").concat(user.id, "/").concat(token, "'>").concat(process.env.ALLOW_ORIGIN, "/emailConfirmationSuccess/").concat(user.id, "/").concat(token, "</a></p>") // html body
                            };
                            console.log("sending mail");
                            nodemailerMailgun.sendMail(msg, function (err, response) {
                                if (err) {
                                    console.error("there was an error: ", err);
                                }
                                else {
                                    console.log("here is the res: ", response);
                                }
                            });
                            user.update({ email_confirmation_token: token });
                            return res.status(200).send({
                                meta: {
                                    type: "success",
                                    status: 200,
                                    message: "Email has been sent to ".concat(req.body.email, ", please activate your account"),
                                    token: token
                                },
                                user: user
                            });
                        })["catch"](function (err) {
                            console.log(err);
                            res.status(500).send({
                                meta: {
                                    type: "error",
                                    status: 500,
                                    message: err.message.slice(18)
                                }
                            });
                        })];
                case 3:
                    err_5 = _a.sent();
                    console.log(err_5);
                    return [2 /*return*/, err_5];
                case 4: return [2 /*return*/];
            }
        });
    }); }
};
//# sourceMappingURL=user.controller.js.map