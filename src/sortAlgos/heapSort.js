const heapSort = (array) => {
    const animations = [];
    let n = array.length;
    // build max-heap
    for(let i = Math.floor((array.length / 2)) - 1; i >= 0; i--) {
        trickleDown(array, i, array.length - 1, animations);
    }
    // now remove element one by one from the array
    // console.log(array);

    for(let i = n - 1; i > 0; i--) {
        animations.push([0, i, "color"]);
        animations.push([0, i, "revert"]);
        animations.push([0, array[i], "swap", i, array[0]]);
        swap(array, 0, i);
        trickleDown(array, 0, i - 1, animations);
    }
    return animations;
}

function trickleDown(array, parent, n, animations) {
    const leftChild = 2 * parent + 1;
    const rightChild = 2 * parent + 2;
    let bigIndex = parent;

    if(leftChild <= n && array[leftChild] > array[bigIndex]) {
        bigIndex = leftChild;
    }

    if(rightChild <= n && array[rightChild] > array[bigIndex]) {
        bigIndex = rightChild;
    }


    if(bigIndex !== parent) {
        animations.push([bigIndex, parent, "color"]);
        animations.push([bigIndex, parent, "revert"]);
        animations.push([bigIndex, array[parent], "swap", parent, array[bigIndex]]);
        swap(array, bigIndex, parent);
        trickleDown(array, bigIndex, n, animations);
    }

}

function swap(array, a, b) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

export default heapSort;