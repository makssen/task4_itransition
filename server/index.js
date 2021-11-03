const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');
const Message = require('./models/Message');
const { google, twitter, facebook } = require('./passport');

const PORT = process.env.PORT;
const db = process.env.DB;
const aWss = WSServer.getWss();
let user = {};

app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    return done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        return done(null, user);
    });
});

passport.use(google);
passport.use(twitter);
passport.use(facebook);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        user = req.user;
        res.redirect(`${process.env.BASE_URL}/messages`);
    });

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
        user = req.user;
        res.redirect(`${process.env.BASE_URL}/messages`);
    });

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        user = req.user;
        res.redirect(`${process.env.BASE_URL}/messages`);
    });


app.get('/user', (req, res) => {
    req.session.user = user;
    res.send(req.session.user);
});

app.get('/auth/logout', (req, res) => {
    user = {};
    res.send({ message: 'logout' });
});

app.get('/messages', async(req, res) => {
    const messages = await Message.find({});
    res.send(messages);
});

const broadcastMessage = (message) => {
    aWss.clients.forEach(client => client.send(JSON.stringify(message)));
}

app.ws('/messages', (ws, req) => {
    ws.on('message', (message) => {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                const newMessage = new Message({
                    username: message.username,
                    message: message.message
                });
                newMessage.save();
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});

const startApp = async() => {
    try {
        await mongoose
            .connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, (err) => err ? console.log(err) : console.log(`Port listening: http://localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

startApp();