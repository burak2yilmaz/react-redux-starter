import React, {Suspense} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import { history,store } from './helpers';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

//  PAGES
import {
} from "./pages";

//  ROUTES
import Routes from "./Routes";

//  STYLE
import './scss/App.scss';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <Suspense fallback={ true }>
                        <Router history={history}>
                            <Switch>
                                {
                                    Routes.map((item, key) => {
                                        if (item.status === 1 && item.layout && item.page)
                                        {
                                            return (
                                                <Route
                                                    exact
                                                    key={ key }
                                                    path={ item.url }
                                                    render={props =>
                                                        <item.layout history={ props.history }>
                                                            <item.page {...props} />
                                                        </item.layout>
                                                    }
                                                />
                                            )
                                        }
                                    })
                                }
                                <Route render={() => {
                                    return (
                                        <span>404 Page</span>
                                    )
                                }}/>
                            </Switch>
                        </Router>
                    </Suspense>
                </I18nextProvider>
            </Provider>
        </div>
    );
}

export default App;
