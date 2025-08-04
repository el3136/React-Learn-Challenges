import React, { useRef, useEffect, useState } from "react";
import "./TicTacToe.css";

const winCondition = [[0, 1, 2]];

const checkWinner = (arr) => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (arr[i][0] && arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2]) {
      return arr[i][0];
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (arr[0][j] && arr[0][j] === arr[1][j] && arr[1][j] === arr[2][j]) {
      return arr[0][j];
    }
  }

  // Check diagonals
  if (arr[0][0] && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
    return arr[0][0];
  }

  if (arr[0][2] && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]) {
    return arr[0][2];
  }

  return null;
};

export default function TicTacToe() {
  [null, null, null, null, null, null, null, null, null];
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X"); // X for player X, O for player O
  const [winner, setWinner] = useState(null);

  console.log(board);

  const movesRef = useRef(0);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;
    const newBoard = board.map((r, i) => {
      if (i !== row) return r;
      return r.map((cell, j) => (j === col ? currentPlayer : cell));
    });
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    movesRef.current = movesRef.current + 1;
  };

  const handleRestart = () => {
    setBoard(Array.from({ length: 3 }, () => Array(3).fill(null)));
    setCurrentPlayer("X");
    setWinner(null);
  };

  useEffect(() => {
    setWinner(checkWinner(board));
  }, [board]);

  return (
    <div className="tic-tac-toe-container">
      <h1>Tic Tac Toe</h1>
      <h3>Current Player: {currentPlayer === "X" ? "X" : "O"}</h3>
      {winner ? (
        <h3>Winner: {winner === "X" ? "X" : "O"}</h3>
      ) : movesRef.current >= 9 ? (
        <h3>It's a draw</h3>
      ) : null}
      <div className="game-board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="game-board-cell"
              onClick={() => handleClick(i, j)}
            >
              {cell}
            </div>
          ))
        )}
      </div>

      <button onclick={handleRestart}>Restart Game</button>
    </div>
  );
}
