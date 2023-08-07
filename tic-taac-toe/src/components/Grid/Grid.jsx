import { useState } from "react";
import Card from "../Card/Card";
import "./Grid.css";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import isWinner from "../../helpers/checkWinner";



function Grid({ numberOfCards }) {
  const [turn, setTurn] = useState(true);
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [winner, setWinner] = useState(null);

  function play(index) {
    console.log("move played", index);
    if (turn == true) {
      board[index] = "0";
    } else {
      board[index] = "x";
    }

    const win = isWinner(board, turn ? "0" : "x");
    console.log("winner is ",win)
    if (win) {
      setWinner(win);
      toast.success(`wow so easy!!!, Congratulation ${win}`);
    }
    setBoard([...board]);
    setTurn(!turn);
  }

  function reset(){
    setBoard(Array(numberOfCards).fill(""))
    setWinner(null);
    setTurn(true)
  }

  return (
    <div className="grid-wrapper">
      {winner &&( <> <h1 className="turn-highlight">winner is {winner}</h1>
      <button className="reset" onClick={reset}>Reset Game</button>
      <ToastContainer position="top-center"/>
      </>)}
      <h1 className="turn-highlight">Current turn:{turn ? "0" : "x"}</h1>
      <div className="grid">
        {board.map((value, idx) => {
          return <Card gameEnd={winner?true:false} onPlay={play} player={value} key={idx} index={idx} />;
        })}
      </div>
    </div>
  );
}

export default Grid;
