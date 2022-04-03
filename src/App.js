import { useState } from 'react';
import './App.css';
import Board from './bingo/Board';

function App() {
  let height = 2;
  let width = 2;
  const [locked, setLocked] = useState(false);

  let initCellText = []
  for(let i = 0; i < height*width; i++){
    initCellText.push('???');
  }
  const [cellText, setCellText] = useState(initCellText);

  const handleChange = (cellId, cellContent) =>{
      let newText = [...cellText];
      newText[cellId] = cellContent;
      setCellText(newText);
  }

  const shuffle = (array) => {
      for(let i = 0; i < array.length; i++){
          let j = Math.floor(Math.random()*array.length);
          swap(array, i, j);
      }
      function swap(array, i, j){
          let tmp = array[i];
          array[i] = array[j];
          array[j] = tmp;
      }
  }

  const shuffleText = () => {
      let newText = [...cellText];
      shuffle(newText);
      setCellText(newText);
  }

  return (
    <div className="App">
      <Board height={height} width={width} locked={locked} cellText={cellText} handleChange={handleChange} />
      <button onClick={() => setLocked(locked ? false : true)}>{locked ? <span>unlock</span> : <span>lock</span>}</button>
      <button onClick={() => shuffleText()}>shuffle</button>
      <button onClick={() => console.log(cellText)}>coucou</button>
    </div>
  );
}

export default App;
