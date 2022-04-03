
const Cell = ({locked, id,  handleChange, text, checked, toggleChecked}) => {

    const textChanged = (event) =>{
        handleChange(id, event.target.value);
    }

    return ( <td id={id} className={(checked ? 'checked' : 'unchecked')+' '+(locked ? 'locked' : 'unlocked')} >{locked ? <p onClick={() => toggleChecked(id)}>{text}</p> : <input onChange={event => textChanged(event)} value={text} type="text"/>}</td> );
}
 
export default Cell;