import { useState } from 'react';
import './App.css';
import Board from './bingo/Board';

function App() {
  let height = 5;
  let width = 5;
  const [locked, setLocked] = useState(false);
  return (
    <div className="App">
      <Board height={height} width={width} locked={locked}/>
      <button onClick={() => setLocked(locked ? false : true)}>{locked ? <span>unlock</span> : <span>lock</span>}</button>
    </div>
  );
}

export default App;
