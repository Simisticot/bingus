
const Cell = ({locked, id,  handleChange, text, checked, toggleChecked, winning}) => {

    const textChanged = (event) =>{
        handleChange(id, event.target.value);
    }

    return ( <td id={id} className={'cell '+(checked ? 'checked' : 'unchecked')+' '+(locked ? 'locked' : 'unlocked')+' '+(winning ? 'winning' : 'notWinning')} >{locked ? <p onClick={() => toggleChecked(id)}>{text}</p> : <input onChange={event => textChanged(event)} value={text} type="text"/>}</td> );
}
 
export default Cell;