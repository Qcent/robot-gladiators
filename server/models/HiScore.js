const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
    robot: {
        type: String,
        required: true,
        trim: true
    },
    trainer: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true,
    },
    rounds: {
        type: Number,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
});

const HiScore = mongoose.model('HiScore', scoreSchema, "HiScore");

module.exports = HiScore;