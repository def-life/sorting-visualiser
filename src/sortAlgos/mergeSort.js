function mergeSort(arr) {
   const animations = [];
   helper(arr, 0, arr.length - 1, animations);
   return animations;
}

function helper(arr, start, end, animations) {

    // base conditon
    if(start >= end) {
        return;
    }

    const mid = Math.floor((start + end) / 2);
    helper(arr, start, mid, animations);
    helper(arr, mid + 1, end, animations);
    merging(arr, start, mid, end, animations);
}

function merging(arr, start, mid, end, animations) {
    // copy both half's in some auxillary array
    const left = [];
    const right = [];
    

    for(let i = start; i <= mid; i++) {
        left.push(arr[i]);
    }

    for(let j = mid + 1; j <= end; j++) {
        right.push(arr[j]);
    }

    // perform merging
    let i = 0;
    let j = 0;
    let m = start;

    while(i < left.length && j < right.length) {
       animations.push([i + start, j + mid + 1]); // color
       animations.push([i + start, j + mid + 1]); // revert
        if(left[i] > right[j]) {
            animations.push([m, right[j]]); // overwrite value
            arr[m] = right[j];
            j++;
        } else {
           animations.push([m, left[i]]);
            arr[m] = left[i];
            i++;
        }
        m++;
    }

    while(i < left.length) {
        animations.push([i + start, m]);
        animations.push([i + start, m]);
        animations.push([m, left[i]]);
        arr[m] = left[i];
        i++; m++;
    }

    while(j < right.length) {
        animations.push([j + mid + 1, m]);
        animations.push([j + mid + 1, m]);
        animations.push([m, right[j]]);
        arr[m] = right[j];
        j++; m++;
    }
}

export default mergeSort;