import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  STYLE
import "./style.scss";

export const G_SwitchButton = props => {
    const clickHandle = e => {
        if (props.setChecked && !props.disabled)
            props.setChecked(!props.checked, e);
    };

    return (
        <div
            className={
                ClassNames(
                    "g-switch-button",
                    {
                        active: props.checked,
                        disabled: props.disabled
                    }
                )
            }

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
            <div
                className="g-switch-button-inner"
                onClick={clickHandle}
            >
                <span className="g-switch-button-circle"/>
            </div>
        </div>
    )
};
G_SwitchButton.propTypes = {
    checked: PropTypes.bool,
    setChecked: PropTypes.func,
    disabled: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}