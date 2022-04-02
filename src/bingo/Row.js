import Cell from "./Cell"

const Row = ({id,width,locked}) => {
    let cells = []
    for(let i = 0; i < width; i++){
        cells.push({id: i})
    }
    return ( <tr id={id}>{ cells.map(cell => <Cell locked={locked}/>) }</tr> );
}
 
export default Row;