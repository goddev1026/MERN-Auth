import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { User } from "./models/User";
import { Message } from "./enums";

const localOpts = {
  usernameField: "email",
  passwordField: "password",
};

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default {
  local: new LocalStrategy(localOpts, (email, password, done) => {
    User.findOne({ email })
      .then(async (user) => {
        if (!user) {
          done(undefined, null, { message: Message.InvalidLogin });
        } else if (!(await user.comparePassword(password))) {
          done(undefined, user, { message: Message.InvalidLogin });
        } else {
          done(undefined, user);
        }
      })
      .catch(done);
  }),
  jwt: new JwtStrategy(jwtOpts, ({ sub }, done) => {
    User.findById(sub)
      .then((user) => done(undefined, user))
      .catch(done);
  }),
};
