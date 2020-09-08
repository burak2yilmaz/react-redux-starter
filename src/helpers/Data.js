const Data = {};

Data.finder = (key, value, data) => {
    if (!key || !value)
        return false;

    let args = [];
    data.map(item => {
        if (item[key] === value)
            args.push(item);
    });
    return args;
};

export { Data }