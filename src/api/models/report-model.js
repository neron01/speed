const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    startTime: {
        type: Date,
        unique: true
    },
    endTime: Date,
    tasks: [{
      status: String,
      task: { type: Schema.Types.ObjectId, ref: 'reports' },
    }],
    passed: Number,
    total: Number,
    tags: [String],
    skipped: Number,
    warnings: [String],
    hasError: Boolean,
});

module.exports = mongoose.model(
    'reports', ReportSchema);
