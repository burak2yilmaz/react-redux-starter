import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  STYLE
import "./style.scss";

export const G_TextBox = props => {
    const changeHandle = e => {
        if (props.changeHandle && !props.disabled)
        {
            if (props.pattern)
            {
                if (RegExp(props.pattern).test(e.currentTarget.value))
                    props.changeHandle(e.currentTarget.value, e);
            }
            else
                props.changeHandle(e.currentTarget.value, e);
        }
    };

    return (
        <input
            className={
                ClassNames(
                    "g-text-box",
                    {
                        error: props.error
                    }
                )
            }
            type={ props.type || "text" }
            autoComplete={ props.autoComplete || "off" }
            autoFocus={ props.autoFocus || false }
            name={ props.name || undefined }
            maxLength={ props.maxLeng }
            minLength={ props.minLeng }
            required={ props.required || false }
            disabled={ props.disabled || false }
            value={ props.value || "" }
            onChange={changeHandle}
            onFocus={ props.focusHandle }
            onBlur={ props.blurHandle }
            placeholder={ props.placeholder || undefined }
        />
    )
};

G_TextBox.propTypes = {
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
    ])
};