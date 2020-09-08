const LocalStorage = {};

LocalStorage.get = (key, initialData) => {
    let data = localStorage.getItem(key) || false;

    if (!data && initialData)
        return LocalStorage.set(key, initialData);

    if (!data)
        return false;

    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
};

LocalStorage.set = (key, data) => {
    if (typeof key !== "string") {
        console.warn('Local Storage: Key type is not string!');
        return false;
    }

    if (typeof data === "object")
        data = JSON.stringify(data);

    localStorage.setItem(key, data);
    return data;
};

LocalStorage.remove = key => {
    if (LocalStorage.get(key))
    {
        localStorage.removeItem(key);
        return true;
    }
    else
        return false;
};

export { LocalStorage };