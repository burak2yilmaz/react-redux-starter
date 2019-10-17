import React, {Component} from 'react';

//  COMPONENTS
import Menu from "../../Components/Menu";

class Layout1 extends Component {
    constructor(props) {
        super(props);

        this.reducerConnect = this.reducerConnect.bind(this);
        this.reducersInitialize = this.reducersInitialize.bind(this);

        this.reducerConnect();
    }

    reducerConnect(reducers = this.props.reducers) {
        if (this.props.store) {
            this.setReducers = this.props.store.subscribe(() => {
                this.reducersInitialize(reducers, true);
            });
            this.reducersInitialize(reducers, false);
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
            this.state = storageItems;
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
