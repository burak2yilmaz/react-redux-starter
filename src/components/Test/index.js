import React from 'react';
import { connect } from "react-redux";
import ClassNames from 'classnames';

//  ACTIONS
import {
    incrementCount,
    decrementCount
} from "../../actions";

//  STYLE
import './style.scss';

function Test_(props) {
    return (
        <div className="test">
            <span
                className={
                    ClassNames(
                        "count",
                        {
                            "positive": props.R_Test.count > 0,
                            "negative": props.R_Test.count < 0,
                            "bg": props.R_Test.count <= -10 || props.R_Test.count >= 10
                        }
                    )
                }
            >{ props.R_Test.count }</span>
            <button onClick={incrementCount}>Arttır</button>
            <button onClick={decrementCount}>Azalt</button>
        </div>
    );
}

const mapStateToProps = ({ R_Test }) => {
    return {
        R_Test
    }
};

const Test = connect(mapStateToProps)(Test_);

export { Test };
