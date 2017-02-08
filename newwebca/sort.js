function setAsc(a,b) {
    if (a.number < b.number)
        return -1;
    if (a.number > b.number)
        return 1;
    return 0;
}

function setDesc(a,b) {
    if (a.number < b.number)
        return 1;
    if (a.number > b.number)
        return -1;
    return 0;
}

function sortBy(key) {
    return function(a, b) {
        if (a[key] < b[key]) {
            return -1;
        } else if (a[key] > b[key]) {
            return 1;
        } else {
            return 0;
        }
    };
}
