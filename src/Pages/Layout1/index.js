import React, {Component} from 'react';

//  REDUCER INJECTOR
import { ReducerInjector } from '../../System';

//  COMPONENTS
import Menu from "../../Components/Menu";

class Layout1 extends Component {
    constructor(props) {
        super(props);

        let parts = [
            {
                store: this.props.layout.store,
                reducers: this.props.layout.reducers,
                part: 'layoutStore',
                subscriber: 'setReducersChild'
            },
            {
                store: this.props.child.store,
                reducers: this.props.child.reducers,
                part: 'childStore',
                subscriber: 'setReducersLayout'
            }
        ];

        ReducerInjector.bind(this)(parts);
    }

    render() {
        return (
            <div className={"layout1"}>
                <Menu menu={this.state.layoutStore.R_Menu}/>
                {
                    React.cloneElement(this.props.children, {
                        ...this.state.childStore
                    })
                }
            </div>
        );
    }

    componentWillUnmount() {
        if (this.setReducersLayout)
            this.setReducersLayout();

        if (this.setReducersChild)
            this.setReducersChild();
    }

}

export default Layout1;
