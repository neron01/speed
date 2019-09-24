const { Router } = require('express');
const passport = require('passport');

const User = require('../models/user-model');

const router = Router();

router.post('/auth/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = new User({ email, password });
    user.save(err => {
        if (err) {
            return res.status(409).json({ message: 'Already exists' });
        }
        req.logIn(user, (err) => {
            if (err) return res.sendStatus(500);
            user.password = undefined;
            res.json(user);
        });
    });
});

router.post('/auth/login', passport.authenticate('local'), (req, res) => {
    req.user.password = undefined;
    res.json(req.user);
});

router.post('/auth/logout', (req, res) => {
    req.logOut();
    req.session.destroy(function (err) {
        if (!err) {
            res.status(200).clearCookie('connect.sid', { path: '/' }).json({ ok: true });
        } else {
            res.status(500).json({ ok: false });
        }
    });
});

router.patch('/auth/', (req, res) => {
    if (!req.user || !req.user.id) return res.sendStatus(401);
    User.findById(req.user.id, (err, user) => {
        if (err) return res.sendStatus(404);
        user.comparePassword(req.body.currentPassword, (err, isMatch) => {
            if (err || !isMatch) return res.sendStatus(400);
            user.password = req.body.newPassword;
            user.save(err => res.sendStatus(err ? 500 : 200));
        });
    });
});

router.get('/auth/callback', (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
