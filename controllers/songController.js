const Song = require('../models/songs');
// Create a new song
exports.createSong = async (req, res) => {
    const { title, genre, artist, album } = req.body;
    try {
        if (!title || !genre || !artist || !album) {
            res.status(404).json({ error: 'Fill all details' })
        } else {
            const song = new Song({ title, genre, artist, album });
            const savedSong = await song.save();
            res.status(201).json(savedSong);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the song' });
    }
};

// Get all songs
exports.getAllSong = async (req, res) => {
    try {
        const song = await Song.find();
        res.json(song);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching song' });
    }
};

// Get a specific song by ID
exports.getSong = async (req, res) => {
    const songId = req.params.id;
    try {
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.json(song);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the song' });
    }
};

// Update a song by ID
exports.updateSong = async (req, res) => {
    const songId = req.params.id;
    const { title, genre, artist, album } = req.body;
    try {
        if (!songId || !title || !genre || !artist || !album) {
            res.status(404).json({ error: 'Fill all details' })
        } else {
            const updatedSong = await Song.findByIdAndUpdate(
                songId, { title, genre, artist, album }, { new: true });
            if (!updatedSong) {
                return res.status(404).json({ error: 'Song not found' });
            }
            res.json(updatedSong);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the song' });
    }
};

// Delete a song by ID
exports.deleteSong = async (req, res) => {
    const songId = req.params.id;
    try {
        const deletedSong = await Song.findByIdAndDelete(songId);
        if (!deletedSong) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.json(deletedSong);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the song' });
    }
};