export default function ReducerInjector(parts) {
    let stateData = {};

    parts.map(item => {
        if (item.store) {
            this[item.subscriber] = item.store.subscribe(() => {
                reducersInitialize.bind(this)(item.reducers, item.store, item.part, true);
            });
            stateData[item.part] = reducersInitialize.bind(this)(item.reducers, item.store, item.part, false);
        }
    });

    this.state = stateData;
}

function reducersInitialize(reducers = [], store, part, isMounted = true) {
    let storeItems = store.getState(),
        storageItems = {};

    for (let i = 0; i < reducers.length; i++) {
        storageItems = {
            ...storageItems
        };
        storageItems[reducers[i]] = storeItems[reducers[i]];
    }

    if (isMounted) {
        let setData = {};
        setData[part] = storageItems;
        this.setState(setData);
    }
    else
        return storageItems;
}