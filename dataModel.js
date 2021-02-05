const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    date: Date,
    method: String,
    headers: Object,
    path: String,
    query: Object,
    body: Object,
    duration: Number
});

const Data = mongoose.model('data', DataSchema);
module.exports = Data;