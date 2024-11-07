import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return <button onClick={onSquareClick} className="square">{ value }</button>;
}

export default function Board() {
  const [isXTurn, setIsXTurn] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = isXTurn ? 'X' : 'O';

    setSquares(nextSquares);
    setIsXTurn(!isXTurn);
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
  }

  const winner = calculateWinner(squares);
  let status = (winner != null) ? "Winner: Player " + winner + "!!": "It's " + (isXTurn ? "X" : "O") + "'s turn: ";

  return (
    <>
      <div className="board">
        <div className="board-row">
          <Square onSquareClick={() => handleClick(0)} value={squares[0]}/>
          <Square onSquareClick={() => handleClick(1)} value={squares[1]}/>
          <Square onSquareClick={() => handleClick(2)} value={squares[2]}/>
        </div>
        <div className="board-row">
          <Square onSquareClick={() => handleClick(3)} value={squares[3]}/>
          <Square onSquareClick={() => handleClick(4)} value={squares[4]}/>
          <Square onSquareClick={() => handleClick(5)} value={squares[5]}/>
        </div>
        <div className="board-row">
          <Square onSquareClick={() => handleClick(6)} value={squares[6]}/>
          <Square onSquareClick={() => handleClick(7)} value={squares[7]}/>
          <Square onSquareClick={() => handleClick(8)} value={squares[8]}/>
        </div>
      </div>
      <div className="status-area">
        <div className="status">{ status }</div>
        <button onClick={resetBoard} className="reset">Reset Board</button>
      </div>
    </>
  );

  function calculateWinner() {
    const winningLines = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Centre row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Centre column
      [2, 5, 8], // Right column
      [0, 4, 8], // LR diagonal
      [2, 4, 6], // RL diagonal
    ];

    let winner = null;

    winningLines.forEach(function(line) {
      const [a, b, c] = line;

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        winner = squares[a];
        return;
      }
    });

    return winner;
  }
}
