import models from "../models";
import pusherConfig from "./pusherConfig";
export default {
  async newCommentNotification(currentUser, postId, commenterId) {
    const post = await models.Post.findOne({ where: { id: postId } });
    const commenter = await models.User.findOne({ where: { id: commenterId } });
    const { userId, title } = post;
    const commenterName = commenter.username;
    const body = `${commenterName} just commented on article: ${title}`;
    if (currentUser !== userId) {
      await models.Notification.create({ userId, body, status: "unread" });
    }
    const data = {
      body,
      currentUser,
      userId,
      commenterId,
    };
    pusherConfig.trigger("notification", "my-event", data);
  },

  async userMention(currentUser, postId, commenterId) {
    const post = await models.Post.findOne({ where: { id: postId } });
    const commenter = await models.User.findOne({ where: { id: commenterId } });
    const { userId } = post;
    console.log("notification", userId);
    const commenterName = commenter.username;
    const body = `${commenterName} mentioned you`;

    if (currentUser !== userId) {
      await models.Notification.create({ userId, body, status: "unread" });
    }

    pusherConfig.trigger("notification", "user-mention", body);
  },
};
