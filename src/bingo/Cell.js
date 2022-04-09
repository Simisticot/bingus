
const Cell = ({locked, id,  handleChange, text, checked, toggleChecked, winning, boardSize}) => {

    const textChanged = (event) =>{
        handleChange(id, event.target.value);
    }

    const threeSquareRows = {
        flexBasis: 'calc(33.33333% - 6px)',
        margin: '3px'
    }

    const fiveSquareRows = {
        flexBasis: 'calc(20% - 4px)',
        margin: '2px'
    }

    return (
        <div style={(boardSize.size === 3)? threeSquareRows : fiveSquareRows} id={id} onClick={() => {if(locked){toggleChecked(id)}}} className={'square cell '+(checked ? 'checked' : 'unchecked')+' '+(locked ? 'locked' : 'unlocked')+' '+(winning ? 'winning' : 'notWinning')} >
            <div className="content">{locked ? <p>{text}</p> : <textarea placeholder="Write down some text to create your card then lock it to play" onChange={event => textChanged(event)} value={text} type="text"/>}</div>
        </div>
    );
}
 
export default Cell;