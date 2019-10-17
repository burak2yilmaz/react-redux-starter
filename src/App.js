import React from 'react';

//  ROUTER
import { Switch } from 'react-router-dom';

//  ROUTES
import routes from './Pages/Routes';

const App = () =>
    <>
        <Switch>
            {
                routes
            }
        </Switch>
    </>;

export default App;
