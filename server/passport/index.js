const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

const google = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id }, async(err, user) => {
            if (err) return cb(err, null);
            if (!user) {
                const newUser = new User({
                    googleId: profile.id,
                    username: profile.name.givenName
                });
                await newUser.save();
                cb(null, newUser);
            }
            cb(null, user);
        });
    }
);

const twitter = new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
        User.findOne({ twitterId: profile.id }, async(err, user) => {
            if (err) return cb(err, null);
            if (!user) {
                const newUser = new User({
                    googleId: profile.id,
                    username: profile.username
                });
                await newUser.save();
                cb(null, newUser);
            }
            cb(null, user);
        });
    }
);

const facebook = new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOne({ facebookId: profile.id }, async(err, user) => {
            if (err) return cb(err, null);
            if (!user) {
                const newUser = new User({
                    facebookId: profile.id,
                    username: profile.displayName.split(' ')[0]
                });
                await newUser.save();
                cb(null, newUser);
            }
            cb(null, user);
        });
    }
);


module.exports = {
    google,
    twitter,
    facebook
}