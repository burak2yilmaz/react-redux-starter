import React, {Component} from 'react';

//  COMPONENTS
import Menu from "../../Components/Menu";

//  REDUCER INJECTOR
import reducerInjector from '../../System/ReducerInjector';

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

        reducerInjector.bind(this)(parts);
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
