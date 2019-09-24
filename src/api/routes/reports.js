import { checkTask, mapper } from '../service/taskService'

const mongoose = require('mongoose')
const Report = require('../models/report-model')
const Task = require('../models/task-model')
const md5 = require('md5')

const { Router } = require('express')

const router = Router()

router.get('/game_status', function(req, res) {
  if (!req.user) {
    res.sendStatus(500)
    return
  }

  Report.find({}, '', function(err, reports) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ reports: reports })
    }
  }).sort({ _id: -1 })
})

router.get('/game_progress', function(req, res) {
  if (!req.user) {
    res.sendStatus(500)
    return
  }

  Report.find({}, '', function(err, reports) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ reports: reports })
    }
  }).sort({ _id: -1 })
})

router.get('/stats', function(req, res) {
  console.log('asd ' + req.user)
  Report.find({}, '', function(err, reports) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ reports: reports })
    }
  }).sort({ _id: -1 })
})

router.get('/tasks/:id', function(req, res) {
  const task = mapper[req.params.id]
  if (task) {
    res.send(task)
  } else {
    res.sendStatus(500)
  }
})

router.post('/tasks/check', async function(req, res) {
  console.log('asdasd')
  if (!req.user) {
    res.sendStatus(500)
    return
  }
  console.log('query')
  console.log(req.query)
  console.log('body')
  console.log(req.body)
  console.log('pause')
  const result = await checkTask(req.body)
  if (result) {
    // save good result
    res.sendStatus(200)
  } else {
    // save trying result
    res.sendStatus(400)
  }
})

router.get('/reports/test', function(req, res) {
  res.send('zbc')
})

module.exports = router
