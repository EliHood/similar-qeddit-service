import { NextFunction, Response } from "express";
import models from "../models";

export default () => async (req: any, res: Response, next: NextFunction) => {
  // console.log(req.session);
  // console.log("tesiing authPolicy");
  if (req.session && req.session.user) {
    const user = await models.User.findOne({
      where: {
        id: req.session.user.id
      },
      raw: true
    });
    // console.log(user, "fdffdff");
    if (user === null) {
      req.session.destroy(() => {});
      req.logout();
    }
    // if (user) {
    //   req.user = user;
    //   delete req.user.password; // delete the password from the session
    //   req.session.user = user; // refresh the session value
    //   res.locals.user = user;
    // }
    // finishing processing the middleware and run the route
    next();
  } else {
    next();
  }
};
