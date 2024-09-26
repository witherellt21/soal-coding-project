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
        let instance = this.instances.find((instance) => instance[primaryKey || this.model.primaryKey] == id)

        return instance;
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

    delete(id) {
        let target = this.instances.find((instance) => instance[this.model.primaryKey] == id);
        let idx = this.instances.indexOf(target);

        delete this.instances[idx];

        this.instances.splice(idx, 1);

        return "Success";
    }

    update(id, data) {
        let instance = this.get(id);

        if (!instance) {
            return { errors: this.model.name + " with " + this.model.primaryKey + " '" + id + "' does not exist" }
        }

        else {
            for (const [key, value] of Object.entries(data)) {
                instance[key] = value;
            }
        }
        return instance;
    }
}

module.exports = BaseTable