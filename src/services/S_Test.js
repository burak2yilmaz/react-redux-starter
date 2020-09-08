//  HELPERS
import {
    variables
} from "../helpers";

export const S_Test = {
    getAll: async data => {
        return await fetch(variables.url.API_URL, data);
    }
};