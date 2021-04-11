const express = require('express');
const mongoose = require('mongoose');
// const libraryRouter = require('./routes/library')



const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://rni4:110828@cluster0.lgoqf.mongodb.net/NASA?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
}
const app = express();
//Connect Database

connectDB();
app.use(express.json());


app.use('/api/library', require('./routes/api/library'));
app.use('/api/notes', require('./routes/api/notes'));
app.get('/', (req, res) => res.send('Its working!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));