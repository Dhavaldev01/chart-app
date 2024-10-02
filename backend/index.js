const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");


const UserRoute = require('./routes/user.route.js');
const MessageRoutes = require('./routes/message.Route.js');

const connectDB = require('./config/database.js');
const cors = require("cors");
const {app, server} = require("./socket/socket.js")

dotenv.config({});

// Body parser middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin:'http://localhost:3001',
    credentials:true
};

app.use(cors(corsOption))
connectDB();
const port = process.env.PORT || 3000;



/// Routes 
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/message",MessageRoutes);

server.listen(port , ()=>{
    console.log(`Server listen at port ${port}`)
})

