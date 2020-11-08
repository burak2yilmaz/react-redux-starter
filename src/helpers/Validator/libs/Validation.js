import {
    SchemaCreator, ValidationResponse
} from "./";

export class Validation {
    static async validate(data, schema) {
        return this.#controlStart(data, schema);
    }

    static #controlStart(data, schema) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.#schemaControl(schema),
                this.#keysControl(data, schema),
                this.#valueControl(data, schema)
            ])
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    static #schemaControl(schema) {
        return new Promise((resolve, reject) => {
            let invalidArgs = [];
            Object.keys(schema).map(key => {
                if (!(schema[key] instanceof SchemaCreator))
                    invalidArgs.push(key);
            });

            if (invalidArgs.length > 0)
            {
                reject({
                    code: "000",
                    replaces: {
                        keys: invalidArgs.join(',')
                    },
                    params: [
                        ...invalidArgs
                    ]
                })
            }
            resolve(schema);
        })
    }

    static #keysControl(data, schema) {
        return new Promise((resolve, reject) => {
            const dataKeys = Object.keys(data),
                schemaKeys = Object.keys(schema);

            let invalidArgs = [];
            dataKeys.map(item => {
                if (schemaKeys.indexOf(item) === -1)
                    invalidArgs.push(item);
            });

            if (invalidArgs.length > 0)
            {
                reject({
                    code: "001",
                    replaces: {
                        keys: invalidArgs.join(',')
                    },
                    params: [
                        ...invalidArgs
                    ]
                })
            }

            schemaKeys.map(key => {
                const schemaItem = schema[key].getSchema;
                if ((dataKeys[key] !== undefined || dataKeys.indexOf(key) === -1) && schemaItem.required)
                    invalidArgs.push(key);
            })

            if (invalidArgs.length > 0)
            {
                reject({
                    code: "002",
                    replaces: {
                        keys: invalidArgs.join(',')
                    },
                    params: [
                        ...invalidArgs
                    ]
                })
            }

            resolve(data, schema)
        })
    }

    static #valueControl(data, schema) {
        return new Promise((resolve, reject) => {
            Promise.all(Object.keys(schema).map(key => this.#valueTypeControl(data[key], schema[key], key)))
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static #valueTypeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            let type_ = type.getSchema;
            if ([
                "string",
                "number",
                "unixtime",
                "object",
                "array",
                "function"
            ].indexOf(type_.type) > -1 && this.#emptyControl(value, type_.required))
            {
                reject({
                    code: "004",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                });
            }

            if ([
                "string"
            ].indexOf(type_.type) > -1)
            {
                if ((type_.minLength && ((type_.minLength > value.length) || typeof value !== "string")))
                {
                    reject({
                        code: "006",
                        replaces: {
                            key,
                            minLength: type_.minLength
                        },
                        params: {
                            key,
                            minLength: type_.minLength,
                            value
                        }
                    })
                }

                if (type_.maxLength && type_.maxLength < value.length)
                {
                    reject({
                        code: "007",
                        replaces: {
                            key,
                            maxLength: type_.maxLength
                        },
                        params: {
                            key,
                            maxLength: type_.maxLength,
                            value
                        }
                    })
                }

                if ((type_.length && ((type_.length !== value.length) || (typeof value !== "string"))))
                {
                    reject({
                        code: "009",
                        replaces: {
                            key,
                            length: type_.length
                        },
                        params: {
                            key,
                            length: type_.length,
                            value
                        }
                    })
                }
            }

            switch (type_.type) {
                case 'string':
                    this.#stringTypeControl(value, type_, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                case 'number':
                    this.#numberTypeControl(value, type_, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                case 'unixtime':
                    this.#unixTimeControl(value, type_, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                case 'object':
                    this.#objectTypeControl(value, type_, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                case 'array':
                    this.#arrayTypeControl(value, type_, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                case 'bool':
                    this.#boolTypeControl(value, type_, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                case 'any':
                    this.#anyTypeControl(value, type_, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                case 'function':
                    this.#functionTypeControl(value, type_, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                case 'oneOf':
                    this.#oneOfTypeControl(value, type_, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                case 'shape':
                    this.#shapeTypeControl(value, type_.schema, key)
                        .then(() => {resolve()})
                        .catch(err => {
                            reject(err);
                        })
                    break;
                default:
                    reject({
                        code: "003"
                    })
            }
        })
    }

    static #stringTypeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            if ((type.required && typeof value !== "string") || (value.length > 0 && typeof value !== "string"))
            {
                reject({
                    code: "005",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                })
            }
            else if (type.pattern && !RegExp(type.pattern).test(value))
            {
                reject({
                    code: "016",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                })
            }
            else
                resolve();
        })
    }

    static #numberTypeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            if (!RegExp('^([0-9,\.]*)$').test(value))
            {
                reject({
                    code: "008",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                })
            }
            else if (type.min && parseFloat(value) < type.min)
            {
                reject({
                    code: "017",
                    replaces: {
                        min: type.min,
                        key
                    },
                    params: {
                        key,
                        value,
                        min: type.min
                    }
                })
            }
            else if (type.max && parseFloat(value) > type.max)
            {
                reject({
                    code: "018",
                    replaces: {
                        max: type.max,
                        key
                    },
                    params: {
                        key,
                        value,
                        max: type.max
                    }
                })
            }
            else if (type.length && parseFloat(value) !== type.length)
            {
                reject({
                    code: "025",
                    replaces: {
                        length: type.length,
                        key
                    },
                    params: {
                        key,
                        value,
                        length: type.length
                    }
                })
            }
            else if (type.pattern && !RegExp(type.pattern).test(value))
            {
                reject({
                    code: "016",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                })
            }
            else
                resolve();
        })
    }

    static #unixTimeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            if (!RegExp("^([0-9]*)$").test(value) || !new Date(parseInt(value)).getTime())
            {
                reject({
                    code: "015",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                });
            }
            else
                resolve();
        })
    }

    static #objectTypeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            if (value && (typeof value !== "object" || value.length !== undefined))
            {
                reject({
                    code: "010",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                })
            }
            else if (type.min && Object.keys(value).length < type.min)
            {
                reject({
                    code: "022",
                    replaces: {
                        key,
                        min: type.min
                    },
                    params: {
                        key,
                        value,
                        min: type.min
                    }
                })
            }
            else if (type.max && Object.keys(value).length > type.max)
            {
                reject({
                    code: "023",
                    replaces: {
                        key,
                        max: type.max
                    },
                    params: {
                        key,
                        value,
                        max: type.max
                    }
                })
            }
            else if (type.length &&  Object.keys(value).length !== type.length)
            {
                reject({
                    code: "024",
                    replaces: {
                        key,
                        length: type.length
                    },
                    params: {
                        key,
                        value,
                        length: type.length
                    }
                })
            }
            else
                resolve();
        })
    }

    static #arrayTypeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            if (value && !Array.isArray(value))
            {
                reject({
                    code: "011",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                })
            }
            else if (type.min && value.length < type.min)
            {
                reject({
                    code: "019",
                    replaces: {
                        key,
                        min: type.min
                    },
                    params: {
                        key,
                        value,
                        min: type.min
                    }
                })
            }
            else if (type.max && value.length > type.max)
            {
                reject({
                    code: "020",
                    replaces: {
                        key,
                        max: type.max
                    },
                    params: {
                        key,
                        value,
                        max: type.max
                    }
                })
            }
            else if (type.length &&  value.length !== type.length)
            {
                reject({
                    code: "021",
                    replaces: {
                        key,
                        length: type.length
                    },
                    params: {
                        key,
                        value,
                        length: type.length
                    }
                })
            }
            else
                resolve();
        })
    }

    static #boolTypeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            if (typeof value !== "boolean")
            {
                reject({
                    code: "012",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                })
            }
            else
                resolve();
        })
    }

    static #anyTypeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            if (value === undefined)
            {
                reject({
                    code: "004",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                })
            }
            else
                resolve();
        })
    }

    static #functionTypeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            if (!Object.isFunction(value))
            {
                reject({
                    code: "013",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value
                    }
                });
            }
            else
                resolve();
        })
    }

    static #oneOfTypeControl(value, type, key) {
        return new Promise((resolve, reject) => {
            if (type.correctItems.indexOf(value) === -1)
            {
                reject({
                    code: "014",
                    replaces: {
                        key
                    },
                    params: {
                        key,
                        value,
                        correctItems: type.correctItems
                    }
                })
            }
            else
                resolve();
        })
    }

    static #shapeTypeControl(value, schema, key) {
        return new Promise((resolve, reject) => {
             this.#objectTypeControl(value, schema, key)
                 .then(() => {
                     this.#controlStart(value, schema)
                         .then(() => {
                             resolve();
                         })
                         .catch(err => {
                             reject(err);
                         })
                 })
                 .catch(err => {
                     reject(err);
                 })
        })
    }

    static #emptyControl(value, required) {
        return (required && (value === false || value === ""))
    }
}