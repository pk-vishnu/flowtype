import { useState, useEffect } from "react";

export default function Wpm(props) {
  const { correctWordArray, progressMs, timestamp } = props;
  const [wpm, setWpm] = useState([]);
  const [accuracy, setAccuracy] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [averageWPM, setAverageWPM] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  useEffect(() => {
    if (correctWordArray.length > 0) {
      setElapsedTime(progressMs / 1000);
    }
  }, [correctWordArray]);

  useEffect(() => {
    if (elapsedTime !== 0) {
      const words = correctWordArray.filter((item) => item === true).length;
      const minutes = (elapsedTime - timestamp) / 60;
      const wpm = Math.abs(words / minutes);
      setWpm((array) => [...array, wpm.toFixed(2)]);
    }
  }, [correctWordArray]);

  useEffect(() => {
    if (wpm.length !== 0) {
      const sum = wpm.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
      const average = sum / wpm.length;
      setAverageWPM(average.toFixed(2));
    }
  }, [wpm]);

  useEffect(() => {
    if (correctWordArray.length > 0) {
      const correctWords = correctWordArray.filter((item) => item === true);
      const accuracy = (correctWords.length / correctWordArray.length) * 100;
      setAccuracy((array) => [...array, accuracy]);
    }
  }, [correctWordArray]);

  useEffect(() => {
    if (accuracy.length !== 0) {
      const sum = accuracy.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
      const average = sum / accuracy.length;
      setAverageAccuracy(average);
    }
  }, [accuracy]);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex-1 text-5xl text-gray-500">
          <h1>{Math.round(averageWPM)} WPM</h1>
        </div>
        <div className="flex-1 text-3xl text-end text-gray-500">
          <h1>{Math.round(averageAccuracy)}% Accuracy</h1>
        </div>
      </div>
    </>
  );
}
