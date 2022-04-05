import Row from "./Row";

const Board = ({height, width, locked, handleChange, cellText, cellChecked, toggleChecked, cellWin}) => {
    let rows = []
   
    for(let i = 0; i < height; i++){
        rows.push({id: i, length: width});
    }

    return ( <table><tbody>{ rows.map(row => <Row key={row.id} id={row.id} width={width} locked={locked} handleChange={handleChange} cellText={cellText} cellChecked={cellChecked} toggleChecked={toggleChecked} cellWin={cellWin} />)}</tbody></table> );
}
 
export default Board;