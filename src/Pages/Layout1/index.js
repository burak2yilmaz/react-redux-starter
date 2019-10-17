import React, {Component} from 'react';

//  COMPONENTS
import Menu from "../../Components/Menu";

class Layout1 extends Component {
    constructor(props) {
        super(props);

        this.reducersInitialize = this.reducersInitialize.bind(this);

        if (this.props.store) {
            this.setReducers = this.props.store.subscribe(() => {
                this.reducersInitialize(this.props.reducers, true);
            });
            this.state = this.reducersInitialize(this.props.reducers, false);
        }
    }

    reducersInitialize(reducers = [], isMounted = true) {
        let storeItems = this.props.store.getState(),
            storageItems = {};

        for (let i = 0; i < reducers.length; i++) {
            storageItems = {
                ...storageItems,
                ...storeItems[reducers[i]]
            }
        }

        if (isMounted)
            this.setState(storageItems);
        else
            return storageItems;
    }

    render() {
        return (
            <div className={"layout1"}>
                <Menu/>
                {
                    React.cloneElement(this.props.children, {
                        ...this.state
                    })
                }
            </div>
        );
    }

    componentWillUnmount() {
        if (this.setReducers)
            this.setReducers();
    }

}

export default Layout1;
