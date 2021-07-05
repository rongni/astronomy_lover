const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    id: {
        type: Number
    },

    notes: [
        {
            note: {
                type: String
            },
        }
    ],

},
    { collection: 'note', versionKey: false, }
);

module.exports = mongoose.model('note', NoteSchema);