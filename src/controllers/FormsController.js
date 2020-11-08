//  SERVICES
import {
    S_Forms
} from "../services";

export const FormsController = {
    complaintForm: async form => {
        return new Promise(async (resolve, reject) => {
            await S_Forms.register(form)
                .then(response => {
                    resolve();
                })
                .catch(err => {
                    reject(err.data)
                })
        })
    },
    praiseForm: async form => {
        return new Promise(async (resolve, reject) => {
            await S_Forms.register(form)
                .then(response => {
                    resolve();
                })
                .catch(err => {
                    reject(err.data)
                })
        })
    }
}