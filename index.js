const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const dbUrl = 'mongodb://localhost:27017/user-app';


mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* try {
    user.insertMany( [
       { name: "rohit", phone:9999999991 },
       { name: "rahul", phone:9999999992 },
       { name: "shubham" , phone:999999993 },
       { name: "lakshay" , phone:999999994 },
       { name: "chirag" , phone:999999995 },
       { name: "tarun" , phone:999999996 }
    ] );
} catch (e) {
    console.log(e);
} */
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("database connected");
});


app.use(express.urlencoded({extented: true}));
app.use(cors());
app.use(express.json())

app.use('/',userRoutes);

app.listen ('3000',()=>{
    console.log("Listing on port 3000");
})