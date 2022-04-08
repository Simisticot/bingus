import { useState } from 'react';
import './App.css';
import Board from './bingo/Board';
import {mirrorShuffle, checkRowsForWins, makeRowWinning, checkColumnsForWins, makeColumnWinning, isRisingWinning, makeRisingWinning, isFallingWinning, makeFallingWinning} from './Helpers';

  const height = 5;
  const width = 5;
  const dimensions = {height: height, width: width}
  const numCells = height*width;

  let initChecked = [];
  let initCellText = [];
  let initWin = [];

  for(let i = 0; i < numCells; i++){
    initCellText.push("");
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
      <div className='title'>Bingus</div>
      <Board height={height} width={width} locked={locked} cellText={cellText} handleChange={handleChange} cellChecked={cellChecked} toggleChecked={toggleChecked} cellWin={cellWin} numCells={numCells} />
      <div className='buttons'>
        <button id="lock" onClick={() => setLocked(locked ? false : true)}>{locked ? <span>Unlock</span> : <span>Lock</span>}</button>
        <button id="shuffle" onClick={() => shuffleCells()}>Shuffle</button>
      </div>
      
    </div>
  );
}

export default App;
