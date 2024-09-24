require('dotenv').config();
const cors = require('cors')
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/v1/todos', (request, response) => {
    response.send({});
});

app.get('/api/v1/todos', (request, response) => {
    response.send([{}]);
});

app.patch('/api/v1/todos', (request, response) => {
    response.send([{}]);
});

app.delete('/api/v1/todos', (request, response) => {
    response.send([{}]);
});



app.post('/api/v1/login', (request, response) => {
    response.send({});
});

app.post('/api/v1/signup', (request, response) => {
    response.send({});
});



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});