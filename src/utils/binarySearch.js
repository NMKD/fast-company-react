const findNumber = (arr, value) => {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        const mid = Math.round((low + high) / 2);
        const guess = arr[mid];
        if (guess === value) {
            return true;
        }
        if (guess > value) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return false;
};

export default findNumber;
