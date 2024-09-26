require('dotenv').config();
const cors = require('cors')
const express = require('express');
const db = require('./db');
const auth = require('./middleware/auth');
const app = express();

app.use(cors());
app.use(express.json());


app.post('/api/v1/login', (req, res) => {
    user = db.users.login(req.body);

    if (user.errors) {
        res.status(400);
    }

    res.send(user);
});

app.post('/api/v1/signup', (req, res) => {
    user = db.users.signup(req.body);

    if (user.errors) {
        res.status(400);
    } else {
        res.status(201);
    }

    res.send(user);
});

app.use(auth.JWTAuthenticationMiddleware);

app.post('/api/v1/todos', (req, res) => {
    todo = db.todos.create({ ...req.body, user: req.user });

    if (todo.errors) {
        res.status(400);
    } else {
        res.status(201);
    }

    res.send(todo);
});

app.get('/api/v1/todos', (req, res) => {
    todos = db.todos.filter('user', req.user);

    res.send(todos);
});

app.patch('/api/v1/todos/:id', (req, res) => {
    instance = db.todos.update(req.params.id, req.body)

    res.send(instance);
});

app.delete('/api/v1/todos/:id', (req, res) => {
    deleted = db.todos.delete(req.params.id);

    res.send(deleted);
});



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});