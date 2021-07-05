const express = require('express');
const router = express.Router();
const Notes = require('../../models/notes')
const { check, body, validationResult } = require('express-validator');


// @route    GET /api/notes/allnotes
// @desc     Get all notes 
// @access   Public
router.get('/allnotes', async (req, res) => {
    try {
        const collection = await Notes.find()
        if (!collection) {
            return res.status(400).json({ msg: 'There is no note' });
        }
        res.json(collection)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/notes/:id
// @desc     Get image's note based on id 
// @access   Public
router.get('/:id', getNote, (req, res) => {
    res.json(res.note)
});


// @route    Post api/notes/
// @desc     Post one note
// @access   Public 
router.post('/', check('id', 'id is required').notEmpty(), check('notes', 'notes is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const noteFields = {
            id: req.body.id,
            notes: req.body.notes
        }
        try {
            // Using upsert option (creates new doc if no match is found):
            const oneNotes = await Notes.findOneAndUpdate(
                { id: req.body.id },
                { $set: noteFields },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
            return res.json(oneNotes);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    })

// @route    Put api/notes/:id/edit
// @desc     Modified one notes base on notedid and username
// @access   Public 
router.put('/:id/edit/:noteid', getNote, async (req, res) => {
    try {
        res.note.notes.forEach((element, index) => {
            if (element.id === req.params.noteid) {
                res.note.notes[index].note = req.body.note;
            }
        });
        const updatedNote = await res.note.save()
        res.json(updatedNote)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @route    Put api/notes/:id/edit
// @desc     add one notes to one image 
// @access   Public 
router.put('/:id/edit', getNote, body().notEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        req.body.forEach(function (item) {
            res.note.notes.unshift(item)
        })
        const updatedNote = await res.note.save()
        res.json(updatedNote)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @route    DELETE api/notes/:id/edit/:noteid
// @desc     Delete one note from Note collections base on noteid
// @access   Public

router.delete('/:id/edit/:noteid', getNote, async (req, res) => {
    try {
        // Pull out note
        const noteToDeleted = res.note.notes.find(
            (noteToDeleted) => noteToDeleted.id === req.params.noteid
        );
        // Make sure note exists
        if (!noteToDeleted) {
            return res.status(404).json({ msg: 'Note does not exist' });
        }

        res.note.notes = res.note.notes.filter(
            ({ id }) => id !== req.params.noteid
        );

        await res.note.save();
        return res.status(200).json(res.note);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

//a helper function to getNote since almost all of our request need Note info
async function getNote(req, res, next) {
    try {
        const note = await Notes.findOne({ 'id': req.params.id })
        if (note == null) {
            return res.status(404).json({ message: 'Cant find note' })
        }
        res.note = note
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = router;