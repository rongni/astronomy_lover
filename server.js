const express = require('express');
const connectDB = require('./config/db');
const path = require('path')



const app = express();
//Connect Database

connectDB();
app.use(express.json());

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/library', require('./routes/api/library'));
app.use('/api/notes', require('./routes/api/notes'));





// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//     });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app
