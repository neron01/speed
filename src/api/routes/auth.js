import { mapper } from '../service/taskService';

const { Router } = require('express')
const passport = require('passport')

const User = require('../models/user-model')
const UserStats = require('../models/user-stats-model')

const router = Router()

router.post('/auth/register', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  const user = new User({ email, password })
  user.save((err, savedUser) => {
    if (err) {
      return res.status(409).json({ message: 'Already exists' })
    }
    const userStats = new UserStats({
      userId: savedUser._id,
      userName: email,
      gameId: '',
      tasks: mapper.map(task => ({
        taskId: task.id,
        scope: 0,
      })),
    });
    userStats.save();
    req.logIn(user, (err) => {
      if (err) return res.sendStatus(500)
      user.password = undefined
      res.json(user)
    })
  })
})


router.get('/auth', function(req, res) {
  // TODO Проверка на АДМИНА
  if (!req.user) {
    res.sendStatus(500)
    return;
  }

  User.find({}, '', function(err, users) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ users: users })
    }
  }).sort({ _id: -1 })
})


router.delete('/auth', async (req, res) => {
  // TODO Проверка на АДМИНА
  if (req.body.userId) {
    User.remove(
      {
        _id: req.body.userId
      },
      function(err) {
        if (err) {
          return res.send(500, { error: err })
        }
        return res.send('succesfully delete')
      }
    )
    UserStats.remove(
      {
        userId: req.body.userId
      },
      function(err) {
      }
    )

  } else {
    return res.send('Error: empty userId')
  }
})

router.post('/auth/login', passport.authenticate('local'), (req, res) => {
  req.user.password = undefined
  res.json(req.user)
})

router.post('/auth/logout', (req, res) => {
  req.logOut()
  req.session.destroy(function(err) {
    if (!err) {
      res
        .status(200)
        .clearCookie('connect.sid', { path: '/' })
        .json({ ok: true })
    } else {
      res.status(500).json({ ok: false })
    }
  })
})

router.patch('/auth/', (req, res) => {
  if (!req.user || !req.user.id) return res.sendStatus(401)
  User.findById(req.user.id, (err, user) => {
    if (err) return res.sendStatus(404)
    user.comparePassword(req.body.currentPassword, (err, isMatch) => {
      if (err || !isMatch) return res.sendStatus(400)
      user.password = req.body.newPassword
      user.save((err) => res.sendStatus(err ? 500 : 200))
    })
  })
})

router.get('/auth/callback', (req, res) => {
  res.json({ user: req.user })
})

module.exports = router
