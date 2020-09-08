export function arraySorter(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        if (typeof a[key] === "number" && typeof b[key] === "number")
            return numberSorter(a[key], b[key], order);
        else
            return stringSorter(a[key], b[key], order);

    }
}

function numberSorter(a, b, order) {
    const varA = parseFloat(a);
    const varB = parseFloat(b);

    let comparison = 0;
    if (varA > varB) {
        comparison = 1;
    } else if (varA < varB) {
        comparison = -1;
    }

    return (
        (order === 'desc') ? (comparison * -1) : comparison
    );
}

function stringSorter(a, b, order) {
    const varA = (typeof a === 'string')
        ? a.toUpperCase() : a;
    const varB = (typeof b === 'string')
        ? b.toUpperCase() : b;

    let comparison = 0;
    if (varA > varB) {
        comparison = 1;
    } else if (varA < varB) {
        comparison = -1;
    }

    return (
        (order === 'desc') ? (comparison * -1) : comparison
    );
}