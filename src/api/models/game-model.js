const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    status: String,
    startTime: Date,
    endTime: Date,
});

module.exports = mongoose.model(
    'games', GameSchema);
