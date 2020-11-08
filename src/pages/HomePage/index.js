import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

//  COMPONENTS
import {
    MainContent
} from "../../components";

//  HELPERS
import {
    variables
} from '../../helpers';

//  STYLE
import "./style.scss";

//  ASSETS
import genelmenu1 from '../../../public/docs/genel-menu-1.pdf';
import genelmenu2 from '../../../public/docs/genel-menu-2.pdf';
import genelmenu3 from '../../../public/docs/genel-menu-3.pdf';
import solenmenu1 from '../../../public/docs/solen-menu-1.pdf';
import solenmenu2 from '../../../public/docs/solen-menu-2.pdf';
import jumboevde1 from '../../../public/docs/jumbo-evde-1.pdf';

const HomePage = props => {
    const [ t ] = useTranslation();

    const type = new URLSearchParams(props.location.search).get("type") || 1;

    const items = {
        "1": {
            genelMenu: genelmenu1,
            solenMenu: solenmenu1,
            jumboEvde: jumboevde1
        },
        "2": {
            genelMenu: genelmenu2,
            solenMenu: solenmenu2,
            jumboEvde: jumboevde1
        },
        "3": {
            genelMenu: genelmenu3,
            jumboEvde: jumboevde1
        }
    }
    const item = items[type] || items["1"];

    return (
        <div id="homePage">
            <Helmet>
                <title>{ variables.meta.title }</title>
                <meta name="description" content={ variables.meta.description }/>
            </Helmet>
            <MainContent
                {
                    ...item
                }
            />
            <div className="link">
                <a href="https://jumbokunefe.com" target={"_blank"}>
                    <span>{ t("slogan") }</span>
                </a>
            </div>
        </div>
    )
};

export {HomePage};