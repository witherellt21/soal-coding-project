const BaseTable = require('./BaseTable');

class Todo {
    constructor({ id, title, description, user }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.user = user;
    }

    static primaryKey = 'id';
}

class TodoTable extends BaseTable {
    constructor() {
        super(Todo);
    }

    validate({ id, title, description, user }) {
        if (!id) {
            return [false, "Must provide an id."];
        }
        if (!title) {
            return [false, "Must provide a description."];
        }
        if (!description) {
            return [false, "Must provide a description."];
        }
        if (!user) {
            return [false, "Must provide a user."];
        }
        return super.validate({ id, title, description, user });
    }

    create({ id, ...data }) {
        if (!id) {
            let records = this.list();

            if (records.length == 0) {
                id = 1;
            } else {
                id = records.at(-1).id + 1;
            }
        }

        let instance = super.create({ id: id, ...data });

        if (instance.errors) {
            return { errors: instance.errors };
        }

        return instance;


    }
}

const Todos = new TodoTable();

module.exports = Todos;