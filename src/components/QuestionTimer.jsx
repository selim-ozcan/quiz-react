import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, answerState }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setRemainingTime(timeout);
    const timer = setTimeout(() => {
      onTimeout?.();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={timeout}
      className={`${answerState === "answered" ? "answered" : ""}`}
    ></progress>
  );
}
