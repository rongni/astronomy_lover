const express = require('express');
const connectDB = require('./config/db');




const app = express();
//Connect Database

connectDB();
app.use(express.json());


app.use('/api/library', require('./routes/api/library'));
app.use('/api/notes', require('./routes/api/notes'));
app.get('/', (req, res) => res.send('Its working!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
