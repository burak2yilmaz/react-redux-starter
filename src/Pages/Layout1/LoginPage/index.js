import React, { Component } from 'react';

//  CHILDS
import Login from "./LoginUser";
import NotLoginUser from "./NotLoginUser";

class LoginPage extends Component {
    render() {
        return (
            <>
                {
                    this.props.login ? <Login/> : <NotLoginUser/>
                }
            </>
        );
    }
}

export default LoginPage;
