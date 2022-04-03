import Cell from "./Cell"

const Row = ({id, width, locked, handleChange, cellText}) => {
    let cells = []
    for(let i = 0; i < width; i++){
        cells.push({id: i+(width*id), text: cellText[i+width*id]})
    }
    return ( <tr id={id}>{ cells.map(cell => <Cell locked={locked} id={cell.id} key={cell.id} handleChange={handleChange} text={cell.text} />) }</tr> );
}
 
export default Row;