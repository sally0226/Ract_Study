const mdbConn = require('../mariaDBConn.js');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;


// db connect code
var todos;
mdbConn.getToDoList()
    .then((rows) => {
        console.log(rows);
        todos = rows;
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });

app.use(cors());

app.use(bodyParser.json());
// app.use('/api', (req, res)=> res.json({username: 'bada'}));
app.use('/api', (req, res)=> res.json(list));
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})