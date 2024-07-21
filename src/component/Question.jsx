import React, { useState } from "react";
import QuestionTimer from "../QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";
const Question = ({ index, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
  }

  setTimeout(() => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: QUESTIONS[index].answers[0] === answerState,
    });

    setTimeout(() => {
      onSelectAnswer(answer);
    }, 2000);
  }, 1000);

  let answerState = "";
  if (answer.selectedAnswer) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  }
  return (
    <div id="questions">
      <QuestionTimer timeout={10000} onTimeOut={onSkipAnswer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answersState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
};

export default Question;
