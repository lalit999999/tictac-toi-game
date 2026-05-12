import GameBoard from "./components/GameBoard";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-stone-950 flex flex-col items-center justify-center p-4">
      {/* Background gradient effect */}
      <div className="fixed inset-0 -z-10 bg-radial-to-br from-emerald-900/20 via-stone-950 to-stone-950 pointer-events-none" />

      {/* Content */}
      <div className="w-full flex flex-col items-center gap-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-amber-200 to-emerald-300 drop-shadow-2xl">
            ♟️ TIC TAC TOE
          </h1>
          <p className="text-stone-400 text-lg font-light tracking-widest uppercase">
            Challenge your mind in the ultimate strategic game
          </p>
          <div className="h-1 w-24 bg-linear-to-r from-emerald-500 to-amber-500 mx-auto rounded-full" />
        </div>

        {/* Game Board */}
        <GameBoard />

        {/* Footer */}
        <footer className="text-center text-sm text-stone-500 pb-8">
          <p>
            Crafted with <span className="text-emerald-400">♣</span> precision
            and premium design
          </p>
        </footer>
      </div>
    </div>
  );
}
