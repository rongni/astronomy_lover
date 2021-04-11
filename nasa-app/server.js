const express = require('express');
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://peiyic2:rVWm137sJwYvr9el@cluster0.lgoqf.mongodb.net/NASA?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
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

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));