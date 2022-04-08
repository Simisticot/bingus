
const Cell = ({locked, id,  handleChange, text, checked, toggleChecked, winning}) => {

    const textChanged = (event) =>{
        handleChange(id, event.target.value);
    }

    return (
        <div id={id} onClick={() => {if(locked){toggleChecked(id)}}} className={'square cell '+(checked ? 'checked' : 'unchecked')+' '+(locked ? 'locked' : 'unlocked')+' '+(winning ? 'winning' : 'notWinning')} >
            <div className="content">{locked ? <p>{text}</p> : <textarea placeholder="Write down some text to create your card then lock it to play" onChange={event => textChanged(event)} value={text} type="text"/>}</div>
        </div>
    );
}
 
export default Cell;