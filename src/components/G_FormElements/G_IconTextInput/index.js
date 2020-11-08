import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  COMPONENTS
import {
    G_TextBox
} from "../../";

//  STYLE
import "./style.scss";

export const G_IconTextInput = props => {
    const [ focus, setFocus ] = useState(false);

    const iconClickHandle = () => {
        if (props.iconClickHandle)
            props.iconClickHandle();
    };

    const focusHandle = () => {
        if (props.focusHandle)
            props.focusHandle();

        setFocus(true);
    };

    const blurHandle = () => {
        if (props.blurHandle)
            props.blurHandle();

        setFocus(false);
    }

    return (
        <div
            className={
                ClassNames(
                    "g-icon-text-input",
                    {
                        focus: focus,
                        error: props.error,
                        disabled: props.disabled
                    }
                )
            }
        >
            <G_TextBox
                {
                    ...props
                }
                blurHandle={blurHandle}
                focusHandle={focusHandle}
            />
            <span className="g-icon-text-input-icon" onClick={iconClickHandle}>
                <i className={"icon " + props.icon}/>
            </span>
        </div>
    )
};
G_IconTextInput.propTypes = {
    type: PropTypes.oneOf([
        'text',
        'password',
        'hidden'
    ]),
    classNames: PropTypes.array,
    autoComplete: PropTypes.oneOf([
        "on", "off"
    ]),
    autoFocus: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    maxLeng: PropTypes.number,
    minLeng: PropTypes.number,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    pattern: PropTypes.string,
    changeHandle: PropTypes.func,
    focusHandle: PropTypes.func,
    blurHandle: PropTypes.func,
    placeholder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    iconClickHandle: PropTypes.func
};
