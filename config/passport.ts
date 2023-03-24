import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import models from "../models";
const GoogleSta = GoogleStrategy.Strategy;

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  models.User.findOne({ id })
    .then((usr) => {
      return done(null, usr);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new GoogleSta(
    {
      clientID: process.env.PASSPORT_CLIENT_ID,
      clientSecret: process.env.PASSPORT_CLIENT_SECRET,
      callbackURL: process.env.PASSPORT_CALLBACK_URL,
      passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    async (req, token, refreshToken, profile, done) => {
      console.log(profile);
      models.User.findOne({ where: { googleId: profile.id } }).then(
        async (userExist) => {
          if (userExist) {
            return done(null, userExist);
          } else {
            try {
              return models.User.create({
                googleId: profile.id,
                username: profile.displayName
                  ? profile.displayName
                  : profile.emails[0].value.split("@")[0],
                gravatar: profile.photos[0].value,
                email: profile.emails[0].value,
              }).then((user) => {
                return done(null, user);
              });
            } catch (err) {
              return done(null, err);
            }
          }
        }
      );
    }
  )
);
