import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  STYLE
import "./style.scss";

export const G_SwitchButton2 = props => {
    const clickHandle = e => {
        if (props.setChecked && !props.disabled)
            props.setChecked(!props.checked, e);
    };

    return (
        <div
            className={
                ClassNames(
                    "g-switch-button-2",
                    {
                        checked: props.checked,
                        disabled: props.disabled
                    }
                )
            }
        >
            <div
                className="g-switch-button-2-inner"
                onClick={clickHandle}
            >
                {
                    props.name &&
                    <input
                        type="checkbox"
                        name={props.name}
                        checked={props.checked}
                        className={"hideItem"}
                        onChange={clickHandle}
                    />
                }
                <span className="g-switch-button-2-square"/>
                <div className="g-switch-button-2-text">
                    <span>{ ((props.texts && props.texts[0]) ? props.texts[0] : "OFF") }</span>
                    <span>{ ((props.texts && props.texts[1]) ? props.texts[1] : "ON") }</span>
                </div>
            </div>
        </div>
    )
};
G_SwitchButton2.propTypes = {
    checked: PropTypes.bool,
    setChecked: PropTypes.func,
    disabled: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    texts: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    )
};