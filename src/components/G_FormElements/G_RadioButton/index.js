import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  STYLE
import "./style.scss";

export const G_RadioButton = props => {
    const [ checked, setChecked ] = useState(false);

    const clickHandle = e => {
        if (props.clickHandle && !props.disabled)
            props.clickHandle(props.value, e);
    }

    useEffect(() => {
        setChecked(props.value === props.currentValue);
    }, [ props.currentValue ]);

    return (
        <div
            className={
                ClassNames(
                    "g-radio-button",
                    {
                        checked: checked,
                        disabled: props.disabled
                    }
                )
            }
            onClick={ clickHandle }
        >
            <input
                type="radio"
                className={"hideItem"}
                name={ props.name || undefined }
                value={ props.value }
                checked={ checked }
                onChange={clickHandle}
            />
            <div className="g-radio-button-inner">
                <span className="g-radio-button-square"/>
            </div>
        </div>
    )
};
G_RadioButton.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]).isRequired,
    currentValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]).isRequired,
    setValue: PropTypes.func,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    clickHandle: PropTypes.func,
    disabled: PropTypes.bool
};
