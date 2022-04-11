
const Cell = ({locked, id,  handleChange, text, checked, toggleChecked, winning, boardSize, placeholderText}) => {

    const textChanged = (event) =>{
        handleChange(id, event.target.value);
    }

    return (
        <div style={boardSize.cellStyle} id={id} onClick={() => {if(locked){toggleChecked(id)}}} className={'square cell '+(checked ? 'checked' : 'unchecked')+' '+(locked ? 'locked' : 'unlocked')+' '+(winning ? 'winning' : 'notWinning')} >
            <div className="content">{locked ? <p>{text}</p> : <textarea placeholder={placeholderText} onChange={event => textChanged(event)} value={text} type="text"/>}</div>
        </div>
    );
}
 
export default Cell;