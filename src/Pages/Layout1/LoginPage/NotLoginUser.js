import React, {Component} from 'react';

//  ACTIONS
import { A_Users } from '../../../Redux/Actions/Actions';

class NotLoginUser extends Component {
    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        A_Users.loginUser();
    }


    render() {
        return (
            <>
                Not Login User!
                <br/><br/><br/>
                <button onClick={this.loginUser}>Loginn</button>
            </>
        );
    }
}

export default NotLoginUser;
