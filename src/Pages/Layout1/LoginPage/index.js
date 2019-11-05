import React, { Component } from 'react';

//  REDUX
import { connect } from 'react-redux';

//  CHILDS
import Login from "./LoginUser";
import NotLoginUser from "./NotLoginUser";

class LoginPage extends Component {
    render() {
        return (
            <div className={"loginPage"}>
                {
                    this.props.reduxProps.R_Users.login ? <Login/> : <NotLoginUser/>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ R_Users }) => {
    return {
        reduxProps: {
            R_Users
        }
    };
};

export default connect(mapStateToProps)(LoginPage);
