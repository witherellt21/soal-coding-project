const Users = require('./models/Users');
const Todos = require('./models/Todos');

class Database {
    constructor() {
        this.users = Users;
        this.todos = Todos;
    }
}

db = new Database();

module.exports = db;