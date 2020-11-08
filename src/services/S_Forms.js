//  HELPERS
import {
    API
} from "../helpers";

export const S_Forms = {
    register: async form => {
        return await new API(false).post('/forms/register', form);
    }
}