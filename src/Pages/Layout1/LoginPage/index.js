import React from 'react';

//  CHILDS
import Login from "./LoginUser";
import NotLoginUser from "./NotLoginUser";

const LoginPage = (props) => {
    return (
        <div>
            {
                props.R_Users.login ? <Login/> : <NotLoginUser/>
            }
        </div>
    );
};

export default LoginPage;
