import React from 'react';
import { connect } from "react-redux";
import ClassNames from "classnames";

//  STYLE
import "./style.scss";

const Layout1_ = props => {
    return (
        <div
            id="ly-1"
            className={
                ClassNames(
                    {
                        "active": true
                    }
                )
            }
        >
            {
                props.children
            }
        </div>
    );
};

const mapStateToProps = ({ R_Test }) => {
    return {
        R_Test
    }
};

const Layout1 = connect(mapStateToProps)(Layout1_);

export { Layout1 };
