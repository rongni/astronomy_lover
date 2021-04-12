const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    id: {
        type: Number
    },
    // id: {
    //     type: Number
    // },

    notes: [
        {

            username: {
                type: String
            },
            note: {
                type: String
            },
        }
    ],

},
    { collection: 'note', versionKey: false, }
);

module.exports = mongoose.model('note', NoteSchema);