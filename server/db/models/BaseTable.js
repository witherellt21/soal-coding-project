class BaseTable {
    constructor(model) {
        this.instances = [];
        this.model = model;
    }

    validate(data) {
        if (this.get(data[this.model.primaryKey]) != null) {
            return [false, this.model.name + " already exists."];
        }
        return [true, "Success"];
    }

    get(id, primaryKey) {
        for (let instance of this.instances) {
            if (instance[primaryKey || this.model.primaryKey] == id) {
                return instance;
            }
        }
        return null;
    }

    list() {
        return this.instances;
    }

    create(data) {
        let [validated, errors] = this.validate(data);

        if (validated) {
            let instance = new this.model(data);

            this.instances.push(instance);

            return instance;
        }
        return { errors: errors };
    }

    filter(key, value) {
        return this.instances.filter((instance) => instance[key] == value);
    }
}

module.exports = BaseTable