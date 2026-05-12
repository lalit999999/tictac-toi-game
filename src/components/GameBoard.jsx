import { useState } from "react";
import Square from "./Square";

export default function GameBoard() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Calculate winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line };
      }
    }
    return null;
  };

  // Check for draw
  const isBoardFull = squares.every((square) => square !== null);

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isDraw = !winner && isBoardFull;

  // Handle square click
  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  // Reset game
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  // Status message
  let statusText = "";
  if (winner) {
    statusText = `🎉 Player ${winner} Wins!`;
  } else if (isDraw) {
    statusText = "🤝 It's a Draw!";
  } else {
    statusText = `Current Turn: Player ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-8 rounded-3xl border border-stone-700/70 bg-stone-900/70 p-8 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="w-full text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-amber-200 to-emerald-300 mb-2">
          ♟️ Tic Tac Toe
        </h1>
        <p className="text-sm font-light text-stone-400 uppercase tracking-widest">
          Premium Game Experience
        </p>
      </div>

      {/* Status */}
      <div
        className={`w-full p-6 rounded-xl text-center font-semibold text-lg transition-all duration-300 ${
          winner
            ? "bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-200 border border-emerald-400/50"
            : isDraw
              ? "bg-gradient-to-r from-stone-600/20 to-stone-600/10 text-stone-200 border border-stone-400/50"
              : "bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-100 border border-amber-400/50"
        }`}
      >
        {statusText}
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-stone-950/50 rounded-2xl border border-stone-700/50 backdrop-blur-sm">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinning={winningLine.includes(index)}
          />
        ))}
      </div>

      {/* Player Indicator */}
      <div className="w-full flex justify-center items-center gap-6 p-5 bg-stone-800/50 rounded-xl border border-stone-700/50">
        <div
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
            isXNext
              ? "bg-emerald-500/30 text-emerald-200 ring-2 ring-emerald-400/50 scale-105"
              : "text-stone-400 opacity-60"
          }`}
        >
          X
        </div>
        <div className="text-xs font-light text-stone-500 uppercase tracking-widest">
          vs
        </div>
        <div
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
            !isXNext
              ? "bg-amber-500/30 text-amber-200 ring-2 ring-amber-400/50 scale-105"
              : "text-stone-400 opacity-60"
          }`}
        >
          O
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full max-w-xs px-8 py-4 text-lg font-bold bg-linear-to-br from-emerald-600 to-teal-700 text-emerald-50 border-2 border-emerald-500/50 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 uppercase tracking-wider"
      >
        🔄 New Game
      </button>
    </div>
  );
}
