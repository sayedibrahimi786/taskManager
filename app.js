const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const dotenv = require('dotenv');
const notFound = require('./middleware/notFound')

// Load environment variables from .env file
dotenv.config();

app.get('/', (req, res) => {
    res.send("Hello World");
});

// middleware
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);

const PORT = process.env.PORT || 3000;

// launch the server only if we are connected to the DB
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, ()=> {
            console.log(`Listening to Server with ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();

