import {useEffect, useState} from "react";

const Cell = ({locked}) => {
    const [text, setText] = useState('');
    return ( <td>{locked ? <p>{text}</p> : <input value={text} onChange={event => setText(event.target.value)} type="text"/>}</td> );
}
 
export default Cell;