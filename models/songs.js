const mongoose = require('mongoose');
const songData = new mongoose.Schema({
 title: String,
 genre: String,
 artist: String,
 album: String
});

const Song = mongoose.model('Song', songData);

module.exports = Song;