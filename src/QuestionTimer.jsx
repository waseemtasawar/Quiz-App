import React, { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeOut }) => {
  const [remaningTime, setRemaningTime] = useState(timeout);
  useEffect(() => {
    console.log("SEETTING TIMEOUT");
    const timer = setTimeout(onTimeOut, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeOut]);

  useEffect(() => {
    console.log("INTERVAL TIMEOUT");
    const interval = setInterval(() => {
      setRemaningTime((PrevReamingTime) => PrevReamingTime - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" max={timeout} value={remaningTime} />;
};

export default QuestionTimer;
