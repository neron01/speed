const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserStatsSchema = new Schema({
  userId: String,
  userName: String,
  gameId: String,
  lastCommit: Date,
  tasks: [
    {
      taskId: Number,
      status: String,
      scope: Number,
      lastVariant: String,
      timeFinish: Date
    }
  ]
})

module.exports = mongoose.model('user-stats', UserStatsSchema)
