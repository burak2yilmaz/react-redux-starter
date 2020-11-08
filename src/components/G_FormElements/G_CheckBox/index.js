import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import ClassNames from "classnames";

//  STYLE
import "./style.scss";

export const G_CheckBox = props => {
    const [ checked, setChecked ] = useState(false);

    useEffect(() => {
        setChecked(
            (_.isArray(props.checkedData) && props.checkedData.indexOf(props.value) > -1) ||
            (_.isBoolean(props.checkedData) && props.checkedData === true || false)
        );
    }, [ props.checkedData ]);

    const clickHandle = () => {
        if (props.setCheckedData && !props.disabled)
        {
            if (_.isArray(props.checkedData))
            {
                if (props.checkedData.indexOf(props.value) === -1)
                {
                    let data = props.checkedData;
                    data.push(props.value);
                    props.setCheckedData(data);
                    setChecked(true);
                }
                else
                {
                    let data = []

                    props.checkedData.map(item => {
                        if (item !== props.value)
                            data.push(item);
                    });

                    setChecked(false);
                    props.setCheckedData(data);
                }
            } else if (_.isBoolean(props.checkedData))
            {
                setChecked(props.checkedData);
                props.setCheckedData(props.checkedData);
            }
        }
    };

    return (
        <div
            className={
                ClassNames(
                    "g-check-box",
                    {
                        checked: checked,
                        disabled: props.disabled
                    }
                )
            }
            onClick={clickHandle}
        >
            <input
                type="checkbox"
                name={ props.name || undefined }
                value={ props.value }
                checked={ checked }
                className={"hideItem"}
                onChange={clickHandle}
            />
            <div className="g-check-box-inner">
                <span className="g-check-box-square"/>
            </div>
        </div>
    )
};
G_CheckBox.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]).isRequired,
    checkedData: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool
            ])
        ),
        PropTypes.bool
    ]).isRequired,
    setCheckedData: PropTypes.func,
    disabled: PropTypes.bool
};
