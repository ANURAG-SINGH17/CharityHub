const express = require('express');
const app = express();
const connectToDB = require('./config/mongoose.connect');
const cookiesParser = require('cookie-parser');
const cors = require('cors');
connectToDB();

const usersRouter = require('./routes/user.routes')

const corsOptions = {
    origin: 'https://charity-hub-nine.vercel.app', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
    
    app.use(cors(corsOptions));
app.use(express.json());
app.use(cookiesParser());
app.use(express.urlencoded({extended:true}));

app.use('/users' , usersRouter)

app.get('/' , (req , res) => {
    res.send('hii ')
})

module.exports = app;