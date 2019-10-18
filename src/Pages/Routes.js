//  ROUTER PARSER
import { Router } from '../System';

//  LAYOUT
import Layout1 from './Layout1';

//  STORE
import store from '../Redux/Store';

//  CONTENTS
import HomePage from './Layout1/HomePage';
import LoginPage from './Layout1/LoginPage';

export default Router.init([
    {
        path: '/',
        layout: {
            type: Layout1,
            store: store,
            reducers: [
                'R_Menu'
            ]
        },
        child: {
            type: HomePage
        }
    },
    {
        path: '/users',
        layout: {
            type: Layout1,
            store: store,
            reducers: [
                'R_Users',
                'R_Menu'
            ],
            props: {
                test: 1
            }
        },
        child: {
            type: LoginPage,
            store: store,
            reducers: [
                'R_Users'
            ]
        }
    }
]);