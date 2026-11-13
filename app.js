
import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check whether a player has won
  const checkWinner = (currentBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== "");

  // Handle box click
  const handleClick = (index) => {
    if (board[index] !== "" || winner || isDraw) {
      return;
    }

    const updatedBoard = [...board];

    updatedBoard[index] = isXTurn ? "X" : "O";

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  };

  // Restart the game
  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
  };

  return (
    <div className="game-container">
      <h1>XO Game</h1>

      <h2>
        {winner
          ? `Player ${winner} Wins! 🎉`
          : isDraw
          ? "Game Draw!"
          : `Player ${isXTurn ? "X" : "O"}'s Turn`}
      </h2>

      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
            disabled={cell !== "" || winner !== null || isDraw}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="restart-btn" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
