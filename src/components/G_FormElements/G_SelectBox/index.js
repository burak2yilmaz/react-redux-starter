import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import ClassNames from "classnames";

//  COMPONENTS
import {
    G_TextBox,
    G_IconTextInput
} from "../../";

//  STYLE
import "./style.scss";

export const G_SelectBox = props => {
    const [ defaultData, setDefaultData ] = useState(false);
    const [ listActive, setListActive ] = useState(false);
    const [ value, setValue ] = useState(false);
    const [ data, setData ] = useState(false);
    const [ search, setSearch ] = useState(false);
    const selectBox = useRef();

    const changeHandle = item => {
        if (!props.disabled)
        {
            if (props.changeHandle)
                props.changeHandle(item.value);

            setSearch(false);
            setListActive(false);
        }
    };

    const listActiveHandle = () => {
        if (!props.disabled)
            setListActive(!listActive);
        else
            setListActive(false);
    };

    useEffect(() => {
        if (defaultData)
        {
            let newData = defaultData;

            if (props.value !== undefined)
            {
                if (!props.value)
                    setValue(false);

                newData = newData.map(item => {
                    item.checked = false;

                    if (props.value === item.value)
                    {
                        item.checked = true;
                        setValue(item);
                    }

                    return item;
                });
            }

            setData(newData);
        }
    }, [ props.value, defaultData ]);

    useEffect(() => {
        if (defaultData)
        {
            const newData = [
                ...defaultData
            ];

            if (search && search.toString().length > 0)
            {
                const _data = newData.filter(item => {
                    if (RegExp("(" + search + ")", "i").test(item.text) || RegExp("^(" + search + ")$", "i").test(item.value))
                        return item;
                });
                setData(_data);
            }
            else
                setData(defaultData);
        }
    }, [ search ]);

    useEffect(() => {
        const itemControl = e => {
            if (!e.target.closest('div.g-select-box') || e.target.closest('div.g-select-box') !== selectBox.current)
            {
                setSearch(false);
                setListActive(false);
                document.removeEventListener('click', itemControl);
            }
        };

        if (listActive)
            document.addEventListener('click', itemControl);

        return () => {
            document.removeEventListener('click', itemControl);
        }
    }, [ listActive ]);

    useEffect(() => {
        if (props.data)
        {
            let newData = [
                ...props.data
            ];
            newData = newData.map(item => {
                item.checked = false;

                if (props.valueChanger)
                {
                    Object.keys(props.valueChanger).map(changerKey => {
                        const changerValue = props.valueChanger[changerKey];
                        if (item[changerValue])
                            item[changerKey] = item[changerValue]
                    });
                }

                if (props.value === item.value)
                {
                    item.checked = true;
                    setValue(item);
                }

                return item;
            })
            setDefaultData(newData);
        }
    }, [ ]);

    return (
        <div
            className={
                ClassNames(
                    "g-select-box",
                    {
                        active: listActive,
                        disabled: props.disabled,
                        error: props.error
                    }
                )
            }
            ref={ selectBox }
        >
            {
                props.name &&
                <G_TextBox
                    type={"hidden"}
                    name={ props.name }
                    value={ value.value }
                    autoFocus={ true }
                />

            }
            <div
                className="g-select-box-placeholder"
                onClick={ listActiveHandle }
                tabIndex={props.tabIndex}
            >
                <span>{ value.text || value.value || props.placeholder || "Seçiniz" }</span>
                <span className="icon">
                    <i
                        className={
                            ClassNames(
                                "icon",
                                {
                                    "icon-angle-down": !listActive,
                                    "icon-angle-up": listActive
                                }
                            )
                        }
                    />
                </span>
            </div>
            {
                listActive && defaultData && defaultData.length > 0 &&
                <div className="g-select-box-list">
                    {
                        props.searchBox &&
                        <div className="g-select-box-search-box">
                            <G_IconTextInput
                                type={"text"}
                                value={ search }
                                changeHandle={setSearch}
                                icon={"icon-search"}
                            />
                        </div>
                    }
                    <div className="g-select-box-list-inner">
                        {
                            (data && data.length) > 0 &&
                            data.map((item, key) => {
                                return (
                                    <div
                                        className={
                                            ClassNames(
                                                "g-select-box-list-item",
                                                {
                                                    select: value.value === item.value,
                                                    disabled: item.disabled
                                                }
                                            )
                                        }
                                        key={ key }
                                        onClick={() => {
                                            if (!item.disabled && value.value !== item.value)
                                                changeHandle(item);
                                        }}
                                    >{ item.text || item.value }</div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
};
G_SelectBox.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
            PropTypes.number
        ]),
        text: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        checked: PropTypes.bool,
        disabled: PropTypes.bool
    })).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    valueChanger: PropTypes.object,
    changeHandle: PropTypes.func,
    searchBox: PropTypes.bool,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    error: PropTypes.bool
};