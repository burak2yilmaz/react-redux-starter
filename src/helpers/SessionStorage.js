export const SessionStorage = {
    set: (key, data) => {
        if (typeof key !== "string") {
            console.warn('Local Storage: Key type is not string!');
            return false;
        }

        if (typeof data === "object")
            data = JSON.stringify(data);

        sessionStorage.setItem(key, data);
        return data;
    },
    get: (key, initialData) => {
        let data = sessionStorage.getItem(key) || false;

        if (!data && initialData)
            return SessionStorage.set(key, initialData);

        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    },
    remove: key => {
        if (SessionStorage.get(key))
        {
            sessionStorage.removeItem(key);
            return true;
        }
        else
            return false;
    }
};