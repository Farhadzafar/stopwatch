"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const backgroundImages = [
  "https://images.pexels.com/photos/6149690/pexels-photo-6149690.jpeg",
  "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg",
  "https://images.pexels.com/photos/14679172/pexels-photo-14679172.png",
  "https://images.pexels.com/photos/447329/pexels-photo-447329.jpeg",
  "https://images.pexels.com/photos/11738635/pexels-photo-11738635.jpeg",
  "https://images.pexels.com/photos/11167638/pexels-photo-11167638.jpeg",
  "https://images.pexels.com/photos/27408594/pexels-photo-27408594.jpeg",
  "https://images.pexels.com/photos/8451262/pexels-photo-8451262.jpeg",
  "https://images.pexels.com/photos/13071331/pexels-photo-13071331.jpeg",
  "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg",
  "https://images.pexels.com/photos/4444815/pexels-photo-4444815.jpeg",
  "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg",
  "https://images.pexels.com/photos/3748174/pexels-photo-3748174.jpeg",
  "https://images.pexels.com/photos/26409489/pexels-photo-26409489.jpeg",
  "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg",
  "https://images.pexels.com/photos/3234559/pexels-photo-3234559.jpeg",
  "https://images.pexels.com/photos/16705982/pexels-photo-16705982.jpeg",
  "https://images.pexels.com/photos/18495/pexels-photo.jpg",
  "https://images.pexels.com/photos/31713509/pexels-photo-31713509.jpeg",
  "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg",
  "https://images.pexels.com/photos/6512981/pexels-photo-6512981.jpeg",
  "https://images.pexels.com/photos/14187938/pexels-photo-14187938.jpeg",
  "https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg",
  "https://images.pexels.com/photos/16944052/pexels-photo-16944052.jpeg",
  "https://images.pexels.com/photos/28518041/pexels-photo-28518041.jpeg",
  "https://images.pexels.com/photos/19577642/pexels-photo-19577642.jpeg",
  "https://images.pexels.com/photos/19558160/pexels-photo-19558160.jpeg",
  "https://images.pexels.com/photos/19193838/pexels-photo-19193838.jpeg",
  "https://images.pexels.com/photos/16963652/pexels-photo-16963652.jpeg",
  "https://images.pexels.com/photos/7731696/pexels-photo-7731696.jpeg",
];

export default function StopwatchPage() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && startTime !== null) {
      const updateTime = () => {
        const now = Date.now();
        setElapsedTime(now - startTime);
        animationFrameRef.current = requestAnimationFrame(updateTime);
      };
      animationFrameRef.current = requestAnimationFrame(updateTime);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, startTime]);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000);

    return () => clearInterval(bgInterval);
  }, []);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      centiseconds: centiseconds.toString().padStart(2, "0"),
    };
  };

  const handleStartPause = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const { hours, minutes, seconds, centiseconds } = formatTime(elapsedTime);

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden ">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgroundImages[bgIndex]})`,
        }}
      />

      <div className=" w-full h-auto relative z-10 flex flex-col items-center gap-8  ">
        {/* Time Display */}
        <div className="flex flex-col items-center gap-2 text-stone-200 font-mono">
          <div className="flex items-baseline gap-1 tabular-nums">
            <span className="text-[120px] md:text-[160px] font-bold leading-none tracking-tight drop-shadow-[0_0_25px_#0BA6DF]">
              {hours}
            </span>
            <span className="text-[120px] md:text-[160px] font-bold leading-none drop-shadow-[0_0_25px_#0BA6DF]">
              :
            </span>
            <span className="text-[120px] md:text-[160px] font-bold leading-none tracking-tight drop-shadow-[0_0_25px_#0BA6DF]">
              {minutes}
            </span>
            <span className="text-[120px] md:text-[160px] font-bold leading-none drop-shadow-[0_0_25px_#0BA6DF]">
              :
            </span>
            <span className="text-[120px] md:text-[160px] font-bold leading-none tracking-tight drop-shadow-[0_0_25px_#0BA6DF]">
              {seconds}
            </span>
            <span className="text-[80px] md:text-[100px] font-bold leading-none tracking-tight drop-shadow-[0_0_25px_#0BA6DF]">
              .{centiseconds}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleStartPause}
            className="w-16 h-16 rounded-full border-white bg-white border-2    hover:border-2 hover:border-stone-300 text-black flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg"
            aria-label={isRunning ? "Pause" : "Start"}
          >
            {isRunning ? (
              <Pause className="w-6 h-6" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            )}
          </button>

          <button
            onClick={handleReset}
            className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-gray-100  hover:text-black transition-colors shadow-lg border-2 border-gray-200 "
            aria-label="Reset"
          >
            <RotateCcw className="w-5 h-5 font-extrabold" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        <p className="text-white text-xl md:text-2xl font-sans  text-center max-w-2xl px-4 drop-shadow">
          Power by: Farhad Ahmad Zafari |{" "}
          <a
            href="https://github.com/Farhadzafar"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
