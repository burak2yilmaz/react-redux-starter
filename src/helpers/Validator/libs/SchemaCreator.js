export class SchemaCreator {
    #schema = {};
    setType(type) {
        this.#schema.type = type;
        return this;
    }

    setShape(schema) {
        this.#schema.schema = schema;
    }

    setMinLength(length) {
        this.#schema.minLength = length;
    }

    setMaxLength(length) {
        this.#schema.maxLength = length;
    }

    setMin(length) {
        this.#schema.min = length
    }

    setMax(length) {
        this.#schema.max = length;
    }

    setLength(length) {
        this.#schema.length = length;
    }

    required(status = true) {
        this.#schema.required = status;
    }

    setPattern(pattern) {
        this.#schema.pattern = pattern;
    }

    setCorrectItems(items) {
        this.#schema.correctItems = items;
    }

    get getSchema() {
        return this.#schema;
    }
}