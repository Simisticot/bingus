import { useState } from "react";

const Bingo = () => {
    const cells = ["Tank Stance","Wrong Side","Auto Attack","Early Feed","Bubble","Cone Murder","Cleaved by TB","Hand of Pain","Midi saves Hand of Pain","aquila pre-pulls","cones align perfectly","kris forgets to draw","Free space !","Brute Justice music starts","Aetheroplasm too much","Rake Rabbit","1","2","3","4","5","6","7","8","TH says \"oh fuck\" but nothing happens"];
    const size = Math.sqrt(cells.length);
    let tableActifs = [];
    let rows = [];
    let k = 0;
    let bingos = [
        [0,1,2,3,4],
        [5,6,7,8,9],
        [10,11,12,13,14],
        [15,16,17,18,19],
        [20,21,22,23,24],
        [0,5,10,15,20],
        [1,6,11,16,21],
        [2,7,12,17,22],
        [3,8,13,18,23],
        [4,9,14,19,24],
        [0,6,12,18,24],
        [4,8,12,16,20]
    ]
    const handleClick = (e) => {
        let id = e.target.id;
        console.log("clic sur cellule "+id);
        tableActifs = actif.slice();
        if(tableActifs[id] === "empty"){
            tableActifs[id] = "checked";
        }else if(tableActifs[id] === "checked"){
            tableActifs[id] = "empty";
        }
        setActif(tableActifs);
        checkLines();
    }

    function checkLines(){
        let win = true;
        let board = [];
        let row = [];
        let o = 0;
        for (let w = 0; w < size; w++){
            for (let x = 0; x < size; x++){
                if(tableActifs[o] === "checked"){
                    row.push(true);
                }else{
                    row.push(false);
                }
                o++;
            }
            board.push(row.slice());
            row = [];
        }
        //console.log(board);
        bingos.forEach((bingo, index) => {
            win = true;
            bingo.forEach((cell, index) => {
                if(tableActifs[cell] === "checked" || tableActifs[cell] === "win"){
                    //console.log(cell+" est false");
                }else{
                    win = false;
                    //console.log(cell +" est true");
                }
            });
            //console.log(bingo);
            if(win){
                bingo.forEach((cell, index) => {
                    tableActifs[cell] = "win";
                });
                setActif(tableActifs);
            }else{
                console.log("lose");
            }
        });
    }

    for(var l = 0; l < size*size; l++){
        tableActifs.push("empty");
    }

    const [actif, setActif] = useState(tableActifs);

    for(var i = 0; i < size; i++){
        let rowID = `row${i}`;
        let cell = [];
        for(var idx = 0; idx < size; idx++){
            let cellClass = `cell${idx}`;
            cell.push(<td key={cellClass} onClick={handleClick} className={actif[k]} id={k}>{ cells[k] }</td>);
            k++;
        }
        rows.push(<tr key={i} id={rowID}>{ cell }</tr>)
    }

    return ( 
        <div className="bingo">
            <table>
                <tbody>
                    { rows }
                </tbody>
            </table>
        </div>
     );
}
 
export default Bingo;