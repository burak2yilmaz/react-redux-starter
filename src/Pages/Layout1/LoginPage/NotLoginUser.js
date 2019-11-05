import React, {Component} from 'react';

//  REDUX
import {connect} from 'react-redux';

//  REDUCER
import {methods} from '../../../Redux/Reducers/R_Users';

class NotLoginUser extends Component {
    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        this.props.dispatch({
            type: methods.login
        });
    };


    render() {
        return (
            <>
                Not Login User!
                <br/><br/><br/>
                <button onClick={ this.loginUser }>Login</button>
            </>
        );
    }
}

export default connect()(NotLoginUser);