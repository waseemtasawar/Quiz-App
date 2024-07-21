import React, { useRef } from "react";

const Answers = ({ answers, selectedAnswer, answersState, onSelect }) => {
  const shuffledAnswer = useRef();

  if (!shuffledAnswer.current) {
    shuffledAnswer.current = [...answers];
    shuffledAnswer.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswer.current.map((answer) => {
        const isSelect = selectedAnswer === answer;
        let cssClass = "";
        if (answersState === "answered" && isSelect) {
          cssClass = "selected";
        }

        if (
          answersState === "correct" ||
          (answersState === "wrong" && isSelect)
        ) {
          cssClass = answersState;
        }
        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
