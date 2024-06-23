const express = require("express");
const Jwt = require('jsonwebtoken');
const mainRouter = require('./routes/index')
const app = express();

const cors = require('cors');
app.use(express.json()); // it parse body(String ) to json  object 

app.use(cors());

app.use("/api/v1",mainRouter);



app.use((err, req, res, next) => {
    console.error('Error:', err);
    // Handle the error and send an appropriate response
    res.status(500).send('Internal Server Error');
});

app.listen(3000,function(){
    console.log(`app is running on port ${3000}`);
})
