import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return <button onClick={onSquareClick} className="square">{ value }</button>;
}

function Board({isXTurn, squares, gameState, gameWon, onPlay, onReset}) {
  function handleClick(i) {
    // Updates game board
    if (gameWon || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = isXTurn ? 'X' : 'O';

    onPlay(nextSquares);
  }

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
        <div className="status">{ gameState }</div>
        <button onClick={ onReset } className="reset">Reset Board</button>
      </div>
    </>
  );
}

export default function Game() {
  const [isXTurn, setIsXTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [gameState, setGameState] = useState("It's X's turn: ");
  const [gameWon, setGameWon] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);
  let currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (nextHistory.length == 9) {
      setGameState("Game ends in a draw. Please reset the board to start anew!");
      return;
    }

    let winner = calculateWinner(nextHistory[nextHistory.length - 1]);

    if (winner != null) {
      setGameState("Winner: Player " + winner + "!!");
      setGameWon(true);
    } else {
      setIsXTurn(!isXTurn);
      setGameState(!isXTurn ? "It's X's turn: " : "It's O's turn: ");
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsXTurn(nextMove % 2 === 0);
    setGameState(nextMove % 2 === 0 ? "It's X's turn: " : "It's O's turn: ");
  }

  function resetBoard() {
    setHistory([Array(9).fill(null)]);
    setIsXTurn(true);
    setCurrentMove(0);
    setGameState("It's X's turn: ");
    setGameWon(false);
  }

  const moves = history.map((squares, move) => {
    if (gameWon) {
      return;
    }

    let description = move > 0 ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board isXTurn={isXTurn} squares={currentSquares} gameState={gameState} gameWon={gameWon} onPlay={handlePlay} onReset={resetBoard} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
