export const mirrorShuffle = (array1, array2) => {
    for(let i = 0; i < array1.length; i++){
        let j = Math.floor(Math.random()*array1.length);
        swap(array1, i, j);
        swap(array2, i, j);
    }
    function swap(array, i, j){
        let tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
}

export const indexToCoords = (index, dimensions) => {
    let x = index%dimensions.width;
    let y = (index-x)/dimensions.width;
    return {x: x, y: y};
}

export  const coordsToIndex = (coords, dimensions) => {
    return ( coords.y * dimensions.width ) + coords.x;
}

export const isPermutation = (a, b) => {
    if (a.length !== b.length) return false;
    let map = new Map(a.map(x => [x, { count: 0 }]));
    a.forEach(x => map.get(x).count++);
    return b.every(x => {
         let match = map.get(x);
         return match && match.count--;
    });
}

export   const oneIfChecked = (coords, checkedArray) => {
   return isChecked(coords, checkedArray) ? 1 : 0;
}

export const isChecked = (coords, checkedArray, dimensions) => {
    return checkedArray[coordsToIndex(coords, dimensions)];
}