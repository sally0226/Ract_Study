const mdbConn = require('../mariaDBConn.js');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;


// db connect code
var todos;
// mdbConn.getToDoList()
//     .then((rows) => {
//         console.log("in server.js",rows);
//         todos = rows;
//     })
//     .catch((errMsg) => {
//         console.log(errMsg);
//     });

app.use(cors());

app.use(bodyParser.json());
// app.use('/api', (req, res)=> 
//     res.json({initialTodos: 'bada'}));

// app.use('/api', (req, res)=> {
//     mdbConn.getToDoList(req.body.key)
//     .then((rows) => {
//         console.log("query succes");
//         res.json({initialTodos:rows});
//     })
//     .catch((errMsg) => {
//         console.log(errMsg);
//     })
// });

/* GET */
app.get('/api/todolist/:date', function(req, res) {
    mdbConn.getToDoList(req.params.date)
    .then((rows) => {
        console.log("query succes");
        res.json({initialTodos:rows});
    })
    .catch((errMsg) => {
        console.log(errMsg);
    })
});
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})