import { useState } from 'react';
import './App.css';
import Board from './bingo/Board';
import {mirrorShuffle, anyWin, isWinning, indexToCoords, coordsToIndex, checkRowsForWins, makeRowWinning, checkColumnsForWins, makeColumnWinning, isRisingWinning, makeRisingWinning, isFallingWinning, makeFallingWinning} from './Helpers';

  const height = 5;
  const width = 5;
  const dimensions = {height: height, width: width}
  const numCells = height*width;

  let initChecked = [];
  let initCellText = [];
  let initWin = [];

  for(let i = 0; i < numCells; i++){
    initCellText.push('Contenu pour Case');
  }
  for(let i = 0; i < numCells; i++){
    initChecked.push(false);
  }
  for(let i = 0; i < numCells; i++){
    initWin.push(false);
  }

function App() {
  
  const [locked, setLocked] = useState(false);

  const [cellText, setCellText] = useState(initCellText);

  const [cellChecked, setCellChecked] = useState(initChecked);

  const [cellWin, setCellWin] = useState(initWin);

  const toggleChecked = (cellId) => {
    let newChecked = [...cellChecked];
    newChecked[cellId] = !cellChecked[cellId];
    setCellChecked(newChecked);
    updateWins(newChecked);
  }

  const toggleWin = (win, cellId, bNewState) => {
    if(win.horizontal){
      toggleWinRow(cellId, bNewState);
    }
    if(win.vertical){
      toggleWinColumn(cellId, bNewState);
    }
    if(win.falling){
      toggleWinFalling(bNewState);
    }
    if(win.rising){
      toggleWinRising(bNewState);
    }
  }

  const toggleWinRow = (cellId, bNewState) => {
    let newWin = [...cellWin];
    let coords = indexToCoords(cellId, dimensions);
    for(let i = 0; i < dimensions.width; i++){
      newWin[coordsToIndex({x: i, y: coords.y}, dimensions)] = bNewState;
    }
    setCellWin(newWin);
  }

  const toggleWinColumn = (cellId, bNewState) => {
    let newWin = [...cellWin];
    let coords = indexToCoords(cellId, dimensions);
    for(let i = 0; i < dimensions.height; i++){
      newWin[coordsToIndex({y: i, x: coords.x}, dimensions)] = bNewState;
    }
    setCellWin(newWin);
  }

  const toggleWinFalling = (bNewState) => {
    let newWin = [...cellWin];
    for(let coords = {x: 0, y: 0}; coords.y < dimensions.height && coords.x < dimensions.width; coords.y++, coords.x++){
      newWin[coordsToIndex(coords, dimensions)] = bNewState;
    }
    setCellWin(newWin);
  }
  
  const toggleWinRising = (bNewState) => {
    let newWin = [...cellWin];
    for(let coords = {x: 0, y: dimensions.height-1}; coords.y >= 0 && coords.x < dimensions.width; coords.y--, coords.x++){
      newWin[coordsToIndex(coords, dimensions)] = bNewState;
    }
    setCellWin(newWin);
  }

  const updateWins = (cellChecked) => {
    let newWins = [];
    for(let i = 0; i < numCells; i++){
      newWins.push(false);
    }
    let winningRows = checkRowsForWins(cellChecked, dimensions);
    for(let i = 0; i < dimensions.height; i++){
      if(winningRows[i]){
        makeRowWinning(newWins, i, dimensions);
      }
    }
    let winningColumns = checkColumnsForWins(cellChecked, dimensions);
    for(let i = 0; i < dimensions.width; i++){
      if(winningColumns[i]){
        makeColumnWinning(newWins, i, dimensions);
      }
    }
    if(isRisingWinning(cellChecked, dimensions)){
      makeRisingWinning(newWins, dimensions);
    }
    if(isFallingWinning(cellChecked, dimensions)){
      makeFallingWinning(newWins, dimensions);
    }
    setCellWin(newWins);
  }


  const handleChange = (cellId, cellContent) => {
      let newText = [...cellText];
      newText[cellId] = cellContent;
      setCellText(newText);
  }

  const shuffleCells = () => {
      let newText = [...cellText];
      let newChecked = [...cellChecked];
      mirrorShuffle(newText, newChecked);
      setCellText(newText);
      setCellChecked(newChecked);
      updateWins(newChecked);
  }

  return (
    <div className="App">
      <Board height={height} width={width} locked={locked} cellText={cellText} handleChange={handleChange} cellChecked={cellChecked} toggleChecked={toggleChecked} cellWin={cellWin} />
      <button onClick={() => setLocked(locked ? false : true)}>{locked ? <span>unlock</span> : <span>lock</span>}</button>
      <button onClick={() => shuffleCells()}>shuffle</button>
    </div>
  );
}

export default App;
