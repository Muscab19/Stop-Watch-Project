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
    return `px-6 py-1 rounded-lg font-semibold text-white ${activeButton === buttonType ? 'bg-pink-500' : 'bg-gray-400 bg-opacity-50'} transition-colors border-none`;
  };

  return (
    <div className="bg-purple-950 flex flex-col items-center justify-center mt-40 mx-auto w-[600px] h-[300px] p-5 rounded-3xl border-2 border-black">
      <h1 className="text-4xl font-semibold text-white mb-5">Stop Watch</h1>
      <h1 className="text-9xl text-white font-semibold mb-5">{setTime()}</h1>
      <div className="space-x-4 mt-5">
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
