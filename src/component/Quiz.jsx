import React, { useState } from "react";
import QUESTION from "../questions";
import quizcomplete from "../assets/quiz-complete.png";

const Quiz = () => {
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuestionIndex = userAnswer.length;

  const shuffledAnswer = [...QUESTION[activeQuestionIndex].answers];
  shuffledAnswer.sort(() => Math.random() - 0.5);

  const quizComplete = activeQuestionIndex.length === QUESTION;
  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  }

  if (quizComplete) {
    return (
      <div id="summry">
        <img src={quizcomplete} alt="Quiz Complete" />
        <h2>Quiz Complete</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="questions">
        <h1>{QUESTION[activeQuestionIndex].text}</h1>
        <ul id="answers">
          {shuffledAnswer.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
