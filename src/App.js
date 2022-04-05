import { useState } from 'react';
import './App.css';
import Board from './bingo/Board';
import {mirrorShuffle, indexToCoords, oneIfChecked, anyWin, isWinning} from './Helpers';

  const height = 5;
  const width = 5;
  const dimensions = {height: height, width: width}
  const numCells = height*width;

  let initChecked = [];
  let initCellText = [];

  for(let i = 0; i < numCells; i++){
    initCellText.push('hihi');
  }
  for(let i = 0; i < numCells; i++){
    initChecked.push(false);
  }

function App() {
  
  const [locked, setLocked] = useState(false);

  const [cellText, setCellText] = useState(initCellText);

  const [cellChecked, setCellChecked] = useState(initChecked);

  const toggleChecked = (cellId) => {
    console.log('toggle');
    let newChecked = [...cellChecked];
    if(cellChecked[cellId]){
      newChecked[cellId] = false;
    }else{
      newChecked[cellId] = true;
      if(anyWin(isWinning(cellId, dimensions, cellChecked))){
        console.log('win');
      }
    }
    newChecked[cellId] = (cellChecked[cellId] ? false : true);
    setCellChecked(newChecked);
  }

  const handleChange = (cellId, cellContent) =>{
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
  }

  return (
    <div className="App">
      <Board height={height} width={width} locked={locked} cellText={cellText} handleChange={handleChange} cellChecked={cellChecked} toggleChecked={toggleChecked} />
      <button onClick={() => setLocked(locked ? false : true)}>{locked ? <span>unlock</span> : <span>lock</span>}</button>
      <button onClick={() => shuffleCells()}>shuffle</button>
      <button onClick={() => console.log(cellText)}>coucou</button>
    </div>
  );
}

export default App;
