import React from "react";

//  ROUTER
import { Route } from 'react-router-dom';

export default class Router {
    static init(Routes) {
        return Routes.map((route, key) =>
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
}