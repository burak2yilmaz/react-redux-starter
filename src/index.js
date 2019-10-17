import React from 'react';
import ReactDOM from 'react-dom';

//  APP COMPONENT
import App from './App';

//  ROUTER
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'));
