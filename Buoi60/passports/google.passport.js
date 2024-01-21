const GoogleStrategy = require("passport-google-oauth20");
const { User, Provider } = require("../models/index");
const bcrypt = require("bcrypt");

const saltRounds = 10;
module.exports = new GoogleStrategy(
  {
    clientID:
      "194272781561-5gvfq9f7r3vd6tsfidm1253jl7ijsreo.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://buoi60.vercel.app/auth/google/callback",
    scope: ["profile"],
    state: true,
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const email = profile?.emails[0].value;
      const user = await User.findOne({
        where: { email },
        include: {
          model: Provider,
          as: "providers",
        },
      });
      if (user) {
        const matchingProvider =
          user.providers?.dataValues?.name === profile.provider ? true : false;
        let newProvider = null;
        if (!matchingProvider) {
          newProvider = await Provider.create({
            name: profile.provider,
          });
          await user.setProviders(newProvider);
        }
        return cb(null, user);
      } else {
        const newUser = await User.create({
          name: profile.displayName,
          email: email,
        });
        const newProvider = await Provider.create({
          name: profile.provider,
        });
        await newUser.setProviders(newProvider);
        return cb(null, newUser);
      }
    } catch (error) {
      cb(error, {});
    }
  }
);
