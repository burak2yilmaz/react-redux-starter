import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  STYLE
import "./style.scss";

export const G_Button = props => {
    const clickHandle = e => {
        if (props.clickHandle && !props.disabled && !props.loading)
            props.clickHandle(e);
    };

    return (
        <div
            className={
                ClassNames(
                    "g-button",
                    {
                        "g-button-type-1": props.type === 1 || !props.type,
                        "g-button-type-2": props.type === 2,
                        "g-button-icon": props.icon,
                        "disabled": props.disabled,
                        "loading": props.loading
                    }
                )
            }
            onClick={clickHandle}
            onMouseEnter={props.mouseEnter}
            onMouseLeave={props.mouseLeave}
            title={props.title}
        >
            {
                props.text &&
                <span className="g-button-text">{ props.text }</span>
            }
            {
                props.icon &&
                <span
                    className="g-button-icon"
                >
                        <i className={ "icon " + props.icon }/>
                    </span>
            }
            {
                props.loading !== undefined &&
                <div className="g-button-loading"/>
            }
        </div>
    )
};
G_Button.propTypes = {
    type: PropTypes.oneOf([
        1, 2, 3, 4
    ]),
    icon: PropTypes.string,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    disabled: PropTypes.bool,
    clickHandle: PropTypes.func,
    mouseEnter: PropTypes.func,
    mouseLeave: PropTypes.func,
    loading: PropTypes.bool
}