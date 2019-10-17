import React, { Component } from 'react';

//  ROUTER
import { Link } from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <header>
                <ul>
                    {
                        this.props.menu.items.map((item, key) =>
                            <li key={key}>
                                <Link to={item.link}>
                                    {
                                        item.title
                                    }
                                </Link>
                            </li>)
                    }
                </ul>
            </header>
        );
    }
}

export default Menu;