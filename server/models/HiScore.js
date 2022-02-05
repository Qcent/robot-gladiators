const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
    scores: {
        type: Number,
        required: true,
    },
});

const HiScore = mongoose.model('HiScore', scoreSchema);

module.exports = HiScore;