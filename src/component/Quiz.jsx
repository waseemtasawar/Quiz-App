import React, { useState, useCallback } from "react";
import QUESTION from "../questions";
import quizcomplete from "../assets/quiz-complete.png";
import QuestionTimer from "../QuestionTimer";

const Quiz = () => {
  const [userAnswer, setUserAnswer] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState == "" ? userAnswer.length : userAnswer.length - 1;

  const quizComplete = activeQuestionIndex === QUESTION.length;
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswer((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer == QUESTION[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizcomplete} alt="Quiz Complete" />
        <h2>Quiz Complete</h2>
      </div>
    );
  }

  const shuffledAnswer = [...QUESTION[activeQuestionIndex].answers];
  shuffledAnswer.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="questions">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h1>{QUESTION[activeQuestionIndex].text}</h1>
        <ul id="answers">
          {shuffledAnswer.map((answer) => {
            const isSelect = userAnswer[userAnswer.length - 1] === answer;
            let cssClass = "";
            if (answerState === "answered" && isSelect) {
              cssClass = "selected";
            }

            if (
              answerState === "correct" ||
              (answerState === "wrong" && isSelect)
            ) {
              cssClass = answerState;
            }
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
