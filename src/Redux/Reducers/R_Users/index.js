const initialState = {
    login: false
};

export const methods = {
    login: 'LOGIN',
    set_users: 'SET_USERS'
};

export function R_Users(state = initialState, {type, payload}) {
    switch (type) {
        case methods.login :
            return {
                ...state,
                login: true
            };
        case methods.set_users :
            return {
                ...state,
                users: payload.users
            };
        default:
            return state;
    }
}