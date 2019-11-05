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
            type: Layout1
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
            props: {
                foo: 'bar'
            }
        },
        child: {
            type: LoginPage,
            props: {
                foo: 'bar'
            }
        }
    }
]);