import React from 'react';

import {Route} from 'react-router-dom';

//  LAYOUT
import Layout1 from './Layout1';

//  STORE
import store from '../Redux/Store';

//  CONTENTS
import HomePage from './Layout1/HomePage';
import LoginPage from './Layout1/LoginPage';

const routes = [
    {
        path: '/',
        layout: Layout1,
        content: HomePage,
        props: {
            test: 1,
            test2: true
        },
        childProps: {
            test: 1
        }
    },
    {
        path: '/users',
        layout: Layout1,
        content: LoginPage,
        props: {
            reducers: [
                'R_Users'
            ],
            store: store
        }
    }
];

function parser(routes = []) {
    return routes.map((route, key) =>
        <Route key={key} exact path={route.path} render={() => <route.layout {...route.props}>
            <route.content {...route.childProps}/>
        </route.layout>}/>
    );
}

export default parser(routes);