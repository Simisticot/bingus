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

export   const oneIfChecked = (coords, checkedArray, dimensions) => {
   return isChecked(coords, checkedArray, dimensions) ? 1 : 0;
}

export const isChecked = (coords, checkedArray, dimensions) => {
    return checkedArray[coordsToIndex(coords, dimensions)];
}

export const isWinning = (index, dimensions, checkedArray) => {
    return exploreHorizontal(index, dimensions, checkedArray) || exploreVertical(index, dimensions, checkedArray) || exploreFalling(index, dimensions, checkedArray) || exploreRising(index, dimensions, checkedArray);
  }

export const exploreVertical = (index, dimensions, checkedArray) => {
    let cursor = indexToCoords(index, dimensions);
    let score = 1;
    cursor.y = cursor.y+1;
    while (cursor.y < dimensions.height){
      score = score + oneIfChecked(cursor, checkedArray, dimensions);
      cursor.y = cursor.y+1;
    }
    cursor = indexToCoords(index, dimensions);
    cursor.y = cursor.y-1;
    while (cursor.y >= 0){
      score = score + oneIfChecked(cursor, checkedArray, dimensions);
      cursor.y = cursor.y-1;
    }
    return score === dimensions.height;
  }

export const exploreHorizontal = (index, dimensions, checkedArray) => {
  let cursor = indexToCoords(index, dimensions);
  let score = 1;
  cursor.x = cursor.x+1;
  while (cursor.x < dimensions.width){
    score = score + oneIfChecked(cursor, checkedArray, dimensions);
    cursor.x = cursor.x+1;
  }
  cursor = indexToCoords(index, dimensions);
  cursor.x = cursor.x-1;
  while (cursor.x >= 0){
    score = score + oneIfChecked(cursor, checkedArray, dimensions);
    cursor.x = cursor.x-1;
  }
  return score === dimensions.width;
}

export const exploreRising = (index, dimensions, checkedArray) => {
  if(dimensions.width !== dimensions.height){
    return false;
  }
  let cursor = indexToCoords(index, dimensions);
  let score = 1;
  cursor.x = cursor.x+1;
  cursor.y = cursor.y-1;
  while (cursor.x < dimensions.width && cursor.y >= 0){
    score = score + oneIfChecked(cursor, checkedArray, dimensions);
    cursor.x = cursor.x+1;
    cursor.y = cursor.y-1;
  }
  cursor = indexToCoords(index, dimensions);
  cursor.x = cursor.x-1;
  cursor.y = cursor.y+1;
  while (cursor.x >= 0 && cursor.y < dimensions.height){
    score = score + oneIfChecked(cursor, checkedArray, dimensions);
    cursor.x = cursor.x-1;
    cursor.y = cursor.y+1;
  }
  return score === dimensions.width;
}

export const exploreFalling = (index, dimensions, checkedArray) => {
  if(dimensions.width !== dimensions.height){
    return false;
  }
  let cursor = indexToCoords(index, dimensions);
  let score = 1;
  cursor.x = cursor.x+1;
  cursor.y = cursor.y+1;
  while (cursor.x < dimensions.width && cursor.y < dimensions.height){
    score = score + oneIfChecked(cursor, checkedArray, dimensions);
    cursor.x = cursor.x+1;
    cursor.y = cursor.y+1;
  }
  cursor = indexToCoords(index, dimensions);
  cursor.x = cursor.x-1;
  cursor.y = cursor.y-1;
  while (cursor.x >= 0 && cursor.y >= 0){
    score = score + oneIfChecked(cursor, checkedArray, dimensions);
    cursor.x = cursor.x-1;
    cursor.y = cursor.y-1;
  }
  return score === dimensions.width;
}