import { useState } from 'react';
import './App.css';
import Board from './bingo/Board';

  const height = 5;
  const width = 5;
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
    newChecked[cellId] = (cellChecked[cellId] ? false : true);
    setCellChecked(newChecked);
  }

  const handleChange = (cellId, cellContent) =>{
      let newText = [...cellText];
      newText[cellId] = cellContent;
      setCellText(newText);
  }

  const mirrorShuffle = (array1, array2) => {
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
