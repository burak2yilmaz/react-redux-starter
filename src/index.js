import React from 'react';
import ReactDOM from 'react-dom';

//  REDUX
import { Provider } from 'react-redux';

//  STORE
import store from './Redux/Store';

//  APP COMPONENT
import App from './App';

//  ROUTER
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'));
