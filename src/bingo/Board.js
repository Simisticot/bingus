import Row from "./Row";

const Board = ({height, width, locked}) => {
    let rows = []
    for(let i = 0; i < height; i++){
        rows.push({id: i, length: width});
    }

    return ( <table> { rows.map(row => <Row id={row.id} width={width} locked={locked}/>)}</table> );
}
 
export default Board;