const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    uuid: String,
    description: {
        name: String,
        steps: [{
            keyword: String,
            text: String
        }]
    },
    errs: [String],
    durationMs: Number,
    screenshotPath: String,
    skipped: Boolean,
    tags: [String],
    startTime: Date,
    status: String,
    fixtureName: String,
    fixturePath: String,
});

module.exports = mongoose.model('tasks', TaskSchema);
