import Axios from 'axios';

//  HELPERS
import {
    LocalStorage,
    SessionStorage,
    variables,
    history
} from "./";

//  ACTIONS
import {
    A_G_Notification
} from "../actions";

//  ROUTES
import Routes from "../Routes";

export class API {
    constructor(login = true) {
        this.axios = Axios;
        if (login)
        {
            const setHeader = this.#setHeader();
            if (!setHeader)
                return false;
        }
        return this.#setSettings();
    }

    #setHeader() {
        const token = LocalStorage.get('usr') || SessionStorage.get('usr');
        if (!token)
        {
            return false;
        }
        else
        {
            this.axios.defaults.headers.common['Authorization'] = token;
            return true;
        }
    }

    #setSettings() {
        this.axios.defaults.baseURL = variables.url.API_URL;
        return this;
    }

    async get(url) {
        if (!url)
        {
            return new Promise.reject(() => {
                return {
                    status: false,
                    message: "Url is undefined!"
                }
            })
        }

        return await this.axios.get(url);
    }

    async post(url, data) {
        if (!url || !data)
        {
            return Promise.reject(() => {
                return {
                    status: false,
                    message: "Url and data are undefined!"
                }
            })
        }
        else
            return await this.#requestControl(this.axios.post(url, data));
    }

    async delete(url, data) {
        if (!url || !data)
        {
            return Promise.reject(() => {
                return {
                    status: false,
                    message: "Url and data are undefined!"
                }
            })
        }
        else
        {
            return await this.#requestControl(this.axios.delete(url), {
                data: {
                    test: true
                }
            })
        }
    }

    async #requestControl(request) {
        return request
            .then(response => response.data)
            .catch(err => {
                const data = err.response.data;
                if (data && data.messageCode === 106) {

                }
                return Promise.reject(err.response);
            });
    }

}