export default function Square({ value, onClick, isWinning }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`game-square ${value === "X" ? "game-square-x" : value === "O" ? "game-square-o" : "bg-stone-950/90 border-stone-700 text-stone-100"} ${isWinning ? "ring-4 ring-emerald-400/60 shadow-lg shadow-emerald-500/20" : "hover:ring-2 hover:ring-emerald-300/30"}`}
    >
      <span className="pointer-events-none text-4xl font-semibold tracking-widest">
        {value}
      </span>
    </button>
  );
}
