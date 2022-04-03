const Cell = ({locked, id,  handleChange, text}) => {

    const textChanged = (event) =>{
        handleChange(id, event.target.value);
    }
    return ( <td>{locked ? <p>{text}</p> : <input onChange={event => textChanged(event)} value={text} type="text"/>}</td> );
}
 
export default Cell;