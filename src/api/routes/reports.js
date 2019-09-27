import { checkTask, mapper, getTaskScope } from '../service/taskService'
const UserStatsModel = require('../models/user-stats-model')

const { Router } = require('express')

const router = Router()

router.get('/stats', function(req, res) {
  const filter = {};
  if (req.query.userId) {
    filter.userId = req.query.userId;
  }

  UserStatsModel.find(filter, '', function(err, userStats) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ userStats: userStats })
    }
  }).sort({ _id: -1 })
})

router.get('/tasks', function(req, res) {
  let tasks = mapper
  if (tasks) {
    tasks = tasks.map((task) => ({ ...task, tests: null }))
    res.send(tasks)
  } else {
    res.sendStatus(500)
  }
})

router.get('/tasks/:id', function(req, res) {
  const task = mapper[req.params.id]
  if (task) {
    res.send({ ...task, tests: null })
  } else {
    res.sendStatus(500)
  }
})

router.post('/tasks/check', async function(req, res) {
  if (!req.user) {
    res.sendStatus(500)
    return
  }
  const result = await checkTask(req.body)

  let userStat = await UserStatsModel.findOne(
    {
      userId: req.user._id
    },
    ''
  )
  if (!userStat) {
    userStat = {}
    userStat.userId = req.user._id
    userStat.userName = req.user.email
    userStat.tasks = mapper.map(task => ({
      taskId: task.id,
      scope: 0,
    }));
  }

  let task = userStat.tasks.find((task) => task.taskId === req.body.taskNumber)
  if (!task) {
    task = {}
    task.taskId = req.body.taskNumber;
    task.scope = 0;
    userStat.tasks.push(task);
  }

  if (task.status !== 'done') {
    if (result) {
      userStat.lastCommit = Date.now();
      task.status = 'done';
      task.timeFinish = Date.now();
      task.lastVariant = req.body.funcExec;
      task.scope = getTaskScope(req.body.taskNumber);
    } else {
      task.status = 'in-progress';
      task.lastVariant = req.body.funcExec;
    }
  }

  await UserStatsModel.findOneAndUpdate(
    {
      userId: req.user._id
    },
    userStat
  ).exec();
  res.send({
    currentStatus: result,
    totalStatus: task.status,
  })
})

module.exports = router
