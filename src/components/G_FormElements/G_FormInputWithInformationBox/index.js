import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  COMPONENTS
import {
    G_IconTextInput
} from "../../";

//  STYLE
import "./style.scss";

export const G_FormInputWithInformationBox = props => {
    const [ informationView, setInformationView ] = useState(false);

    return (
        <div
            className={
                ClassNames(
                    "g-form-input-with-information-box",
                    {
                        active: informationView
                    }
                )
            }
        >
            <G_IconTextInput
                {
                    ...props
                }
                icon={"icon-information"}
                iconClickHandle={() => {
                    setInformationView(!informationView);
                }}
            />
            {
                informationView &&
                <div className="g-form-input-information-box">
                    {
                        (typeof props.informationText === "string" || typeof props.informationText === "number") ?
                            <p>{ props.informationText }</p> :
                            props.informationText
                    }
                </div>
            }
        </div>
    )
};
G_FormInputWithInformationBox.propTypes = {
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
    informationText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element
    ]).isRequired
}
