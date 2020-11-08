import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

//  STYLE
import "./style.scss";

export const G_TextArea = props => {
    const changeHandle = e => {
        if (!props.disabled && props.changeHandle)
        {
            if (props.pattern)
            {
                if (RegExp(props.pattern).test(e.currentTarget.value))
                    props.changeHandle(e.currentTarget.value, e);
            }
            else
                props.changeHandle(e.currentTarget.value, e);
        }
    }

    return (
        <textarea
            name={ props.name || undefined }
            className={
                ClassNames(
                    "g-text-area",
                    {
                        error: props.error
                    }
                )
            }
            disabled={ props.disabled }
            autoFocus={ props.autoFocus || false }
            required={ props.require }
            onFocus={ props.focusHandle }
            onBlur={ props.blurHandle }
            onChange={ changeHandle }
            value={ props.value || "" }
            placeholder={ props.placeholder || "" }
        />
    )
};
G_TextArea.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    require: PropTypes.bool,
    autoFocus: PropTypes.bool,
    focusHandle: PropTypes.func,
    blurHandle: PropTypes.func,
    changeHandle: PropTypes.func,
    pattern: PropTypes.string,
    error: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    placeholder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};