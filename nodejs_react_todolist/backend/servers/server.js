const mdbConn = require('../mariaDBConn.js');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;


// db connect code
var todos;

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
app.get('/api/maxId', (req, res) => {
    mdbConn.getMaxId()
    .then((maxId) => {
        console.log("dd :",maxId);
        res.json({maxId: maxId}); 
    })
    .catch((errMsg) => {
        console.log(errMsg);
    })
});
app.get('/api/delete/:id', (req,res)=> {
    consold.log(req.params.id);
    mdbConn.deleteTodo(req.params.id).then(console.log("delete success"));
});
app.post('/api/create', (req, res) => {
    var new_todo = req.body.todo;
    mdbConn.createToDo(new_todo).catch((errMsg) => {
        console.log(errMsg);
    })
});

// app.post('/api/delete', (req, res) => {
//     var todoId = req.body.todo.id;
//     mdbConn.deleteToDo(todoId).catch((errMsg) => {
//         console.log(errMsg);
//     })
// });
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})