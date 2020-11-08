import {
    ValidationResponse
} from './'

export class ValidationError extends Error {
    constructor(err) {
        const response = ValidationResponse.error(err);
        super(response.data.message);
        this.name = "ValidationError";
        this.code = 400;
    }
}