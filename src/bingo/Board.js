import Cell from "./Cell";

const Board = ({height, width, locked, handleChange, cellText, cellChecked, toggleChecked, cellWin, numCells, boardSize}) => {
    let rows = [];
   
    for(let i = 0; i < height; i++){
        rows.push({id: i, length: width});
    }

    let cells = [];

    for(let i = 0; i < numCells; i++){
        cells.push({id: i, checked: cellChecked[i], winning: cellWin[i], text: cellText[i]});
    }

    return ( 
        <div className="Board">
            <div className="square-container">
                    {
                        cells.map(cell => <Cell locked={locked} id={cell.id} key={cell.id} handleChange={handleChange} text={cell.text} checked={cell.checked} toggleChecked={toggleChecked} winning={cell.winning} boardSize={boardSize} />)
                    }
            </div>
        </div> 
    );
}
 
export default Board;