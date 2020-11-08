import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ClassNames from 'classnames';

//  COMPONENTS
import {
    PraiseForm,
    ComplaintForm
} from "../";

//  HELPERS
import {
    arraySorter,
    variables
} from "../../helpers";

//  STYLE
import "./style.scss";

//  ASSETS
import Logo from '../../../public/images/logo.svg';

const MainContent = (props) => {
    const [ branches, setBranches ] = useState(false);
    const [ form, setForm ] = useState(0);
    const [ activeApp, setActiveApp ] = useState(false);


    const openURL = link => {
        window.open(link, '_self');
    };

    useEffect(() => {
        axios.get(variables.url.API_URL + "/branches/for-form")
            .then(response => {
                if (response.data.status)
                    setBranches(response.data.branches.sort(arraySorter('name', 'asc')));
            })

        setTimeout(() => {
            setActiveApp(true);
        }, 2800);

    }, []);

    return (
        <div
            id="mainContent"
            className={
                ClassNames(
                    {
                        activeApp
                    }
                )
            }
        >
            <div className="content">
                <a href="https://jumbokunefe.com" target={"_blank"}>
                    <img src={ Logo } alt="Jumbo Künefe" className={"logo"}/>
                </a>
                <div
                    className="forms"
                >
                    {
                        form === 0 &&
                        <div className="mainContentInner">
                            <div className="form">
                                <div className="items">
                                    {
                                        props.genelMenu &&
                                        <div className="item" onClick={() => { openURL(props.genelMenu) }}>
                                            <span>JUMBO MENÜ</span>
                                        </div>
                                    }
                                    {
                                        props.solenMenu &&
                                        <div className="item" onClick={() => { openURL(props.solenMenu) }}>
                                            <span>ŞÖLEN MENÜ</span>
                                        </div>
                                    }
                                    {
                                        props.jumboEvde &&
                                        <div className="item" onClick={() => { openURL(props.jumboEvde) }}>
                                            <span>#JUMBOEVDE MENÜ</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            {
                                branches &&
                                <div
                                    className="text"
                                >
                                <span
                                    onClick={() => {
                                        setForm(1);
                                    }}
                                >Teşekkür Et</span>
                                    <span
                                        onClick={() => {
                                            setForm(2);
                                        }}
                                    >Şikayet Et</span>
                                </div>
                            }
                        </div>
                    }
                    {
                        form === 1 &&
                            <PraiseForm branches={branches} setForm={setForm}/>
                    }
                    {
                        form === 2 &&
                            <ComplaintForm branches={branches} setForm={setForm}/>
                    }
                </div>
            </div>
        </div>
    );
};

MainContent.propTypes = {
    genelMenu: PropTypes.string,
    solenMenu: PropTypes.string,
    jumboEvde: PropTypes.string
};

export {
    MainContent
}
