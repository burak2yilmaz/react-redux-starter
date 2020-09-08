import React from 'react';
import { connect } from "react-redux";

//  COMPONENTS
import {
    Test
} from "../../components";

//  STYLE
import "./style.scss";

function HomePage_(props) {
    return (
        <div id="homePage">
            <Test/>
        </div>
    )
}

const mapStateToProps = ({ R_Test }) => {
    return {
        R_Test
    }
};

const HomePage = connect(mapStateToProps)(HomePage_);

export {HomePage};