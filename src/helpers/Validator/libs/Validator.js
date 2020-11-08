import {
    SchemaCreator,
    ValidationError,
    Validation,
    ValidationResponse
} from './';

export class Validator {
    static #pattern = (new SchemaCreator);
    static #options = false;

    static #setPatternType(type) {
        this.#pattern.setType(type);
        return this;
    }

    static get string() {
        return this.#setPatternType('string');
    }

    static get number() {
        return this.#setPatternType('number');
    }

    static get object() {
        return this.#setPatternType('object');
    }

    static get array() {
        return this.#setPatternType('array');
    }

    static get any() {
        return this.#setPatternType('any');
    }

    static get bool() {
        return this.#setPatternType('bool');
    }

    static get function() {
        return this.#setPatternType('function');
    }

    static shape(schema) {
        this.#pattern.setShape(schema);
        return this.#setPatternType('shape');
    }

    static get unixTime() {
        return this.#setPatternType('unixtime');
    }

    static oneOf(types) {
        if (!Array.isArray(types))
        {
            throw new ValidationError({
                code: "110"
            });
        }

        const correctTypes = ['boolean', 'number', 'string'];
        types.map(item => {
            if (correctTypes.indexOf(typeof item) === -1)
            {
                throw new ValidationError({
                    code: "112"
                });
            }
        })

        this.#pattern.setCorrectItems(types);
        return this.#setPatternType('oneOf');
    }

    static get required() {
        this.#pattern.required();
        return this;
    }

    static minLength(minLength) {
        if (typeof minLength !== "number")
        {
            throw new ValidationError({
                code: "100"
            });
        }

        this.#pattern.setMinLength(minLength);
        return this;
    }

    static maxLength(maxLength) {
        if (typeof maxLength !== "number")
        {
            throw new ValidationError({
                code: "102"
            });
        }

        this.#pattern.setMaxLength(maxLength)
        return this;
    }

    static length(length) {
        if (typeof length !== "number")
        {
            throw new ValidationError({
                code: "107"
            });
        }

        this.#pattern.setLength(length)
        return this;
    }

    static min(length) {
        if (typeof length !== "number")
        {
            throw new ValidationError({
                code: "113"
            });
        }
        this.#pattern.setMin(length);
        return this;
    }

    static max(length) {
        if (typeof length !== "number")
        {
            throw new ValidationError({
                code: "115"
            });
        }
        this.#pattern.setMax(length);
        return this;
    }

    static pattern(pattern) {
        if (typeof pattern !== "string")
        {
            throw new ValidationError({
                code: "101",
                replaces: {
                    pattern
                },
                params: {
                    pattern
                }
            });
        }

        this.#pattern.setPattern(pattern);
        return this;
    }

    static #lastControl() {
        const pattern = this.#pattern.getSchema;
        if (!pattern.type)
        {
            throw new ValidationError({
                code: "105"
            });
        }

        if (!this.#pattern instanceof SchemaCreator)
        {
            throw new ValidationError({
                code: "106"
            });
        }

        if (pattern.length && (pattern.maxLength || pattern.minLength || pattern.min || pattern.max))
        {
            throw new ValidationError({
                code: "108"
            });
        }

        if ((pattern.minLength && pattern.maxLength) && (pattern.minLength > pattern.maxLength))
        {
            throw new ValidationError({
                code: "101",
                replaces: {
                    minLength: pattern.minLength,
                    maxLength: pattern.maxLength
                },
                params: {
                    minLength: pattern.minLength,
                    maxLength: pattern.maxLength
                }
            });
        }

        if ((pattern.min && pattern.max) && (pattern.min > pattern.max))
        {
            throw new ValidationError({
                code: "114",
                replaces: {
                    min: pattern.min,
                    max: pattern.max
                },
                params: {
                    min: pattern.min,
                    max: pattern.max
                }
            });
        }

        if (!pattern.required)
            this.#pattern.required(false);

    }

    static get end() {
        this.#lastControl();

        const pattern = this.#pattern;
        this.#pattern = new SchemaCreator;
        return pattern;
    }

    static validate(data, schema, options = false) {
        if (options)
            this.#options = options;

        return new Promise(async (resolve, reject) => {
            Validation.validate(data, schema)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(
                        ValidationResponse.error(err, options)
                    )
                })
        })
    }
}