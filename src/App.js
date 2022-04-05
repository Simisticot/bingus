import { useState } from 'react';
import './App.css';
import Board from './bingo/Board';
import {mirrorShuffle, anyWin, isWinning, indexToCoords, coordsToIndex} from './Helpers';

  const height = 5;
  const width = 5;
  const dimensions = {height: height, width: width}
  const numCells = height*width;

  let initChecked = [];
  let initCellText = [];
  let initWin = [];

  for(let i = 0; i < numCells; i++){
    initCellText.push('hihi');
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
    if(cellChecked[cellId]){
      newChecked[cellId] = false;
    }else{
      newChecked[cellId] = true;
      let wins = isWinning(cellId, dimensions, cellChecked);
      if(anyWin(wins)){
        win(wins, cellId);
      }
    }
    newChecked[cellId] = (cellChecked[cellId] ? false : true);
    setCellChecked(newChecked);
  }

  const win = (win, cellId) => {
    if(win.horizontal){
      winRow(cellId);
    }
    if(win.vertical){
      winColumn(cellId);
    }
    if(win.falling){
      winFalling();
    }
    if(win.rising){
      winRising();
    }
  }

  const winRow = (cellId) => {
    let newWin = [...cellWin];
    let coords = indexToCoords(cellId, dimensions);
    for(let i = 0; i < dimensions.width; i++){
      newWin[coordsToIndex({x: i, y: coords.y}, dimensions)] = true;
    }
    setCellWin(newWin);
  }

  const winColumn = (cellId) => {
    let newWin = [...cellWin];
    let coords = indexToCoords(cellId, dimensions);
    for(let i = 0; i < dimensions.height; i++){
      newWin[coordsToIndex({y: i, x: coords.x}, dimensions)] = true;
    }
    setCellWin(newWin);
  }

  const winFalling = () => {
    let newWin = [...cellWin];
    for(let coords = {x: 0, y: 0}; coords.y < dimensions.height && coords.x < dimensions.width; coords.y++, coords.x++){
      newWin[coordsToIndex(coords, dimensions)] = true;
    }
    setCellWin(newWin);
  }
  
  const winRising = () => {
    let newWin = [...cellWin];
    for(let coords = {x: 0, y: dimensions.height-1}; coords.y >= 0 && coords.x < dimensions.width; coords.y--, coords.x++){
      newWin[coordsToIndex(coords, dimensions)] = true;
    }
    setCellWin(newWin);
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
      <Board height={height} width={width} locked={locked} cellText={cellText} handleChange={handleChange} cellChecked={cellChecked} toggleChecked={toggleChecked} cellWin={cellWin} />
      <button onClick={() => setLocked(locked ? false : true)}>{locked ? <span>unlock</span> : <span>lock</span>}</button>
      <button onClick={() => shuffleCells()}>shuffle</button>
      <button onClick={() => console.log(cellText)}>coucou</button>
    </div>
  );
}

export default App;
