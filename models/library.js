const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;
const LibrarySchema = new Schema({
    email: {
        type: String,
    },

    image: [
        {
            id: {
                type: Number
            },
            img_src: {
                type: String,
            },
        }
    ],

},
    { collection: 'library', versionKey: false }
);

module.exports = mongoose.model('library', LibrarySchema);