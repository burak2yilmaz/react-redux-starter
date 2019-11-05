import React, {Component} from 'react';

//  COMPONENTS
import Menu from "../../Components/Menu";

//  REDUX
import { connect } from 'react-redux';

class Layout1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"layout1"}>
                <Menu menu={this.props.reduxProps.R_Menu}/>
                {
                    this.props.children
                }
            </div>
        );
    }
}

const mapStateToProps = ( {R_Menu }) => {
    return {
        reduxProps: {
            R_Menu
        }
    }
};

export default connect(mapStateToProps)(Layout1);
