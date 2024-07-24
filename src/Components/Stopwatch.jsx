import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [centisecondsElapsed, setCentisecondsElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const padStart = (value, length = 2) => String(value).padStart(length, '0');

  const setTime = () => {
    const minutes = Math.floor(centisecondsElapsed / 6000);
    const seconds = Math.floor((centisecondsElapsed % 6000) / 100);
    const centiseconds = centisecondsElapsed % 100;
    return `${padStart(minutes)}:${padStart(seconds)}:${padStart(centiseconds, 2)}`;
  };

  const startClock = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(setInterval(() => {
      setCentisecondsElapsed((prev) => prev + 1);
    }, 10));
    setActiveButton('start');
  };

  const stopClock = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setActiveButton('stop');
  };

  const resetClock = () => {
    stopClock();
    setCentisecondsElapsed(0);
    setActiveButton('reset');
  };

  const getButtonClass = (buttonType) => {
    return `px-4 py-2 rounded-lg font-semibold text-white ${activeButton === buttonType ? 'bg-pink-500' : 'bg-gray-400 bg-opacity-50'} transition-colors border-none text-sm`;
  };

  return (
    <div className="bg-purple-950 sm:mt-20 mt-[50%] flex flex-col items-center justify-center p-5 rounded-3xl border-2 border-black mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 text-center">Stop Watch</h1>
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-semibold mb-4 text-center">{setTime()}</h1>
      <div className="flex flex-row gap-2 mt-4">
        <button onClick={startClock} className={getButtonClass('start')}>
          Start
        </button>
        <button onClick={stopClock} className={getButtonClass('stop')}>
          Stop
        </button>
        <button onClick={resetClock} className={getButtonClass('reset')}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
