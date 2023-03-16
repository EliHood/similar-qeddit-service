"use strict";
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
var dotenv_1 = __importDefault(require("dotenv"));
var sequelize_1 = __importDefault(require("sequelize"));
var models_1 = __importDefault(require("../models"));
var sockets_1 = require("../sockets");
var pusherConfig_1 = __importDefault(require("./../sockets/pusherConfig"));
var profanity_1 = require("@2toad/profanity");
var Op = sequelize_1["default"].Op;
dotenv_1["default"].config();
var filterbadWords = function (word) {
    var arr;
    var content;
    if (profanity_1.profanity.censor(word)) {
        arr = [];
        var sentence = word.split(" ");
        for (var str in sentence) {
            var newWord = sentence[str].split(" ").join("");
            console.log("newWord", newWord);
            var filteredWord = profanity_1.profanity.censor(newWord);
            arr.push(newWord.charAt(0) + filteredWord.substring(1));
            content = arr.join(" ");
        }
        return content;
    }
    else {
        return word;
    }
};
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
exports["default"] = {
    getPosts: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var posts, currentUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1["default"].Post.findAll({
                        include: [
                            {
                                model: models_1["default"].User,
                                as: "author",
                                attributes: ["username", "gravatar", "bio"]
                            },
                            {
                                model: models_1["default"].Likes
                            },
                            {
                                model: models_1["default"].Comments,
                                include: [
                                    {
                                        model: models_1["default"].CommentReplies,
                                        as: "commentReplies",
                                        include: [
                                            {
                                                model: models_1["default"].User,
                                                as: "author",
                                                attributes: ["username", "gravatar", "bio"]
                                            }
                                        ]
                                    },
                                    {
                                        model: models_1["default"].User,
                                        as: "author",
                                        attributes: ["username", "gravatar", "bio"]
                                    }
                                ]
                            },
                            {
                                model: models_1["default"].RePosts,
                                include: [
                                    {
                                        model: models_1["default"].User,
                                        as: "author",
                                        attributes: ["username", "gravatar", "bio"]
                                    }
                                ]
                            }
                        ],
                        order: [["createdAt", "DESC"]],
                        limit: 6
                    })];
                case 1:
                    posts = _a.sent();
                    currentUser = req.session && req.session.user ? req.session.user.id : 0;
                    posts.forEach(function (post) {
                        if (post.Likes.length === 0) {
                            post.setDataValue("likedByMe", false);
                        }
                        if (post.RePosts.length === 0) {
                            post.setDataValue("RepostedByMe", false);
                        }
                        post.RePosts.forEach(function (repost) {
                            var googleLogin = req.session.passport;
                            if (typeof googleLogin === "object") {
                                if (repost.userId === googleLogin.user.id) {
                                    post.setDataValue("RepostedByMe", true);
                                }
                            }
                            if (typeof req.session.user === "undefined") {
                                if (typeof googleLogin === "undefined" &&
                                    typeof req.session.user === "undefined") {
                                    post.setDataValue("RepostedByMe", false);
                                }
                            }
                            else if (typeof req.session.user === "object") {
                                if (repost.userId === req.session.user.id) {
                                    post.setDataValue("RepostedByMe", true);
                                }
                            }
                        });
                        post.Likes.forEach(function (like) {
                            // console.log(like.userId);
                            if (req.user) {
                                if (like.userId === req.session.passport.user.id) {
                                    post.setDataValue("likedByMe", true);
                                }
                            }
                            else if (like.userId === currentUser) {
                                post.setDataValue("likedByMe", true);
                            }
                            // else if(like.userId !== currentUser) {
                            //   post.setDataValue("likedByMe", false);
                            // }
                        });
                    });
                    return [2 /*return*/, res.json(posts)];
            }
        });
    }); },
    postPage: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var postPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1["default"].Post.findOne({
                        where: {
                            id: req.params.id
                        },
                        include: [
                            {
                                model: models_1["default"].User,
                                as: "author",
                                attributes: ["username", "gravatar", "bio"]
                            },
                            // limit the likes based on the logged in user
                            {
                                model: models_1["default"].Likes
                            }
                        ]
                    })];
                case 1:
                    postPage = _a.sent();
                    return [2 /*return*/, res.json(postPage)];
            }
        });
    }); },
    rePost: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var postId, created, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("post", req.params.postId, req.params.userId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    postId = req.params.postId;
                    return [4 /*yield*/, models_1["default"].RePosts.findOne({
                            where: {
                                userId: req.params.userId,
                                postId: postId
                            }
                        })];
                case 2:
                    created = _a.sent();
                    if (!created) {
                        return [2 /*return*/, models_1["default"].RePosts.create({
                                userId: req.params.userId,
                                postId: postId
                            }).then(function (post) {
                                res.status(200).send({
                                    message: "Post Reposted",
                                    post: post
                                });
                            })];
                    }
                    else {
                        return [2 /*return*/, res.status(401).send({
                                message: "Already Reposted"
                            })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    res.status(500).send({
                        message: "Failed to repost"
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    unRePost: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var postId_1, created, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postId_1 = req.params.postId;
                    return [4 /*yield*/, models_1["default"].RePosts.findOne({
                            where: {
                                userId: req.params.userId,
                                postId: postId_1
                            }
                        })];
                case 1:
                    created = _a.sent();
                    if (created) {
                        return [2 /*return*/, models_1["default"].RePosts.destroy({
                                where: {
                                    userId: req.params.userId,
                                    postId: postId_1
                                }
                            }).then(function (repost) {
                                res.status(200).send({
                                    message: "Post got unposted",
                                    repost: repost,
                                    postId: parseInt(postId_1)
                                });
                            })];
                    }
                    else {
                        res.status(401).send({
                            message: "Already got UnReposted"
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    res.status(500).send({
                        message: "Failed to un-repost"
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    deleteComment: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var currentUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUser = isUser(req);
                    if (!(req.params.userId == currentUser)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1["default"].Comments.destroy({
                            where: {
                                id: req.params.id
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.status(200).send("Comment has been deleted!")];
                case 3:
                    error_1 = _a.sent();
                    console.log("There was an error", error_1);
                    res.status(401).send("Failed to delete comment");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5: return [2 /*return*/, res.status(500).send("You can't delete another user comment")];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    createPost: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var postData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("ssd");
                    if (req.user && req.user.id) {
                        console.log(req.user.id);
                        postData = {
                            title: filterbadWords(req.body.ourTitle),
                            postContent: filterbadWords(req.body.ourPostContent),
                            userId: req.session.passport.user.id
                        };
                    }
                    else {
                        postData = {
                            title: filterbadWords(req.body.ourTitle),
                            postContent: filterbadWords(req.body.ourPostContent),
                            userId: req.session.user.id
                        };
                    }
                    console.log("dsdsdsdsdsdsdsdsdds", postData);
                    return [4 /*yield*/, models_1["default"].Post.create(postData)
                            .then(function (post) {
                            models_1["default"].Post.findOne({
                                where: {
                                    id: post.id
                                },
                                include: [
                                    {
                                        model: models_1["default"].User,
                                        as: "author",
                                        attributes: ["username", "gravatar"]
                                    },
                                    {
                                        model: models_1["default"].Comments,
                                        include: [
                                            {
                                                model: models_1["default"].User,
                                                as: "author",
                                                attributes: ["username", "gravatar", "bio"]
                                            }
                                        ]
                                    }
                                ]
                            }).then(function (newPost) {
                                newPost.setDataValue("likedByMe", false);
                                return res.status(200).send({
                                    message: "post created",
                                    post: newPost
                                });
                            });
                        })["catch"](function (err) {
                            return res.status(401).send({
                                message: "Something went wrong",
                                error: err
                            });
                        })];
                case 1:
                    _a.sent();
                    console.log(req.body);
                    return [2 /*return*/];
            }
        });
    }); },
    postComment: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var currentUser, postData, users, usernames_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUser = isUser(req);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    postData = {
                        comment_body: filterbadWords(req.body.comment_body),
                        userId: currentUser,
                        postId: req.body.id,
                        gifUrl: req.body.gifUrl
                    };
                    console.log("dfffcheck", postData);
                    return [4 /*yield*/, models_1["default"].User.findAll()];
                case 2:
                    users = _a.sent();
                    usernames_1 = users.map(function (item) { return item.username; });
                    return [4 /*yield*/, models_1["default"].Comments.create(postData).then(function (comment) {
                            console.log("this is the comment", comment);
                            models_1["default"].Comments.findOne({
                                where: {
                                    id: comment.id
                                },
                                include: [
                                    {
                                        model: models_1["default"].User,
                                        as: "author",
                                        attributes: ["username", "gravatar"]
                                    },
                                    {
                                        model: models_1["default"].CommentReplies,
                                        as: "commentReplies",
                                        include: [
                                            {
                                                model: models_1["default"].User,
                                                as: "author",
                                                attributes: ["username", "gravatar", "bio"]
                                            }
                                        ]
                                    }
                                ]
                            }).then(function (newComment) { return __awaiter(void 0, void 0, void 0, function () {
                                var body, regex, sentence, i, word, username, newUsername;
                                return __generator(this, function (_a) {
                                    body = req.body.comment_body;
                                    if (usernames_1.some(function (user) { return body.includes(user); })) {
                                        regex = /^@/i;
                                        sentence = body.split(" ");
                                        for (i = 0; i < sentence.length; i++) {
                                            word = sentence[i];
                                            username = void 0;
                                            if (regex.test(word)) {
                                                console.log("this test passed bro", word);
                                                username = word;
                                                newUsername = username.slice(1);
                                                if (usernames_1.includes(newUsername)) {
                                                    sockets_1.NotificationServ.userMention(currentUser, newComment.postId, newUsername, newComment.userId);
                                                    console.log(newUsername + " got mentioned");
                                                }
                                            }
                                        }
                                        console.log("this got called");
                                        pusherConfig_1["default"].trigger("post-comments", "user-mention", {
                                            comment: newComment
                                        });
                                    }
                                    else {
                                        console.log("no luck finding user");
                                    }
                                    console.log("dsdsdssdsd", currentUser, newComment.userId); // con
                                    sockets_1.NotificationServ.newCommentNotification(currentUser, newComment.postId, newComment.userId);
                                    pusherConfig_1["default"].trigger("post-comments", "new-comment", {
                                        comment: newComment
                                    });
                                    return [2 /*return*/, res.status(200).send({
                                            message: "comment created",
                                            comment: newComment
                                        })];
                                });
                            }); });
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.log("There was an error", error_2);
                    return [2 /*return*/, res.status(500).send({
                            message: "Failed to write a comment",
                            error: error_2
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    editComment: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var transaction, currentUser, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("testtttt", req.body);
                    currentUser = isUser(req);
                    if (req.body.comment_body && req.body.gifUrl) {
                        return [2 /*return*/, res.status(401).send({
                                message: "Can't edit both"
                            })];
                    }
                    console.log("dfdfdfd", req.params.userId, currentUser);
                    if (!(req.params.userId != currentUser)) return [3 /*break*/, 1];
                    return [2 /*return*/, res.status(401).send({
                            message: "Can't edit another users post"
                        })];
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1["default"].sequelize.transaction()];
                case 2:
                    transaction = _a.sent();
                    return [2 /*return*/, models_1["default"].Comments.update({
                            comment_body: filterbadWords(req.body.commentData)
                                ? filterbadWords(req.body.commentData)
                                : "",
                            gifUrl: req.body.gifUrl ? req.body.gifUrl : ""
                        }, {
                            where: {
                                id: req.params.commentId
                            }
                        }, { transaction: transaction }).then(function (comment) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("anothfdf", comment);
                                        return [4 /*yield*/, transaction.commit()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/, res.status(200).send({
                                                message: "Comment Edited Successfully"
                                            })];
                                }
                            });
                        }); })];
                case 3:
                    err_3 = _a.sent();
                    console.log("something went wrong", err_3);
                    res.status(401).send({
                        message: "Something went wrong"
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    searchPosts: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var posts, currentUser_1, err_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (req.params.searchQuery === "") {
                        return [2 /*return*/, res.status(401).send({
                                message: "No Posts found"
                            })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1["default"].Post.findAll({
                            where: {
                                title: (_a = {},
                                    _a[Op.like] = "%" + req.params.searchQuery + "%",
                                    _a)
                            },
                            include: [
                                {
                                    model: models_1["default"].User,
                                    as: "author",
                                    attributes: ["username", "gravatar", "bio"]
                                },
                                {
                                    model: models_1["default"].Likes
                                },
                                {
                                    model: models_1["default"].Comments,
                                    include: [
                                        {
                                            model: models_1["default"].CommentReplies,
                                            as: "commentReplies",
                                            include: [
                                                {
                                                    model: models_1["default"].User,
                                                    as: "author",
                                                    attributes: ["username", "gravatar", "bio"]
                                                }
                                            ]
                                        },
                                        {
                                            model: models_1["default"].User,
                                            as: "author",
                                            attributes: ["username", "gravatar", "bio"]
                                        }
                                    ]
                                },
                                {
                                    model: models_1["default"].RePosts,
                                    include: [
                                        {
                                            model: models_1["default"].User,
                                            as: "author",
                                            attributes: ["username", "gravatar", "bio"]
                                        }
                                    ]
                                }
                            ]
                        })];
                case 2:
                    posts = _b.sent();
                    currentUser_1 = req.session && req.session.user ? req.session.user.id : 0;
                    posts.forEach(function (post) {
                        if (post.Likes.length === 0) {
                            post.setDataValue("likedByMe", false);
                        }
                        if (post.RePosts.length === 0) {
                            post.setDataValue("RepostedByMe", false);
                        }
                        post.RePosts.forEach(function (repost) {
                            var googleLogin = req.session.passport;
                            if (typeof googleLogin === "object") {
                                if (repost.userId === googleLogin.user.id) {
                                    post.setDataValue("RepostedByMe", true);
                                }
                            }
                            if (typeof req.session.user === "undefined") {
                                if (typeof googleLogin === "undefined" &&
                                    typeof req.session.user === "undefined") {
                                    post.setDataValue("RepostedByMe", false);
                                }
                            }
                            else if (typeof req.session.user === "object") {
                                if (repost.userId === req.session.user.id) {
                                    post.setDataValue("RepostedByMe", true);
                                }
                            }
                        });
                        post.Likes.forEach(function (like) {
                            // console.log(like.userId);
                            if (req.user) {
                                if (like.userId === req.session.passport.user.id) {
                                    post.setDataValue("likedByMe", true);
                                }
                            }
                            else if (like.userId === currentUser_1) {
                                post.setDataValue("likedByMe", true);
                            }
                            // else if(like.userId !== currentUser) {
                            //   post.setDataValue("likedByMe", false);
                            // }
                        });
                    });
                    if (posts.length === 0) {
                        res.status(401).send({
                            message: "No Posts Found"
                        });
                    }
                    else {
                        res.status(200).send({
                            post: posts
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _b.sent();
                    console.log(err_4);
                    return [2 /*return*/, res.status(401).send("Failed to get posts")];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    deleteReply: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1["default"].CommentReplies.destroy({
                            where: {
                                id: req.params.id,
                                postId: req.params.postId
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res.status(200).send({
                            message: "Reply has been deleted"
                        })];
                case 2:
                    err_5 = _a.sent();
                    console.log(err_5);
                    res.status(401).send("Failed to delete reply");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    replyComment: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var currentUser, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUser = isUser(req);
                    console.log("dsfsfsf checking for reqboyd", req.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1["default"].CommentReplies.create({
                            postId: req.params.postId,
                            commentId: req.params.commentId,
                            userId: currentUser,
                            replyBody: req.body.replyBody
                        }).then(function (reply) {
                            models_1["default"].CommentReplies.findOne({
                                where: {
                                    id: reply.id
                                },
                                include: [
                                    {
                                        model: models_1["default"].User,
                                        as: "author",
                                        attributes: ["username", "gravatar"]
                                    }
                                ]
                            }).then(function (newReply) {
                                return res.status(200).send({
                                    reply: newReply,
                                    message: "Reply added successfully"
                                });
                            });
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    res.status(401).send("Failed to add reply");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    deletePost: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var currentUser, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUser = isUser(req);
                    console.log(req.params);
                    if (!(req.params.userId == currentUser)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1["default"].Post.destroy({
                            where: {
                                id: req.params.id
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.status(200).send("Post has been deleted!")];
                case 3:
                    error_3 = _a.sent();
                    console.log("There was an error", error_3);
                    res.status(401).send("Failed to delete");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5: return [2 /*return*/, res.status(500).send("You can't delete another user post")];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    likePost: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var currentUser, created, post, transaction, likes, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUser = isUser(req);
                    return [4 /*yield*/, models_1["default"].Likes.findOne({
                            where: {
                                userId: currentUser,
                                resourceId: req.params.id
                            }
                        })];
                case 1:
                    created = _a.sent();
                    return [4 /*yield*/, models_1["default"].Post.findOne({
                            where: {
                                id: req.params.id
                            },
                            include: [
                                {
                                    model: models_1["default"].User,
                                    as: "author",
                                    attributes: ["username", "gravatar", "bio"]
                                },
                                // limit the likes based on the logged in user
                                {
                                    model: models_1["default"].Likes
                                }
                            ]
                        })
                            .then(function (newPost) { return newPost; })["catch"](function (err) {
                            return res.status(500).send({
                                message: err
                            });
                        })];
                case 2:
                    post = _a.sent();
                    // no post, no updates
                    if (!post) {
                        return [2 /*return*/, res.status(200).send({
                                message: "there is no post to be liked"
                            })];
                    }
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 9, , 12]);
                    return [4 /*yield*/, models_1["default"].sequelize.transaction()];
                case 4:
                    transaction = _a.sent();
                    if (created && post) {
                        return [2 /*return*/, res.status(500).send({
                                message: "Something went wrong, please refresh"
                            })];
                    }
                    if (!(!created && post)) return [3 /*break*/, 8];
                    // use Promise.all() for concurrency
                    return [4 /*yield*/, models_1["default"].Likes.create({
                            userId: currentUser,
                            resourceId: req.params.id
                        }, { transaction: transaction })];
                case 5:
                    // use Promise.all() for concurrency
                    _a.sent();
                    post.increment("likeCounts", { by: 1, transaction: transaction });
                    return [4 /*yield*/, models_1["default"].Likes.findAll()];
                case 6:
                    likes = _a.sent();
                    if (likes.length === 0) {
                        console.log("this got called");
                        post.setDataValue("likedByMe", true);
                    }
                    if (likes) {
                        likes.forEach(function (like) {
                            if (like.userId === currentUser) {
                                console.log("wwdff", like);
                                post.setDataValue("likedByMe", true);
                            }
                        });
                    }
                    return [4 /*yield*/, transaction.commit()];
                case 7:
                    _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: "You liked this post",
                            post: post
                        })];
                case 8: return [3 /*break*/, 12];
                case 9:
                    err_7 = _a.sent();
                    if (!transaction) return [3 /*break*/, 11];
                    return [4 /*yield*/, transaction.rollback()];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    console.log("There was an error", err_7);
                    return [2 /*return*/, res.status(500)];
                case 12: return [2 /*return*/];
            }
        });
    }); },
    disLikePost: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var currentUser, created, post, transaction, likes, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUser = isUser(req);
                    return [4 /*yield*/, models_1["default"].Likes.findOne({
                            where: {
                                userId: currentUser,
                                resourceId: req.params.id
                            }
                        })];
                case 1:
                    created = _a.sent();
                    return [4 /*yield*/, models_1["default"].Post.findOne({
                            where: {
                                id: req.params.id
                            },
                            include: [
                                {
                                    model: models_1["default"].User,
                                    as: "author",
                                    attributes: ["username", "gravatar", "bio"]
                                },
                                // limit the likes based on the logged in user
                                {
                                    model: models_1["default"].Likes
                                }
                            ]
                        })];
                case 2:
                    post = _a.sent();
                    // no post, no updates
                    if (!post) {
                        return [2 /*return*/, res.status(401).json({
                                message: "there is no post to be unliked"
                            })];
                    }
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 9, , 12]);
                    return [4 /*yield*/, models_1["default"].sequelize.transaction()];
                case 4:
                    transaction = _a.sent();
                    if (!created && post) {
                        return [2 /*return*/, res.status(500).send({
                                message: "Something went wrong, please refresh"
                            })];
                    }
                    if (!(created && post)) return [3 /*break*/, 8];
                    return [4 /*yield*/, models_1["default"].Likes.destroy({
                            where: {
                                userId: currentUser,
                                resourceId: req.params.id
                            }
                        }, { transaction: transaction })];
                case 5:
                    _a.sent();
                    post.decrement("likeCounts", { by: 1, transaction: transaction });
                    return [4 /*yield*/, models_1["default"].Likes.findAll()];
                case 6:
                    likes = _a.sent();
                    if (likes) {
                        likes.forEach(function (like) {
                            console.log("dislike", like);
                            if (like.userId === currentUser) {
                                post.setDataValue("likedByMe", false);
                            }
                        });
                    }
                    return [4 /*yield*/, transaction.commit()];
                case 7:
                    _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: "You unliked this post",
                            post: post
                        })];
                case 8: return [3 /*break*/, 12];
                case 9:
                    err_8 = _a.sent();
                    if (!transaction) return [3 /*break*/, 11];
                    return [4 /*yield*/, transaction.rollback()];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    console.log("There was an error", err_8);
                    return [2 /*return*/, res.status(500)];
                case 12: return [2 /*return*/];
            }
        });
    }); }
};
//# sourceMappingURL=post.controller.js.map