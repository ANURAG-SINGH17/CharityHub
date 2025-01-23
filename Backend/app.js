const express = require('express');
const app = express();
const connectToDB = require('./config/mongoose.connect');
const cookiesParser = require('cookie-parser');
const cors = require('cors');
connectToDB();

const usersRouter = require('./routes/user.routes')

app.use(cors());
app.use(express.json());
app.use(cookiesParser());
app.use(express.urlencoded({extended:true}));

app.use('/users' , usersRouter)

app.get('/' , (req , res) => {
    res.send('hii ')
})

module.exports = app;