import { useEffect, useState } from 'react';
import './App.css';
import Board from './bingo/Board';
import {mirrorShuffle, checkRowsForWins, makeRowWinning, checkColumnsForWins, makeColumnWinning, isRisingWinning, makeRisingWinning, isFallingWinning, makeFallingWinning} from './Helpers';
import zlib from 'react-zlib-js';
import { Buffer } from 'buffer';
import { promisify } from 'util';

  const placeholderText = [
    "Write down some text to create your own bingo card",
    "Click 'Lock' to lock in the text and start checking off boxes",
    "Don't worry you can unlock the board again any time",
    "Click the 'Shuffle' button to shuffle your text around the board, checked boxes will remain so",
    "There's no 'Free Space' by default but I trust you to write it in yourself",
    "You can make a 3x3 grid or a 5x5 one using the dropdown menu, more sizes might come later on",
    "The 'Copy Link' button will copy a link to the current board to your clipboard, the links are extremely long for now, sorry about that",
    "If you would like to learn about this project or give me feedback follow the Github link at the bottom of the page",
    "Hope you enjoy Bingus !"
  ];
  
  const boardSizes = [
                      {name: "3x3", key: 0, size: 3, dimensions: {height: 3, width: 3}, numCells: 9, cellStyle:{flexBasis: 'calc(33.33333% - 6px)', margin: '3px'}},
                      {name: "4x4", key: 1, size: 4, dimensions: {height: 4, width: 4}, numCells: 16, cellStyle:{flexBasis: 'calc(25% - 4px)', margin: '2px'}},
                      {name: "5x5", key: 2, size: 5, dimensions: {height: 5, width: 5}, numCells: 25, cellStyle: {flexBasis: 'calc(20% - 4px)', margin: '2px'}}
                    ];
  
  let numCells = boardSizes[0].dimensions.height*boardSizes[0].dimensions.width;
  let initChecked = [];
  let initCellText = [];
  let initWin = [];
  

  const params = new URLSearchParams(window.location.search);
  const paramText = params.get("cellText");

  let cellTextPromise = null;
  const promunzip = promisify(zlib.unzip);
  if(paramText !== null){
    const textBuffer = Buffer.from(paramText,'base64');
    cellTextPromise = promunzip(textBuffer);
  }

  const paramCellText = new URLSearchParams(paramText);
  const paramCells = paramCellText.getAll("cell");
  const paramSize = params.get("size");
  const paramTitle = params.get("title");
  const initTitle = (paramTitle === null ? "Bingus" : paramTitle);
  let initLocked = paramCells.length > 0;
  let initSize = boardSizes[0];

  if(paramSize !== null && paramSize.length > 0){
    for(let i = 0; i < boardSizes.length; i++){
      if(boardSizes[i].name === paramSize){
        initSize = boardSizes[i];
      }
    }
  }
  
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

  const [boardSize, setBoardSize] = useState(initSize);
  
  const [locked, setLocked] = useState(initLocked);

  const [cellText, setCellText] = useState(initCellText);

  const [title, setTitle] = useState(initTitle);

  useEffect(() => {
    if(cellTextPromise !== null){
      cellTextPromise.then((buffer, error) =>{
        if(error){
          console.log("Erreur :"+error);
        }else{
          let param = new URLSearchParams(buffer.toString("utf8"));
          let paramCells = param.getAll('cell');
          let newCells = []
          for(let i = 0; i < paramCells.length; i++){
            newCells.push(paramCells[i]);
          }
          for(let i = 0; i < numCells-paramCells.length; i++){
            newCells.push('');
          }
          setCellText(newCells);
        }
      });
    }
  },[]);

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

  const copyLink = () => {
    let link = "https://bingus.app/?size="+boardSize.name+"&title=" + title;
    let texte = "";

    for(let i = 0; i < boardSize.numCells; i++){
      if(cellText[i].length>0){
        texte += "&cell=" + encodeURIComponent(cellText[i]);
      }
    }
    zlib.deflate(texte, (err, buffer) => {
      if (err) {
        console.error('An error occurred:', err);
        process.exitCode = 1;
      }

      link+="&cellText="+encodeURIComponent(buffer.toString('base64'));
      navigator.clipboard.writeText(link);
    });
    
  }

  return (
    <div className="App">
      <div className="title-container">
        <input id="editable-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <Board height={boardSize.dimensions.height} width={boardSize.dimensions.width} locked={locked} cellText={cellText} handleChange={handleChange} cellChecked={cellChecked} toggleChecked={toggleChecked} cellWin={cellWin} numCells={boardSize.numCells} boardSize={boardSize} placeholderText={placeholderText} />
      <div className='controls'>
        <button id="lock" onClick={() => setLocked(locked ? false : true)}>{locked ? <span>Unlock</span> : <span>Lock</span>}</button>
        <button id="shuffle" onClick={() => shuffleCells()}>Shuffle</button>
        <select onChange={event => handleSizeChange(event.target.value)} value={boardSize.key} >{ boardSizes.map(size => { return <option key={size.key} value={size.key}>{size.name}</option> }) }</select>
        <button id="copylink" onClick={() => copyLink()}>Copy link</button>
      </div>
      <div className='github'><p>Learn more and send feedback on <a target="_blank" rel="noreferrer" href="https://github.com/Simisticot/bingus"> Github</a></p></div>
    </div>
  );
}

export default App;
