import { useEffect, useMemo, useRef, useState } from "react";

const pad = (value) => String(value).padStart(2, "0");

const formatStopwatchTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
};

const formatTimerTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

function App() {
  const [activeView, setActiveView] = useState("stopwatch");

  const [stopwatchMs, setStopwatchMs] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [stopwatchCleared, setStopwatchCleared] = useState(false);
  const stopwatchStartRef = useRef(0);

  const [hoursInput, setHoursInput] = useState("");
  const [minutesInput, setMinutesInput] = useState("");
  const [secondsInput, setSecondsInput] = useState("");
  const [timerTotalSeconds, setTimerTotalSeconds] = useState(0);
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerCleared, setTimerCleared] = useState(false);
  const [timerMessage, setTimerMessage] = useState(
    "Set a time and press Start.",
  );

  useEffect(() => {
    if (!isStopwatchRunning) return;

    const intervalId = setInterval(() => {
      setStopwatchMs(Date.now() - stopwatchStartRef.current);
    }, 10);

    return () => clearInterval(intervalId);
  }, [isStopwatchRunning]);

  useEffect(() => {
    if (!isTimerRunning) return;

    const intervalId = setInterval(() => {
      setTimerRemainingSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(intervalId);
          setIsTimerRunning(false);
          setTimerMessage("Time is up! 🌿");
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  const handleStartStopwatch = () => {
    if (isStopwatchRunning) return;

    stopwatchStartRef.current = Date.now() - stopwatchMs;
    setStopwatchCleared(false);
    setIsStopwatchRunning(true);
  };

  const handlePauseStopwatch = () => {
    setIsStopwatchRunning(false);
  };

  const handleResetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchMs(0);
    setStopwatchCleared(false);
  };

  const handleClearStopwatchDisplay = () => {
    setIsStopwatchRunning(false);
    setStopwatchMs(0);
    setStopwatchCleared(true);
  };

  const parseTimePart = (value, max) => {
    const parsed = Number.parseInt(value || "0", 10);
    if (Number.isNaN(parsed) || parsed < 0) return 0;
    return Math.min(parsed, max);
  };

  const handleSetTimer = () => {
    const h = parseTimePart(hoursInput, 99);
    const m = parseTimePart(minutesInput, 59);
    const s = parseTimePart(secondsInput, 59);

    const total = h * 3600 + m * 60 + s;
    setHoursInput(h === 0 ? "" : String(h));
    setMinutesInput(m === 0 ? "" : String(m));
    setSecondsInput(s === 0 ? "" : String(s));

    if (total === 0) {
      setTimerMessage("Enter a valid time greater than 0 seconds.");
      setTimerTotalSeconds(0);
      setTimerRemainingSeconds(0);
      setIsTimerRunning(false);
      return;
    }

    setTimerTotalSeconds(total);
    setTimerRemainingSeconds(total);
    setTimerCleared(false);
    setIsTimerRunning(false);
    setTimerMessage("Timer is ready. Press Start.");
  };

  const handleStartTimer = () => {
    if (timerRemainingSeconds === 0) {
      if (timerTotalSeconds > 0) {
        setTimerRemainingSeconds(timerTotalSeconds);
      } else {
        setTimerMessage("Set a time first.");
        return;
      }
    }
    setTimerCleared(false);
    setIsTimerRunning(true);
    setTimerMessage("Timer is running...");
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
    setTimerMessage("Timer paused.");
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerRemainingSeconds(timerTotalSeconds);
    setTimerCleared(false);
    setTimerMessage(
      timerTotalSeconds > 0
        ? "Timer reset and ready to start."
        : "Set a time and press Start.",
    );
  };

  const handleClearTimerDisplay = () => {
    setIsTimerRunning(false);
    setTimerTotalSeconds(0);
    setTimerRemainingSeconds(0);
    setHoursInput("");
    setMinutesInput("");
    setSecondsInput("");
    setTimerCleared(true);
    setTimerMessage("Display cleared.");
  };

  const stopwatchDisplay = stopwatchCleared
    ? "--:--.--"
    : formatStopwatchTime(stopwatchMs);

  const timerDisplay = timerCleared
    ? "--:--:--"
    : formatTimerTime(timerRemainingSeconds);

  const timerProgress = useMemo(() => {
    if (timerTotalSeconds <= 0) return 0;
    const progress =
      ((timerTotalSeconds - timerRemainingSeconds) / timerTotalSeconds) * 100;
    return Math.min(100, Math.max(0, progress));
  }, [timerRemainingSeconds, timerTotalSeconds]);

  const tabButtonClass = (tab) =>
    `relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
      activeView === tab
        ? "bg-emerald-500 text-emerald-950 shadow-md"
        : "text-stone-300 hover:text-stone-100"
    }`;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-8 sm:px-6">
      <section className="w-full rounded-3xl border border-stone-700/70 bg-stone-900/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-7">
        <header className="mb-6 text-center">
          <p className="mb-2 inline-block rounded-full bg-emerald-900/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Nature Time Suite
          </p>
          <h1 className="text-3xl font-bold text-stone-100 sm:text-4xl">
            Stopwatch & Timer
          </h1>
          <p className="mt-2 text-sm text-stone-300 sm:text-base">
            Earthy neutrals, moody tones, and smooth controls.
          </p>
        </header>

        <div className="mx-auto mb-6 flex w-full max-w-sm items-center rounded-full border border-stone-700 bg-stone-800 p-1">
          <button
            type="button"
            onClick={() => setActiveView("stopwatch")}
            className={tabButtonClass("stopwatch")}
          >
            Stopwatch
          </button>
          <button
            type="button"
            onClick={() => setActiveView("timer")}
            className={tabButtonClass("timer")}
          >
            Timer
          </button>
        </div>
      </header>
      <main className="p-10 min-h-96 flex justify-center items-center bg-linear-to-br from-stone-50 to-amber-50/30">
        <GameBoard key={gameKey} onReset={handleResetGame} />
      </main>
      <footer className="bg-linear-to-r from-slate-900/95 to-emerald-900/95 text-amber-100 px-8 py-6 text-center text-sm border-t border-emerald-800/50 backdrop-blur-sm">
        <p className="font-light tracking-widest">
          © 2026 PREMIUM TIC TAC TOE GAME
        </p>
      </footer>
    </div> </section>
    </main>
    );
}

export default App;
