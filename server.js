const express = require('express');
const connectDB = require('./config/db');




const app = express();
//Connect Database

connectDB();
app.use(express.json());

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/library', require('./routes/api/library'));
app.use('/api/notes', require('./routes/api/notes'));
app.get('/', (req, res) => res.send('Its working!'));


app.use(express.json());



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app
