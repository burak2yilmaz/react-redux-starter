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
];

function parser(routes = []) {
    return routes.map((route, key) =>
        <Route key={key} exact path={route.path} render={() =>
            <route.layout.type
                {...route.layout.props}
                layout={route.layout}
                child={route.child}
            >
                <route.child.type
                    {...route.child.props}
                />
            </route.layout.type>
        }
        />
    );
}

export default parser(routes);