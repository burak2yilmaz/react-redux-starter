import React, { Component } from 'react';

//  CHILDS
import Login from "./LoginUser";
import NotLoginUser from "./NotLoginUser";

class LoginPage extends Component {
    render() {
        return (
            <div className={"loginPage"}>
                {
                    this.props.R_Users.login ? <Login/> : <NotLoginUser/>
                }
            </div>
        );
    }
}

export default LoginPage;
