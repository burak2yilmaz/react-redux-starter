import React from 'react';

//  ROUTER
import { Link } from "react-router-dom";

const Menu = () => <header>
    <ul>
        <li>
            <Link to={'/'}>
                Anasayfa
            </Link>
        </li>
        <li>
            <Link to={'/users'}>
                Kullanıcılar
            </Link>
        </li>
    </ul>
</header>;

export default Menu;
