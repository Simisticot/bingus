import { useState } from 'react';
import './App.css';
import Board from './bingo/Board';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {mirrorShuffle, checkRowsForWins, makeRowWinning, checkColumnsForWins, makeColumnWinning, isRisingWinning, makeRisingWinning, isFallingWinning, makeFallingWinning} from './Helpers';

  const boardSizes = [
                      {name: "3x3", key: 0, size: 3, dimensions: {height: 3, width: 3}, numCells: 9, cellStyle:{flexBasis: 'calc(33.33333% - 6px)', margin: '3px'}},
                      {name: "5x5", key: 1, size: 5, dimensions: {height: 5, width: 5}, numCells: 25, cellStyle: {flexBasis: 'calc(20% - 4px)', margin: '2px'}}
                    ];
  
  let numCells = boardSizes[0].dimensions.height*boardSizes[0].dimensions.width;
  let initChecked = [];
  let initCellText = [];
  let initWin = [];

  const params = new URLSearchParams(window.location.search);
  const paramCells = params.getAll("cell");
  
  for(let i = 0; i < paramCells.length; i++){
    initCellText.push(paramCells[i]);
  }

  for(let i = 0; i < numCells-paramCells.length; i++){
    initCellText.push("");
  }
  for(let i = 0; i < numCells; i++){
    initChecked.push(false);
  }
  for(let i = 0; i < numCells; i++){
    initWin.push(false);
  }
  
function App() {

  const [boardSize, setBoardSize] = useState(boardSizes[0]);
  
  const [locked, setLocked] = useState(false);

  const [cellText, setCellText] = useState(initCellText);

  const [cellChecked, setCellChecked] = useState(initChecked);

  const [cellWin, setCellWin] = useState(initWin);

  const toggleChecked = (cellId) => {
    let newChecked = [...cellChecked];
    newChecked[cellId] = !cellChecked[cellId];
    setCellChecked(newChecked);
    updateWins(newChecked, boardSize);
  }

  const updateWins = (cellChecked, boardSize) => {
    let newWins = [];
    for(let i = 0; i < numCells; i++){
      newWins.push(false);
    }
    let winningRows = checkRowsForWins(cellChecked, boardSize.dimensions);
    for(let i = 0; i < boardSize.dimensions.height; i++){
      if(winningRows[i]){
        makeRowWinning(newWins, i, boardSize.dimensions);
      }
    }
    let winningColumns = checkColumnsForWins(cellChecked, boardSize.dimensions);
    for(let i = 0; i < boardSize.dimensions.width; i++){
      if(winningColumns[i]){
        makeColumnWinning(newWins, i, boardSize.dimensions);
      }
    }
    if(isRisingWinning(cellChecked, boardSize.dimensions)){
      makeRisingWinning(newWins, boardSize.dimensions);
    }
    if(isFallingWinning(cellChecked, boardSize.dimensions)){
      makeFallingWinning(newWins, boardSize.dimensions);
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
      updateWins(newChecked, boardSize);
  }

  const handleSizeChange = (newSizeIndex) => {
    let newSize = boardSizes[newSizeIndex];
    let oldSize = boardSize;
    let newText = [];
    let newChecked = [];
    let counter = 0;

    for(let i = 0; i < Math.min(oldSize.numCells, newSize.numCells); i++){
      newText.push(cellText[i]);
      newChecked.push(cellChecked[i]);
      counter++;
    }

    let remaining = newSize.numCells - counter;
    if(remaining > 0){
      for(let i = 0; i < remaining; i++){
        newText.push("");
        newChecked.push(false);
      }
    }
    setCellChecked(newChecked);
    setCellText(newText);
    setBoardSize(newSize);
    updateWins(newChecked, newSize);
  }

  return (
    <div className="App">
      <div className='title'>Bingus</div>
      <Board height={boardSize.dimensions.height} width={boardSize.dimensions.width} locked={locked} cellText={cellText} handleChange={handleChange} cellChecked={cellChecked} toggleChecked={toggleChecked} cellWin={cellWin} numCells={boardSize.numCells} boardSize={boardSize} />
      <div className='controls'>
        <button id="lock" onClick={() => setLocked(locked ? false : true)}>{locked ? <span>Unlock</span> : <span>Lock</span>}</button>
        <button id="shuffle" onClick={() => shuffleCells()}>Shuffle</button>
        <select onChange={event => handleSizeChange(event.target.value)}>{ boardSizes.map(size => { return <option key={size.key} value={size.key}>{size.name}</option> }) }</select>
      </div>
      <div className='github'><p>Learn more and send feedback on <a target="_blank" rel="noreferrer" href="https://github.com/Simisticot/bingus"> Github</a></p></div>
    </div>
  );
}

export default App;
