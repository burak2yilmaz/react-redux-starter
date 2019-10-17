import React from 'react';

//  ROUTER
import { Switch } from 'react-router-dom';

//  ROUTES
import routes from './Pages/Routes';

const App = () =>
    <div className="App">
        <Switch>
            {
                routes
            }
        </Switch>
    </div>;

export default App;
