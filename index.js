const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const { UserRouter, StorylineRouter } = require('./routes')

const app = express();

app.use(bodyParser.json({
    limit: '30mb',
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: '30mb',
    extended: true
}));

const corsOptions = {
    origin: ['http://localhost:3000', 'https://psycheas-frontend.vercel.app'],
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

const CONNECTION_URL = process.env.MONGO_URI
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello from Psycheas API');
});

app.use('/user', UserRouter);
app.use('/storyline', StorylineRouter);

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    })
