const mongoose = require('mongoose')
const Game = require('../models/game-model')

const { Router } = require('express')

const router = Router()

const GAME_STATUS = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED'
}

router.get('/game', function(req, res) {
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }
  Game.find(filter, '', function(err, games) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ games: games })
    }
  }).sort({ _id: -1 })
})

router.delete('/game', async (req, res) => {
  if (req.body.gameId) {
    Game.remove(
      {
        _id: req.body.gameId
      },
      function(err) {
        if (err) {
          return res.send(500, { error: err })
        }
        return res.send('succesfully delete')
      }
    )
  } else {
    return res.send('Error: empty gameId')
  }
})

router.post('/game', async (req, res) => {
  if (req.body.gameId) {
    let newData = {
      status: req.body.status,
    }
    const startTime = req.body.status === GAME_STATUS.IN_PROGRESS && Date.now();
    if (startTime) {
      newData.startTime = startTime
    }
    const endTime = req.body.status === GAME_STATUS.FINISHED && Date.now();
    if (endTime) {
      newData.endTime = endTime
    }

    Game.findOneAndUpdate(
      {
        _id: req.body.gameId
      },
      newData,
      function(err, game) {
        if (err) {
          return res.send(500, { error: err })
        }
        return res.send('succesfully saved')
      }
    )
  } else {
    const game = new Game({
      _id: new mongoose.Types.ObjectId(),
      startTime: undefined,
      endTime: undefined,
      status: GAME_STATUS.CREATED
    })
    game.save(async function(err) {
      if (err) {
        res.send({
          success: false,
          message: err
        })
      } else {
        res.send({
          success: true,
          message: `Game with ID_${game._id} saved successfully!`
        })
      }
    })
  }
})

router.get('/game/:id', function(req, res) {
  if (!req.user) {
    res.sendStatus(500)
    return
  }
  Game.findById(req.params.id, function(err, game) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ game: game })
    }
  }).sort({ _id: -1 })
})

module.exports = router
