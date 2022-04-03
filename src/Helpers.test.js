import {coordsToIndex, indexToCoords, isChecked, isPermutation, mirrorShuffle} from './Helpers';

const dimensions = {height: 5, width: 5};
const numCells = dimensions.height*dimensions.width;

test('Converts index to coords', () => {
    expect(indexToCoords(0, dimensions)).toEqual({y: 0, x: 0});
    expect(indexToCoords(1, dimensions)).toEqual({y: 0, x: 1});
    expect(indexToCoords(5, dimensions)).toEqual({y: 1, x: 0});
    expect(indexToCoords(6, dimensions)).toEqual({y: 1, x: 1});
});

test('Converts coords to index', () => {
    expect(coordsToIndex({y: 0, x: 0}, dimensions)).toBe(0);
    expect(coordsToIndex({y: 0, x: 1}, dimensions)).toBe(1);
    expect(coordsToIndex({y: 1, x: 0}, dimensions)).toBe(5);
    expect(coordsToIndex({y: 1, x: 1}, dimensions)).toBe(6);
});

test('Finds permutations', () => {
    let testArray = [1, 2, 3];
    expect(isPermutation(testArray, [3, 2, 1])).toBe(true);
    expect(isPermutation(testArray, [1, 3, 2])).toBe(true);
    expect(isPermutation(testArray, [4, 2, 1])).toBe(false);
    expect(isPermutation(testArray, [3, 2, 1, 4])).toBe(false);
});

test('Shuffle makes permutations', () => {
    const testArray1 = [1, 2, 3];
    const testArray2 = [4, 5 ,6];
    let copy1 = [...testArray1];
    let copy2 = [...testArray2];
    mirrorShuffle(copy1, copy2);
    expect(isPermutation(testArray1, copy1)).toBe(true);
    expect(isPermutation(testArray2, copy2)).toBe(true);
});

test('Finds checked cells', () => {
    let cellChecked = [];
    for(let i = 0; i < numCells; i++){
        cellChecked[i] = false;
    }
    cellChecked[1] = true;
    expect(isChecked({x: 0, y: 0},cellChecked, dimensions)).toBe(false);
    expect(isChecked({x: 1, y: 0},cellChecked, dimensions)).toBe(true);
});