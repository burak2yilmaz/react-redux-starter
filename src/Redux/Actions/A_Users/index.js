//  STORE
import store from '../../Store';

//  METHODS
import { methods } from "../../Reducers/R_Users";

export function loginUser() {
    return store.dispatch({
        type: methods.login
    });
}

export function setUsers() {
    return store.dispatch({
        type: methods.set_users,
        payload: {
            users: [
                {
                    name: 'Foo'
                },
                {
                    name: 'Bar'
                }
            ]
        }
    });
}