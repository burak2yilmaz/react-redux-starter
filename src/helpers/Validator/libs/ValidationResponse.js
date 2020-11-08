//  HELPERS
import {
    DateSys
} from "../../index";

import {
    ErrorMessages
} from "./";

export class ValidationResponse {
    static #getMessage(code) {
        if (code)
            return ErrorMessages[code];
        return false;
    }

    static success(data) {
        return this.#createResponse(true, data);
    }

    static error(data, options = false) {
        const args = {
            ...data,
            message: "Notification message is not found!"
        };

        if (data.code)
        {
            let message = (options && options.replaceMessages && options.replaceMessages[data.code]) || this.#getMessage(data.code);
            if (message)
            {
                if (data.replaces)
                {
                    if (options.replaceKeys)
                    {
                        Object.keys(data.replaces).map(key => {
                            if (options.replaceKeys[data.replaces[key]])
                                data.replaces[key] = options.replaceKeys[data.replaces[key]];
                        })
                    }

                    Object.keys(data.replaces).map(key => {
                        message = message.replace('[[' + key + ']]', data.replaces[key])
                    })
                }

                args.message = message;
            }
        }
        delete args.replaces;
        return this.#createResponse(false, args);
    }

    static #createResponse(status, data) {
        return {
            status,
            data,
            message: data.message,
            date: DateSys.currentDate().time
        }
    }
}