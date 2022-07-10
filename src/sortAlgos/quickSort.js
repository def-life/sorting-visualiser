const quickSort = (array) => {
    const animations = [];
     helper(array, 0, array.length - 1, animations);
     return animations;
}

function helper(array, start, end, animations) {

    if(start >= end) return;

    // console.log(start, end);

    const index = partition(array, start, end, animations);
    helper(array, start, index - 1, animations);
    helper(array, index + 1, end, animations);
}

function partition(array, start, end, animations) {
    const pivotElement = array[end];
    let current = start;

    for(let i = start; i < end; i++) {
        animations.push([i, current, "color"]);
        animations.push([i, current, "revert"])
        if(array[i] < pivotElement) {
            animations.push([i, array[current], "swap", current, array[i]]);
            swap(array, i, current);
            current++;
        }
    }
    animations.push([end, current, "color"]);
    animations.push([end, current, "revert"]);
    animations.push([end, array[current], "swap", current, array[end]]);
    swap(array, current, end);
    return current;
}

function swap(array, a, b) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;

}

export default quickSort;