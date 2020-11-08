import React, {useState} from 'react';
import PropTypes from 'prop-types';

//  COMPONENTS
import {
    G_IconTextInput
} from "../../";

//  STYLE
import "./style.scss";

export const G_PasswordInput = props => {
    const [ type, setType ] = useState("password");

    const changeTypeHandle = () => {
        setType((type === "password") ? "text" : "password");
    };

    return (
        <div className="g-password-input">
            <G_IconTextInput
                {
                    ...props
                }
                type={type}
                icon={((type === "password") ? "icon-eye" : "icon-eye-off")}
                iconClickHandle={changeTypeHandle}
                autoComplete={"off"}
            />
        </div>
    )
};
G_PasswordInput.propTypes = {
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
    ])
};